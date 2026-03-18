import Link from "next/link";

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  type?: "button" | "submit";
  variant?: "primary" | "outline" | "white";
  className?: string;
  onClick?: () => void;
}

export default function Button({
  children,
  href,
  type = "button",
  variant = "primary",
  className = "",
  onClick,
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center px-6 py-3 rounded font-semibold text-sm transition-all duration-300 cursor-pointer";
  const variants = {
    primary: "bg-primary text-white hover:bg-primary-dark",
    outline: "border-2 border-primary text-primary hover:bg-primary hover:text-white",
    white: "bg-white text-text-dark hover:bg-light-gray",
  };

  const classes = `${base} ${variants[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={classes} onClick={onClick}>
      {children}
    </button>
  );
}
