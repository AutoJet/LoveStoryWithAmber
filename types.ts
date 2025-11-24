export interface TimelineEvent {
  id: string;
  date: string; // ISO format YYYY-MM-DD
  title: string;
  description: string;
  imageUrl?: string;
  isCustom?: boolean;
}

export interface AdminState {
  isOpen: boolean;
  isAuthenticated: boolean;
}