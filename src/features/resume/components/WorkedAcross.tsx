// Owner-supplied work locations; SVG flags also render on systems without flag emoji support.
export function WorkedAcross() {
  return <p className="cv-worked-across">
    <span>Worked across</span>
    <span><svg viewBox="0 0 30 20" width={18} height={12} aria-hidden="true">
      <path fill="#344b78" d="M0 0h30v20H0z" />
      <path stroke="#fff" strokeWidth={5} d="m0 0 30 20M30 0 0 20" />
      <path stroke="#bc5a66" strokeWidth={2} d="m0 0 30 20M30 0 0 20" />
      <path stroke="#fff" strokeWidth={8} d="M15 0v20M0 10h30" />
      <path stroke="#bc5a66" strokeWidth={4} d="M15 0v20M0 10h30" />
    </svg>UK</span>
    <span><svg viewBox="0 0 30 20" width={18} height={12} aria-hidden="true">
      <path fill="#4b8669" d="M0 0h30v7H0z" /><path fill="#fff" d="M0 7h30v6H0z" />
      <path fill="#38413c" d="M0 13h30v7H0z" /><path fill="#bc5a66" d="M0 0h8v20H0z" />
    </svg>UAE</span>
    <span><svg viewBox="0 0 30 20" width={18} height={12} aria-hidden="true">
      <path fill="#bc5a66" d="M0 0h30v5H0z" /><path fill="#405780" d="M0 5h30v5H0z" />
      <path fill="#d6bb60" d="M0 10h30v5H0z" /><path fill="#4b8669" d="M0 15h30v5H0z" />
    </svg>Mauritius</span>
  </p>;
}
