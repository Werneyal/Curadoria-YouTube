import React, { useState } from "react";
import { X, Tag, Trash2, Edit2, Check, Plus } from "lucide-react";

interface ManageTagsModalProps {
  allTags: string[];
  onClose: () => void;
  onDeleteTag: (tag: string) => void;
  onEditTag: (oldTag: string, newTag: string) => void;
  onAddTag: (tag: string) => void;
}

export default function ManageTagsModal({
  allTags,
  onClose,
  onDeleteTag,
  onEditTag,
  onAddTag,
}: ManageTagsModalProps) {
  const [newTagInput, setNewTagInput] = useState("");
  const [editingTag, setEditingTag] = useState<string | null>(null);
  const [editTagValue, setEditTagValue] = useState("");

  // Sort tags alphabetically (Portuguese/locale-aware)
  const sortedTags = [...allTags].sort((a, b) => a.localeCompare(b, "pt-BR"));

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanTag = newTagInput.trim();
    if (!cleanTag) return;
    onAddTag(cleanTag);
    setNewTagInput("");
  };

  const handleStartEdit = (tag: string) => {
    setEditingTag(tag);
    setEditTagValue(tag);
  };

  const handleSaveEdit = (tag: string) => {
    const cleanNewValue = editTagValue.trim();
    if (!cleanNewValue || cleanNewValue === tag) {
      setEditingTag(null);
      return;
    }
    onEditTag(tag, cleanNewValue);
    setEditingTag(null);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="fixed inset-0" onClick={onClose} />
      
      <div className="relative bg-white dark:bg-[#334155] border border-slate-200 dark:border-white/10 rounded-lg w-full max-w-md overflow-hidden shadow-2xl z-10 animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100 dark:border-white/5">
          <div className="flex items-center gap-2 text-red-500">
            <Tag className="h-5 w-5 animate-pulse" />
            <h3 className="text-base font-bold text-slate-900 dark:text-white font-sans">
              Gerenciar Tags
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-800 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5 transition-colors cursor-pointer"
            id="modal-manage-tags-close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-4">
          {/* Quick Create New Tag Input */}
          <form onSubmit={handleAddSubmit} className="flex gap-2">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Criar nova tag..."
                value={newTagInput}
                onChange={(e) => setNewTagInput(e.target.value)}
                className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-800 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-600 rounded-md pl-4 pr-10 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 font-medium"
                id="modal-manage-tags-new-input"
              />
              <span className="absolute right-3 top-3 text-slate-400 dark:text-slate-500 text-xs">#</span>
            </div>
            <button
              type="submit"
              className="flex items-center justify-center bg-red-600 hover:bg-red-700 text-white font-bold px-4 rounded-md shadow-sm transition-all cursor-pointer"
              id="modal-manage-tags-new-btn"
            >
              <Plus className="h-4 w-4" />
            </button>
          </form>

          {/* Scrollable list of existing tags */}
          <div>
            <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2 ml-1">
              Lista de Tags ({allTags.length})
            </label>
            
            <div className="border border-slate-100 dark:border-white/5 rounded-lg max-h-64 overflow-y-auto divide-y divide-slate-100 dark:divide-white/5 bg-slate-50/50 dark:bg-black/10">
              {sortedTags.length === 0 ? (
                <div className="text-center py-8 text-xs text-slate-400 italic">
                  Nenhuma tag criada ainda.
                </div>
              ) : (
                sortedTags.map((tag) => (
                  <div key={tag} className="flex items-center justify-between p-3 group">
                    {editingTag === tag ? (
                      <div className="flex items-center gap-2 flex-1 mr-2">
                        <span className="text-xs text-red-500 font-semibold">#</span>
                        <input
                          type="text"
                          value={editTagValue}
                          onChange={(e) => setEditTagValue(e.target.value)}
                          className="flex-1 bg-white dark:bg-slate-700 border border-red-500 rounded px-2 py-1 text-xs text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-red-500 font-medium"
                          onKeyDown={(e) => {
                            if (e.key === "Enter") handleSaveEdit(tag);
                            if (e.key === "Escape") setEditingTag(null);
                          }}
                          autoFocus
                        />
                        <button
                          type="button"
                          onClick={() => handleSaveEdit(tag)}
                          className="p-1 text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 dark:hover:bg-emerald-500/10 rounded cursor-pointer"
                        >
                          <Check className="h-4 w-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => setEditingTag(null)}
                          className="p-1 text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-white/5 rounded cursor-pointer"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ) : (
                      <>
                        <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                          #{tag}
                        </span>
                        <div className="flex items-center gap-1 opacity-80 group-hover:opacity-100 transition-opacity">
                          <button
                            type="button"
                            onClick={() => handleStartEdit(tag)}
                            className="p-1.5 rounded text-slate-400 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-500/10 transition-colors cursor-pointer"
                            title="Editar tag"
                          >
                            <Edit2 className="h-3.5 w-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              if (window.confirm(`Tem certeza de que deseja excluir a tag #${tag}? Ela será removida de todos os vídeos.`)) {
                                onDeleteTag(tag);
                              }
                            }}
                            className="p-1.5 rounded text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors cursor-pointer"
                            title="Excluir tag"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed bg-amber-500/5 border border-amber-500/10 rounded-md p-3">
            💡 <strong>Dica:</strong> Excluir ou editar uma tag atualizará automaticamente todos os vídeos da sua biblioteca em tempo real.
          </div>
        </div>

        {/* Footer actions */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 bg-slate-50 dark:bg-black/5 border-t border-slate-100 dark:border-white/5">
          <button
            type="button"
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-2 text-xs font-bold text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 rounded-md transition-colors cursor-pointer text-center"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
}
