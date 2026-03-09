import { SectionTitle } from "@/components";
import { sobreText } from "@/constants";


export default function Sobre() {
  return (
    <section id="sobre" className="">
      <SectionTitle title="Sobre mim" />
      <div className="grid grid-cols-3 gap-4">
        <div>
          <p>{sobreText.aboutText}</p>
        </div>
        <div>
          <h2>Creative</h2>
          <ul>
            {sobreText.creativeList.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
        <div>
          <h2>Other</h2>
          <ul>
            {sobreText.otherList.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
