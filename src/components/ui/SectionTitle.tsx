export default function SectionTitle({ title }: { title: string }) {
  return (
    <div className="flex items-center gap-2 text-2xl font-bold mb-4">
      <div>|</div>
      <h2>{title}/</h2>
      <div className=" w-full flex-1 border border-white"></div>
    </div>
  );
}
