export default function Button({ children, onClick, variant = "solid" }) {
  const base = "px-8 py-4 rounded-full font-semibold transition";

  const styles =
    variant === "outline"
      ? "border border-orange-400 text-orange-400 hover:bg-orange-400 hover:text-black"
      : "bg-orange-500 text-black hover:bg-orange-600";

  return (
    <button onClick={onClick} className={`${base} ${styles}`}>
      {children}
    </button>
  );
}
