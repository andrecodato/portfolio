'use client';

import { useState, useCallback } from "react";

const C = {
  bg: "#0f1520",
  card: "#1a2035",
  input: "#121929",
  border: "#2d3f60",
  accent: "#5CFF90",
  text: "#ffffff",
  muted: "#a0aec0",
  danger: "#ff6b6b",
  surface: "#0d1422",
};

const S: Record<string, React.CSSProperties> = {
  label: { fontSize: 12, color: C.muted, display: "block", marginBottom: 5, fontFamily: "monospace" },
  inp: { width: "100%", boxSizing: "border-box", background: C.input, border: `1px solid ${C.border}`, borderRadius: 7, color: C.text, padding: "8px 11px", fontSize: 13, outline: "none", fontFamily: "inherit" },
  textarea: { width: "100%", boxSizing: "border-box", background: C.input, border: `1px solid ${C.border}`, borderRadius: 7, color: C.text, padding: "8px 11px", fontSize: 13, outline: "none", fontFamily: "inherit", resize: "vertical" },
  btn: { background: C.accent, color: C.bg, border: "none", borderRadius: 7, padding: "8px 16px", fontWeight: 700, fontSize: 13, cursor: "pointer" },
  btnSm: { background: "transparent", color: C.muted, border: `1px solid ${C.border}`, borderRadius: 6, padding: "5px 11px", fontSize: 12, cursor: "pointer" },
  btnDanger: { background: "transparent", color: C.danger, border: `1px solid ${C.danger}40`, borderRadius: 6, padding: "5px 11px", fontSize: 12, cursor: "pointer" },
  sectionCard: { background: C.surface, border: `1px solid ${C.border}`, borderRadius: 8, padding: "14px 16px", marginBottom: 10 },
};

interface Section {
  id: string;
  heading: string;
  content: string;
  hasCode: boolean;
  codeLang: string;
  code: string;
}

function slugify(text: string) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s_]/g, "")
    .trim()
    .replace(/\s+/g, "_");
}

function genId() { return Math.random().toString(36).slice(2, 8); }

function buildMdx(
  title: string,
  description: string,
  date: string,
  tags: string,
  sections: Section[],
) {
  const tagList = tags
    .split(",")
    .map(t => t.trim())
    .filter(Boolean)
    .map(t => `"${t}"`)
    .join(", ");

  const frontmatter = `---\ntitle: "${title}"\ndescription: "${description}"\ndate: "${date}"\ntags: [${tagList}]\n---`;

  const body = sections.map(s => {
    let block = "";
    if (s.heading) block += `\n## ${s.heading}\n`;
    if (s.content) block += `\n${s.content}\n`;
    if (s.hasCode && s.code) block += `\n\`\`\`${s.codeLang || "txt"}\n${s.code}\n\`\`\`\n`;
    return block;
  }).join("\n");

  return `${frontmatter}\n${body}\n---\n\nAté o próximo post! 🚀\n`;
}

