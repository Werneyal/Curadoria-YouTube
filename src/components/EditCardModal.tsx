import React, { useState, useEffect } from "react";
import { X, Save, Palette, FileText, Youtube, Folder } from "lucide-react";
import { VideoCard, Group } from "../types";
import { CARD_COLORS } from "../utils";

interface EditCardModalProps {
  card: VideoCard;
  groups: Group[];
  onClose: () => void;
  onSave: (updatedCard: VideoCard) => void;
}

export default function EditCardModal({
  card,
  groups,
  onClose,
  onSave,
}: EditCardModalProps) {
  const [title, setTitle] = useState(card.title);
  const [channelName, setChannelName] = useState(card.channelName);
  const [description, setDescription] = useState(card.description);
  const [color, setColor] = useState(card.color);
  const [notes, setNotes] = useState(card.notes);
  const [thumbnailUrl, setThumbnailUrl] = useState(card.thumbnailUrl);
  const [groupId, setGroupId] = useState(card.groupId);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...card,
      title,
      channelName,
      description,
      color,
      notes,
      thumbnailUrl,
      groupId,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="fixed inset-0" onClick={onClose} />
      
      <div className="relative bg-white dark:bg-[#334155] border border-slate-200 dark:border-white/10 rounded-lg w-full max-w-2xl overflow-hidden shadow-2xl z-10 flex flex-col animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100 dark:border-white/5">
          <div className="flex items-center gap-2 text-red-500">
            <Youtube className="h-6 w-6" />
            <h3 className="text-lg font-bold text-slate-900 dark:text-white font-sans">
              Editar Detalhes do Vídeo
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-800 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5 transition-colors cursor-pointer"
            id="modal-edit-card-close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6 overflow-y-auto max-h-[75vh]">
          {/* Media Preview Row */}
          <div className="flex flex-col sm:flex-row gap-4 p-4 border border-slate-200 dark:border-white/5 rounded-lg bg-slate-50/50 dark:bg-white/[0.01]">
            <div className="w-full sm:w-44 aspect-video rounded-md overflow-hidden shrink-0 bg-black">
              <img
                src={thumbnailUrl}
                alt={title}
                referrerPolicy="no-referrer"
                className="h-full w-full object-cover opacity-85"
              />
            </div>
            <div className="flex-1 flex flex-col justify-center">
              <label className="block text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1 ml-0.5">
                URL da Thumbnail (Editar abaixo para alterar)
              </label>
              <input
                type="text"
                value={thumbnailUrl}
                onChange={(e) => setThumbnailUrl(e.target.value)}
                placeholder="URL da Imagem..."
                className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-800 dark:text-slate-200 rounded-md px-2.5 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500"
                id="modal-edit-card-thumbnail-field"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Title */}
            <div>
              <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2 ml-1">
                Título do Vídeo
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-800 dark:text-slate-200 rounded-md px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 font-medium"
                id="modal-edit-card-title-field"
              />
            </div>

            {/* Channel Name */}
            <div>
              <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2 ml-1">
                Nome do Canal
              </label>
              <input
                type="text"
                required
                value={channelName}
                onChange={(e) => setChannelName(e.target.value)}
                className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-800 dark:text-slate-200 rounded-md px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 font-medium"
                id="modal-edit-card-channel-field"
              />
            </div>

            {/* Description */}
            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2 ml-1">
                Descrição do Vídeo
              </label>
              <textarea
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-800 dark:text-slate-200 rounded-md px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 font-medium resize-none"
                id="modal-edit-card-desc-field"
              />
            </div>

            {/* Color Scheme Picker */}
            <div>
              <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2.5 ml-1 flex items-center gap-1.5">
                <Palette className="h-3.5 w-3.5 text-slate-500 dark:text-slate-400" />
                Mudar Cor do Card
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
                    id={`modal-edit-color-opt-${col.id}`}
                  >
                    {color === col.id && (
                      <span className="h-2 w-2 rounded-full bg-white" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Group Selector */}
            <div>
              <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2 ml-1 flex items-center gap-1.5">
                <Folder className="h-3.5 w-3.5 text-slate-500 dark:text-slate-400" />
                Mover para Grupo
              </label>
              <select
                value={groupId}
                onChange={(e) => setGroupId(e.target.value)}
                className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-800 dark:text-slate-200 rounded-md px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 font-medium cursor-pointer"
                id="modal-edit-card-group-field"
              >
                {groups.map((g) => (
                  <option key={g.id} value={g.id} className="bg-white dark:bg-[#121212] text-slate-800 dark:text-slate-200">
                    {g.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Personal Notes */}
            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2 ml-1 flex items-center gap-1.5">
                <FileText className="h-3.5 w-3.5 text-slate-500 dark:text-slate-400" />
                Minhas Anotações Curadoria
              </label>
              <input
                type="text"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Insira notas de estudo, resumos..."
                className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-800 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-600 rounded-md px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 font-medium"
                id="modal-edit-card-notes-field"
              />
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100 dark:border-white/5">
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
              id="modal-edit-card-save-btn"
            >
              <Save className="h-4 w-4" />
              <span>Salvar Alterações</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
