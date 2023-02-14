import { createSlice } from '@reduxjs/toolkit';
import data from '../../data.json';
import { v4 as uuidv4 } from 'uuid';

const initialState = {
  ...data,
  isTextareaOpen: false,
  isModalOpen: false,
  commentToInteractWith: '',
};

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    addComment(state, action) {
      const { content, createdAt, username, image } = action.payload;
      state.comments.push({
        id: uuidv4(),
        content: content,
        replies: [],
        score: 0,
        user: {
          username: username,
          image: { ...image },
        },
        createdAt: createdAt,
      });
    },
    replyToComment(state, action) {
      const { id, content, createdAt, username, image } = action.payload;
      const existingComment = state.comments
        .map(comment =>
          comment.id === id ? comment : comment.replies.find(reply => reply.id === id)
        )
        .filter(c => c)[0];

      const reply = {
        id: uuidv4(),
        content: content,
        replyingTo: existingComment.user.username,
        score: 0,
        user: {
          username: username,
          image: { ...image },
        },
        createdAt: createdAt,
      };

      if (existingComment.replies) {
        existingComment.replies.push(reply);
      } else {
        const originalComment = state.comments.find(comment => {
          return comment.replies.find(reply => reply.id === id);
        });
        originalComment.replies.push(reply);
      }
    },
    deleteComment(state, action) {
      const id = action.payload;
      const comment = state.comments.find(comment => comment.id === id);
      if (comment) {
        state.comments = state.comments.filter(comment => comment.id !== id);
      } else {
        state.comments = state.comments.map(comment => {
          return { ...comment, replies: comment.replies.filter(reply => reply.id !== id) };
        });
      }
    },
    editComment(state, action) {
      const { id, content } = action.payload;
      const commentToEdit = state.comments
        .map(comment =>
          comment.id === id ? comment : comment.replies.find(reply => reply.id === id)
        )
        .filter(c => c)[0];
      commentToEdit.content = content;
    },
    setComment(state, action) {
      state.commentToInteractWith = action.payload;
    },
    setIsTextareaOpen(state, action) {
      state.isTextareaOpen = action.payload;
    },
    setIsModalOpen(state, action) {
      state.isModalOpen = action.payload;
    },
  },
});

export const {
  addComment,
  replyToComment,
  deleteComment,
  editComment,
  setComment,
  setIsTextareaOpen,
  setIsModalOpen,
} = commentsSlice.actions;
export default commentsSlice.reducer;
