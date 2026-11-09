"use client"

import { useId } from "react"
import { cn } from "@/lib/utils"
import { CrystalLogo } from "@/Components/ui/crystal-logo"

/*
 * Dreekk Innovation "iD" mark, traced from the logo, drawn as a piece of glass:
 * a frosted, refracting body (backdrop blur clipped to the mark), a tinted
 * fill, a specular bevel, bright edges and a light sheen that sweeps across.
 * Coordinates are the logo's own (a 724 x 724 artboard); the viewBox crops to the mark.
 */
const VIEWBOX = "162 145 416 450"
const DOT = "M162 145h87v87h-87z"
const D =
  "M305 145H353A225 225 0 0 1 353 595H162V232H305Z M162 232H353A138 138 0 0 1 353 508H249V328H305V452H353A85 85 0 0 0 353 282H162Z"

const MASK =
  "url(\"data:image/svg+xml," +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' viewBox='${VIEWBOX}'><path d='${DOT}'/><path fill-rule='evenodd' d='${D}'/></svg>`,
  ) +
  "\")"

export function GlassLogo({ className, sheen = true }: { className?: string; sheen?: boolean }) {
  const id = useId().replace(/:/g, "")
  const u = (name: string) => `${name}-${id}`

  return (
    <div className={cn("relative aspect-[416/450]", className)} aria-hidden="true">
      {/* frosted, refracting body: whatever sits behind is blurred and brightened inside the mark */}
      <div
        className="absolute inset-0"
        style={{
          WebkitMaskImage: MASK,
          maskImage: MASK,
          WebkitMaskSize: "100% 100%",
          maskSize: "100% 100%",
          backdropFilter: "blur(18px) saturate(180%) brightness(1.2)",
          WebkitBackdropFilter: "blur(18px) saturate(180%) brightness(1.2)",
        }}
      />

      <svg viewBox={VIEWBOX} className="absolute inset-0 h-full w-full overflow-visible">
        <defs>
          {/* red glass for the D */}
          <linearGradient id={u("red")} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#ff5a52" stopOpacity=".55" />
            <stop offset=".45" stopColor="#E5322B" stopOpacity=".28" />
            <stop offset="1" stopColor="#7a0710" stopOpacity=".5" />
          </linearGradient>
          {/* smoked black glass for the dot */}
          <linearGradient id={u("ink")} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#ffffff" stopOpacity=".22" />
            <stop offset=".5" stopColor="#141412" stopOpacity=".55" />
            <stop offset="1" stopColor="#000000" stopOpacity=".75" />
          </linearGradient>
          {/* bright rim, strongest where the light hits (top-left) */}
          <linearGradient id={u("rim")} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#ffffff" stopOpacity=".95" />
            <stop offset=".35" stopColor="#ffd0cd" stopOpacity=".35" />
            <stop offset=".7" stopColor="#ffffff" stopOpacity=".08" />
            <stop offset="1" stopColor="#ff6b63" stopOpacity=".6" />
          </linearGradient>
          <linearGradient id={u("sheen")} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#fff" stopOpacity="0" />
            <stop offset=".5" stopColor="#fff" stopOpacity=".45" />
            <stop offset="1" stopColor="#fff" stopOpacity="0" />
          </linearGradient>
          {/* rounded bevel lit from the top-left: only the highlight is kept, inside the shape */}
          <filter id={u("bevel")} x="-10%" y="-10%" width="120%" height="120%" colorInterpolationFilters="sRGB">
            <feGaussianBlur in="SourceAlpha" stdDeviation="9" result="blur" />
            <feSpecularLighting in="blur" surfaceScale="9" specularConstant="1.15" specularExponent="22" lightingColor="#ffffff" result="spec">
              <fePointLight x="200" y="80" z="320" />
            </feSpecularLighting>
            <feComposite in="spec" in2="SourceAlpha" operator="in" />
          </filter>
          {/* soft inner shadow along the lower-right edges, for thickness */}
          <filter id={u("inner")} x="-10%" y="-10%" width="120%" height="120%">
            <feOffset in="SourceAlpha" dx="-10" dy="-12" result="off" />
            <feGaussianBlur in="off" stdDeviation="10" result="b" />
            <feComposite in="SourceAlpha" in2="b" operator="out" result="edge" />
            <feFlood floodColor="#2a0003" floodOpacity=".55" />
            <feComposite in2="edge" operator="in" />
          </filter>
          <clipPath id={u("clip")}>
            <path d={DOT} />
            <path d={D} fillRule="evenodd" clipRule="evenodd" />
          </clipPath>
        </defs>

        {/* tinted glass */}
        <path d={DOT} fill={`url(#${u("ink")})`} />
        <path d={D} fillRule="evenodd" fill={`url(#${u("red")})`} />

        {/* depth */}
        <g filter={`url(#${u("inner")})`}>
          <path d={DOT} />
          <path d={D} fillRule="evenodd" />
        </g>

        {/* specular bevel */}
        <g filter={`url(#${u("bevel")})`} style={{ mixBlendMode: "screen" }} opacity=".75">
          <path d={DOT} fill="#fff" />
          <path d={D} fillRule="evenodd" fill="#fff" />
        </g>

        {/* edges */}
        <g fill="none" stroke={`url(#${u("rim")})`} strokeWidth="2.2" strokeLinejoin="round">
          <path d={DOT} />
          <path d={D} fillRule="evenodd" />
        </g>

        {/* travelling sheen */}
        {sheen ? (
          <g clipPath={`url(#${u("clip")})`} style={{ mixBlendMode: "screen" }}>
            <rect x="-120" y="100" width="140" height="560" fill={`url(#${u("sheen")})`} transform="skewX(-18)">
              <animateTransform attributeName="transform" type="translate" additive="sum" values="0 0; 760 0; 760 0" keyTimes="0; .45; 1" dur="7s" repeatCount="indefinite" />
            </rect>
          </g>
        ) : null}
      </svg>
    </div>
  )
}

