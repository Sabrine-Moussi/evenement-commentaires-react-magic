
export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  imageUrl: string;
  organizer: string;
  category: string;
}

export interface Comment {
  id: string;
  eventId: string;
  author: string;
  content: string;
  date: string;
}

export type Category = "Tous" | "Conférence" | "Concert" | "Exposition" | "Atelier" | "Sport" | "Autre";
