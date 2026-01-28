export interface MovieCard {
    id: number;
    title: string;
    description: string;
    duration: string;
    ageRating: string;
    approval: number;
    provider: string;
    isTop10: boolean;
    topLabel?: string;
  }