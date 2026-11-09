"use client"

import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

/*
 * Live 3D crystal version of the Dreekk "iD" mark, drawn with plain WebGL (no libraries).
 * The exact logo outline is extruded into a thick glass slab with sharp 45-degree chamfers.
 * Every face is shaded as clear glass: Fresnel brightness on the edges, thin-film
 * iridescence (the rainbow), a specular glint, and light streaks that sweep across the
 * faces as the logo rocks from side to side. The i-dot drifts on its own along the
 * bottom-left -> top-right diagonal.
 * Falls back to the pre-rendered images if WebGL is unavailable.
 */

// ---------------------------------------------------------------- geometry (logo units)
type P2 = [number, number]

const THICK = 70
const CHAMFER = 10
const CX = 370
const CY = 370

function arc(cx: number, cy: number, r: number, a0: number, a1: number, step = 3): P2[] {
  const n = Math.max(2, Math.round(Math.abs(a1 - a0) / step))
  const out: P2[] = []
  for (let i = 0; i <= n; i++) {
    const a = ((a0 + ((a1 - a0) * i) / n) * Math.PI) / 180
    out.push([cx + r * Math.cos(a), cy + r * Math.sin(a)])
  }
  return out
}

function clean(pts: P2[]): P2[] {
  const out: P2[] = []
  for (const p of pts) {
    const q = out[out.length - 1]
    if (!q || Math.hypot(p[0] - q[0], p[1] - q[1]) > 1e-6) out.push(p)
  }
  const f = out[0], l = out[out.length - 1]
  if (Math.hypot(f[0] - l[0], f[1] - l[1]) < 1e-6) out.pop()
  return out
}

const DOT: P2[] = [[162, 145], [249, 145], [249, 232], [162, 232]]
const D: P2[] = clean([
  [162, 282], [162, 595], [353, 595],
  ...arc(353, 370, 225, 90, -90),
  [305, 145], [305, 232], [353, 232],
  ...arc(353, 370, 138, -90, 90),
  [249, 508], [249, 328], [305, 328], [305, 452], [353, 452],
  ...arc(353, 367, 85, 90, -90),
  [162, 282],
])

/** logo (x, y-down) -> world (x, y-up), centred */
const w2 = (p: P2): P2 => [p[0] - CX, -(p[1] - CY)]

function area(p: P2[]) {
  let a = 0
  for (let i = 0; i < p.length; i++) {
    const [x1, y1] = p[i], [x2, y2] = p[(i + 1) % p.length]
    a += x1 * y2 - x2 * y1
  }
  return a / 2
}

/** world-space polygon, counter-clockwise */
function ccw(poly: P2[]): P2[] {
  const p = poly.map(w2)
  return area(p) > 0 ? p : p.reverse()
}

/** sharp (mitred) inset of a CCW polygon */
function inset(p: P2[], c: number): P2[] {
  const n = p.length
  return p.map((b, i) => {
    const a = p[(i - 1 + n) % n], d = p[(i + 1) % n]
    const e1 = [b[0] - a[0], b[1] - a[1]], e2 = [d[0] - b[0], d[1] - b[1]]
    const l1 = Math.hypot(e1[0], e1[1]), l2 = Math.hypot(e2[0], e2[1])
    const n1 = [-e1[1] / l1, e1[0] / l1], n2 = [-e2[1] / l2, e2[0] / l2] // inward (left) normals
    const m = [n1[0] + n2[0], n1[1] + n2[1]]
    const k = Math.max(m[0] * n1[0] + m[1] * n1[1], 1e-3)
    return [b[0] + (m[0] / k) * c, b[1] + (m[1] / k) * c] as P2
  })
}

