import React, { useState, useEffect } from "react";
import { 
  FolderPlus, 
  Youtube, 
  FolderOpen, 
  Heart, 
  Star, 
  BookOpen, 
  Sparkles,
  Search,
  Filter,
  Sun,
  Moon,
  SlidersHorizontal
} from "lucide-react";
import { Group, VideoCard } from "./types";
import { 
  loadState, 
  saveState, 
  DEFAULT_GROUPS, 
  DEFAULT_CARDS 
} from "./utils";
import GroupSection from "./components/GroupSection";
import SearchBar from "./components/SearchBar";
import BackupControl from "./components/BackupControl";
import AddCardModal from "./components/AddCardModal";
import EditCardModal from "./components/EditCardModal";
import AddGroupModal from "./components/AddGroupModal";
import EditGroupModal from "./components/EditGroupModal";
import OrganizeGroupsModal from "./components/OrganizeGroupsModal";
import ManageTagsModal from "./components/ManageTagsModal";

export default function App() {
  // 1. Core State
  const [groups, setGroups] = useState<Group[]>([]);
  const [cards, setCards] = useState<VideoCard[]>([]);

  // 2. Filter & Search State
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGroupId, setSelectedGroupId] = useState("all");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  // 2.5. Tags State
  const [allTags, setAllTags] = useState<string[]>(() => {
    const saved = localStorage.getItem("yt_curator_tags");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Erro ao carregar tags:", e);
      }
    }
    return ["Tecnologia", "Tutorial", "Produtividade", "Review", "IA"];
  });

  useEffect(() => {
    localStorage.setItem("yt_curator_tags", JSON.stringify(allTags));
  }, [allTags]);

  const handleSelectTagFilter = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleAddGlobalTag = (tag: string) => {
    const cleanTag = tag.trim();
    if (cleanTag && !allTags.includes(cleanTag)) {
      setAllTags([...allTags, cleanTag]);
    }
  };

  const handleDeleteTag = (tagToDelete: string) => {
    // 1. Remove from global list of tags
    setAllTags(allTags.filter((t) => t !== tagToDelete));
    
    // 2. Remove from active selected filter tags
    setSelectedTags(selectedTags.filter((t) => t !== tagToDelete));

    // 3. Remove this tag from all video cards
    const updatedCards = cards.map((card) => {
      if (card.tags && card.tags.includes(tagToDelete)) {
        return {
          ...card,
          tags: card.tags.filter((t) => t !== tagToDelete),
        };
      }
      return card;
    });
    setCards(updatedCards);
    saveState(groups, updatedCards);
  };

  const handleEditTag = (oldTag: string, newTag: string) => {
    const cleanNewTag = newTag.trim();
    if (!cleanNewTag || oldTag === cleanNewTag) return;

    // 1. Rename inside the global list of tags (merge if newTag already exists)
    let updatedTags: string[];
    if (allTags.includes(cleanNewTag)) {
      // If target tag already exists, just remove oldTag
      updatedTags = allTags.filter((t) => t !== oldTag);
    } else {
      // Otherwise replace the oldTag with cleanNewTag
      updatedTags = allTags.map((t) => (t === oldTag ? cleanNewTag : t));
    }
    setAllTags(updatedTags);

    // 2. Rename inside active selected filter tags
    if (selectedTags.includes(oldTag)) {
      let updatedSelected: string[];
      if (selectedTags.includes(cleanNewTag)) {
        updatedSelected = selectedTags.filter((t) => t !== oldTag);
      } else {
        updatedSelected = selectedTags.map((t) => (t === oldTag ? cleanNewTag : t));
      }
      setSelectedTags(updatedSelected);
    }

    // 3. Rename inside all cards
    const updatedCards = cards.map((card) => {
      if (card.tags && card.tags.includes(oldTag)) {
        let updatedCardTags = card.tags.map((t) => (t === oldTag ? cleanNewTag : t));
        // Remove duplicates if any
        updatedCardTags = Array.from(new Set(updatedCardTags));
        return {
          ...card,
          tags: updatedCardTags,
        };
      }
      return card;
    });
    setCards(updatedCards);
    saveState(groups, updatedCards);
  };

  // 3. Modal / Overlay States
  const [activeAddGroupId, setActiveAddGroupId] = useState<string | null>(null);
  const [activeEditCard, setActiveEditCard] = useState<VideoCard | null>(null);
  const [showAddGroupModal, setShowAddGroupModal] = useState(false);
  const [showOrganizeGroupsModal, setShowOrganizeGroupsModal] = useState(false);
  const [activeEditGroup, setActiveEditGroup] = useState<Group | null>(null);
  const [showManageTagsModal, setShowManageTagsModal] = useState(false);

  // 3.5. Theme State
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    const saved = localStorage.getItem("curatube-theme");
    if (saved === "light" || saved === "dark") return saved;
    return "dark"; // Default to dark mode
  });

  const [videoSortMode, setVideoSortMode] = useState<"custom" | "auto">(() => {
    const saved = localStorage.getItem("curatube-sort-mode");
    if (saved === "custom" || saved === "auto") return saved;
    return "custom"; // Default to custom drag and drop
  });

  useEffect(() => {
    localStorage.setItem("curatube-sort-mode", videoSortMode);
  }, [videoSortMode]);

  useEffect(() => {
    localStorage.setItem("curatube-theme", theme);
    const root = window.document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [theme]);

  // Initialize data on mount
  useEffect(() => {
    const { groups: savedGroups, cards: savedCards } = loadState();
    // Ensure groups are sorted by order
    const sortedGroups = [...savedGroups].sort((a, b) => a.order - b.order);
    setGroups(sortedGroups);
    setCards(savedCards);
  }, []);

  // 4. Group Handlers
  const handleAddGroup = (name: string, description: string) => {
    const newGroup: Group = {
      id: "group_" + Math.random().toString(36).substring(2, 11),
      name,
      description,
      order: groups.length,
      createdAt: Date.now(),
    };
    const updatedGroups = [...groups, newGroup];
    setGroups(updatedGroups);
    saveState(updatedGroups, cards);
  };

  const handleEditGroupSave = (id: string, name: string, description: string) => {
    const updatedGroups = groups.map((g) => {
      if (g.id === id) {
        return { ...g, name, description };
      }
      return g;
    });
    setGroups(updatedGroups);
    saveState(updatedGroups, cards);
  };

  const handleDeleteGroup = (groupId: string) => {
    // Determine cards belonging to the deleted group
    const cardsToMove = cards.filter((c) => c.groupId === groupId);
    const remainingGroups = groups.filter((g) => g.id !== groupId);

    let updatedGroups = [...remainingGroups];
    let updatedCards = [...cards];

    if (cardsToMove.length > 0) {
      // Find or create fallback group
      let fallbackGroup = updatedGroups[0];
      
      if (!fallbackGroup) {
        fallbackGroup = {
          id: "group_geral",
          name: "Geral",
          description: "Grupo padrão criado para armazenar vídeos sem categoria.",
          order: 0,
          createdAt: Date.now(),
        };
        updatedGroups = [fallbackGroup];
      }

      // Re-assign cards to fallback group
      updatedCards = cards.map((c) => {
        if (c.groupId === groupId) {
          return { ...c, groupId: fallbackGroup.id };
        }
        return c;
      });
    } else {
      // Just filter out cards if they are tied? No, cards stay. But wait, if cards don't need to move,
      // we still check just in case.
      updatedCards = cards.filter((c) => c.groupId !== groupId);
    }

    // Recalculate orders of remaining groups to avoid gaps
    const reorderedGroups = updatedGroups.map((g, idx) => ({ ...g, order: idx }));

    setGroups(reorderedGroups);
    setCards(updatedCards);
    saveState(reorderedGroups, updatedCards);

    // If filtering by deleted group, reset to all
    if (selectedGroupId === groupId) {
      setSelectedGroupId("all");
    }
  };

  const handleMoveGroup = (groupId: string, direction: "up" | "down" | "top" | "bottom") => {
    const currentIndex = groups.findIndex((g) => g.id === groupId);
    if (currentIndex === -1) return;

    let updatedGroups = [...groups];
    const groupToMove = updatedGroups[currentIndex];

    if (direction === "up") {
      if (currentIndex === 0) return;
      updatedGroups.splice(currentIndex, 1);
      updatedGroups.splice(currentIndex - 1, 0, groupToMove);
    } else if (direction === "down") {
      if (currentIndex === groups.length - 1) return;
      updatedGroups.splice(currentIndex, 1);
      updatedGroups.splice(currentIndex + 1, 0, groupToMove);
    } else if (direction === "top") {
      if (currentIndex === 0) return;
      updatedGroups.splice(currentIndex, 1);
      updatedGroups.unshift(groupToMove);
    } else if (direction === "bottom") {
      if (currentIndex === groups.length - 1) return;
      updatedGroups.splice(currentIndex, 1);
      updatedGroups.push(groupToMove);
    }

    // Reset orders
    const orderedGroups = updatedGroups.map((g, idx) => ({ ...g, order: idx }));
    setGroups(orderedGroups);
    saveState(orderedGroups, cards);
  };

  // 5. Video Card Handlers
  const handleAddCardSave = (cardData: Omit<VideoCard, "id" | "createdAt">) => {
    const newCard: VideoCard = {
      ...cardData,
      id: "card_" + Math.random().toString(36).substring(2, 11),
      createdAt: Date.now(),
    };
    const updatedCards = [newCard, ...cards];
    setCards(updatedCards);
    saveState(groups, updatedCards);
  };

  const handleUpdateCard = (updatedCard: VideoCard) => {
    const originalCard = cards.find((c) => c.id === updatedCard.id);
    const updatedCards = cards.map((c) => (c.id === updatedCard.id ? updatedCard : c));
    setCards(updatedCards);
    saveState(groups, updatedCards);

    // Se o status de gostei (favoritado) ou a classificação em estrelas mudou,
    // forçamos o modo de ordenação automática para que o card se mova na hora.
    if (originalCard && (originalCard.rating !== updatedCard.rating || originalCard.isLiked !== updatedCard.isLiked)) {
      setVideoSortMode("auto");
    }
  };

  const handleDeleteCard = (cardId: string) => {
    const updatedCards = cards.filter((c) => c.id !== cardId);
    setCards(updatedCards);
    saveState(groups, updatedCards);
  };

  const handleDuplicateCard = (cardId: string) => {
    const cardToDuplicate = cards.find((c) => c.id === cardId);
    if (!cardToDuplicate) return;

    const duplicatedCard: VideoCard = {
      ...cardToDuplicate,
      id: "card_" + Math.random().toString(36).substring(2, 11),
      title: `${cardToDuplicate.title} (Cópia)`,
      createdAt: Date.now(),
    };

    const originalIndex = cards.findIndex((c) => c.id === cardId);
    const updatedCards = [...cards];
    updatedCards.splice(originalIndex + 1, 0, duplicatedCard);

    setCards(updatedCards);
    saveState(groups, updatedCards);
  };

  const handleDragAndDropCard = (draggedCardId: string, targetCardId: string | null, targetGroupId: string) => {
    const cardToMove = cards.find((c) => c.id === draggedCardId);
    if (!cardToMove) return;

    const draggedIndex = cards.findIndex((c) => c.id === draggedCardId);
    const targetIndex = targetCardId ? cards.findIndex((c) => c.id === targetCardId) : -1;

    let updatedCards = cards.filter((c) => c.id !== draggedCardId);
    const updatedCard = { ...cardToMove, groupId: targetGroupId };

    if (targetCardId && targetIndex !== -1) {
      const newTargetIndex = updatedCards.findIndex((c) => c.id === targetCardId);
      if (newTargetIndex !== -1) {
        if (draggedIndex < targetIndex) {
          // Dragged from left/above to right/below (forward in array): insert after the target card
          updatedCards.splice(newTargetIndex + 1, 0, updatedCard);
        } else {
          // Dragged from right/below to left/above (backward in array): insert before the target card
          updatedCards.splice(newTargetIndex, 0, updatedCard);
        }
      } else {
        updatedCards.push(updatedCard);
      }
    } else {
      // Dragged onto section background / empty space: append to end of that group
      const targetGroupCardIndexes = updatedCards
        .map((c, idx) => (c.groupId === targetGroupId ? idx : -1))
        .filter((idx) => idx !== -1);

      if (targetGroupCardIndexes.length > 0) {
        const lastIndex = targetGroupCardIndexes[targetGroupCardIndexes.length - 1];
        updatedCards.splice(lastIndex + 1, 0, updatedCard);
      } else {
        updatedCards.push(updatedCard);
      }
    }

    setVideoSortMode("custom");
    setCards(updatedCards);
    saveState(groups, updatedCards);
  };

  // 6. Backup Handlers
  const handleImportBackup = (
    importedGroups: Group[],
    importedCards: VideoCard[],
    mode: "merge" | "overwrite"
  ) => {
    if (mode === "overwrite") {
      // Overwrite completely
      const sortedImportedGroups = [...importedGroups].sort((a, b) => a.order - b.order);
      setGroups(sortedImportedGroups);
      setCards(importedCards);
      saveState(sortedImportedGroups, importedCards);
    } else {
      // Merge
      // Avoid duplicate groups by checking IDs
      const existingGroupIds = new Set(groups.map((g) => g.id));
      const groupsToAdd = importedGroups.filter((g) => !existingGroupIds.has(g.id));
      
      // Fix orders for merged groups
      let nextOrder = groups.length;
      const orderedGroupsToAdd = groupsToAdd.map((g) => ({
        ...g,
        order: nextOrder++,
      }));

      const mergedGroups = [...groups, ...orderedGroupsToAdd];

      // Avoid duplicate cards by checking videoIds + IDs
      const existingCardKeys = new Set(cards.map((c) => `${c.id}_${c.videoId}`));
      const cardsToAdd = importedCards.filter((c) => !existingCardKeys.has(`${c.id}_${c.videoId}`));

      const mergedCards = [...cardsToAdd, ...cards]; // Put newest/imported first or maintain order

      setGroups(mergedGroups);
      setCards(mergedCards);
      saveState(mergedGroups, mergedCards);
    }
  };

  // 7. Search & Filtering logic
  const filteredCards = cards.filter((card) => {
    // Group filter
    if (selectedGroupId !== "all" && card.groupId !== selectedGroupId) {
      return false;
    }

    // Tags filter (OR matches: show card if it has at least one of the selected tags)
    if (selectedTags.length > 0) {
      const cardTags = card.tags || [];
      const hasMatchingTag = cardTags.some((tag) => selectedTags.includes(tag));
      if (!hasMatchingTag) {
        return false;
      }
    }

    // Text search filter
    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      const titleMatch = card.title.toLowerCase().includes(query);
      const channelMatch = card.channelName.toLowerCase().includes(query);
      const descMatch = card.description.toLowerCase().includes(query);
      const notesMatch = card.notes.toLowerCase().includes(query);
      return titleMatch || channelMatch || descMatch || notesMatch;
    }

    return true;
  });

  // Calculate high-level stats for dashboard indicators
  const totalLiked = cards.filter((c) => c.isLiked).length;
  const averageRating = cards.length 
    ? (cards.reduce((sum, c) => sum + c.rating, 0) / cards.length).toFixed(1) 
    : "0.0";  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 dark:bg-[#1E293B] dark:text-slate-200 flex flex-col font-sans selection:bg-red-600 selection:text-white transition-colors duration-300">
      
      {/* Premium Navigation Top bar */}
      <header className="sticky top-0 z-40 bg-white dark:bg-[#334155] border-b border-slate-200 dark:border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-red-600 text-white p-2 rounded-lg shadow-md shadow-red-600/10">
              <Youtube className="h-5 w-5 stroke-[2]" />
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-1.5 font-sans">
                Cura<span className="text-red-500">tube</span> <span className="text-[10px] bg-slate-100 dark:bg-white/10 text-slate-600 dark:text-slate-400 font-bold px-1.5 py-0.5 rounded uppercase">PRO</span>
              </h1>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">Curadoria Inteligente de Conteúdo</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              className="p-2.5 rounded-md border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-white/5 text-slate-500 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
              title={theme === "light" ? "Alternar para Modo Escuro" : "Alternar para Modo Claro"}
              id="theme-toggle-btn"
            >
              {theme === "light" ? (
                <Moon className="h-4 w-4" />
              ) : (
                <Sun className="h-4 w-4" />
              )}
            </button>

            <button
              onClick={() => setShowOrganizeGroupsModal(true)}
              className="flex items-center gap-1.5 border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white font-semibold text-xs px-4 py-2.5 rounded-md transition-colors cursor-pointer"
              id="header-organize-groups-btn"
              title="Organizar Ordem dos Grupos"
            >
              <SlidersHorizontal className="h-4 w-4" />
              <span className="hidden sm:inline">Organizar Grupos</span>
            </button>

            <button
              onClick={() => setShowAddGroupModal(true)}
              className="flex items-center gap-1.5 bg-red-600 hover:bg-red-700 text-white font-semibold text-xs px-4 py-2.5 rounded-md transition-colors cursor-pointer"
              id="header-add-group-btn"
            >
              <FolderPlus className="h-4 w-4" />
              <span>Novo Grupo</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Workspace Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
              
        {/* Cohesive Search & Advanced Filtering Bar */}
        <SearchBar
          groups={groups}
          selectedGroupId={selectedGroupId}
          onSelectGroup={setSelectedGroupId}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onClearFilters={() => {
            setSearchQuery("");
            setSelectedGroupId("all");
            setSelectedTags([]);
          }}
          totalCardsCount={cards.length}
          filteredCardsCount={filteredCards.length}
          videoSortMode={videoSortMode}
          onVideoSortModeChange={setVideoSortMode}
          allTags={allTags}
          selectedTags={selectedTags}
          onSelectTag={handleSelectTagFilter}
          onManageTagsClick={() => setShowManageTagsModal(true)}
        />

        {/* Curation Groups & Video Cards Grid Layout */}
        <div className="space-y-8">
          {groups.length === 0 ? (
            /* Outer empty state if no groups exist */
            <div 
              className="flex flex-col items-center justify-center py-16 px-4 bg-white dark:bg-[#334155] border border-slate-200 dark:border-white/10 rounded-2xl text-center shadow-lg"
              id="app-no-groups-empty-state"
            >
              <div className="p-4 bg-slate-100 dark:bg-white/5 text-red-500 rounded-xl mb-4">
                <FolderOpen className="h-8 w-8 stroke-[1.5]" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Sua biblioteca de curadoria está vazia
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-md leading-relaxed">
                Para começar a registrar e categorizar seus vídeos favoritos do YouTube, crie seu primeiro grupo de organização.
              </p>
              <button
                onClick={() => setShowAddGroupModal(true)}
                className="mt-6 flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold text-xs px-5 py-3 rounded-md transition-colors"
                id="empty-state-create-group-btn"
              >
                <FolderPlus className="h-4 w-4" />
                Criar Primeiro Grupo
              </button>
            </div>
          ) : (
            groups
              .filter((group) => {
                // If filtering by a specific group ID, only show that group
                if (selectedGroupId !== "all" && group.id !== selectedGroupId) {
                  return false;
                }
                // If there's an active search query or tag filter, we only show groups that contain matching cards,
                // so the screen is clean and relevant!
                if (searchQuery.trim() !== "" || selectedTags.length > 0) {
                  const hasMatchingCards = filteredCards.some((c) => c.groupId === group.id);
                  return hasMatchingCards;
                }
                return true;
              })
              .map((group, idx) => {
                const groupCards = filteredCards.filter((card) => card.groupId === group.id);
                if (videoSortMode === "auto") {
                  groupCards.sort((a, b) => {
                    // 1. Favoritados (gostei) primeiro
                    if (a.isLiked !== b.isLiked) {
                      return a.isLiked ? -1 : 1;
                    }
                    // 2. Maior classificação de estrelas primeiro
                    if (a.rating !== b.rating) {
                      return b.rating - a.rating;
                    }
                    // 3. Estabilidade de data (mais recente primeiro)
                    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
                  });
                }
                return (
                  <GroupSection
                    key={group.id}
                    group={group}
                    cards={groupCards}
                    isFirst={idx === 0}
                    isLast={idx === groups.length - 1}
                    onMoveGroup={handleMoveGroup}
                    onEditGroup={setActiveEditGroup}
                    onDeleteGroup={handleDeleteGroup}
                    onAddCardClick={setActiveAddGroupId}
                    onUpdateCard={handleUpdateCard}
                    onDeleteCard={handleDeleteCard}
                    onEditCardClick={setActiveEditCard}
                    isDraggable={videoSortMode === "custom"}
                    onDragAndDropCard={handleDragAndDropCard}
                    allTags={allTags}
                    onAddGlobalTag={handleAddGlobalTag}
                    onDuplicateCard={handleDuplicateCard}
                  />
                );
              })
          )}

          {/* Feedback if search has active results, but no cards matched any group */}
          {groups.length > 0 && filteredCards.length === 0 && (searchQuery.trim() !== "" || selectedGroupId !== "all" || selectedTags.length > 0) && (
            <div 
              className="flex flex-col items-center justify-center py-16 px-4 bg-white dark:bg-[#334155] border border-slate-200 dark:border-white/10 rounded-2xl text-center shadow-lg"
              id="search-no-results-box"
            >
              <div className="p-3 bg-slate-100 dark:bg-white/5 text-slate-500 dark:text-slate-400 rounded-full mb-3">
                <Search className="h-6 w-6 stroke-[1.5]" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                Nenhum vídeo corresponde aos filtros
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 max-w-sm">
                Tente ajustar os termos digitados, selecione outras tags ou troque o filtro de grupo.
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedGroupId("all");
                  setSelectedTags([]);
                }}
                className="mt-4 bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 text-slate-700 dark:text-slate-200 font-semibold text-xs px-4 py-2 rounded-md transition-colors border border-slate-200 dark:border-white/10"
                id="search-reset-all"
              >
                Limpar filtros e ver tudo
              </button>
            </div>
          )}
        </div>

        {/* Welcome Dashboard & Quick Metrics (Painel do Curador) */}
        <div className="bg-white dark:bg-[#334155] border border-slate-200 dark:border-white/10 rounded-2xl p-6 sm:p-8 relative overflow-hidden shadow-xl">
          {/* Ambient background glows */}
          <div className="absolute top-[-50px] right-[-50px] w-64 h-64 rounded-full bg-red-600/10 blur-3xl pointer-events-none" />
          <div className="absolute bottom-[-50px] left-[-50px] w-64 h-64 rounded-full bg-slate-200/50 dark:bg-white/5 blur-3xl pointer-events-none" />
          
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-red-500 flex items-center gap-1.5 mb-2">
                <Sparkles className="h-4 w-4" />
                Painel do Curador
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight font-sans text-slate-900 dark:text-white">
                Sua Biblioteca de Conhecimento
              </h2>
              <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm mt-2 max-w-2xl leading-relaxed">
                Organize os melhores vídeos e canais do YouTube em grupos customizados. Insira apenas o link do vídeo para obter instantaneamente thumbnails, títulos, descrições e fazer suas anotações exclusivas de estudo.
              </p>
            </div>

            {/* Quick stats indicators in bento box style */}
            <div className="grid grid-cols-3 gap-3 shrink-0">
              <div className="bg-slate-100/50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl p-4 text-center min-w-[90px] sm:min-w-[110px]">
                <FolderOpen className="h-4 w-4 mx-auto text-slate-500 dark:text-slate-400 mb-1.5" />
                <span className="block text-xl sm:text-2xl font-bold font-mono leading-none text-slate-800 dark:text-white">{groups.length}</span>
                <span className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider mt-1 block">Grupos</span>
              </div>
              <div className="bg-slate-100/50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl p-4 text-center min-w-[90px] sm:min-w-[110px]">
                <Heart className="h-4 w-4 mx-auto text-red-500 mb-1.5 fill-red-500/10" />
                <span className="block text-xl sm:text-2xl font-bold font-mono leading-none text-slate-800 dark:text-white">{totalLiked}</span>
                <span className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider mt-1 block">Favoritos</span>
              </div>
              <div className="bg-slate-100/50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl p-4 text-center min-w-[90px] sm:min-w-[110px]">
                <Star className="h-4 w-4 mx-auto text-amber-500 mb-1.5 fill-amber-500/10" />
                <span className="block text-xl sm:text-2xl font-bold font-mono leading-none text-slate-800 dark:text-white">{averageRating}</span>
                <span className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider mt-1 block">Média</span>
              </div>
            </div>
          </div>
        </div>

        {/* Robust Backup Control Module */}
        <BackupControl
          groups={groups}
          cards={cards}
          onImportBackup={handleImportBackup}
        />

      </main>

      {/* Footer Branding block */}
      <footer className="bg-white dark:bg-[#334155] border-t border-slate-200 dark:border-white/10 py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-2">
          <p className="text-xs font-bold text-slate-500 dark:text-slate-400 flex items-center justify-center gap-1.5 uppercase tracking-wider">
            <BookOpen className="h-4 w-4 text-red-500" />
            Curatube Workspace - Curadoria Pessoal de Vídeos
          </p>
          <p className="text-[11px] text-slate-500 dark:text-slate-500">
            Todos os seus dados estão protegidos e são armazenados localmente no seu navegador em tempo real. Use a exportação de backup para portar seus dados.
          </p>
        </div>
      </footer>

      {/* 8. Modals Orchestrations */}
      {/* Modal: Add Card */}
      {activeAddGroupId !== null && (
        <AddCardModal
          groupId={activeAddGroupId}
          onClose={() => setActiveAddGroupId(null)}
          onSave={handleAddCardSave}
        />
      )}

      {/* Modal: Edit Card */}
      {activeEditCard !== null && (
        <EditCardModal
          card={activeEditCard}
          groups={groups}
          onClose={() => setActiveEditCard(null)}
          onSave={handleUpdateCard}
        />
      )}

      {/* Modal: Add Group */}
      {showAddGroupModal && (
        <AddGroupModal
          onClose={() => setShowAddGroupModal(false)}
          onSave={handleAddGroup}
        />
      )}

      {/* Modal: Organize Groups */}
      {showOrganizeGroupsModal && (
        <OrganizeGroupsModal
          groups={groups}
          onMoveGroup={handleMoveGroup}
          onClose={() => setShowOrganizeGroupsModal(false)}
        />
      )}

      {/* Modal: Edit Group */}
      {activeEditGroup !== null && (
        <EditGroupModal
          group={activeEditGroup}
          onClose={() => setActiveEditGroup(null)}
          onSave={handleEditGroupSave}
        />
      )}

      {/* Modal: Manage Tags */}
      {showManageTagsModal && (
        <ManageTagsModal
          allTags={allTags}
          onClose={() => setShowManageTagsModal(false)}
          onDeleteTag={handleDeleteTag}
          onEditTag={handleEditTag}
          onAddTag={handleAddGlobalTag}
        />
      )}

    </div>
  );
}
