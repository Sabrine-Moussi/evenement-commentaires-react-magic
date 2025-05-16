
import { Event, Comment } from "../types";

export const events: Event[] = [
  {
    id: "1",
    title: "Conférence Tech Innovation 2025",
    description: "Venez découvrir les dernières innovations technologiques et les tendances de demain lors de notre conférence annuelle.",
    date: "2025-06-15",
    location: "Palais des Congrès, Paris",
    imageUrl: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=1000",
    organizer: "Tech Solutions",
    category: "Conférence"
  },
  {
    id: "2",
    title: "Concert de Jazz au Parc",
    description: "Une soirée musicale exceptionnelle avec les meilleurs artistes de jazz du moment dans un cadre verdoyant.",
    date: "2025-07-10",
    location: "Parc des Expositions, Lyon",
    imageUrl: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1000",
    organizer: "Music Events",
    category: "Concert"
  },
  {
    id: "3",
    title: "Exposition d'Art Contemporain",
    description: "Découvrez les œuvres des artistes émergents qui façonnent l'art contemporain d'aujourd'hui.",
    date: "2025-08-05",
    location: "Galerie Moderne, Marseille",
    imageUrl: "https://images.unsplash.com/photo-1531058020387-3be344556be6?q=80&w=1000",
    organizer: "Art & Culture",
    category: "Exposition"
  },
  {
    id: "4",
    title: "Atelier de Cuisine Française",
    description: "Apprenez à cuisiner comme un chef français avec nos instructeurs professionnels dans une ambiance conviviale.",
    date: "2025-09-20",
    location: "École de Cuisine, Bordeaux",
    imageUrl: "https://images.unsplash.com/photo-1556910103-1c02745aee4d?q=80&w=1000",
    organizer: "Gourmet France",
    category: "Atelier"
  },
  {
    id: "5",
    title: "Tournoi de Tennis Amateur",
    description: "Participez à notre tournoi annuel ouvert à tous les niveaux et passez un moment sportif et convivial.",
    date: "2025-10-12",
    location: "Centre Sportif Municipal, Toulouse",
    imageUrl: "https://images.unsplash.com/photo-1595435934249-5df7ed86e1c1?q=80&w=1000",
    organizer: "Sport Pour Tous",
    category: "Sport"
  },
  {
    id: "6",
    title: "Salon du Livre Ancien",
    description: "Une occasion unique pour les bibliophiles de découvrir des ouvrages rares et de rencontrer des collectionneurs passionnés.",
    date: "2025-11-08",
    location: "Bibliothèque Historique, Nice",
    imageUrl: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=1000",
    organizer: "Association des Livres Anciens",
    category: "Autre"
  }
];

export const comments: Comment[] = [
  {
    id: "c1",
    eventId: "1",
    author: "Marie Dupont",
    content: "J'ai assisté à l'édition précédente et c'était formidable. Je recommande vivement !",
    date: "2025-05-10"
  },
  {
    id: "c2",
    eventId: "1",
    author: "Pierre Martin",
    content: "Est-ce que le programme détaillé est déjà disponible quelque part ?",
    date: "2025-05-11"
  },
  {
    id: "c3",
    eventId: "2",
    author: "Lucie Bernard",
    content: "Je suis une grande fan de jazz, j'ai hâte de participer à cet événement !",
    date: "2025-05-12"
  },
  {
    id: "c4",
    eventId: "3",
    author: "Thomas Petit",
    content: "Quels artistes seront présents à cette exposition ?",
    date: "2025-05-13"
  }
];
