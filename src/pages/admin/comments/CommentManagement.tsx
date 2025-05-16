
import { useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { comments, events } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
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
import { useToast } from "@/hooks/use-toast";

const CommentManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterEvent, setFilterEvent] = useState("Tous");
  const [selectedComments, setSelectedComments] = useState<string[]>([]);
  const { toast } = useToast();

  // Récupérer les commentaires avec les titres d'événements
  const commentsWithEventInfo = comments.map(comment => {
    const event = events.find(e => e.id === comment.eventId);
    return {
      ...comment,
      eventTitle: event ? event.title : "Événement inconnu"
    };
  });

  // Filtrer les commentaires
  const filteredComments = commentsWithEventInfo.filter(comment => {
    const matchesSearch = comment.content.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          comment.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesEvent = filterEvent === "Tous" || comment.eventId === filterEvent;
    return matchesSearch && matchesEvent;
  });

  // Obtenir la liste des événements pour le filtre
  const eventOptions = [
    { id: "Tous", title: "Tous les événements" },
    ...events.map(event => ({ id: event.id, title: event.title }))
  ];

  // Formater la date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR');
  };

  // Gérer la sélection ou désélection de tous les commentaires
  const toggleSelectAll = () => {
    if (selectedComments.length === filteredComments.length) {
      setSelectedComments([]);
    } else {
      setSelectedComments(filteredComments.map(comment => comment.id));
    }
  };

  // Gérer la suppression des commentaires sélectionnés
  const handleDeleteSelected = () => {
    toast({
      title: `${selectedComments.length} commentaire(s) supprimé(s)`,
      description: "Les commentaires sélectionnés ont été supprimés avec succès."
    });
    setSelectedComments([]);
  };

  // Gérer la sélection individuelle
  const toggleCommentSelection = (id: string) => {
    if (selectedComments.includes(id)) {
      setSelectedComments(selectedComments.filter(commentId => commentId !== id));
    } else {
      setSelectedComments([...selectedComments, id]);
    }
  };

  // Gérer l'approbation d'un commentaire
  const approveComment = (id: string) => {
    toast({
      title: "Commentaire approuvé",
      description: "Le commentaire a été approuvé et publié."
    });
  };

  // Gérer la suppression d'un commentaire
  const deleteComment = (id: string) => {
    toast({
      title: "Commentaire supprimé",
      description: "Le commentaire a été supprimé avec succès."
    });
  };

  return (
    <>
      <Helmet>
        <title>Gestion des commentaires | Administration</title>
      </Helmet>

      <div className="p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">Commentaires</h1>
            <p className="text-muted-foreground">Gérez et modérez les commentaires des utilisateurs.</p>
          </div>
          {selectedComments.length > 0 && (
            <div className="mt-4 md:mt-0 flex space-x-2">
              <Button variant="destructive" onClick={handleDeleteSelected}>
                Supprimer ({selectedComments.length})
              </Button>
              <Button 
                variant="outline"
                onClick={() => setSelectedComments([])}
              >
                Annuler
              </Button>
            </div>
          )}
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="md:w-2/3">
            <Input
              placeholder="Rechercher un commentaire..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="md:w-1/3">
            <Select
              value={filterEvent}
              onValueChange={(value) => setFilterEvent(value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Filtrer par événement" />
              </SelectTrigger>
              <SelectContent>
                {eventOptions.map((event) => (
                  <SelectItem key={event.id} value={event.id}>
                    {event.title}
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
                <TableHead className="w-12">
                  <Checkbox 
                    checked={selectedComments.length === filteredComments.length && filteredComments.length > 0}
                    onCheckedChange={toggleSelectAll}
                    aria-label="Sélectionner tous les commentaires"
                  />
                </TableHead>
                <TableHead>Auteur</TableHead>
                <TableHead>Contenu</TableHead>
                <TableHead>Événement</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredComments.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8">
                    Aucun commentaire trouvé
                  </TableCell>
                </TableRow>
              ) : (
                filteredComments.map((comment) => (
                  <TableRow key={comment.id}>
                    <TableCell>
                      <Checkbox 
                        checked={selectedComments.includes(comment.id)}
                        onCheckedChange={() => toggleCommentSelection(comment.id)}
                        aria-label={`Sélectionner le commentaire de ${comment.author}`}
                      />
                    </TableCell>
                    <TableCell className="font-medium">{comment.author}</TableCell>
                    <TableCell className="max-w-[300px] truncate">{comment.content}</TableCell>
                    <TableCell>
                      <Link 
                        to={`/events/${comment.eventId}`}
                        className="hover:text-primary transition-colors"
                      >
                        {comment.eventTitle}
                      </Link>
                    </TableCell>
                    <TableCell>{formatDate(comment.date)}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => approveComment(comment.id)}
                        >
                          Approuver
                        </Button>
                        <Button 
                          variant="destructive" 
                          size="sm"
                          onClick={() => deleteComment(comment.id)}
                        >
                          Supprimer
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  );
};

export default CommentManagement;
