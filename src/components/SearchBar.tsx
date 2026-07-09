import React from "react";
import { Search, SlidersHorizontal, RefreshCw } from "lucide-react";
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
}: SearchBarProps) {
  const hasActiveFilters = searchQuery !== "" || selectedGroupId !== "all";

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
