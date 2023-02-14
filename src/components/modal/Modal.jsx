import { useDispatch, useSelector } from 'react-redux';
import { deleteComment, setIsModalOpen } from '../../features/comments/commentsSlice';

export const Modal = () => {
  const { commentToInteractWith } = useSelector(store => store.comments);
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(setIsModalOpen(false));
    dispatch(deleteComment(commentToInteractWith));
  };

  return (
    <div className='absolute top-0 left-0 right-0 bottom-0 p-5 min-h-screen z-10 flex items-start justify-center bg-[rgba(0,_0,_0,_0.6)]'>
      <div className='mt-36 bg-white dark:bg-[#222831] max-w-sm p-7 rounded-lg flex flex-col gap-y-4'>
        <h1 className='text-[#324152] dark:text-white text-xl font-medium'>Delete comment</h1>
        <p className='text-[#67727e] dark:text-[#dfdfdf]'>
          Are you sure you want to delete this comment? This will remove the comment and can't be
          undone.
        </p>
        <div className='flex gap-x-3'>
          <button
            onClick={() => dispatch(setIsModalOpen(false))}
            className='rounded-lg text-white w-full py-3 px-4 bg-[hsl(211,_10%,_45%)]'
          >
            NO, CANCEL
          </button>
          <button
            onClick={handleDelete}
            className='rounded-lg text-white w-full py-3 px-4 bg-[hsl(358,_79%,_66%)]'
          >
            YES, DELETE
          </button>
        </div>
      </div>
    </div>
  );
};
