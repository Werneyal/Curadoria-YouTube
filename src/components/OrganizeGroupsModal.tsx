import React from "react";
import { X, ChevronUp, ChevronDown, ArrowUpToLine, ArrowDownToLine, SlidersHorizontal, GripVertical } from "lucide-react";
import { Group } from "../types";

interface OrganizeGroupsModalProps {
  groups: Group[];
  onMoveGroup: (groupId: string, direction: "up" | "down" | "top" | "bottom") => void;
  onClose: () => void;
}

export default function OrganizeGroupsModal({
  groups,
  onMoveGroup,
  onClose,
}: OrganizeGroupsModalProps) {
  
  // Custom function to move to top or bottom
  const handleMoveToExtreme = (groupId: string, target: "top" | "bottom") => {
    onMoveGroup(groupId, target);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="fixed inset-0" onClick={onClose} />
      
      <div className="relative bg-white dark:bg-[#334155] border border-slate-200 dark:border-white/10 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl z-10 animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100 dark:border-white/5">
          <div className="flex items-center gap-2 text-red-500">
            <SlidersHorizontal className="h-5 w-5" />
            <h3 className="text-base font-bold text-slate-900 dark:text-white font-sans">
              Organizar Ordem dos Grupos
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-800 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5 transition-colors cursor-pointer"
            id="modal-organize-groups-close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-2">
            Organize os grupos abaixo. A ordem definida nesta janela será refletida instantaneamente na visualização principal de sua biblioteca.
          </p>

          <div className="space-y-2 max-h-[350px] overflow-y-auto pr-1">
            {groups.map((group, index) => {
              const isFirst = index === 0;
              const isLast = index === groups.length - 1;

              return (
                <div
                  key={group.id}
                  className="flex items-center justify-between p-3.5 bg-slate-50 dark:bg-white/5 border border-slate-150 dark:border-white/5 rounded-xl transition-all hover:border-slate-300 dark:hover:border-white/15"
                  id={`organize-item-${group.id}`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-[11px] font-mono font-bold bg-slate-200/60 dark:bg-white/10 text-slate-700 dark:text-slate-300 h-5 w-5 rounded-full flex items-center justify-center shrink-0">
                      {index + 1}
                    </span>
                    <div>
                      <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 font-sans line-clamp-1">
                        {group.name}
                      </h4>
                      {group.description && (
                        <p className="text-[10px] text-slate-500 dark:text-slate-400 line-clamp-1">
                          {group.description}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Actions (Arrows & Extreme Moves) */}
                  <div className="flex items-center gap-1 shrink-0">
                    {/* Move to Top */}
                    <button
                      onClick={() => handleMoveToExtreme(group.id, "top")}
                      disabled={isFirst}
                      className="p-1 rounded text-slate-400 dark:text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/50 dark:hover:bg-white/5 disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer"
                      title="Mover para o topo"
                      id={`btn-extreme-up-${group.id}`}
                    >
                      <ArrowUpToLine className="h-3.5 w-3.5" />
                    </button>

                    {/* Move Up */}
                    <button
                      onClick={() => onMoveGroup(group.id, "up")}
                      disabled={isFirst}
                      className="p-1 rounded text-slate-400 dark:text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/50 dark:hover:bg-white/5 disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer"
                      title="Mover para cima"
                      id={`btn-order-up-${group.id}`}
                    >
                      <ChevronUp className="h-4 w-4" />
                    </button>

                    {/* Move Down */}
                    <button
                      onClick={() => onMoveGroup(group.id, "down")}
                      disabled={isLast}
                      className="p-1 rounded text-slate-400 dark:text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/50 dark:hover:bg-white/5 disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer"
                      title="Mover para baixo"
                      id={`btn-order-down-${group.id}`}
                    >
                      <ChevronDown className="h-4 w-4" />
                    </button>

                    {/* Move to Bottom */}
                    <button
                      onClick={() => handleMoveToExtreme(group.id, "bottom")}
                      disabled={isLast}
                      className="p-1 rounded text-slate-400 dark:text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/50 dark:hover:bg-white/5 disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer"
                      title="Mover para o final"
                      id={`btn-extreme-down-${group.id}`}
                    >
                      <ArrowDownToLine className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Action buttons */}
          <div className="flex items-center justify-end pt-4 border-t border-slate-100 dark:border-white/5">
            <button
              type="button"
              onClick={onClose}
              className="w-full sm:w-auto text-center justify-center flex items-center bg-red-600 hover:bg-red-700 text-white font-bold text-xs px-6 py-2.5 rounded-md shadow-sm transition-all cursor-pointer"
              id="modal-organize-groups-done"
            >
              Concluir Organização
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
