interface SectionHeaderProps {
  subtitle: string;
  title: string;
  centered?: boolean;
}

export default function SectionHeader({
  subtitle,
  title,
  centered = true,
}: SectionHeaderProps) {
  return (
    <div className={centered ? "text-center" : ""}>
      <p className="text-primary font-semibold text-sm mb-2">{subtitle}</p>
      <h2 className="font-heading text-3xl md:text-4xl font-bold text-text-dark">
        {title}
      </h2>
    </div>
  );
}
