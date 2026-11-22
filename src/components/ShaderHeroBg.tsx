import {useEffect, useRef} from 'react';

const VERTEX_SHADER = `
  attribute vec2 a_position;
  varying vec2 v_uv;
  void main() {
    v_uv = a_position * 0.5 + 0.5;
    gl_Position = vec4(a_position, 0.0, 1.0);
  }
`;

const FRAGMENT_SHADER = `
  precision highp float;
  varying vec2 v_uv;
  uniform float u_time;
  uniform vec2 u_resolution;
  uniform vec2 u_mouse;

  // Hash for fine tactile film grain
  float hash(vec2 p) {
    p = fract(p * vec2(123.34, 456.21));
    p += dot(p, p + 45.32);
    return fract(p.x * p.y);
  }

  // Smooth value noise
  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));
    return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
  }

  float fbm(vec2 p) {
    float v = 0.0;
    float amp = 0.5;
    mat2 rot = mat2(0.80, 0.60, -0.60, 0.80);
    for (int i = 0; i < 3; i++) {
      v += amp * noise(p);
      p = rot * p * 1.92;
      amp *= 0.5;
    }
    return v;
  }

  void main() {
    vec2 aspect = vec2(u_resolution.x / max(u_resolution.y, 1.0), 1.0);
    vec2 uv = (v_uv - 0.5) * aspect;
    vec2 mouseOffset = (u_mouse - 0.5) * aspect * 0.28;

    float t = u_time * 0.16;

    // Liquid glass distortion coordinates
    vec2 q = vec2(
      fbm(uv * 1.35 + vec2(t * 0.7, t * 0.35)),
      fbm(uv * 1.35 + vec2(-t * 0.45, t * 0.6) + 4.2)
    );

    vec2 r = vec2(
      fbm(uv * 1.85 + 1.6 * q + mouseOffset + vec2(1.7, 9.2) + t * 0.22),
      fbm(uv * 1.85 + 1.6 * q - mouseOffset + vec2(8.3, 2.8) - t * 0.18)
    );

    // Subtle chromatic dispersion across 3 glass refraction planes
    float fR = fbm(uv * 1.45 + r * 1.15 + vec2(0.018, 0.008));
    float fG = fbm(uv * 1.45 + r * 1.15);
    float fB = fbm(uv * 1.45 + r * 1.15 - vec2(0.018, 0.008));

    // Base soft daylight gallery tone (#F5F5F3)
    vec3 baseLight = vec3(0.962, 0.962, 0.953);
    vec3 coolMist  = vec3(0.902, 0.908, 0.916);
    vec3 warmPearl = vec3(0.985, 0.964, 0.946);
    vec3 orangeWhisper = vec3(1.0, 0.47, 0.29);

    vec3 col = baseLight;
    col = mix(col, coolMist, smoothstep(0.28, 0.78, fG) * 0.58);
    col = mix(col, warmPearl, smoothstep(0.45, 0.92, fR) * 0.62);

    // Delicate specular liquid glass rib
    float caustic = pow(clamp(1.0 - abs(fR - fB) * 6.5, 0.0, 1.0), 3.0);
    float glassFold = smoothstep(0.56, 0.84, fG) * (1.0 - smoothstep(0.84, 0.98, fG));
    col = mix(col, orangeWhisper, glassFold * 0.095);
    col += vec3(0.024, 0.018, 0.014) * caustic * 0.65;

    // Chromatic edge shimmer along refraction ridges
    float edgeDispersion = clamp((fR - fB) * 2.2, -0.06, 0.06);
    col.r += edgeDispersion * 0.45;
    col.b -= edgeDispersion * 0.35;

    // Soft radial vignette keeping edges cohesive
    float dist = length(uv);
    col -= smoothstep(0.55, 1.35, dist) * 0.022;

    // Fine organic film grain
    float grain = (hash(gl_FragCoord.xy + fract(u_time * 17.3) * 100.0) - 0.5) * 0.024;
    col += grain;

    gl_FragColor = vec4(clamp(col, 0.86, 0.995), 1.0);
  }
`;

export function ShaderHeroBg() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const gl = canvas.getContext('webgl', {
      alpha: false,
      antialias: false,
      powerPreference: 'low-power',
    });

    if (!gl) return;

    const compileShader = (type: number, source: string) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vs = compileShader(gl.VERTEX_SHADER, VERTEX_SHADER);
    const fs = compileShader(gl.FRAGMENT_SHADER, FRAGMENT_SHADER);
    if (!vs || !fs) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      return;
    }

    gl.useProgram(program);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW
    );

    const positionLoc = gl.getAttribLocation(program, 'a_position');
    gl.enableVertexAttribArray(positionLoc);
    gl.vertexAttribPointer(positionLoc, 2, gl.FLOAT, false, 0, 0);

    const timeLoc = gl.getUniformLocation(program, 'u_time');
    const resLoc = gl.getUniformLocation(program, 'u_resolution');
    const mouseLoc = gl.getUniformLocation(program, 'u_mouse');

    let targetMouseX = 0.52;
    let targetMouseY = 0.48;
    let currentMouseX = 0.52;
    let currentMouseY = 0.48;

    const handlePointerMove = (e: PointerEvent) => {
      targetMouseX = e.clientX / Math.max(window.innerWidth, 1);
      targetMouseY = 1.0 - e.clientY / Math.max(window.innerHeight, 1);
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const width = Math.floor(canvas.clientWidth * dpr);
      const height = Math.floor(canvas.clientHeight * dpr);
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
        gl.viewport(0, 0, width, height);
      }
    };

    resize();
    window.addEventListener('resize', resize, {passive: true});
    if (!prefersReducedMotion) {
      window.addEventListener('pointermove', handlePointerMove, {passive: true});
    }

    let rafId = 0;
    const startTime = performance.now();

    const renderFrame = (now: number) => {
      const elapsed = prefersReducedMotion ? 1.5 : (now - startTime) * 0.001;
      currentMouseX += (targetMouseX - currentMouseX) * 0.04;
      currentMouseY += (targetMouseY - currentMouseY) * 0.04;

      gl.uniform1f(timeLoc, elapsed);
      gl.uniform2f(resLoc, canvas.width, canvas.height);
      gl.uniform2f(mouseLoc, currentMouseX, currentMouseY);
      gl.drawArrays(gl.TRIANGLES, 0, 6);

      if (!prefersReducedMotion) {
        rafId = requestAnimationFrame(renderFrame);
      }
    };

    rafId = requestAnimationFrame(renderFrame);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', handlePointerMove);
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden bg-[#F4F4F2]"
    >
      <canvas
        ref={canvasRef}
        className="h-full w-full block opacity-100"
      />
      {/* Subtle architectural bottom edge fade into page canvas */}
      <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#F6F6F4] to-transparent" />
    </div>
  );
}
