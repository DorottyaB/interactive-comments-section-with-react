import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useDate from '../../custom-hooks/useDate';
import {
  addComment,
  editComment,
  replyToComment,
  setComment,
  setIsTextareaOpen,
} from '../../features/comments/commentsSlice';
import { ButtonMain } from '../button-main/ButtonMain';

export const NewComment = ({ type, id, contentToEdit }) => {
  const { isTextareaOpen } = useSelector(store => store.comments);
  const { username, image } = useSelector(store => store.user);
  const [content, setContent] = useState(type === 'update' ? contentToEdit : '');
  const dispatch = useDispatch();

  function handleSubmit(e) {
    e.preventDefault();
    const date = new Date();
    const createdAt = useDate(date);
    if (type === 'reply') {
      dispatch(replyToComment({ content, createdAt, id, username, image }));
    } else if (type === 'update') {
      dispatch(editComment({ content, id }));
    } else {
      dispatch(addComment({ content, createdAt, username, image }));
    }
    setContent('');
    dispatch(setIsTextareaOpen(!isTextareaOpen));
    dispatch(setComment(''));
  }

  return (
    <form
      onSubmit={handleSubmit}
      className='bg-white dark:bg-[#2a2d33] mt-5 p-5 rounded-lg shadow grid grid-cols-2 grid-rows-[repeat(2,_max-content)] md:p-7 md:grid-cols-[repeat(3,_auto)] md:grid-rows-1 md:items-start md:gap-x-5'
    >
      {/* <label htmlFor='newComment' aria-label='Add a comment'></label> */}
      <textarea
        value={content}
        onChange={e => setContent(e.target.value)}
        className='border border-[hsl(211,_10%,_75%)] py-3 px-5 mb-5 w-full col-span-full rounded-md focus-visible:outline-[hsl(238,_40%,_52%)] focus-visible:outline-1 md:col-start-2 md:col-end-3 md:row-start-1 resize-none dark:bg-[#2f333a] dark:border-none'
        name='comment'
        id='newComment'
        rows={4}
        cols={50}
        maxLength={300}
        placeholder='Add a comment...'
        required
      />
      <div className='overflow-hidden w-10 h-10 md:w-16 md:h-16 rounded-full md:col-start-1 md:row-start-1'>
        <img src={image.webp} alt='User avatar' />
      </div>
      <ButtonMain text={type || 'Send'} />
    </form>
  );
};
