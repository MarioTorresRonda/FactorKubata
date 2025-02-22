export default function SVG({ char, height, ...props }) {
  return (
    <svg {...props} height={height} width={height / 2} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient
          id="gradient1"
          x1="100%"
          x2="0"
          y1="0"
          y2="100%"
        >
          <stop offset="0%" />
          <stop offset="100%" />
        </linearGradient>
        <linearGradient
          id="gradient2"
          x1="0"
          x2="100%"
          y1="0"
          y2="100%"
        >
          <stop offset="0%" />
          <stop offset="100%" />
        </linearGradient>
      </defs>
      <text
        x="50%"
        y="50%"
        fontSize={height}
        dominantBaseline="middle"
        textAnchor="middle"
        fill="url(#gradient1)"
      >
        {char}
      </text>
      <text
        x="50%"
        y="50%"
        fontSize={height}
        dominantBaseline="middle"
        textAnchor="middle"
        fill="url(#gradient2)"
        className="opacity-animation"
      >
        {char}
      </text>
    </svg>
  );
}
