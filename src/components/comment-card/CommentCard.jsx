import { Card } from '../card/Card';

export const CommentCard = ({ id, user, createdAt, content, score, replies }) => {
  return (
    <div className='pt-5'>
      <Card
        id={id}
        user={user}
        createdAt={createdAt}
        content={content}
        score={score}
        isReply={false}
      />
      {replies.length > 0 && (
        <div className='mt-5 md:ml-11'>
          {replies.length > 0 &&
            replies.map(reply => (
              <div
                key={reply.id}
                className='pt-5 pl-5 border-l border-[hsl(211,_10%,_75%)] dark:border-[#393E46] md:pl-11 reply-container'
              >
                <Card
                  id={reply.id}
                  user={reply.user}
                  createdAt={reply.createdAt}
                  content={reply.content}
                  score={reply.score}
                  isReply={true}
                />
              </div>
            ))}
        </div>
      )}
    </div>
  );
};
