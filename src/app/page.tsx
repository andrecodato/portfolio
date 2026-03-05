import Projetos from "@/sections/Projetos";
import Sobre from "@/sections/Sobre";
import Terminal from "@/sections/Terminal";

export default function Home() {
  return (
    <div className="  w-full h-screen flex flex-col items-center justify-center">
      <main className=" w-full h-screen flex flex-col items-center justify-center">
        <Projetos />
        <Sobre />
        <Terminal />
      </main>
    </div>
  );
}
