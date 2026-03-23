"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import QRCode from "qrcode";

type ErrorLevel = "L" | "M" | "Q" | "H";
type ColorScheme = "neon" | "mono";

const SIZE_PRESETS = [128, 256, 512, 1024, 2048];
const DISPLAY_SIZE = 280;

interface QROptions {
  text: string;
  size: number;
  fgColor: string;
  bgColor: string;
  errorLevel: ErrorLevel;
  margin: number;
}

const SCHEMES: Record<ColorScheme, { fg: string; bg: string; label: string }> = {
  neon: { fg: "#5CFF9D", bg: "#0A0F14", label: "🐱‍👤🤖 Neon" },
  mono: { fg: "#000000", bg: "#ffffff", label: "⚫⚪ Preto e Branco" },
};

export default function QRCodeGenerator() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [scheme, setScheme] = useState<ColorScheme>("neon");
  const [options, setOptions] = useState<QROptions>({
    text: "https://codato.dev",
    size: 512,
    fgColor: SCHEMES.neon.fg,
    bgColor: SCHEMES.neon.bg,
    errorLevel: "M",
    margin: 2,
  });
  const [error, setError] = useState("");

  const generate = useCallback(async () => {
    if (!canvasRef.current || !options.text.trim()) return;
    try {
      setError("");
      await QRCode.toCanvas(canvasRef.current, options.text, {
        width: options.size,
        margin: options.margin,
        errorCorrectionLevel: options.errorLevel,
        color: { dark: options.fgColor, light: options.bgColor },
      });
      // Revert CSS size to fixed display size (lib overrides style after render)
      canvasRef.current.style.width = `${DISPLAY_SIZE}px`;
      canvasRef.current.style.height = `${DISPLAY_SIZE}px`;
    } catch {
      setError("Não foi possível gerar o QR Code. Verifique o texto.");
    }
  }, [options]);

  useEffect(() => {
    generate();
  }, [generate]);

  const applyScheme = (s: ColorScheme) => {
    setScheme(s);
    setOptions((o) => ({ ...o, fgColor: SCHEMES[s].fg, bgColor: SCHEMES[s].bg }));
  };

  const download = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement("a");
    link.download = "qrcode.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  return (
    <div>
      <div
        className="rounded-2xl p-8 w-full max-w-3xl"
        style={{ backgroundColor: "#111827", border: "1px solid #1F2937" }}
      >
        {/* Header */}
        <h1 className="text-3xl font-bold mb-1" style={{ color: "#E5E7EB" }}>
          Gerador de{" "}
          <span style={{ color: "#5CFF9D" }}>QR Code</span>
        </h1>
        <p className="mb-8 text-sm" style={{ color: "#9CA3AF" }}>
          Cole uma URL ou texto e personalize seu QR Code.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {/* Controls */}
          <div className="space-y-5">
            {/* Text input */}
            <div>
              <label className="block text-sm font-medium mb-1" style={{ color: "#9CA3AF" }}>
                URL ou texto
              </label>
              <textarea
                className="w-full rounded-lg px-3 py-2 text-sm resize-none focus:outline-none"
                style={{
                  backgroundColor: "#1F2937",
                  border: "1px solid #374151",
                  color: "#E5E7EB",
                }}
                rows={3}
                value={options.text}
                onChange={(e) => setOptions((o) => ({ ...o, text: e.target.value }))}
                placeholder="https://exemplo.com"
              />
            </div>

            {/* Color scheme toggle */}
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: "#9CA3AF" }}>
                Esquema de cores
              </label>
              <div className="flex gap-2">
                {(Object.keys(SCHEMES) as ColorScheme[]).map((s) => (
                  <button
                    key={s}
                    onClick={() => applyScheme(s)}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all"
                    style={
                      scheme === s
                        ? { backgroundColor: "#5CFF9D", color: "#0A0F14" }
                        : { backgroundColor: "#1F2937", color: "#9CA3AF", border: "1px solid #374151" }
                    }
                  >
                    {SCHEMES[s].label}
                  </button>
                ))}
              </div>
            </div>

            {/* Color pickers */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium mb-1" style={{ color: "#9CA3AF" }}>
                  Cor do código
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={options.fgColor}
                    onChange={(e) => {
                      setScheme("neon");
                      setOptions((o) => ({ ...o, fgColor: e.target.value }));
                    }}
                    className="h-9 w-9 rounded cursor-pointer"
                    style={{ border: "1px solid #374151", backgroundColor: "#1F2937" }}
                  />
                  <span className="text-xs font-mono" style={{ color: "#9CA3AF" }}>{options.fgColor}</span>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1" style={{ color: "#9CA3AF" }}>
                  Cor de fundo
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={options.bgColor}
                    onChange={(e) => {
                      setScheme("neon");
                      setOptions((o) => ({ ...o, bgColor: e.target.value }));
                    }}
                    className="h-9 w-9 rounded cursor-pointer"
                    style={{ border: "1px solid #374151", backgroundColor: "#1F2937" }}
                  />
                  <span className="text-xs font-mono" style={{ color: "#9CA3AF" }}>{options.bgColor}</span>
                </div>
              </div>
            </div>

            {/* Size presets */}
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: "#9CA3AF" }}>
                Tamanho do download
              </label>
              <div className="flex flex-wrap gap-2">
                {SIZE_PRESETS.map((s) => (
                  <button
                    key={s}
                    onClick={() => setOptions((o) => ({ ...o, size: s }))}
                    className="px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all"
                    style={
                      options.size === s
                        ? { backgroundColor: "#5CFF9D", color: "#0A0F14" }
                        : { backgroundColor: "#1F2937", color: "#9CA3AF", border: "1px solid #374151" }
                    }
                  >
                    {s}px
                  </button>
                ))}
              </div>
            </div>

            {/* Margin */}
            <div>
              <label className="block text-sm font-medium mb-1" style={{ color: "#9CA3AF" }}>
                Margem: <span style={{ color: "#5CFF9D" }}>{options.margin}</span>
              </label>
              <input
                type="range"
                min={0}
                max={6}
                step={1}
                value={options.margin}
                onChange={(e) => setOptions((o) => ({ ...o, margin: Number(e.target.value) }))}
                className="w-full"
                style={{ accentColor: "#5CFF9D" }}
              />
            </div>

            {/* Error correction */}
            <div>
              <label className="block text-sm font-medium mb-1" style={{ color: "#9CA3AF" }}>
                Correção de erro
              </label>
              <select
                value={options.errorLevel}
                onChange={(e) => setOptions((o) => ({ ...o, errorLevel: e.target.value as ErrorLevel }))}
                className="w-full rounded-lg px-3 py-2 text-sm focus:outline-none"
                style={{
                  backgroundColor: "#1F2937",
                  border: "1px solid #374151",
                  color: "#E5E7EB",
                }}
              >
                <option value="L">L — Baixa (7%)</option>
                <option value="M">M — Média (15%)</option>
                <option value="Q">Q — Alta (25%)</option>
                <option value="H">H — Máxima (30%)</option>
              </select>
              <p className="text-xs mt-1" style={{ color: "#4B5563" }}>
                Maior correção = mais robusto, QR mais denso.
              </p>
            </div>
          </div>

          {/* Preview */}
          <div className="flex flex-col items-center gap-4">
            <div
              className="rounded-xl p-3 flex items-center justify-center"
              style={{
                border: "1px solid #1F2937",
                backgroundColor: "#0A0F14",
                width: DISPLAY_SIZE + 24,
                height: DISPLAY_SIZE + 24,
                flexShrink: 0,
              }}
            >
              <canvas
                ref={canvasRef}
                style={{ width: DISPLAY_SIZE, height: DISPLAY_SIZE, display: "block" }}
              />
            </div>

            {error && <p className="text-sm text-center" style={{ color: "#F87171" }}>{error}</p>}

            <button
              onClick={download}
              disabled={!options.text.trim()}
              className="w-full font-semibold py-2.5 px-4 rounded-lg transition-all text-sm disabled:opacity-40 disabled:cursor-not-allowed"
              style={{ backgroundColor: "#5CFF9D", color: "#0A0F14" }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#7CFFB2")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#5CFF9D")}
            >
              Baixar PNG
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