/** ear-clipping triangulation of a simple CCW polygon -> index triples */
function triangulate(p: P2[]): number[] {
  const idx = p.map((_, i) => i)
  const out: number[] = []
  const cross = (a: P2, b: P2, c: P2) => (b[0] - a[0]) * (c[1] - a[1]) - (b[1] - a[1]) * (c[0] - a[0])
  const inside = (q: P2, a: P2, b: P2, c: P2) => cross(a, b, q) >= 0 && cross(b, c, q) >= 0 && cross(c, a, q) >= 0
  let guard = 0
  while (idx.length > 3 && guard++ < 100000) {
    let clipped = false
    for (let i = 0; i < idx.length; i++) {
      const i0 = idx[(i - 1 + idx.length) % idx.length], i1 = idx[i], i2 = idx[(i + 1) % idx.length]
      const a = p[i0], b = p[i1], c = p[i2]
      if (cross(a, b, c) <= 1e-9) continue
      let ok = true
      for (const j of idx) {
        if (j === i0 || j === i1 || j === i2) continue
        if (inside(p[j], a, b, c)) { ok = false; break }
      }
      if (!ok) continue
      out.push(i0, i1, i2)
      idx.splice(i, 1)
      clipped = true
      break
    }
    if (!clipped) idx.splice(0, 1) // degenerate safety
  }
  if (idx.length === 3) out.push(idx[0], idx[1], idx[2])
  return out
}

type Kind = 0 | 1 | 2 // 0 cap, 1 side, 2 chamfer

function buildPiece(poly: P2[], piece: 0 | 1, sides: number[], caps: number[]) {
  const o = ccw(poly)
  const ins = inset(o, CHAMFER)
  const zf = THICK / 2, zb = -THICK / 2
  const push = (arr: number[], v: number[], nrm: number[], kind: Kind) => arr.push(v[0], v[1], v[2], nrm[0], nrm[1], nrm[2], kind, piece)
  const quad = (arr: number[], a: number[], b: number[], c: number[], d: number[], nrm: number[], kind: Kind) => {
    push(arr, a, nrm, kind); push(arr, b, nrm, kind); push(arr, c, nrm, kind)
    push(arr, a, nrm, kind); push(arr, c, nrm, kind); push(arr, d, nrm, kind)
  }
  const n = o.length
  const s2 = Math.SQRT1_2
  for (let i = 0; i < n; i++) {
    const j = (i + 1) % n
    const ex = o[j][0] - o[i][0], ey = o[j][1] - o[i][1]
    const l = Math.hypot(ex, ey)
    const out = [ey / l, -ex / l] // outward for CCW
    // side wall
    quad(sides, [o[i][0], o[i][1], zf - CHAMFER], [o[i][0], o[i][1], zb + CHAMFER], [o[j][0], o[j][1], zb + CHAMFER], [o[j][0], o[j][1], zf - CHAMFER], [out[0], out[1], 0], 1)
    // front + back chamfers (45 degrees)
    quad(sides, [ins[i][0], ins[i][1], zf], [o[i][0], o[i][1], zf - CHAMFER], [o[j][0], o[j][1], zf - CHAMFER], [ins[j][0], ins[j][1], zf], [out[0] * s2, out[1] * s2, s2], 2)
    quad(sides, [o[i][0], o[i][1], zb + CHAMFER], [ins[i][0], ins[i][1], zb], [ins[j][0], ins[j][1], zb], [o[j][0], o[j][1], zb + CHAMFER], [out[0] * s2, out[1] * s2, -s2], 2)
  }
  const tri = triangulate(ins)
  for (let t = 0; t < tri.length; t += 3) {
    const [a, b, c] = [ins[tri[t]], ins[tri[t + 1]], ins[tri[t + 2]]]
    push(caps, [a[0], a[1], zf], [0, 0, 1], 0); push(caps, [b[0], b[1], zf], [0, 0, 1], 0); push(caps, [c[0], c[1], zf], [0, 0, 1], 0)
    push(caps, [a[0], a[1], zb], [0, 0, -1], 0); push(caps, [c[0], c[1], zb], [0, 0, -1], 0); push(caps, [b[0], b[1], zb], [0, 0, -1], 0)
  }
}

