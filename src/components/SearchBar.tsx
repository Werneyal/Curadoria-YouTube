import React from "react";
import { Search, SlidersHorizontal, RefreshCw, ArrowUpDown } from "lucide-react";
import { Group } from "../types";

interface SearchBarProps {
  groups: Group[];
  selectedGroupId: string; // "all" or specific group ID
  onSelectGroup: (groupId: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onClearFilters: () => void;
  totalCardsCount: number;
  filteredCardsCount: number;
  videoSortMode: "custom" | "auto";
  onVideoSortModeChange: (mode: "custom" | "auto") => void;
  allTags: string[];
  selectedTags: string[];
  onSelectTag: (tag: string) => void;
  onManageTagsClick?: () => void;
}

export default function SearchBar({
  groups,
  selectedGroupId,
  onSelectGroup,
  searchQuery,
  onSearchChange,
  onClearFilters,
  totalCardsCount,
  filteredCardsCount,
  videoSortMode,
  onVideoSortModeChange,
  allTags,
  selectedTags,
  onSelectTag,
  onManageTagsClick,
}: SearchBarProps) {
  const hasActiveFilters = searchQuery !== "" || selectedGroupId !== "all" || selectedTags.length > 0;

  return (
    <div className="w-full bg-white dark:bg-[#334155] border border-slate-200 dark:border-white/10 rounded-2xl p-5 shadow-lg">
      <div className="flex flex-col md:flex-row items-stretch md:items-center gap-4">
        {/* Group Filter Dropdown */}
        <div className="relative flex-1 md:max-w-xs">
          <label className="block text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5 ml-1">
            Filtrar por Grupo
          </label>
          <div className="relative">
            <select
              value={selectedGroupId}
              onChange={(e) => onSelectGroup(e.target.value)}
              className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-800 dark:text-slate-200 rounded-xl px-3 py-2.5 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 font-medium cursor-pointer appearance-none"
              id="search-group-select"
            >
              <option value="all" className="bg-white dark:bg-[#334155] text-slate-800 dark:text-slate-200">📁 Todos os Grupos ({groups.length})</option>
              {groups.map((group) => (
                <option key={group.id} value={group.id} className="bg-white dark:bg-[#334155] text-slate-800 dark:text-slate-200">
                  🏷️ {group.name}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-500">
              <SlidersHorizontal className="h-4 w-4" />
            </div>
          </div>
        </div>

        {/* Card Sort Mode Dropdown */}
        <div className="relative flex-1 md:max-w-[220px]">
          <label className="block text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5 ml-1">
            Organização dos Cards
          </label>
          <div className="relative">
            <select
              value={videoSortMode}
              onChange={(e) => onVideoSortModeChange(e.target.value as "custom" | "auto")}
              className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-800 dark:text-slate-200 rounded-xl px-3 py-2.5 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 font-medium cursor-pointer appearance-none"
              id="search-sort-select"
            >
              <option value="custom" className="bg-white dark:bg-[#334155] text-slate-800 dark:text-slate-200">
                ↕️ Personalizada (Arrastar)
              </option>
              <option value="auto" className="bg-white dark:bg-[#334155] text-slate-800 dark:text-slate-200">
                ⭐ Automática (Favoritos & Nota)
              </option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-500">
              <ArrowUpDown className="h-4 w-4" />
            </div>
          </div>
        </div>

        {/* Text Search Input */}
        <div className="flex-1">
          <label className="block text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5 ml-1">
            Buscar nos Vídeos
          </label>
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Digite o título, canal, descrição ou anotação para buscar..."
              className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-800 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 font-medium"
              id="search-text-input"
            />
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
              <Search className="h-4.5 w-4.5" />
            </div>
          </div>
        </div>

        {/* Action button to clear filters */}
        {hasActiveFilters && (
          <div className="flex items-end justify-start self-end md:self-auto h-full mt-4 md:mt-0">
            <button
              onClick={onClearFilters}
              className="flex items-center gap-1.5 text-xs text-red-500 hover:text-red-600 dark:hover:text-red-400 hover:bg-slate-100 dark:hover:bg-white/5 font-semibold px-4 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 transition-colors cursor-pointer"
              id="search-clear-btn"
            >
              <RefreshCw className="h-3.5 w-3.5" />
              <span>Limpar Filtros</span>
            </button>
          </div>
        )}
      </div>

      {/* Tags Filter section */}
      <div className="mt-4 pt-3 border-t border-slate-100 dark:border-white/5">
        <div className="flex items-center justify-between mb-2 px-1">
          <span className="block text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider text-left">
            Filtrar por Tags
          </span>
          {onManageTagsClick && (
            <button
              onClick={onManageTagsClick}
              className="text-[10px] font-bold text-red-500 hover:text-red-600 dark:hover:text-red-400 uppercase tracking-wider flex items-center gap-1 transition-colors cursor-pointer"
              id="btn-manage-tags-trigger"
            >
              ⚙️ Editar Tags
            </button>
          )}
        </div>
        {allTags.length === 0 ? (
          <div className="text-left text-xs text-slate-400 dark:text-slate-500 italic ml-1">
            Nenhuma tag cadastrada ainda. Clique em "Editar Tags" para criar uma.
          </div>
        ) : (
          <div className="flex flex-wrap gap-1.5 justify-start">
            {[...allTags]
              .sort((a, b) => a.localeCompare(b, "pt-BR"))
              .map((tag) => {
                const isSelected = selectedTags.includes(tag);
                return (
                  <button
                    key={tag}
                    onClick={() => onSelectTag(tag)}
                    className={`text-[11px] px-2.5 py-1 rounded-md border transition-all cursor-pointer font-semibold ${
                      isSelected
                        ? "bg-red-600 border-red-600 text-white shadow-sm shadow-red-600/15"
                        : "bg-slate-50 dark:bg-white/5 border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10"
                    }`}
                    id={`filter-tag-badge-${tag}`}
                  >
                    #{tag}
                  </button>
                );
              })}
          </div>
        )}
      </div>

      {/* Dynamic Results Counter Bar */}
      <div className="mt-4 pt-3 border-t border-slate-100 dark:border-white/5 flex items-center justify-between text-xs text-slate-500">
        <div>
          {hasActiveFilters ? (
            <span>
              Mostrando <strong className="text-red-500">{filteredCardsCount}</strong> de{" "}
              {totalCardsCount} vídeos filtrados.
            </span>
          ) : (
            <span>
              Total em sua curadoria: <strong className="text-slate-700 dark:text-slate-300">{totalCardsCount}</strong> vídeos salvos.
            </span>
          )}
        </div>
        {hasActiveFilters && (
          <span className="italic text-[11px] text-slate-500">
            Filtros ativos nos resultados do mural.
          </span>
        )}
      </div>
    </div>
  );
}
