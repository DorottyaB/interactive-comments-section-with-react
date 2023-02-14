import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setComment,
  setIsModalOpen,
  setIsTextareaOpen,
} from '../../features/comments/commentsSlice';
import { ButtonScore } from '../button-score/ButtonScore';
import { NewComment } from '../new-comment/NewComment';

export const Card = ({ id, user, createdAt, content, score }) => {
  const { isTextareaOpen, commentToInteractWith } = useSelector(store => store.comments);
  const { username } = useSelector(store => store.user);
  const [type, setType] = useState('');
  const dispatch = useDispatch();

  const handleClick = (commentId, commentType) => {
    dispatch(setComment(commentId));
    dispatch(setIsTextareaOpen(!isTextareaOpen));
    setType(commentType);
  };

  const openModal = commentId => {
    dispatch(setComment(commentId));
    dispatch(setIsModalOpen(true));
  };

  return (
    <div>
      {type === 'update' && commentToInteractWith === id ? null : (
        <div className='bg-white dark:bg-[#2a2d33] p-5 rounded-lg shadow grid gap-y-4 items-center grid-cols-2 grid-rows-[repeat(3,_max-content)] md:grid-cols-[auto,_1fr,_auto] md:grid-rows-[repeat(2,_max-content)] md:items-start md:gap-x-6 md:p-7'>
          <div className='flex items-center gap-3 col-span-full md:col-start-2 md:row-start-1'>
            <div className='overflow-hidden w-10 h-10 rounded-full'>
              <img src={user.image.webp} alt='User avatar' />
            </div>
            <p className='font-bold text-[hsl(212,_24%,_26%)] dark:text-white'>{user.username}</p>
            {username === user.username && (
              <div className='bg-[hsl(238,_40%,_52%)] px-[6px] rounded-sm'>
                <span className='text-[hsl(228,_33%,_97%)] text-sm align-text-bottom'>you</span>
              </div>
            )}
            <p>{createdAt}</p>
          </div>
          <p className='col-span-full md:col-start-2'>{content}</p>
          <ButtonScore score={score} user={user} />
          {username === user.username ? (
            <div className='flex gap-4 md:row-start-1 md:col-start-3 justify-end'>
              <button
                onClick={() => openModal(id)}
                className='flex items-center gap-2 justify-self-end '
              >
                <svg width='12' height='14' xmlns='http://www.w3.org/2000/svg'>
                  <path
                    d='M1.167 12.448c0 .854.7 1.552 1.555 1.552h6.222c.856 0 1.556-.698 1.556-1.552V3.5H1.167v8.948Zm10.5-11.281H8.75L7.773 0h-3.88l-.976 1.167H0v1.166h11.667V1.167Z'
                    fill='#ED6368'
                  />
                </svg>
                <span className='text-[hsl(358,_79%,_66%)]'>Delete</span>
              </button>
              <button
                onClick={() => handleClick(id, 'update')}
                className='flex items-center gap-2 justify-self-end'
              >
                <svg width='14' height='14' xmlns='http://www.w3.org/2000/svg'>
                  <path
                    d='M13.479 2.872 11.08.474a1.75 1.75 0 0 0-2.327-.06L.879 8.287a1.75 1.75 0 0 0-.5 1.06l-.375 3.648a.875.875 0 0 0 .875.954h.078l3.65-.333c.399-.04.773-.216 1.058-.499l7.875-7.875a1.68 1.68 0 0 0-.061-2.371Zm-2.975 2.923L8.159 3.449 9.865 1.7l2.389 2.39-1.75 1.706Z'
                    fill='#5357B6'
                  />
                </svg>
                <span>Edit</span>
              </button>
            </div>
          ) : (
            <button
              className='flex items-center gap-2 justify-self-end md:row-start-1 md:col-start-3'
              onClick={() => handleClick(id, 'reply')}
            >
              <svg width='14' height='13' xmlns='http://www.w3.org/2000/svg'>
                <path
                  d='M.227 4.316 5.04.16a.657.657 0 0 1 1.085.497v2.189c4.392.05 7.875.93 7.875 5.093 0 1.68-1.082 3.344-2.279 4.214-.373.272-.905-.07-.767-.51 1.24-3.964-.588-5.017-4.829-5.078v2.404c0 .566-.664.86-1.085.496L.227 5.31a.657.657 0 0 1 0-.993Z'
                  fill='#5357B6'
                />
              </svg>
              <span>Reply</span>
            </button>
          )}
        </div>
      )}
      {isTextareaOpen && commentToInteractWith === id ? (
        <NewComment type={type} id={id} contentToEdit={content} />
      ) : null}
    </div>
  );
};
