import { useSelector } from 'react-redux';
import { CommentCard } from '../comment-card/CommentCard';

export const CommentsList = () => {
  const { comments } = useSelector(store => store.comments);

  return (
    <div>
      {comments.map(comment => (
        <CommentCard
          key={comment.id}
          id={comment.id}
          user={comment.user}
          createdAt={comment.createdAt}
          content={comment.content}
          score={comment.score}
          replies={comment.replies}
        />
      ))}
    </div>
  );
};
