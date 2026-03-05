export default function SectionTitle({ title }: { title: string }) {
  return (
    <div className="flex items-center gap-2 text-2xl font-bold mb-4">
      <div>|</div>
      <h2>{title}</h2>
      <div className="flex-1 border-t border-white"></div>
    </div>
  );
}
