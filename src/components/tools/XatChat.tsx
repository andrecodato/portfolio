'use client';

import { useState, useEffect, useRef, useCallback } from "react";

const C = {
  bg: "#0f1520",
  card: "#1a2035",
  input: "#121929",
  border: "#2d3f60",
  accent: "#5CFF90",
  accentDim: "#3dcc70",
  text: "#ffffff",
  muted: "#a0aec0",
  dim: "#2a3a55",
  msgMe: "#1e3a5f",
  msgOther: "#1e2a40",
};

const EMOJIS = ["😀","😂","😍","😎","🤔","😢","😡","👍","👎","❤️","🔥","💯","🎉","👋","😴","🤣","😊","🥺","😤","🤩","💀","👀","🫡","🥳","😏"];
const COLORS = ["#5CFF90","#60cfff","#ff6b6b","#ffd166","#c084fc","#fb923c","#ffffff","#a0aec0"];

interface User {
  id: string;
  name: string;
  color: string;
}

interface Message {
  id: string;
  uid: string;
  text: string;
  system?: boolean;
  ts: number;
  name?: string;
  nameColor?: string;
  color?: string;
  bold?: boolean;
  italic?: boolean;
}

function genId() { return Math.random().toString(36).slice(2, 9); }

function playBeep() {
  try {
    const AudioCtx = (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext);
    const ctx = new AudioCtx();
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.connect(g); g.connect(ctx.destination);
    o.frequency.value = 880;
    g.gain.setValueAtTime(0.15, ctx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.18);
    o.start(ctx.currentTime); o.stop(ctx.currentTime + 0.18);
  } catch {}
}

const FAKE_USERS: User[] = [
  { id: "u2", name: "xXGamerXx", color: "#ff6b6b" },
  { id: "u3", name: "darkrose99", color: "#c084fc" },
  { id: "u4", name: "br4zuca", color: "#60cfff" },
];
const FAKE_MSGS = [
  { uid: "u2", text: "oi gente!!", delay: 2000 },
  { uid: "u3", text: "salve!! 😎", delay: 5000 },
  { uid: "u4", text: "boa noite galera", delay: 9000 },
  { uid: "u2", text: "quem tá online?", delay: 13000 },
  { uid: "u3", text: "eu tô 👋", delay: 15000 },
];

const S: Record<string, React.CSSProperties> = {
  root: { background: C.bg, borderRadius: 12, padding: "2rem", minHeight: 420, display: "flex", alignItems: "center", justifyContent: "center" },
  loginCard: { background: C.card, border: `1px solid ${C.border}`, borderRadius: 12, padding: "2rem", width: "100%", maxWidth: 340 },
  label: { fontSize: 13, color: C.muted, display: "block", marginBottom: 6 },
  inp: { width: "100%", boxSizing: "border-box", background: C.input, border: `1px solid ${C.border}`, borderRadius: 8, color: C.text, padding: "9px 12px", fontSize: 13, outline: "none" },
  btn: { background: C.accent, color: C.bg, border: "none", borderRadius: 8, padding: "10px 16px", fontWeight: 600, fontSize: 14, cursor: "pointer", width: "100%" },
  btnSm: { background: "transparent", color: C.muted, border: `1px solid ${C.border}`, borderRadius: 6, padding: "4px 10px", fontSize: 12, cursor: "pointer" },
  btnActive: { background: C.accent, color: C.bg, border: `1px solid ${C.accent}`, borderRadius: 6, padding: "4px 10px", fontSize: 12, cursor: "pointer", fontWeight: 600 },
};