export default function BlogPostGenerator() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [tags, setTags] = useState("");
  const [sections, setSections] = useState<Section[]>([
    { id: genId(), heading: "", content: "", hasCode: false, codeLang: "typescript", code: "" },
  ]);
  const [filename, setFilename] = useState("");
  const [copied, setCopied] = useState(false);

  const preview = buildMdx(title, description, date, tags, sections);

  const slugTitle = slugify(title);
  const computedFilename = filename || (slugTitle ? `${slugTitle}.mdx` : "post.mdx");

  const updateSection = useCallback((id: string, field: keyof Section, value: string | boolean) => {
    setSections(prev => prev.map(s => s.id === id ? { ...s, [field]: value } : s));
  }, []);

  const addSection = () => setSections(prev => [...prev, { id: genId(), heading: "", content: "", hasCode: false, codeLang: "typescript", code: "" }]);

  const removeSection = (id: string) => setSections(prev => prev.filter(s => s.id !== id));

  const moveSection = (id: string, dir: -1 | 1) => {
    setSections(prev => {
      const idx = prev.findIndex(s => s.id === id);
      const next = idx + dir;
      if (next < 0 || next >= prev.length) return prev;
      const arr = [...prev];
      [arr[idx], arr[next]] = [arr[next], arr[idx]];
      return arr;
    });
  };

  function handleDownload() {
    const blob = new Blob([preview], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = computedFilename;
    a.click();
    URL.revokeObjectURL(url);
  }

  function handleCopy() {
    navigator.clipboard.writeText(preview).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    });
  }

  return (
    <div style={{ background: C.bg, borderRadius: 12, overflow: "hidden" }}>
      {/* Header */}
      <div style={{ background: C.card, borderBottom: `1px solid ${C.border}`, padding: "10px 18px", display: "flex", alignItems: "center", gap: 10 }}>
        <span style={{ fontFamily: "monospace", fontWeight: 700, fontSize: 15, color: C.text }}>
          blog<span style={{ color: C.accent }}>.generator</span>
        </span>
        <span style={{ fontSize: 12, color: C.muted }}>// .mdx</span>
      </div>

      <div className="flex flex-col lg:flex-row" style={{ minHeight: 560 }}>
        {/* ── Editor ── */}
        <div className="lg:w-1/2 border-b lg:border-b-0 lg:border-r" style={{ borderColor: C.border, overflowY: "auto", padding: "18px 20px", display: "flex", flexDirection: "column", gap: 14 }}>

          {/* Frontmatter */}
          <div>
            <div style={{ fontSize: 10, color: C.accent, fontFamily: "monospace", letterSpacing: 1, marginBottom: 10, textTransform: "uppercase" }}>Frontmatter</div>

            <div style={{ marginBottom: 10 }}>
              <label style={S.label}>title</label>
              <input style={S.inp} value={title} onChange={e => setTitle(e.target.value)} placeholder='ex: "Olá, mundo! #000"' />
            </div>

            <div style={{ marginBottom: 10 }}>
              <label style={S.label}>description</label>
              <input style={S.inp} value={description} onChange={e => setDescription(e.target.value)} placeholder="Breve descrição do post..." />
            </div>

            <div style={{ display: "flex", gap: 10, marginBottom: 10 }}>
              <div style={{ flex: 1 }}>
                <label style={S.label}>date</label>
                <input style={S.inp} type="date" value={date} onChange={e => setDate(e.target.value)} />
              </div>
              <div style={{ flex: 2 }}>
                <label style={S.label}>tags (separadas por vírgula)</label>
                <input style={S.inp} value={tags} onChange={e => setTags(e.target.value)} placeholder='next.js, mdx, blog' />
              </div>
            </div>

            <div>
              <label style={S.label}>nome do arquivo .mdx (opcional — auto a partir do título)</label>
              <input
                style={S.inp}
                value={filename}
                onChange={e => setFilename(e.target.value)}
                placeholder={computedFilename}
              />
            </div>
          </div>

          {/* Sections */}
          <div>
            <div style={{ fontSize: 10, color: C.accent, fontFamily: "monospace", letterSpacing: 1, marginBottom: 10, textTransform: "uppercase" }}>
              Seções do conteúdo
            </div>

            {sections.map((s, idx) => (
              <div key={s.id} style={S.sectionCard}>
                {/* Section controls */}
                <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 10 }}>
                  <span style={{ fontSize: 11, color: C.muted, fontFamily: "monospace", flex: 1 }}>
                    ## seção {idx + 1}
                  </span>
                  <button onClick={() => moveSection(s.id, -1)} style={S.btnSm} disabled={idx === 0} title="Mover para cima">↑</button>
                  <button onClick={() => moveSection(s.id, 1)} style={S.btnSm} disabled={idx === sections.length - 1} title="Mover para baixo">↓</button>
                  <button onClick={() => removeSection(s.id)} style={S.btnDanger} disabled={sections.length === 1}>✕</button>
                </div>

                <div style={{ marginBottom: 8 }}>
                  <label style={S.label}>## heading (deixe vazio para omitir)</label>
                  <input style={S.inp} value={s.heading} onChange={e => updateSection(s.id, "heading", e.target.value)} placeholder="Título da seção" />
                </div>

                <div style={{ marginBottom: 8 }}>
                  <label style={S.label}>conteúdo (markdown)</label>
                  <textarea style={{ ...S.textarea, minHeight: 80 }} value={s.content} onChange={e => updateSection(s.id, "content", e.target.value)} placeholder={"Escreva aqui... supports **bold**, *italic*, listas, > blockquotes etc."} />
                </div>

                {/* Code block toggle */}
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: s.hasCode ? 8 : 0 }}>
                  <button
                    onClick={() => updateSection(s.id, "hasCode", !s.hasCode)}
                    style={{ ...S.btnSm, color: s.hasCode ? C.accent : C.muted, borderColor: s.hasCode ? C.accent : C.border }}
                  >
                    {s.hasCode ? "✓ bloco de código" : "+ bloco de código"}
                  </button>
                  {s.hasCode && (
                    <input
                      style={{ ...S.inp, width: 100, padding: "5px 8px" }}
                      value={s.codeLang}
                      onChange={e => updateSection(s.id, "codeLang", e.target.value)}
                      placeholder="lang"
                    />
                  )}
                </div>

                {s.hasCode && (
                  <textarea
                    style={{ ...S.textarea, minHeight: 90, fontFamily: "monospace", fontSize: 12 }}
                    value={s.code}
                    onChange={e => updateSection(s.id, "code", e.target.value)}
                    placeholder="// cole seu código aqui"
                  />
                )}
              </div>
            ))}

            <button onClick={addSection} style={S.btnSm}>
              + adicionar seção
            </button>
          </div>
        </div>

        {/* ── Preview ── */}
        <div className="lg:w-1/2 flex flex-col overflow-hidden" style={{ minHeight: 320 }}>
          <div style={{ padding: "10px 16px", borderBottom: `1px solid ${C.border}`, display: "flex", alignItems: "center", gap: 8, background: C.card }}>
            <span style={{ fontSize: 11, color: C.muted, fontFamily: "monospace", flex: 1 }}>{computedFilename}</span>
            <button onClick={handleCopy} style={S.btnSm}>{copied ? "✓ copiado" : "copiar"}</button>
            <button onClick={handleDownload} style={S.btn}>↓ baixar .mdx</button>
          </div>
          <pre style={{
            flex: 1,
            margin: 0,
            padding: "16px 18px",
            overflowY: "auto",
            fontFamily: "monospace",
            fontSize: 12,
            lineHeight: 1.65,
            color: "#c9d1d9",
            background: C.surface,
            whiteSpace: "pre-wrap",
            wordBreak: "break-word",
          }}>
            {preview}
          </pre>
        </div>
      </div>
    </div>
  );
}
