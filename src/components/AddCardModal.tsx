import React, { useState } from "react";
import { 
  X, 
  Sparkles, 
  Loader2, 
  Youtube, 
  Plus, 
  Palette, 
  FileText 
} from "lucide-react";
import { VideoCard } from "../types";
import { CARD_COLORS, getYouTubeId } from "../utils";

interface AddCardModalProps {
  groupId: string;
  onClose: () => void;
  onSave: (card: Omit<VideoCard, "id" | "createdAt">) => void;
}

export default function AddCardModal({
  groupId,
  onClose,
  onSave,
}: AddCardModalProps) {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Extracted details state
  const [extractedData, setExtractedData] = useState<{
    title: string;
    channelName: string;
    description: string;
    thumbnailUrl: string;
    videoId: string;
  } | null>(null);

  // Customizations
  const [color, setColor] = useState("slate");
  const [notes, setNotes] = useState("");

  const handleExtract = async () => {
    setError(null);
    const videoId = getYouTubeId(url);
    if (!videoId) {
      setError("Link do YouTube inválido. Use formatos comuns (ex: https://youtube.com/watch?v=... ou https://youtu.be/...)");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/extract-youtube", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Falha ao extrair metadados do vídeo.");
      }

      const data = await response.json();
      setExtractedData({
        title: data.title,
        channelName: data.channelName,
        description: data.description,
        thumbnailUrl: data.thumbnailUrl,
        videoId: data.videoId,
      });
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Erro de rede ao conectar-se ao servidor de extração.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!extractedData) return;

    onSave({
      url,
      videoId: extractedData.videoId,
      title: extractedData.title,
      channelName: extractedData.channelName,
      description: extractedData.description,
      thumbnailUrl: extractedData.thumbnailUrl,
      isLiked: false,
      rating: 0,
      color,
      notes,
      groupId,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div 
        className="fixed inset-0" 
        onClick={onClose}
      />
      
      <div className="relative bg-white dark:bg-[#334155] border border-slate-200 dark:border-white/10 rounded-lg w-full max-w-2xl overflow-hidden shadow-2xl z-10 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100 dark:border-white/5">
          <div className="flex items-center gap-2 text-red-500">
            <Youtube className="h-6 w-6 stroke-[2]" />
            <h3 className="text-lg font-bold text-slate-900 dark:text-white font-sans">
              Adicionar Vídeo do YouTube
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-800 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5 transition-colors cursor-pointer"
            id="modal-add-card-close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto max-h-[75vh]">
          {!extractedData ? (
            /* Link Entry Step */
            <div className="space-y-5">
              <div className="bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5 p-4 rounded-lg flex gap-3">
                <Sparkles className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  Insira o link de qualquer vídeo do YouTube abaixo. Nosso sistema vai extrair automaticamente o título, o canal, a descrição e a thumbnail oficial do vídeo em tempo real.
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2 ml-1">
                  Link do Vídeo
                </label>
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="url"
                    required
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="https://www.youtube.com/watch?v=..."
                    className="flex-1 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-800 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-600 rounded-md px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 font-medium"
                    id="modal-add-card-url-input"
                  />
                  <button
                    type="button"
                    onClick={handleExtract}
                    disabled={loading || !url}
                    className="bg-red-600 hover:bg-red-700 disabled:bg-slate-100 disabled:text-slate-400 dark:disabled:bg-white/5 dark:disabled:text-slate-600 text-white font-semibold text-sm px-6 py-3 rounded-md shadow-sm transition-all shrink-0 flex items-center justify-center gap-2 cursor-pointer"
                    id="modal-add-card-extract-btn"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span>Analisando...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="h-4 w-4" />
                        <span>Analisar Vídeo</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {error && (
                <div className="p-4 bg-red-50 dark:bg-red-950/20 border border-red-100 dark:border-red-900/30 rounded-md text-xs text-red-600 dark:text-red-400 leading-relaxed">
                  {error}
                </div>
              )}
            </div>
          ) : (
            /* Customization & Confirmation Step */
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Media Preview Card */}
              <div className="flex flex-col sm:flex-row gap-4 p-4 border border-slate-200 dark:border-white/5 rounded-lg bg-slate-50/50 dark:bg-white/[0.01]">
                <div className="w-full sm:w-44 aspect-video rounded-md overflow-hidden shrink-0 bg-black">
                  <img
                    src={extractedData.thumbnailUrl}
                    alt={extractedData.title}
                    referrerPolicy="no-referrer"
                    className="h-full w-full object-cover opacity-80"
                  />
                </div>
                <div className="flex-1 flex flex-col justify-center">
                  <span className="text-[10px] font-bold text-slate-600 dark:text-slate-300 bg-slate-200 dark:bg-white/10 px-2 py-0.5 rounded-md w-fit mb-1.5 uppercase tracking-wide">
                    {extractedData.channelName}
                  </span>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white leading-snug line-clamp-2">
                    {extractedData.title}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                    {extractedData.description}
                  </p>
                </div>
              </div>

              {/* Editing Form Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Title Edit */}
                <div>
                  <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2 ml-1">
                    Título do Vídeo
                  </label>
                  <input
                    type="text"
                    required
                    value={extractedData.title}
                    onChange={(e) => setExtractedData({ ...extractedData, title: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-800 dark:text-slate-200 rounded-md px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 font-medium"
                    id="modal-add-card-title-field"
                  />
                </div>

                {/* Channel Name Edit */}
                <div>
                  <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2 ml-1">
                    Nome do Canal
                  </label>
                  <input
                    type="text"
                    required
                    value={extractedData.channelName}
                    onChange={(e) => setExtractedData({ ...extractedData, channelName: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-800 dark:text-slate-200 rounded-md px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 font-medium"
                    id="modal-add-card-channel-field"
                  />
                </div>

                {/* Description Edit */}
                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2 ml-1">
                    Descrição do Vídeo
                  </label>
                  <textarea
                    required
                    value={extractedData.description}
                    onChange={(e) => setExtractedData({ ...extractedData, description: e.target.value })}
                    rows={3}
                    className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-800 dark:text-slate-200 rounded-md px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 font-medium resize-none"
                    id="modal-add-card-desc-field"
                  />
                </div>

                {/* Card Background Color customization */}
                <div>
                  <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2.5 ml-1 flex items-center gap-1.5">
                    <Palette className="h-3.5 w-3.5 text-slate-500 dark:text-slate-400" />
                    Cor Temática do Card
                  </label>
                  <div className="flex gap-2">
                    {CARD_COLORS.map((col) => (
                      <button
                        key={col.id}
                        type="button"
                        onClick={() => setColor(col.id)}
                        className={`h-8 w-8 rounded-full border flex items-center justify-center transition-all cursor-pointer ${
                          color === col.id ? "scale-110 border-red-500 shadow-sm" : "border-slate-200 dark:border-white/10"
                        } ${
                          col.id === "slate" ? "bg-slate-500" :
                          col.id === "blue" ? "bg-blue-500" :
                          col.id === "emerald" ? "bg-emerald-500" :
                          col.id === "amber" ? "bg-amber-500" :
                          col.id === "rose" ? "bg-rose-500" : "bg-purple-500"
                        }`}
                        title={col.name}
                        id={`modal-color-opt-${col.id}`}
                      >
                        {color === col.id && (
                          <span className="h-2 w-2 rounded-full bg-white" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Initial Notes input */}
                <div>
                  <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2 ml-1 flex items-center gap-1.5">
                    <FileText className="h-3.5 w-3.5 text-slate-500 dark:text-slate-400" />
                    Minhas Anotações Iniciais
                  </label>
                  <input
                    type="text"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="ex: Ver mais tarde, insights legais..."
                    className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-800 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-600 rounded-md px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 font-medium"
                    id="modal-add-card-notes-field"
                  />
                </div>
              </div>

              {/* Confirmation Buttons */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-white/5">
                <button
                  type="button"
                  onClick={() => setExtractedData(null)}
                  className="text-xs font-bold text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white cursor-pointer"
                  id="modal-add-card-back-btn"
                >
                  Voltar e alterar link
                </button>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2.5 text-xs font-bold text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5 rounded-md cursor-pointer"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="flex items-center gap-1.5 bg-red-600 hover:bg-red-700 text-white font-bold text-xs px-5 py-2.5 rounded-md shadow-sm transition-all cursor-pointer"
                    id="modal-add-card-save-btn"
                  >
                    <Plus className="h-4 w-4 stroke-[3]" />
                    <span>Salvar na Curadoria</span>
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
