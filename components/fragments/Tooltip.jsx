export default function Tooltip({ children, className, text }) {
  return (
    <div className={`has-tooltip ${className} `}>
      {children}
      <span className="tooltip"> {text} </span>
    </div>
  );
}