/*
 * The logo as sharp, chamfered crystal glass with iridescent edges, rendered
 * from the exact logo outline in two layers on the same 1000 x 1138 canvas,
 * so the square (the i-dot) can move on its own.
 */
export const GLASS_LOGO_D = "/dreekk-crystal-d.webp"
export const GLASS_LOGO_DOT = "/dreekk-crystal-dot.webp"
const DOT_ORIGIN = "22% 12.4%" // centre of the square on the canvas

const LOGO_CSS = `
@keyframes dg-dot{
  0%,100%{transform:translate(0,0) rotate(0deg)}
  40%{transform:translate(4.5%,-5%) rotate(12deg)}
  55%{transform:translate(5.5%,-6.2%) rotate(16deg)}
  85%{transform:translate(.8%,-.9%) rotate(2deg)}
}
@keyframes dg-dot-shadow{0%,100%{opacity:.55;transform:scale(1)}34%{opacity:.25;transform:scale(.8)}}
@media (prefers-reduced-motion:reduce){.dg-anim{animation:none!important}}
`

export function GlassLogoImage({ className, animateDot = true }: { className?: string; animateDot?: boolean }) {
  const dot = animateDot ? "dg-anim" : ""
  return (
    <div className={cn("relative aspect-[1000/1138] select-none", className)} aria-hidden="true">
      <style>{LOGO_CSS}</style>
      <img
        src={GLASS_LOGO_D}
        alt=""
        width={1000}
        height={1138}
        draggable={false}
        className="absolute inset-0 h-full w-full"
        style={{ filter: "drop-shadow(0 40px 60px rgba(0,0,0,.65))" }}
      />
      <img
        src={GLASS_LOGO_DOT}
        alt=""
        width={1000}
        height={1138}
        draggable={false}
        className={cn("absolute inset-0 h-full w-full will-change-transform", dot)}
        style={{
          transformOrigin: DOT_ORIGIN,
          animation: animateDot ? "dg-dot 6s cubic-bezier(.45,0,.25,1) infinite" : undefined,
          filter: "drop-shadow(0 24px 30px rgba(0,0,0,.6))",
        }}
      />
    </div>
  )
}

/** Full-bleed hero background: black, a soft neutral spotlight, and the glass logo floating in it. */
export function GlassLogoBackground({ className }: { className?: string }) {
  return (
    <div className={cn("pointer-events-none absolute inset-0 overflow-hidden bg-[#070708]", className)} aria-hidden="true">
      <style>{`
        @keyframes dg-float{0%,100%{transform:translate(-50%,-50%) translate(-22px,18px) rotate(-1deg)}50%{transform:translate(-50%,-50%) translate(22px,-18px) rotate(1deg)}}
      `}</style>

      {/* neutral spotlight so the clear glass catches some light */}
      <div className="absolute left-1/2 top-1/2 h-[80vmin] w-[80vmin] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/[0.07] blur-[110px]" />

      {/* faint grid */}
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(to right,#fff 1px,transparent 1px),linear-gradient(to bottom,#fff 1px,transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage: "radial-gradient(ellipse at center,#000 30%,transparent 75%)",
          WebkitMaskImage: "radial-gradient(ellipse at center,#000 30%,transparent 75%)",
        }}
      />

      {/* the glass logo */}
      <div className="dg-anim absolute left-1/2 top-[54%] aspect-square w-[min(96vw,84vh,840px)]" style={{ animation: "dg-float 9s ease-in-out infinite", transform: "translate(-50%,-50%)" }}>
        {/* live 3D crystal; still images if the browser has no WebGL */}
        <CrystalLogo fallback={<GlassLogoImage className="mx-auto mt-[10%] w-[70%]" />} />
      </div>

      {/* keep the copy readable */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_45%_at_center,rgba(7,7,8,.5)_0%,rgba(7,7,8,.2)_60%,rgba(7,7,8,.88)_100%)]" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-[#070708]" />
    </div>
  )
}

export default GlassLogo