export default function XatChat() {
  const [joined, setJoined] = useState(false);
  const [nickname, setNickname] = useState("");
  const [userColor, setUserColor] = useState("#5CFF90");
  const [messages, setMessages] = useState<Message[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [input, setInput] = useState("");
  const [bold, setBold] = useState(false);
  const [italic, setItalic] = useState(false);
  const [msgColor, setMsgColor] = useState("#ffffff");
  const [showEmoji, setShowEmoji] = useState(false);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [muted, setMuted] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const myId = useRef(genId());

  const addMsg = useCallback((msg: Message) => {
    setMessages(prev => [...prev, msg]);
    if (!muted && msg.uid !== myId.current) playBeep();
  }, [muted]);

  useEffect(() => {
    if (!joined) return;
    const me: User = { id: myId.current, name: nickname, color: userColor };
    setUsers([me, ...FAKE_USERS]);
    addMsg({ id: genId(), uid: "system", text: `${nickname} entrou no chat`, system: true, ts: Date.now() });
    const timers = FAKE_MSGS.map(({ uid, text, delay }) =>
      setTimeout(() => {
        const user = FAKE_USERS.find(u => u.id === uid)!;
        addMsg({ id: genId(), uid, name: user.name, nameColor: user.color, text, color: "#e2e8f0", bold: false, italic: false, ts: Date.now() });
      }, delay)
    );
    return () => timers.forEach(clearTimeout);
  }, [joined]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  function handleJoin() {
    if (nickname.trim().length < 2) return;
    setJoined(true);
  }

  function sendMsg() {
    const txt = input.trim();
    if (!txt) return;
    addMsg({ id: genId(), uid: myId.current, name: nickname, nameColor: userColor, text: txt, color: msgColor, bold, italic, ts: Date.now() });
    setInput(""); setShowEmoji(false);
  }

  function handleKey(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMsg(); }
  }

  if (!joined) return (
    <div style={S.root}>
      <div style={S.loginCard}>
        <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
          <div style={{ fontSize: 28, marginBottom: 8 }}>💬</div>
          <h2 style={{ margin: 0, fontSize: 18, fontWeight: 600, color: C.text, fontFamily: "monospace" }}>
            xat<span style={{ color: C.accent }}>.chat</span>
          </h2>
          <p style={{ margin: "4px 0 0", fontSize: 12, color: C.muted }}>Sala: #geral</p>
        </div>
        <div style={{ marginBottom: 16 }}>
          <label style={S.label}>Apelido</label>
          <input value={nickname} onChange={e => setNickname(e.target.value)} onKeyDown={e => e.key === "Enter" && handleJoin()} placeholder="ex: xXGamerXx" maxLength={20} style={S.inp} autoFocus />
        </div>
        <div style={{ marginBottom: 20 }}>
          <label style={S.label}>Cor do nome</label>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {COLORS.map(c => (
              <div key={c} onClick={() => setUserColor(c)} style={{
                width: 24, height: 24, borderRadius: "50%", background: c, cursor: "pointer",
                border: userColor === c ? `2px solid ${C.accent}` : `1px solid ${C.border}`,
                boxShadow: userColor === c ? `0 0 6px ${c}88` : "none", flexShrink: 0
              }} />
            ))}
          </div>
        </div>
        <button onClick={handleJoin} style={S.btn}>Entrar no chat</button>
      </div>
    </div>
  );

  return (
    <div style={{ background: C.bg, borderRadius: 12, padding: "0", overflow: "hidden" }}>
      {/* Header */}
      <div style={{ background: C.card, borderBottom: `1px solid ${C.border}`, padding: "10px 16px", display: "flex", alignItems: "center", gap: 10 }}>
        <span style={{ fontFamily: "monospace", fontWeight: 700, fontSize: 15, color: C.text }}>xat<span style={{ color: C.accent }}>.chat</span></span>
        <span style={{ fontSize: 12, color: C.muted }}>// #geral</span>
        <span style={{ marginLeft: "auto", fontSize: 11, color: C.accent }}>● {users.length} online</span>
      </div>

      <div className="flex h-95 sm:h-110">
        {/* Sidebar — esconde em telas pequenas */}
        <div className="hidden sm:flex flex-col" style={{ width: 148, borderRight: `1px solid ${C.border}`, background: C.card }}>
          <div style={{ padding: "10px 12px 6px", fontSize: 10, color: C.muted, textTransform: "uppercase", letterSpacing: 1, fontWeight: 600 }}>Usuários</div>
          <div style={{ flex: 1, overflowY: "auto", padding: "0 0 8px" }}>
            {users.map(u => (
              <div key={u.id} style={{ padding: "5px 12px", display: "flex", alignItems: "center", gap: 7 }}>
                <div style={{ width: 7, height: 7, borderRadius: "50%", background: C.accent, flexShrink: 0, boxShadow: `0 0 4px ${C.accent}` }} />
                <span style={{ fontSize: 12, color: u.color, fontWeight: u.id === myId.current ? 600 : 400, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  {u.name}{u.id === myId.current ? " ★" : ""}
                </span>
              </div>
            ))}
          </div>
          <div style={{ padding: "8px 10px", borderTop: `1px solid ${C.border}` }}>
            <button onClick={() => setMuted(m => !m)} style={{ ...S.btnSm, width: "100%", color: muted ? "#ffd166" : C.muted }}>
              {muted ? "🔇 mudo" : "🔔 som"}
            </button>
          </div>
        </div>

        {/* Chat */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0, background: C.bg }}>
          {/* Messages */}
          <div style={{ flex: 1, overflowY: "auto", padding: "12px 14px", display: "flex", flexDirection: "column", gap: 5 }}>
            {messages.map(msg => {
              if (msg.system) return (
                <div key={msg.id} style={{ textAlign: "center", fontSize: 11, color: C.accent, opacity: 0.7, padding: "2px 0" }}>
                  // {msg.text}
                </div>
              );
              const isMe = msg.uid === myId.current;
              return (
                <div key={msg.id} style={{ display: "flex", flexDirection: isMe ? "row-reverse" : "row", gap: 6, alignItems: "flex-end" }}>
                  <div style={{
                    maxWidth: "74%",
                    background: isMe ? C.msgMe : C.msgOther,
                    border: `1px solid ${isMe ? "#2a4a7a" : C.border}`,
                    borderRadius: isMe ? "12px 12px 2px 12px" : "12px 12px 12px 2px",
                    padding: "7px 11px",
                    wordBreak: "break-word"
                  }}>
                    {!isMe && (
                      <div style={{ fontSize: 11, fontWeight: 600, color: msg.nameColor, marginBottom: 2, fontFamily: "monospace" }}>
                        {msg.name}
                      </div>
                    )}
                    <span style={{
                      fontSize: 13, color: msg.color || C.text,
                      fontWeight: msg.bold ? 600 : 400,
                      fontStyle: msg.italic ? "italic" : "normal",
                      lineHeight: 1.45, display: "block"
                    }}>
                      {msg.text}
                    </span>
                  </div>
                </div>
              );
            })}
            <div ref={bottomRef} />
          </div>

          {/* Emoji picker */}
          {showEmoji && (
            <div style={{ padding: "8px 12px", borderTop: `1px solid ${C.border}`, display: "flex", flexWrap: "wrap", gap: 5, background: C.card }}>
              {EMOJIS.map(e => (
                <span key={e} onClick={() => setInput(i => i + e)} style={{ fontSize: 18, cursor: "pointer", lineHeight: 1 }}>{e}</span>
              ))}
            </div>
          )}

          {/* Color picker */}
          {showColorPicker && (
            <div style={{ padding: "8px 12px", borderTop: `1px solid ${C.border}`, display: "flex", gap: 6, alignItems: "center", background: C.card, flexWrap: "wrap" }}>
              <span style={{ fontSize: 11, color: C.muted, marginRight: 4 }}>cor do texto:</span>
              {COLORS.map(c => (
                <div key={c} onClick={() => { setMsgColor(c); setShowColorPicker(false); }} style={{
                  width: 20, height: 20, borderRadius: 4, background: c, cursor: "pointer",
                  border: msgColor === c ? `2px solid ${C.accent}` : `1px solid ${C.border}`,
                  boxShadow: msgColor === c ? `0 0 5px ${c}88` : "none"
                }} />
              ))}
            </div>
          )}

          {/* Toolbar + input */}
          <div style={{ borderTop: `1px solid ${C.border}`, padding: "8px 12px", background: C.card, display: "flex", flexDirection: "column", gap: 8 }}>
            <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
              <button onClick={() => setBold(b => !b)} style={bold ? S.btnActive : S.btnSm}>B</button>
              <button onClick={() => setItalic(it => !it)} style={{ ...(italic ? S.btnActive : S.btnSm), fontStyle: "italic" }}>I</button>
              <button onClick={() => { setShowColorPicker(p => !p); setShowEmoji(false); }} style={S.btnSm}>
                <span style={{ display: "inline-block", width: 11, height: 11, borderRadius: 2, background: msgColor, border: `1px solid ${C.border}`, verticalAlign: "middle" }} />
                <span style={{ marginLeft: 4 }}>cor</span>
              </button>
              <button onClick={() => { setShowEmoji(p => !p); setShowColorPicker(false); }} style={showEmoji ? S.btnActive : S.btnSm}>
                emoji
              </button>
              <span style={{ flex: 1 }} />
              <span style={{ fontSize: 10, color: C.border, fontFamily: "monospace" }}>ws://simulado</span>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <input
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKey}
                placeholder="Digite uma mensagem..."
                style={{ ...S.inp, flex: 1 }}
                maxLength={300}
              />
              <button onClick={sendMsg} style={{ ...S.btn, width: "auto", padding: "0 18px" }}>Enviar</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
