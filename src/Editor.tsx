import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Play, Maximize2, Minimize2 } from 'lucide-react';

const DUMMY_HTML = `<!DOCTYPE html>
<html>
<head>
  <title>Meu Primeiro Site</title>
</head>
<body>
  <h1>Hello World</h1>
  <p>Meu primeiro site em HTML</p>
</body>
</html>`;

export function Editor() {
  const navigate = useNavigate();
  const [code, setCode] = useState(DUMMY_HTML);
  const [preview, setPreview] = useState(DUMMY_HTML);
  const [isFullScreen, setIsFullScreen] = useState(false);

  const handleRun = () => {
    setPreview(code);
  };

  const iframeSrcDoc = preview;

  if (isFullScreen) {
    return (
      <div className="fixed inset-0 z-50 bg-white flex flex-col">
        <div className="bg-slate-900 text-white p-4 flex items-center justify-between">
          <h2 className="font-bold">Resultado do Código</h2>
          <button 
            onClick={() => setIsFullScreen(false)}
            className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
          >
            <Minimize2 size={16} />
            Sair da Tela Cheia
          </button>
        </div>
        <div className="flex-1 w-full h-full">
          <iframe 
            srcDoc={iframeSrcDoc} 
            className="w-full h-full bg-white border-0"
            title="Preview"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050510] flex flex-col text-slate-300">
      <header className="px-6 py-4 border-b border-white/5 bg-[#0D0D18] flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate(-1)}
            className="p-2 bg-white/5 hover:bg-white/10 rounded-full transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
          <h1 className="font-bold text-white text-lg">Mini Editor de HTML</h1>
        </div>
        
        <button 
          onClick={handleRun}
          className="flex items-center gap-2 px-6 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg transition-colors shadow-[0_0_20px_-5px_rgba(16,185,129,0.4)]"
        >
          <Play size={16} />
          Executar Código
        </button>
      </header>

      <main className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* Editor Area */}
        <div className="flex-1 flex flex-col min-h-[40vh] lg:min-h-0 border-b lg:border-b-0 lg:border-r border-white/5">
          <div className="bg-slate-900 px-4 py-2 border-b border-white/5 flex items-center justify-between">
            <span className="text-xs font-mono text-slate-400">index.html</span>
          </div>
          <textarea 
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="flex-1 w-full bg-[#0D0D18] text-slate-300 p-4 font-mono text-sm leading-relaxed outline-none resize-none"
            spellCheck={false}
          />
        </div>

        {/* Preview Area */}
        <div className="flex-1 flex flex-col min-h-[40vh] lg:min-h-0 bg-white">
          <div className="bg-slate-100 px-4 py-2 border-b border-slate-200 flex items-center justify-between">
            <span className="text-xs font-mono text-slate-500">Navegador Simulador</span>
            <button 
              onClick={() => setIsFullScreen(true)}
              className="p-1.5 hover:bg-slate-200 rounded text-slate-500 transition-colors"
              title="Tela Cheia"
            >
              <Maximize2 size={14} />
            </button>
          </div>
          <div className="flex-1 relative">
            <iframe 
              srcDoc={iframeSrcDoc} 
              className="absolute inset-0 w-full h-full bg-white border-0"
              title="Preview"
            />
          </div>
        </div>
      </main>
    </div>
  );
}
