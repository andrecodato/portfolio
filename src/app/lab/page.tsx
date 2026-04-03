'use client';

import { QrCode, MessageSquare, FileText } from "lucide-react";
import { useRef } from "react";
import QRCodeGenerator from "@/components/tools/QRCodeGenerator";
import XatChat from "@/components/tools/XatChat";
import BlogPostGenerator from "@/components/tools/BlogPostGenerator";

const tools = [
  {
    id: "qrcode",
    label: "QR Code",
    icon: QrCode,
    component: <QRCodeGenerator />,
    cols: "col-span-1 sm:col-span-2 lg:col-span-2",
  },
  {
    id: "xat",
    label: "xat.chat",
    icon: MessageSquare,
    component: <XatChat />,
    cols: "col-span-1",
  },
  {
    id: "blog-generator",
    label: "Blog Generator",
    icon: FileText,
    component: <BlogPostGenerator />,
    cols: "col-span-1 sm:col-span-2 lg:col-span-3",
  },
];

export default function Tools() {
  const refs = useRef<Record<string, HTMLDivElement | null>>({});

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 items-start">
      {tools.map((tool) => {
        const Icon = tool.icon;
        return (
          <div
            key={tool.id}
            id={tool.id}
            ref={el => { refs.current[tool.id] = el; }}
            className={`${tool.cols} rounded-xl border border-[#2d3f60] bg-[#1a2035] overflow-hidden scroll-mt-6`}
          >
            <div className="flex items-center gap-2 px-4 py-2 border-b border-[#2d3f60] bg-[#131d30]">
              <Icon size={13} className="shrink-0 text-[#5CFF90]" />
              <span className="text-[11px] font-mono text-[#a0aec0]">{tool.label}</span>
            </div>
            {tool.component}
          </div>
        );
      })}
    </div>
  );
}
