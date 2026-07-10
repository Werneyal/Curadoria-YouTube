export interface VideoCard {
  id: string;
  url: string;
  videoId: string;
  title: string;
  channelName: string;
  description: string;
  thumbnailUrl: string;
  isLiked: boolean;
  rating: number; // 0 to 5 stars
  color: string; // Tailwind bg-class or custom hex
  notes: string;
  groupId: string;
  createdAt: number;
  tags?: string[];
}

export interface Group {
  id: string;
  name: string;
  description: string;
  order: number;
  createdAt: number;
}

export interface BackupData {
  version: string;
  groups: Group[];
  cards: VideoCard[];
  exportedAt: number;
}
