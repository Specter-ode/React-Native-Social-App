import { createSlice } from "@reduxjs/toolkit";

import {
  createPost,
  deletePost,
  addComment,
  deleteComment,
  addLike,
  deleteLike,
} from "./dashboard-operations";

const initialState = {
  posts: [],
  error: null,
  isLoading: false,
};

const dashboardSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    handlePosts: (state, { payload }) => {
      state.posts = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // ------------Create Post--------------
      .addCase(createPost.pending, (store) => {
        store.isLoading = true;
        store.error = null;
      })
      .addCase(createPost.fulfilled, (store, { payload }) => {
        store.isLoading = false;
      })
      .addCase(createPost.rejected, (store, { payload }) => {
        store.error = payload;
        store.isLoading = false;
      })
      // ------------Delete Post--------------
      .addCase(deletePost.pending, (store) => {
        store.isLoading = true;
        store.error = null;
      })
      .addCase(deletePost.fulfilled, (store) => {
        store.isLoading = false;
      })
      .addCase(deletePost.rejected, (store, { payload }) => {
        store.error = payload;
        store.isLoading = false;
      })

      // ------------Add Comment--------------
      .addCase(addComment.pending, (store) => {
        store.isLoading = true;
        store.error = null;
      })
      .addCase(addComment.fulfilled, (store, { payload }) => {
        store.isLoading = false;
      })
      .addCase(addComment.rejected, (store, { payload }) => {
        store.error = payload;
        store.isLoading = false;
      })

      // ------------Delete Comment--------------
      .addCase(deleteComment.pending, (store) => {
        store.isLoading = true;
        store.error = null;
      })
      .addCase(deleteComment.fulfilled, (store) => {
        store.isLoading = false;
      })
      .addCase(deleteComment.rejected, (store, { payload }) => {
        store.error = payload;
        store.isLoading = false;
      })
      .addCase(addLike.pending, (store) => {
        store.isLoading = true;
        store.error = null;
      })
      .addCase(addLike.fulfilled, (store) => {
        store.isLoading = false;
      })
      .addCase(addLike.rejected, (store, { payload }) => {
        store.error = payload;
        store.isLoading = false;
      })
      .addCase(deleteLike.pending, (store) => {
        store.isLoading = true;
        store.error = null;
      })
      .addCase(deleteLike.fulfilled, (store) => {
        store.isLoading = false;
      })
      .addCase(deleteLike.rejected, (store, { payload }) => {
        store.error = payload;
        store.isLoading = false;
      });
  },
});

export const { handlePosts, handleComments } = dashboardSlice.actions;
export default dashboardSlice.reducer;
