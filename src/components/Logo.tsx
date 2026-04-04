interface LogoProps {
  size?: "sm" | "md" | "lg" | "xl";
  variant?: "full" | "icon-only" | "wordmark";
  /** "dark" for navy/dark backgrounds (gold+white logo), "light" for white/light backgrounds (navy+gold logo) */
  on?: "dark" | "light";
  className?: string;
}

const sizes = {
  sm: { icon: 28, fontSize: 14, gap: 6 },
  md: { icon: 36, fontSize: 18, gap: 8 },
  lg: { icon: 48, fontSize: 24, gap: 10 },
  xl: { icon: 64, fontSize: 32, gap: 14 },
} as const;

const colors = {
  dark: {
    hexFill: "#d4a843",
    hexStroke: "#e8c96e",
    innerIcon: "#ffffff",
    wordmark: "#ffffff",
    accent: "#d4a843",
  },
  light: {
    hexFill: "#0c1b33",
    hexStroke: "#162d50",
    innerIcon: "#d4a843",
    wordmark: "#0c1b33",
    accent: "#d4a843",
  },
} as const;

/**
 * The Cognition Shield — Cognitron's hexagonal crest logo.
 *
 * Contains three abstracted track icons inside a hexagonal shield:
 * code brackets (top-left), neural node (top-right), chess knight (bottom-centre).
 */
function ShieldIcon({
  size,
  palette,
}: {
  size: number;
  palette: (typeof colors)[keyof typeof colors];
}) {
  const viewBox = "0 0 64 64";

  return (
    <svg
      width={size}
      height={size}
      viewBox={viewBox}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Hexagonal shield shape */}
      <path
        d="M32 3L57.7 17.5V46.5L32 61L6.3 46.5V17.5L32 3Z"
        fill={palette.hexFill}
        stroke={palette.hexStroke}
        strokeWidth="1.5"
      />

      {/* Inner border ring */}
      <path
        d="M32 8L52.8 20.2V43.8L32 56L11.2 43.8V20.2L32 8Z"
        fill="none"
        stroke={palette.innerIcon}
        strokeWidth="0.75"
        opacity="0.3"
      />

      {/* Code brackets — top-left area */}
      <g opacity="0.95">
        {/* Left bracket < */}
        <path
          d="M18 22L14 27L18 32"
          stroke={palette.innerIcon}
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Right bracket > */}
        <path
          d="M27 22L31 27L27 32"
          stroke={palette.innerIcon}
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Slash */}
        <path
          d="M24 21L21 33"
          stroke={palette.innerIcon}
          strokeWidth="1.5"
          strokeLinecap="round"
          opacity="0.6"
        />
      </g>

      {/* Neural network nodes — top-right area */}
      <g opacity="0.95">
        <circle cx="40" cy="22" r="2.5" fill={palette.innerIcon} />
        <circle cx="50" cy="22" r="2" fill={palette.innerIcon} opacity="0.7" />
        <circle cx="45" cy="29" r="2.2" fill={palette.innerIcon} opacity="0.85" />
        {/* Connections */}
        <line x1="42" y1="23" x2="43.5" y2="27.5" stroke={palette.innerIcon} strokeWidth="1" opacity="0.5" />
        <line x1="48.5" y1="23" x2="46.5" y2="27.5" stroke={palette.innerIcon} strokeWidth="1" opacity="0.5" />
        <line x1="42.5" y1="22" x2="48" y2="22" stroke={palette.innerIcon} strokeWidth="1" opacity="0.4" />
      </g>

      {/* Chess knight — bottom-centre */}
      <g opacity="0.95" transform="translate(26, 35)">
        {/* Simplified knight silhouette */}
        <path
          d="M6 18H2V16L4 14L2 10V8L4 6L3 3C3 3 4 0 7 0C10 0 11.5 2 11.5 4L10 7L12 10L10 14L12 16V18H8"
          fill={palette.innerIcon}
          stroke={palette.hexFill}
          strokeWidth="0.5"
        />
        {/* Knight eye */}
        <circle cx="6.5" cy="4" r="1" fill={palette.hexFill} />
      </g>
    </svg>
  );
}

function Wordmark({
  fontSize,
  palette,
}: {
  fontSize: number;
  palette: (typeof colors)[keyof typeof colors];
}) {
  // Playfair Display character approximations for SVG
  // We use actual text rendering so the font loads from the page
  const height = fontSize * 1.2;
  const width = fontSize * 6.8;

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Cognitron"
    >
      {/* Gold "C" */}
      <text
        x="0"
        y={fontSize}
        fontFamily="var(--font-heading), 'Playfair Display', Georgia, serif"
        fontSize={fontSize}
        fontWeight="700"
        letterSpacing={fontSize * 0.12}
        fill={palette.accent}
      >
        C
      </text>
      {/* Rest of wordmark */}
      <text
        x={fontSize * 0.78}
        y={fontSize}
        fontFamily="var(--font-heading), 'Playfair Display', Georgia, serif"
        fontSize={fontSize}
        fontWeight="700"
        letterSpacing={fontSize * 0.12}
        fill={palette.wordmark}
      >
        ognitron
      </text>
    </svg>
  );
}

export function Logo({
  size = "md",
  variant = "full",
  on = "dark",
  className,
}: LogoProps) {
  const dims = sizes[size];
  const palette = colors[on];

  if (variant === "icon-only") {
    return (
      <span className={className} role="img" aria-label="Cognitron">
        <ShieldIcon size={dims.icon} palette={palette} />
      </span>
    );
  }

  if (variant === "wordmark") {
    return (
      <span className={className} role="img" aria-label="Cognitron">
        <Wordmark fontSize={dims.fontSize} palette={palette} />
      </span>
    );
  }

  // Full variant: icon + wordmark
  return (
    <span
      className={className}
      role="img"
      aria-label="Cognitron"
      style={{ display: "inline-flex", alignItems: "center", gap: dims.gap }}
    >
      <ShieldIcon size={dims.icon} palette={palette} />
      <Wordmark fontSize={dims.fontSize} palette={palette} />
    </span>
  );
}
