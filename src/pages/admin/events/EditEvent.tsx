
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Event } from "@/types";
import { getEventById, updateEvent } from "@/services/eventService";
import EventForm from "@/components/admin/EventForm";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";

const EditEvent = () => {
  const { id } = useParams<{ id: string }>();
  const [event, setEvent] = useState<Event | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      const fetchedEvent = getEventById(id);
      if (fetchedEvent) {
        setEvent(fetchedEvent);
      } else {
        toast({
          title: "Erreur",
          description: "Événement non trouvé",
          variant: "destructive",
        });
        navigate("/admin/events");
      }
    }
    setIsLoading(false);
  }, [id, navigate, toast]);

  const handleUpdateEvent = async (eventData: Omit<Event, "id">) => {
    if (!id) return;
    
    setIsSubmitting(true);
    try {
      const updatedEvent = updateEvent(id, eventData);
      if (updatedEvent) {
        toast({
          title: "Événement mis à jour",
          description: `L'événement "${updatedEvent.title}" a été mis à jour avec succès.`,
        });
        navigate("/admin/events");
      } else {
        throw new Error("Échec de la mise à jour de l'événement");
      }
    } catch (error) {
      console.error("Erreur lors de la mise à jour de l'événement:", error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la mise à jour de l'événement.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="p-6 flex justify-center items-center">
        <div className="text-center">
          <p className="text-muted-foreground">Chargement...</p>
        </div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="p-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Événement non trouvé</h2>
          <p className="text-muted-foreground mb-6">
            L'événement que vous cherchez n'existe pas ou a été supprimé.
          </p>
          <Button onClick={() => navigate("/admin/events")}>
            Retourner à la liste des événements
          </Button>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Modifier un événement | Administration</title>
      </Helmet>

      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6">Modifier l'événement</h1>
        
        <div className="bg-card rounded-lg border p-6">
          <EventForm 
            initialData={event} 
            onSubmit={handleUpdateEvent} 
            isSubmitting={isSubmitting} 
          />
        </div>
      </div>
    </>
  );
};

export default EditEvent;
