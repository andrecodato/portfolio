import Projetos from "@/sections/Projetos";
import Sobre from "@/sections/Sobre";
import Terminal from "@/sections/Terminal";

export default function Home() {
  return (
    <div className="  w-full flex flex-col">
      <main className=" w-full flex flex-col">
        <Projetos />
        <Sobre />
        <Terminal />
      </main>
    </div>
  );
}
