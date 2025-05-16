
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Event } from "@/types";
import { createEvent } from "@/services/eventService";
import EventForm from "@/components/admin/EventForm";
import { useToast } from "@/hooks/use-toast";

const CreateEvent = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleCreateEvent = async (eventData: Omit<Event, "id">) => {
    setIsSubmitting(true);
    try {
      const newEvent = createEvent(eventData);
      toast({
        title: "Événement créé",
        description: `L'événement "${newEvent.title}" a été créé avec succès.`,
      });
      navigate("/admin/events");
    } catch (error) {
      console.error("Erreur lors de la création de l'événement:", error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la création de l'événement.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Créer un événement | Administration</title>
      </Helmet>

      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6">Créer un nouvel événement</h1>
        
        <div className="bg-card rounded-lg border p-6">
          <EventForm onSubmit={handleCreateEvent} isSubmitting={isSubmitting} />
        </div>
      </div>
    </>
  );
};

export default CreateEvent;
