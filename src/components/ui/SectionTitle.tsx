export default function SectionTitle({ title }: { title: string }) {
  return (
    <div className="flex items-center gap-4 mb-10">
      <span className="text-codato-neon font-mono text-sm">//</span>
      <h2 className="text-2xl font-bold text-text-primary tracking-tight">{title}</h2>
      <div className="flex-1 h-[1px] bg-gradient-to-r from-card to-transparent" />
    </div>
  );
}
