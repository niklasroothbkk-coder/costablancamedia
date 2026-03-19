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
      <p className="font-semibold text-[20px] mb-2">
        {subtitle.startsWith("//") ? (
          <>
            <span className="text-primary">//</span>
            <span className="text-text-dark">{subtitle.slice(2)}</span>
          </>
        ) : (
          <span className="text-text-dark">{subtitle}</span>
        )}
      </p>
      <h2 className="font-heading text-3xl lg:text-4xl font-bold text-text-dark">
        {title}
      </h2>
    </div>
  );
}
