import {ContactFormValues} from '../types';

export type EmailProviderStatus = 'emailjs' | 'brevo-proxy' | 'unconfigured';

export interface ContactSubmissionResult {
  status: 'sent' | 'unconfigured' | 'error';
  provider: EmailProviderStatus;
  message: string;
}

/**
 * Reads public client-side EmailJS or backend Brevo proxy configuration
 * from Vite environment variables without ever embedding secret API keys.
 */
export function getEmailProviderStatus(): EmailProviderStatus {
  const brevoProxyUrl = import.meta.env.VITE_BREVO_PROXY_URL?.trim();
  if (brevoProxyUrl) {
    return 'brevo-proxy';
  }

  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID?.trim();
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID?.trim();
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY?.trim();
  if (serviceId && templateId && publicKey) {
    return 'emailjs';
  }

  return 'unconfigured';
}

export function buildMailtoFallbackUrl(values: ContactFormValues): string {
  const subject = encodeURIComponent(
    `Project Inquiry: ${values.projectType || 'New Collaboration'} — ${values.company.trim()}`
  );
  const body = encodeURIComponent(
    [
      `Name: ${values.fullName.trim()}`,
      `Company: ${values.company.trim()}`,
      `Email: ${values.email.trim()}`,
      `Phone: ${values.phone.trim()}`,
      `Project Type: ${values.projectType}`,
      `Estimated Budget: ${values.budget}`,
      `Timeline: ${values.timeline}`,
      '',
      'Project Brief:',
      values.message.trim(),
    ].join('\n')
  );
  return `mailto:hello@kestrelstudio.co?subject=${subject}&body=${body}`;
}

export async function submitContactInquiry(
  values: ContactFormValues
): Promise<ContactSubmissionResult> {
  const provider = getEmailProviderStatus();

  if (provider === 'unconfigured') {
    return {
      status: 'unconfigured',
      provider: 'unconfigured',
      message:
        'Your inquiry passed validation, but automated email delivery is not configured in this environment. Please send your brief directly via email below.',
    };
  }

  const payload = {
    fullName: values.fullName.trim(),
    email: values.email.trim(),
    phone: values.phone.trim(),
    company: values.company.trim(),
    projectType: values.projectType,
    budget: values.budget,
    timeline: values.timeline,
    message: values.message.trim(),
  };

  if (provider === 'brevo-proxy') {
    const proxyUrl = import.meta.env.VITE_BREVO_PROXY_URL!.trim();
    try {
      const res = await fetch(proxyUrl, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        return {
          status: 'error',
          provider,
          message:
            'We could not deliver your message through the relay service right now. Please try again or email hello@kestrelstudio.co directly.',
        };
      }
      return {
        status: 'sent',
        provider,
        message:
          'Thank you. Your project brief has been received by our studio producers—we respond within one business day.',
      };
    } catch {
      return {
        status: 'error',
        provider,
        message:
          'A network error interrupted delivery. Please verify your connection or reach out directly via hello@kestrelstudio.co.',
      };
    }
  }

  // EmailJS REST endpoint (uses public key + template ID; never exposes private keys)
  try {
    const res = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        service_id: import.meta.env.VITE_EMAILJS_SERVICE_ID?.trim(),
        template_id: import.meta.env.VITE_EMAILJS_TEMPLATE_ID?.trim(),
        user_id: import.meta.env.VITE_EMAILJS_PUBLIC_KEY?.trim(),
        template_params: {
          from_name: payload.fullName,
          from_email: payload.email,
          phone: payload.phone,
          company: payload.company,
          project_type: payload.projectType,
          budget: payload.budget,
          timeline: payload.timeline,
          message: payload.message,
        },
      }),
    });

    if (!res.ok) {
      return {
        status: 'error',
        provider,
        message:
          'The EmailJS relay declined the request. Please verify your template configuration or write directly to hello@kestrelstudio.co.',
      };
    }

    return {
      status: 'sent',
      provider,
      message:
        'Thank you. Your project brief has been delivered—our creative director will follow up within 24 hours.',
    };
  } catch {
    return {
      status: 'error',
      provider,
      message:
        'Unable to reach the email delivery service. Please use the direct email link below.',
    };
  }
}
