
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

interface CommentFormProps {
  eventId: string;
  onCommentAdded: (comment: { id: string; eventId: string; author: string; content: string; date: string }) => void;
}

const CommentForm = ({ eventId, onCommentAdded }: CommentFormProps) => {
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!author.trim() || !content.trim()) {
      toast({
        title: "Champs requis",
        description: "Veuillez remplir tous les champs.",
        variant: "destructive",
      });
      return;
    }
    
    // Simuler un envoi asynchrone
    setIsSubmitting(true);
    setTimeout(() => {
      // Générer un ID unique pour le commentaire
      const newComment = {
        id: `c${Date.now()}`,
        eventId,
        author,
        content,
        date: new Date().toISOString().split('T')[0]
      };
      
      onCommentAdded(newComment);
      
      // Réinitialiser le formulaire
      setAuthor("");
      setContent("");
      setIsSubmitting(false);
      
      toast({
        title: "Commentaire ajouté",
        description: "Votre commentaire a été publié avec succès.",
      });
    }, 500);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h3 className="text-lg font-medium">Laisser un commentaire</h3>
      <Input
        placeholder="Votre nom"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        disabled={isSubmitting}
      />
      <Textarea
        placeholder="Votre commentaire..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows={4}
        disabled={isSubmitting}
      />
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Publication..." : "Publier"}
      </Button>
    </form>
  );
};

export default CommentForm;