let GEOMETRY: { data: Float32Array; sideCount: number; total: number } | null = null
function geometry() {
  if (GEOMETRY) return GEOMETRY
  const sides: number[] = [], caps: number[] = []
  buildPiece(D, 0, sides, caps)
  buildPiece(DOT, 1, sides, caps)
  const data = new Float32Array(sides.length + caps.length)
  data.set(sides, 0); data.set(caps, sides.length)
  GEOMETRY = { data, sideCount: sides.length / 8, total: (sides.length + caps.length) / 8 }
  return GEOMETRY
}
const DOT_CENTER = w2([205.5, 188.5])

// ---------------------------------------------------------------- shaders
const VERT = `
attribute vec3 aPos; attribute vec3 aNrm; attribute float aKind; attribute float aPiece;
uniform mat4 uProj; uniform mat4 uView; uniform mat4 uModel;
uniform vec3 uDotC; uniform vec3 uDotOff; uniform float uDotRot;
varying vec3 vN; varying vec3 vW; varying vec3 vObj; varying float vKind;
void main(){
  vec3 p = aPos; vec3 n = aNrm;
  if (aPiece > 0.5) {
    float c = cos(uDotRot), s = sin(uDotRot);
    p -= uDotC; p.xy = mat2(c, s, -s, c) * p.xy; n.xy = mat2(c, s, -s, c) * n.xy; p += uDotC + uDotOff;
  }
  vec4 w = uModel * vec4(p, 1.0);
  vW = w.xyz; vN = mat3(uModel) * n; vObj = p; vKind = aKind;
  gl_Position = uProj * uView * w;
}`

const FRAG = `
precision highp float;
varying vec3 vN; varying vec3 vW; varying vec3 vObj; varying float vKind;
uniform vec3 uCam; uniform vec3 uLight; uniform float uPass; uniform float uTint;
vec3 hsv(float h, float s, float v){ vec3 k = clamp(abs(mod(h*6.0 + vec3(0.0,4.0,2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0); return v * mix(vec3(1.0), k, s); }
void main(){
  vec3 n = normalize(vN);
  vec3 v = normalize(uCam - vW);
  float ndv = dot(n, v);
  if (uPass < 0.5 ? ndv > 0.0 : ndv <= 0.0) discard;   // pass 0: far faces, pass 1: near faces
  float a = abs(ndv);
  vec3 nf = ndv > 0.0 ? n : -n;
  float fres = 0.04 + 0.96 * pow(1.0 - a, 4.0);
  float spec = pow(max(dot(nf, normalize(uLight + v)), 0.0), 36.0);
  vec3 col; float alpha;
  if (vKind < 0.5) {
    // big faces: clear, with rainbow light streaks that slide as the logo turns
    vec3 r = reflect(-v, nf);
    float u = r.x * 0.55 + r.y * 0.45 + (vObj.x * 0.8 - vObj.y * 0.6) / 700.0;
    float band = exp(-pow((u - 0.08) / 0.05, 2.0)) + 0.7 * exp(-pow((u - 0.40) / 0.04, 2.0));
    col = mix(vec3(1.0), hsv(fract(u * 1.4 + 0.1), 0.5, 1.0), clamp(band * 0.9, 0.0, 1.0));
    alpha = 0.022 + 0.035 * clamp(0.5 - u, 0.0, 1.0) + 0.17 * band + 0.6 * spec;
  } else {
    float hue = 0.95 * (1.0 - a) + 0.0004 * (vObj.x - 1.6 * vObj.y) + 0.82;
    float sat = vKind < 1.5 ? 0.36 : 0.42;
    col = 1.0 - sat * (1.0 - hsv(fract(hue), 1.0, 1.0));
    alpha = vKind < 1.5 ? 0.40 + 0.50 * fres + 0.9 * spec : 0.62 + 0.30 * fres + 1.0 * spec;
  }
  if (ndv <= 0.0) alpha *= 0.45;
  col = mix(col, vec3(1.0), clamp(spec, 0.0, 1.0));
  col = mix(col, col * vec3(1.0, 0.55, 0.55), uTint);
  alpha = min(alpha, 0.97);
  gl_FragColor = vec4(col * alpha, alpha);
}`

