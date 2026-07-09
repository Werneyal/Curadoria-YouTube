import React, { useState } from "react";
import { motion } from "motion/react";
import { 
  Heart, 
  Star, 
  Palette, 
  Edit3, 
  Trash2, 
  FileText, 
  ExternalLink,
  Check,
  ChevronDown,
  ChevronUp
} from "lucide-react";
import { VideoCard } from "../types";
import { CARD_COLORS, ColorOption } from "../utils";

interface VideoCardComponentProps {
  key?: React.Key;
  card: VideoCard;
  className?: string;
  onUpdateCard: (updatedCard: VideoCard) => void;
  onDeleteCard: (id: string) => void;
  onEditClick: (card: VideoCard) => void;
}

export default function VideoCardComponent({
  card,
  className,
  onUpdateCard,
  onDeleteCard,
  onEditClick,
}: VideoCardComponentProps) {
  const [showNotes, setShowNotes] = useState(false);
  const [notesText, setNotesText] = useState(card.notes);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);

  // Find active color scheme configuration
  const activeColor = CARD_COLORS.find(c => c.id === card.color) || CARD_COLORS[0];

  const handleLikeToggle = () => {
    onUpdateCard({ ...card, isLiked: !card.isLiked });
  };

  const handleRating = (ratingValue: number) => {
    // If clicking the current rating, toggle off (0)
    const newRating = card.rating === ratingValue ? 0 : ratingValue;
    onUpdateCard({ ...card, rating: newRating });
  };

  const handleColorChange = (colorId: string) => {
    onUpdateCard({ ...card, color: colorId });
    setShowColorPicker(false);
  };

  const handleNotesBlur = () => {
    onUpdateCard({ ...card, notes: notesText });
  };

  const handleNotesSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateCard({ ...card, notes: notesText });
    setShowNotes(false);
  };

  // Safe description truncation
  const displayDescription = showFullDescription 
    ? card.description 
    : (card.description.length > 75 ? card.description.slice(0, 75) + "..." : card.description);

  // Determine border-l color based on card.color selection
  const leftBorderColor = 
    card.color === "slate" ? "border-l-slate-500" :
    card.color === "blue" ? "border-l-blue-500" :
    card.color === "emerald" ? "border-l-emerald-500" :
    card.color === "amber" ? "border-l-amber-500" :
    card.color === "rose" ? "border-l-rose-500" :
    card.color === "purple" ? "border-l-purple-500" : "border-l-slate-500";

  return (
    <motion.div
      layout
      id={`card-${card.id}`}
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
      className={`relative flex flex-col h-full rounded-lg border ${activeColor.borderClass} ${activeColor.bgClass} transition-all duration-300 shadow-sm hover:shadow-md border-l-4 ${leftBorderColor} overflow-hidden group ${className || ""}`}
    >
      {/* Video Thumbnail Section */}
      <div className="relative aspect-video w-full overflow-hidden bg-black group">
        <img
          src={card.thumbnailUrl}
          alt={card.title}
          referrerPolicy="no-referrer"
          className="h-full w-full object-cover opacity-80 transition-transform duration-500 group-hover:scale-105 group-hover:opacity-100"
        />
        {/* Watch overlay */}
        <a
          href={card.url}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          id={`link-watch-${card.id}`}
        >
          <span className="flex items-center gap-1.5 bg-red-600 hover:bg-red-700 text-white font-semibold px-2.5 py-1.5 rounded shadow text-[11px] transition-colors cursor-pointer">
            Assistir no YouTube
            <ExternalLink className="h-3.5 w-3.5" />
          </span>
        </a>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-2.5 flex flex-col justify-between">
        <div>
          {/* Channel Name Badge */}
          <div className="flex items-center justify-between gap-1.5 mb-1">
            <span className={`text-[9px] font-semibold px-1.5 py-0.5 rounded ${activeColor.badgeClass}`}>
              {card.channelName}
            </span>
            <span className="text-[9px] text-slate-500 dark:text-slate-400 font-mono">
              {new Date(card.createdAt).toLocaleDateString("pt-BR")}
            </span>
          </div>

          {/* Title */}
          <h4 className="font-sans font-bold text-xs leading-snug text-slate-900 dark:text-white mb-1 line-clamp-2 hover:text-red-500 transition-colors">
            <a href={card.url} target="_blank" rel="noopener noreferrer">
              {card.title}
            </a>
          </h4>

          {/* Description */}
          <p className="text-[10px] text-slate-600 dark:text-slate-400 leading-normal mb-1.5">
            {displayDescription}
            {card.description.length > 75 && (
              <button
                onClick={() => setShowFullDescription(!showFullDescription)}
                className="text-red-500 hover:underline ml-1 font-medium focus:outline-none cursor-pointer"
              >
                {showFullDescription ? "ver menos" : "ver mais"}
              </button>
            )}
          </p>
        </div>

        {/* Interactive Features Toolbar (Merged Single-Row) */}
        <div className="mt-auto pt-1.5 border-t border-slate-200/60 dark:border-white/5 flex items-center justify-between gap-1.5">
          {/* Stars for classification */}
          <div className="flex items-center">
            {[1, 2, 3, 4, 5].map((starValue) => (
              <button
                key={starValue}
                onClick={() => handleRating(starValue)}
                className="p-0.5 hover:scale-115 transition-transform focus:outline-none cursor-pointer"
                title={`Avaliar com ${starValue} estrela(s)`}
                id={`btn-star-${card.id}-${starValue}`}
              >
                <Star
                  className={`h-3 w-3 transition-colors ${
                    starValue <= card.rating
                      ? "fill-amber-500 text-amber-500"
                      : "text-slate-300 dark:text-slate-600 hover:text-amber-400"
                  }`}
                />
              </button>
            ))}
          </div>

          {/* Combined Action Buttons */}
          <div className="flex items-center gap-0.5 relative">
            {/* Like heart */}
            <button
              onClick={handleLikeToggle}
              className={`p-1 rounded-full transition-all duration-300 hover:bg-slate-100 dark:hover:bg-white/5 cursor-pointer ${
                card.isLiked ? "text-red-500 scale-110" : "text-slate-400 dark:text-slate-500 hover:text-red-500"
              }`}
              title={card.isLiked ? "Remover dos favoritos" : "Marcar como gostei"}
              id={`btn-like-${card.id}`}
            >
              <Heart className={`h-3 w-3 ${card.isLiked ? "fill-current" : ""}`} />
            </button>

            {/* Note trigger */}
            <button
              onClick={() => setShowNotes(!showNotes)}
              className={`p-1 rounded-md transition-all cursor-pointer ${
                showNotes || card.notes 
                  ? "bg-slate-100 dark:bg-white/10 text-slate-900 dark:text-white" 
                  : "text-slate-400 dark:text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5"
              }`}
              title="Anotações sobre o vídeo"
              id={`btn-notes-${card.id}`}
            >
              <FileText className="h-3 w-3" />
            </button>

            {/* Color picker trigger */}
            <button
              onClick={() => setShowColorPicker(!showColorPicker)}
              className={`p-1 rounded-md text-slate-400 dark:text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5 transition-all cursor-pointer ${
                showColorPicker ? "bg-slate-100 dark:bg-white/5 text-slate-900 dark:text-white" : ""
              }`}
              title="Mudar cor do card"
              id={`btn-color-${card.id}`}
            >
              <Palette className="h-3 w-3" />
            </button>

            {/* Dropdown color palette popup */}
            {showColorPicker && (
              <>
                <div 
                  className="fixed inset-0 z-10" 
                  onClick={() => setShowColorPicker(false)}
                />
                <div className="absolute bottom-6 right-0 z-20 bg-white dark:bg-[#1E1E1E] border border-slate-200 dark:border-white/10 p-1 rounded shadow-2xl flex gap-1 items-center">
                  {CARD_COLORS.map((colorOpt) => (
                    <button
                      key={colorOpt.id}
                      onClick={() => handleColorChange(colorOpt.id)}
                      className={`h-4.5 w-4.5 rounded-full border border-black/5 flex items-center justify-center transition-transform hover:scale-110 cursor-pointer ${
                        colorOpt.id === "slate" ? "bg-slate-500" : 
                        colorOpt.id === "blue" ? "bg-blue-500" :
                        colorOpt.id === "emerald" ? "bg-emerald-500" :
                        colorOpt.id === "amber" ? "bg-amber-500" :
                        colorOpt.id === "rose" ? "bg-rose-500" : "bg-purple-500"
                      }`}
                      title={colorOpt.name}
                      id={`palette-choice-${card.id}-${colorOpt.id}`}
                    >
                      {card.color === colorOpt.id && (
                        <Check className="h-2 w-2 text-white stroke-[3]" />
                      )}
                    </button>
                  ))}
                </div>
              </>
            )}

            {/* Edit button */}
            <button
              onClick={() => onEditClick(card)}
              className="p-1 text-slate-400 dark:text-slate-500 hover:text-slate-800 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5 rounded-md transition-all cursor-pointer"
              title="Editar card"
              id={`btn-edit-${card.id}`}
            >
              <Edit3 className="h-3 w-3" />
            </button>

            {/* Delete button */}
            <button
              onClick={() => {
                if (confirm("Deseja realmente remover este card de vídeo?")) {
                  onDeleteCard(card.id);
                }
              }}
              className="p-1 text-slate-400 dark:text-slate-500 hover:text-red-600 dark:hover:text-red-500 hover:bg-red-50 dark:hover:bg-white/5 rounded-md transition-all cursor-pointer"
              title="Excluir card"
              id={`btn-delete-${card.id}`}
            >
              <Trash2 className="h-3 w-3" />
            </button>
          </div>
        </div>
      </div>

      {/* Expandable Annotations Box */}
      {showNotes && (
        <motion.div
          initial={{ height: 0 }}
          animate={{ height: "auto" }}
          exit={{ height: 0 }}
          className="border-t border-slate-200/60 dark:border-white/5 bg-slate-50/50 dark:bg-[#121212]/50 p-3"
        >
          <form onSubmit={handleNotesSubmit} className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 flex items-center gap-1">
                <FileText className="h-3 w-3" />
                Minhas Anotações
              </span>
              <button
                type="button"
                onClick={() => setShowNotes(false)}
                className="text-[9px] text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 cursor-pointer"
              >
                fechar
              </button>
            </div>
            <textarea
              value={notesText}
              onChange={(e) => setNotesText(e.target.value)}
              onBlur={handleNotesBlur}
              placeholder="Digite insights sobre o vídeo..."
              rows={2}
              className="w-full text-[10px] p-1.5 rounded border border-slate-200 dark:border-white/10 bg-white dark:bg-black/30 focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 text-slate-800 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-600 resize-none font-sans"
              id={`textarea-notes-${card.id}`}
            />
            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-red-600 hover:bg-red-700 text-white font-semibold text-[10px] px-2 py-0.5 rounded shadow-sm transition-colors cursor-pointer"
                id={`btn-save-notes-${card.id}`}
              >
                Salvar
              </button>
            </div>
          </form>
        </motion.div>
      )}

      {/* Render permanent subtle notes badge if notes exist but drawer is closed */}
      {!showNotes && card.notes && (
        <div 
          onClick={() => setShowNotes(true)}
          className="mx-3 mb-3 mt-0 p-1.5 text-[10px] bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/5 text-slate-600 dark:text-slate-300 rounded flex items-start gap-1 cursor-pointer hover:bg-slate-100 dark:hover:bg-white/10 transition-colors"
          id={`compact-notes-${card.id}`}
        >
          <FileText className="h-3 w-3 shrink-0 mt-0.5 text-amber-500" />
          <p className="line-clamp-2 italic">“{card.notes}”</p>
        </div>
      )}
    </motion.div>
  );
}
