import Image from "next/image";

export default function NavBar() {
  const title = "André Codato";
  const subtitle = "builder ·  developer · experimental creator";
  const phrase = "Projects, experiments and controlled chaos.";

  return (
    <nav className="w-full h-16 flex flex-col justify-between my-5 px-4">
      <div className="flex items-center border-b border-codato-mint/20 pb-4">
        <a href="/">
          <Image src="/logo.png" alt="Logo" width={80} height={80} />
        </a>
        <div className="flex flex-col text-codato-mint">
          <h1 className="text-3xl font-bold">{title}</h1>
          <p className="text-lg text-codato-mint">{subtitle}</p>
        </div>
      </div>
        <p className="text-xl text-text-primary mt-10">{phrase}</p>
    </nav>
  );
}
