import { SectionTitle } from "@/components";

export default function Sobre() {
  const aboutText =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
  const creativeList = [
    "CMS",
    "Game Servers",
    "Landing pages",
    "Bot development",
  ];
  const otherList = [
    "Garçom e cozinheiro por 4 anos",
    "Guitarrista na Banda RABISCO",
    "Other 3",
    "Other 4",
  ];

  return (
    <section id="sobre" className="">
      <SectionTitle title="Sobre mim" />
      <div className="grid grid-cols-3 gap-4">
        <div>
          <p>{aboutText}</p>
        </div>
        <div>
          <h2>Creative</h2>
          <ul>
            {creativeList.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
        <div>
          <h2>Other</h2>
          <ul>
            {otherList.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
