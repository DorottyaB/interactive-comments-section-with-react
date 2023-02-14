import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { CommentsList } from './components/comments-list/CommentsList';
import { Modal } from './components/modal/Modal';
import { NewComment } from './components/new-comment/NewComment';

function App() {
  const { isModalOpen } = useSelector(store => store.comments);
  useEffect(() => {
    if (isModalOpen) {
      window.scrollTo({ top: 0, left: 0 });
    }
  }, [isModalOpen]);

  return (
    <div className='lg:max-w-3xl'>
      <CommentsList />
      <NewComment />
      {isModalOpen && <Modal />}
    </div>
  );
}

export default App;
