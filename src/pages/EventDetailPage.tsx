
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Event, Comment } from "@/types";
import { events, comments as allComments } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CommentList from "@/components/CommentList";
import CommentForm from "@/components/CommentForm";

const EventDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [event, setEvent] = useState<Event | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simuler le chargement depuis une API
    const timer = setTimeout(() => {
      const foundEvent = events.find((e) => e.id === id);
      setEvent(foundEvent || null);
      
      // Filtrer les commentaires pour cet événement
      const eventComments = allComments.filter((c) => c.eventId === id);
      setComments(eventComments);
      
      setLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [id]);

  const handleCommentAdded = (newComment: Comment) => {
    setComments([...comments, newComment]);
  };

  // Formater la date
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'long',
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString('fr-FR', options);
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="container py-16 flex justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary" />
        </div>
        <Footer />
      </>
    );
  }

  if (!event) {
    return (
      <>
        <Navbar />
        <div className="container py-16 text-center">
          <h1 className="text-3xl font-bold mb-4">Événement non trouvé</h1>
          <p className="mb-6">L'événement que vous recherchez n'existe pas ou a été supprimé.</p>
          <Button asChild>
            <Link to="/events">Retour aux événements</Link>
          </Button>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>{event.title} | EventsManager</title>
      </Helmet>

      <Navbar />
      
      <main className="container py-8">
        <div className="mb-4">
          <Link to="/events" className="text-primary hover:text-primary/80 flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-4 h-4 mr-2"
            >
              <path
                fillRule="evenodd"
                d="M7.72 12.53a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 1 1 1.06 1.06L9.31 12l6.97 6.97a.75.75 0 1 1-1.06 1.06l-7.5-7.5Z"
                clipRule="evenodd"
              />
            </svg>
            Retour aux événements
          </Link>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="rounded-lg overflow-hidden mb-6">
              <img 
                src={event.imageUrl} 
                alt={event.title} 
                className="w-full h-auto object-cover max-h-[400px]" 
              />
            </div>
            
            <div className="mb-8">
              <div className="flex items-center justify-between mb-2">
                <h1 className="text-3xl font-bold">{event.title}</h1>
                <Badge className="bg-secondary hover:bg-secondary">
                  {event.category}
                </Badge>
              </div>
              
              <p className="text-muted-foreground mb-6">
                Organisé par <span className="font-medium">{event.organizer}</span>
              </p>
              
              <div className="prose max-w-none">
                <p>{event.description}</p>
              </div>
            </div>

            <Separator className="my-8" />
            
            <div>
              <h2 className="text-2xl font-bold mb-6">Commentaires</h2>
              <CommentList comments={comments} />
              <div className="mt-8">
                <CommentForm eventId={event.id} onCommentAdded={handleCommentAdded} />
              </div>
            </div>
          </div>
          
          <div>
            <div className="bg-accent/30 rounded-lg p-6 sticky top-20">
              <h3 className="text-lg font-bold mb-4">Détails de l'événement</h3>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="rounded-full bg-primary/10 p-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-5 h-5 text-primary"
                    >
                      <path d="M12.75 12.75a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM7.5 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM8.25 17.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM9.75 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM10.5 17.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM12.75 17.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM14.25 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM15 17.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM16.5 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM15 12.75a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM16.5 13.5a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" />
                      <path
                        fillRule="evenodd"
                        d="M6.75 2.25A.75.75 0 0 1 7.5 3v1.5h9V3A.75.75 0 0 1 18 3v1.5h.75a3 3 0 0 1 3 3v11.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V7.5a3 3 0 0 1 3-3H6V3a.75.75 0 0 1 .75-.75Zm13.5 9a1.5 1.5 0 0 0-1.5-1.5H5.25a1.5 1.5 0 0 0-1.5 1.5v7.5a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5v-7.5Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium">Date</h4>
                    <p>{formatDate(event.date)}</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="rounded-full bg-primary/10 p-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-5 h-5 text-primary"
                    >
                      <path fillRule="evenodd" d="m11.54 22.351.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 1.144-.742 19.58 19.58 0 0 0 2.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 0 0-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 0 0 2.682 2.282 16.975 16.975 0 0 0 1.145.742ZM12 13.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium">Lieu</h4>
                    <p>{event.location}</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 space-y-4">
                <Button className="w-full">Participer à cet événement</Button>
                <Button variant="outline" className="w-full">
                  Partager l'événement
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default EventDetailPage;
