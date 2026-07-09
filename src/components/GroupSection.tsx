import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  ChevronUp, 
  ChevronDown, 
  Edit3, 
  Trash2, 
  Plus, 
  FolderOpen, 
  Info
} from "lucide-react";
import { Group, VideoCard } from "../types";
import VideoCardComponent from "./VideoCardComponent";

interface GroupSectionProps {
  key?: React.Key;
  group: Group;
  cards: VideoCard[];
  isFirst: boolean;
  isLast: boolean;
  onMoveGroup: (id: string, direction: "up" | "down") => void;
  onEditGroup: (group: Group) => void;
  onDeleteGroup: (id: string) => void;
  onAddCardClick: (groupId: string) => void;
  onUpdateCard: (updatedCard: VideoCard) => void;
  onDeleteCard: (id: string) => void;
  onEditCardClick: (card: VideoCard) => void;
  isDraggable?: boolean;
  onDragAndDropCard?: (draggedCardId: string, targetCardId: string | null, targetGroupId: string) => void;
}

export default function GroupSection({
  group,
  cards,
  isFirst,
  isLast,
  onMoveGroup,
  onEditGroup,
  onDeleteGroup,
  onAddCardClick,
  onUpdateCard,
  onDeleteCard,
  onEditCardClick,
  isDraggable = false,
  onDragAndDropCard,
}: GroupSectionProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isSectionDragOver, setIsSectionDragOver] = useState(false);

  const hasMoreCards = cards.length > 2;
  const displayedCards = isExpanded ? cards : cards.slice(0, 5);

  const getCollapseClass = (index: number) => {
    if (isExpanded) return "";
    if (index === 2) return "hidden md:block";
    if (index === 3) return "hidden lg:block";
    if (index === 4) return "hidden xl:block";
    return "";
  };
  const handleGroupDragOver = (e: React.DragEvent) => {
    if (!isDraggable) return;
    e.preventDefault();
    setIsSectionDragOver(true);
  };

  const handleGroupDragLeave = () => {
    setIsSectionDragOver(false);
  };

  const handleGroupDrop = (e: React.DragEvent) => {
    if (!isDraggable) return;
    e.preventDefault();
    setIsSectionDragOver(false);
    const draggedCardId = e.dataTransfer.getData("text/plain");
    if (draggedCardId && onDragAndDropCard) {
      onDragAndDropCard(draggedCardId, null, group.id);
    }
  };

  return (
    <motion.section
      layout
      id={`group-section-${group.id}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ type: "spring", stiffness: 100, damping: 15 }}
      onDragOver={handleGroupDragOver}
      onDragLeave={handleGroupDragLeave}
      onDrop={handleGroupDrop}
      className={`bg-white dark:bg-[#334155]/50 border border-slate-200 dark:border-white/10 rounded-xl p-6 shadow-lg transition-all duration-300 ${
        isSectionDragOver ? "ring-2 ring-red-500/50 bg-red-500/[0.03] dark:bg-red-500/[0.02] scale-[1.005] shadow-xl" : ""
      }`}
    >
      {/* Group Header */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 pb-4 mb-6 border-b border-slate-100 dark:border-white/5">
        <div className="flex-1">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-300 rounded-lg">
              <FolderOpen className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-sans font-bold text-xl text-slate-900 dark:text-white flex items-center gap-2">
                {group.name}
                <span className="text-[10px] bg-slate-100 dark:bg-white/10 px-1.5 py-0.5 rounded text-slate-500 dark:text-slate-400 shrink-0 font-mono">
                  {cards.length} {cards.length === 1 ? "vídeo" : "vídeos"}
                </span>
              </h3>
              {group.description && (
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-3xl">
                  {group.description}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Group Controls */}
        <div className="flex items-center gap-2 self-end md:self-start">
          {/* Movement buttons */}
          <div className="flex items-center bg-slate-100 dark:bg-white/5 p-1 rounded-lg border border-slate-200 dark:border-white/10">
            <button
              onClick={() => onMoveGroup(group.id, "up")}
              disabled={isFirst}
              className={`p-1.5 rounded-md transition-all ${
                isFirst 
                  ? "text-slate-300 dark:text-slate-700 cursor-not-allowed" 
                  : "text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-white/5 hover:text-slate-800 dark:hover:text-white"
              }`}
              title="Mover grupo para cima"
              id={`group-move-up-${group.id}`}
            >
              <ChevronUp className="h-4.5 w-4.5" />
            </button>
            <button
              onClick={() => onMoveGroup(group.id, "down")}
              disabled={isLast}
              className={`p-1.5 rounded-md transition-all ${
                isLast 
                  ? "text-slate-300 dark:text-slate-700 cursor-not-allowed" 
                  : "text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-white/5 hover:text-slate-800 dark:hover:text-white"
              }`}
              title="Mover grupo para baixo"
              id={`group-move-down-${group.id}`}
            >
              <ChevronDown className="h-4.5 w-4.5" />
            </button>
          </div>

          {/* Edit / Delete Group */}
          <button
            onClick={() => onEditGroup(group)}
            className="p-2 text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5 rounded-lg border border-transparent hover:border-slate-200 dark:hover:border-white/10 transition-all"
            title="Editar informações do grupo"
            id={`group-edit-${group.id}`}
          >
            <Edit3 className="h-4 w-4" />
          </button>
          <button
            onClick={() => {
              if (confirm(`Deseja realmente excluir o grupo "${group.name}"?\nIsso NÃO removerá os vídeos. Os vídeos serão movidos para o grupo Geral.`)) {
                onDeleteGroup(group.id);
              }
            }}
            className="p-2 text-slate-500 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-500 hover:bg-red-50 dark:hover:bg-white/5 rounded-lg border border-transparent hover:border-red-100 dark:hover:border-white/10 transition-all"
            title="Excluir grupo"
            id={`group-delete-${group.id}`}
          >
            <Trash2 className="h-4 w-4" />
          </button>

          {/* Add Video to Group */}
          <button
            onClick={() => onAddCardClick(group.id)}
            className="flex items-center gap-1.5 bg-red-600 hover:bg-red-700 text-white font-semibold text-xs px-3.5 py-2 rounded-md shadow-sm transition-all focus:outline-none cursor-pointer"
            id={`group-add-card-${group.id}`}
          >
            <Plus className="h-3.5 w-3.5 stroke-[3]" />
            <span>Novo Vídeo</span>
          </button>
        </div>
      </div>

      {/* Cards List Grid */}
      <div className="w-full">
        {cards.length === 0 ? (
          <div 
            className="flex flex-col items-center justify-center py-12 px-4 border-2 border-dashed border-slate-200 dark:border-white/5 rounded-lg bg-slate-50/50 dark:bg-white/[0.01] text-center"
            id={`empty-group-${group.id}`}
          >
            <div className="p-3 bg-slate-100 dark:bg-white/5 rounded-full text-slate-400 mb-3">
              <FolderOpen className="h-6 w-6 stroke-[1.5]" />
            </div>
            <h4 className="text-sm font-semibold text-slate-800 dark:text-white">
              Nenhum vídeo neste grupo
            </h4>
            <p className="text-xs text-slate-500 mt-1 max-w-sm">
              Adicione links de vídeos do YouTube ou organize sua curadoria salvando novos registros.
            </p>
            <button
              onClick={() => onAddCardClick(group.id)}
              className="mt-4 flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 text-slate-600 dark:text-slate-300 font-semibold text-xs px-3.5 py-1.5 rounded-md border border-slate-200 dark:border-white/10 transition-colors cursor-pointer"
              id={`empty-group-add-btn-${group.id}`}
            >
              <Plus className="h-3.5 w-3.5" />
              Adicionar Vídeo
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              <AnimatePresence mode="popLayout">
                {displayedCards.map((card, idx) => (
                  <VideoCardComponent
                    key={card.id}
                    card={card}
                    className={getCollapseClass(idx)}
                    onUpdateCard={onUpdateCard}
                    onDeleteCard={onDeleteCard}
                    onEditClick={onEditCardClick}
                    isDraggable={isDraggable}
                    onDropCard={(draggedId, targetId) => {
                      if (onDragAndDropCard) {
                        onDragAndDropCard(draggedId, targetId, group.id);
                      }
                    }}
                  />
                ))}
              </AnimatePresence>
            </div>

            {hasMoreCards && (
              <div className="flex justify-center pt-2 border-t border-slate-100 dark:border-white/5">
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 text-slate-700 dark:text-slate-300 font-bold text-xs px-5 py-2.5 rounded-lg border border-slate-200 dark:border-white/10 transition-all cursor-pointer shadow-sm hover:shadow"
                  id={`group-toggle-expand-${group.id}`}
                >
                  {isExpanded ? (
                    <>
                      <span>Recolher Vídeos</span>
                      <ChevronUp className="h-4 w-4" />
                    </>
                  ) : (
                    <>
                      <span>Mostrar todos os {cards.length} vídeos</span>
                      <ChevronDown className="h-4 w-4" />
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </motion.section>
  );
}
