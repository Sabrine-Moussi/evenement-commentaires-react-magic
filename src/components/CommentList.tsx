
import { Comment } from "@/types";

interface CommentListProps {
  comments: Comment[];
}

const CommentList = ({ comments }: CommentListProps) => {
  // Formatter la date
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString('fr-FR', options);
  };

  if (comments.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        Aucun commentaire pour le moment. Soyez le premier à commenter !
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {comments.map((comment) => (
        <div key={comment.id} className="comment-item animate-fade-in">
          <div className="flex justify-between items-center mb-2">
            <h4 className="font-medium">{comment.author}</h4>
            <span className="text-xs text-muted-foreground">
              {formatDate(comment.date)}
            </span>
          </div>
          <p className="text-sm">{comment.content}</p>
        </div>
      ))}
    </div>
  );
};

export default CommentList;