// ---------------------------------------------------------------- small matrix helpers (column-major)
type M4 = Float32Array
const perspective = (fovy: number, aspect: number, near: number, far: number): M4 => {
  const f = 1 / Math.tan(fovy / 2), nf = 1 / (near - far)
  return new Float32Array([f / aspect, 0, 0, 0, 0, f, 0, 0, 0, 0, (far + near) * nf, -1, 0, 0, 2 * far * near * nf, 0])
}
const translateZ = (z: number): M4 => new Float32Array([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, z, 1])
function rotationYXZ(yaw: number, pitch: number, roll: number): M4 {
  const cy = Math.cos(yaw), sy = Math.sin(yaw), cx = Math.cos(pitch), sx = Math.sin(pitch), cz = Math.cos(roll), sz = Math.sin(roll)
  // R = Rz * Rx * Ry
  const ry = [cy, 0, -sy, 0, 1, 0, sy, 0, cy]
  const rx = [1, 0, 0, 0, cx, sx, 0, -sx, cx]
  const rz = [cz, sz, 0, -sz, cz, 0, 0, 0, 1]
  const mul = (a: number[], b: number[]) => {
    const o = new Array(9).fill(0)
    for (let c = 0; c < 3; c++) for (let r = 0; r < 3; r++) for (let k = 0; k < 3; k++) o[c * 3 + r] += a[k * 3 + r] * b[c * 3 + k]
    return o
  }
  const m = mul(rz, mul(rx, ry))
  return new Float32Array([m[0], m[1], m[2], 0, m[3], m[4], m[5], 0, m[6], m[7], m[8], 0, 0, 0, 0, 1])
}

// ---------------------------------------------------------------- component
export type CrystalLogoProps = {
  className?: string
  /** Seconds for one full side-to-side swing. */
  period?: number
  /** How far it turns each way, in degrees. */
  swing?: number
  /** 0 = clear glass, 1 = fully red-tinted. */
  tint?: number
  /** Image shown if WebGL is not available. */
  fallback?: React.ReactNode
}

