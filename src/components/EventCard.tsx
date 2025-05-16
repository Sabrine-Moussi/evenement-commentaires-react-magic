
import { Link } from "react-router-dom";
import { Event } from "@/types";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface EventCardProps {
  event: Event;
}

const EventCard = ({ event }: EventCardProps) => {
  // Formater la date
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString('fr-FR', options);
  };

  return (
    <Card className="event-card overflow-hidden h-full flex flex-col">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={event.imageUrl} 
          alt={event.title} 
          className="w-full h-full object-cover" 
        />
        <Badge className="absolute top-2 right-2 bg-secondary hover:bg-secondary">
          {event.category}
        </Badge>
      </div>
      <CardHeader>
        <h3 className="font-bold text-xl truncate">{event.title}</h3>
        <p className="text-sm text-muted-foreground">
          {formatDate(event.date)}
        </p>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-sm line-clamp-3">{event.description}</p>
        <p className="text-sm mt-2 flex items-center gap-1 text-muted-foreground">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-4 h-4"
          >
            <path fillRule="evenodd" d="m11.54 22.351.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 1.144-.742 19.58 19.58 0 0 0 2.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 0 0-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 0 0 2.682 2.282 16.975 16.975 0 0 0 1.145.742ZM12 13.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" clipRule="evenodd" />
          </svg>
          {event.location}
        </p>
      </CardContent>
      <CardFooter className="border-t pt-4">
        <Link 
          to={`/events/${event.id}`}
          className="text-primary hover:text-primary/80 font-medium text-sm"
        >
          Voir les détails
        </Link>
        <span className="text-xs text-muted-foreground ml-auto">
          Organisé par {event.organizer}
        </span>
      </CardFooter>
    </Card>
  );
};

export default EventCard;
