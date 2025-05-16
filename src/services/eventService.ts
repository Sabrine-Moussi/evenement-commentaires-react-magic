
import { Event, Category } from "@/types";
import { events as mockEvents } from "@/data/mockData";

// Simuler une base de données avec un état local
let eventsData = [...mockEvents];

// Générer un ID unique
const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
};

// Récupérer tous les événements
export const getAllEvents = (): Event[] => {
  return eventsData;
};

// Récupérer un événement par son ID
export const getEventById = (id: string): Event | undefined => {
  return eventsData.find((event) => event.id === id);
};

// Créer un nouvel événement
export const createEvent = (event: Omit<Event, "id">): Event => {
  const newEvent = {
    ...event,
    id: generateId(),
  };
  eventsData = [...eventsData, newEvent];
  return newEvent;
};

// Mettre à jour un événement existant
export const updateEvent = (id: string, updatedEvent: Omit<Event, "id">): Event | null => {
  const index = eventsData.findIndex((event) => event.id === id);
  if (index === -1) return null;

  const updatedEventWithId = { ...updatedEvent, id };
  eventsData = [
    ...eventsData.slice(0, index),
    updatedEventWithId,
    ...eventsData.slice(index + 1),
  ];
  return updatedEventWithId;
};

// Supprimer un événement
export const deleteEvent = (id: string): boolean => {
  const initialLength = eventsData.length;
  eventsData = eventsData.filter((event) => event.id !== id);
  return eventsData.length !== initialLength;
};

// Récupérer les catégories disponibles
export const getCategories = (): Category[] => {
  return ["Tous", "Conférence", "Concert", "Exposition", "Atelier", "Sport", "Autre"];
};