export function CrystalLogo({ className, period = 10, swing = 26, tint = 0, fallback = null }: CrystalLogoProps) {
  const ref = useRef<HTMLCanvasElement | null>(null)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const gl = canvas.getContext("webgl", { premultipliedAlpha: true, alpha: true, antialias: true })
    if (!gl) { setFailed(true); return }

    const compile = (type: number, src: string) => {
      const s = gl.createShader(type)!
      gl.shaderSource(s, src); gl.compileShader(s)
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(s) || "shader")
      return s
    }
    let prog: WebGLProgram
    try {
      prog = gl.createProgram()!
      gl.attachShader(prog, compile(gl.VERTEX_SHADER, VERT))
      gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, FRAG))
      gl.linkProgram(prog)
      if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(prog) || "link")
    } catch {
      setFailed(true); return
    }
    gl.useProgram(prog)

    const geo = geometry()
    const buf = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buf)
    gl.bufferData(gl.ARRAY_BUFFER, geo.data, gl.STATIC_DRAW)
    const stride = 8 * 4
    const attr = (name: string, size: number, offset: number) => {
      const loc = gl.getAttribLocation(prog, name)
      gl.enableVertexAttribArray(loc)
      gl.vertexAttribPointer(loc, size, gl.FLOAT, false, stride, offset * 4)
    }
    attr("aPos", 3, 0); attr("aNrm", 3, 3); attr("aKind", 1, 6); attr("aPiece", 1, 7)
    const U = (n: string) => gl.getUniformLocation(prog, n)
    const uProj = U("uProj"), uView = U("uView"), uModel = U("uModel"), uCam = U("uCam"), uLight = U("uLight"), uPass = U("uPass")
    const uDotC = U("uDotC"), uDotOff = U("uDotOff"), uDotRot = U("uDotRot"), uTint = U("uTint")

    const CAM = 1450
    gl.uniformMatrix4fv(uView, false, translateZ(-CAM))
    gl.uniform3f(uCam, 0, 0, CAM)
    const L = [-0.45, 0.65, 0.62], ll = Math.hypot(L[0], L[1], L[2])
    gl.uniform3f(uLight, L[0] / ll, L[1] / ll, L[2] / ll)
    gl.uniform3f(uDotC, DOT_CENTER[0], DOT_CENTER[1], 0)
    gl.uniform1f(uTint, tint)

    gl.disable(gl.DEPTH_TEST)
    gl.enable(gl.BLEND)
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA)
    gl.clearColor(0, 0, 0, 0)

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const w = Math.max(1, Math.round(canvas.clientWidth * dpr)), h = Math.max(1, Math.round(canvas.clientHeight * dpr))
      if (canvas.width !== w || canvas.height !== h) { canvas.width = w; canvas.height = h }
      gl.viewport(0, 0, w, h)
      gl.uniformMatrix4fv(uProj, false, perspective((30 * Math.PI) / 180, w / h, 10, 4000))
    }
    const ro = new ResizeObserver(resize)
    ro.observe(canvas)
    resize()

    const deg = Math.PI / 180
    const draw = (t: number) => {
      const s = (t / period) * Math.PI * 2
      const yaw = (-8 + swing * Math.sin(s)) * deg
      const pitch = (12 + 5 * Math.sin(s * 0.7 + 1)) * deg
      const roll = (-5 + 2.5 * Math.sin(s * 0.5)) * deg
      gl.uniformMatrix4fv(uModel, false, rotationYXZ(yaw, pitch, roll))
      // i-dot: glides up-right along the diagonal and back, with a small turn
      const k = 0.5 - 0.5 * Math.cos((t / 6) * Math.PI * 2)
      gl.uniform3f(uDotOff, 26 * k, 26 * k, 12 * k)
      gl.uniform1f(uDotRot, -0.18 * k)
      gl.clear(gl.COLOR_BUFFER_BIT)
      gl.uniform1f(uPass, 0); gl.drawArrays(gl.TRIANGLES, 0, geo.total)            // far faces
      gl.uniform1f(uPass, 1); gl.drawArrays(gl.TRIANGLES, 0, geo.sideCount)        // near walls + chamfers
      gl.drawArrays(gl.TRIANGLES, geo.sideCount, geo.total - geo.sideCount)        // near faces last
    }

    let raf = 0, visible = true
    const start = performance.now()
    const loop = (now: number) => {
      draw((now - start) / 1000)
      if (!reduced && visible) raf = requestAnimationFrame(loop)
    }
    const io = new IntersectionObserver(([e]) => {
      const was = visible
      visible = e.isIntersecting
      if (visible && !was && !reduced) raf = requestAnimationFrame(loop)
    })
    io.observe(canvas)
    raf = requestAnimationFrame(loop)

    const onLost = (e: Event) => { e.preventDefault(); setFailed(true) }
    canvas.addEventListener("webglcontextlost", onLost)
    return () => {
      cancelAnimationFrame(raf); ro.disconnect(); io.disconnect()
      canvas.removeEventListener("webglcontextlost", onLost)
      gl.deleteBuffer(buf); gl.deleteProgram(prog)
    }
  }, [period, swing, tint])

  if (failed) return <div className={className}>{fallback}</div>
  return <canvas ref={ref} className={cn("block h-full w-full", className)} style={{ width: "100%", height: "100%" }} aria-hidden="true" />
}

export default CrystalLogo
