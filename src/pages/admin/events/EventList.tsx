
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { getAllEvents, deleteEvent } from "@/services/eventService";
import { Event } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";

const EventList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("Tous");
  const [events, setEvents] = useState<Event[]>([]);
  const [eventToDelete, setEventToDelete] = useState<Event | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const { toast } = useToast();

  // Charger les événements
  useEffect(() => {
    const loadEvents = () => {
      const eventsData = getAllEvents();
      setEvents(eventsData);
    };
    loadEvents();
  }, []);

  // Filtrer les événements
  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          event.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === "Tous" || event.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  // Les catégories disponibles
  const categories = ["Tous", "Conférence", "Concert", "Exposition", "Atelier", "Sport", "Autre"];

  // Formater la date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR');
  };

  // Ouvrir la boîte de dialogue de confirmation
  const confirmDelete = (event: Event) => {
    setEventToDelete(event);
    setIsDeleteDialogOpen(true);
  };

  // Supprimer l'événement
  const handleDelete = () => {
    if (eventToDelete) {
      const success = deleteEvent(eventToDelete.id);
      if (success) {
        setEvents(getAllEvents()); // Rafraîchir la liste
        toast({
          title: "Événement supprimé",
          description: `L'événement "${eventToDelete.title}" a bien été supprimé.`,
        });
      } else {
        toast({
          title: "Erreur",
          description: "Une erreur est survenue lors de la suppression.",
          variant: "destructive",
        });
      }
      setIsDeleteDialogOpen(false);
      setEventToDelete(null);
    }
  };

  return (
    <>
      <Helmet>
        <title>Liste des événements | Administration</title>
      </Helmet>

      <div className="p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">Événements</h1>
            <p className="text-muted-foreground">Gérez les événements de votre plateforme.</p>
          </div>
          <Button asChild className="mt-4 md:mt-0">
            <Link to="/admin/events/create">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-4 h-4 mr-2"
              >
                <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 9a.75.75 0 0 0-1.5 0v2.25H9a.75.75 0 0 0 0 1.5h2.25V15a.75.75 0 0 0 1.5 0v-2.25H15a.75.75 0 0 0 0-1.5h-2.25V9Z" clipRule="evenodd" />
              </svg>
              Ajouter un événement
            </Link>
          </Button>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="md:w-2/3">
            <Input
              placeholder="Rechercher un événement..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="md:w-1/3">
            <Select
              value={filterCategory}
              onValueChange={(value) => setFilterCategory(value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Filtrer par catégorie" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Titre</TableHead>
                <TableHead>Catégorie</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Lieu</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredEvents.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8">
                    Aucun événement trouvé
                  </TableCell>
                </TableRow>
              ) : (
                filteredEvents.map((event) => (
                  <TableRow key={event.id}>
                    <TableCell>
                      <Link
                        to={`/admin/events/${event.id}`}
                        className="font-medium hover:text-primary transition-colors"
                      >
                        {event.title}
                      </Link>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary">{event.category}</Badge>
                    </TableCell>
                    <TableCell>{formatDate(event.date)}</TableCell>
                    <TableCell className="truncate max-w-[200px]">
                      {event.location}
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            Actions
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem asChild>
                            <Link to={`/events/${event.id}`}>
                              Voir sur le site
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link to={`/admin/events/${event.id}`}>
                              Modifier
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="text-red-600"
                            onClick={() => confirmDelete(event)}
                          >
                            Supprimer
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Boîte de dialogue de confirmation de suppression */}
      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmer la suppression</AlertDialogTitle>
            <AlertDialogDescription>
              Êtes-vous sûr de vouloir supprimer l'événement "{eventToDelete?.title}" ?
              Cette action ne peut pas être annulée.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDelete}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              Supprimer
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default EventList;
