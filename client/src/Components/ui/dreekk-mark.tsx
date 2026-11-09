import { cn } from "@/lib/utils"

/** Flat Dreekk "iD" mark, traced from the logo. The dot follows the text colour so it shows on dark backgrounds. */
export function DreekkMark({ className, title }: { className?: string; title?: string }) {
  return (
    <svg viewBox="162 145 416 450" className={cn("h-8 w-auto", className)} role={title ? "img" : undefined} aria-hidden={title ? undefined : true}>
      {title ? <title>{title}</title> : null}
      <path d="M162 145h87v87h-87z" fill="currentColor" />
      <path
        fillRule="evenodd"
        fill="#E5322B"
        d="M305 145H353A225 225 0 0 1 353 595H162V232H305Z M162 232H353A138 138 0 0 1 353 508H249V328H305V452H353A85 85 0 0 0 353 282H162Z"
      />
    </svg>
  )
}

export default DreekkMark
