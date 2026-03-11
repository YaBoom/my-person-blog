'use client';

import { useState } from 'react';

interface ImageModalProps {
  src: string;
  alt: string;
}

export function ImageModal({ src, alt }: ImageModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* 缩略图 */}
      <div 
        className="group relative overflow-hidden rounded-xl border border-white/10 bg-white/5 cursor-pointer"
        onClick={() => setIsOpen(true)}
      >
        <img src={src} alt={alt} className="w-full aspect-video object-cover transition-transform duration-300 group-hover:scale-105" />
        <div className="absolute inset-0 bg-black/40 opacity-0 transition-opacity group-hover:opacity-100 flex items-center justify-center">
          <span className="text-white text-sm font-medium">点击放大</span>
        </div>
      </div>

      {/* 放大模态框 */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          onClick={() => setIsOpen(false)}
        >
          <div className="relative max-w-6xl max-h-[90vh] w-full">
            <img 
              src={src} 
              alt={alt} 
              className="w-full h-full object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />
            <button 
              className="absolute -top-12 right-0 text-white hover:text-emerald-400 transition"
              onClick={() => setIsOpen(false)}
            >
              关闭 ✕
            </button>
            <p className="absolute -bottom-8 left-0 right-0 text-center text-white/70 text-sm">
              {alt} · 点击任意处关闭
            </p>
          </div>
        </div>
      )}
    </>
  );
}
