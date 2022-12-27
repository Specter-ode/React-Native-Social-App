import { createAsyncThunk, nanoid } from "@reduxjs/toolkit";
import {
  uploadBytes,
  getDownloadURL,
  ref,
  deleteObject,
} from "firebase/storage";

import {
  arrayRemove,
  arrayUnion,
  deleteDoc,
  doc,
  setDoc,
  updateDoc,
} from "firebase/firestore";

import { auth, storage, db } from "../../firebase";

export const createPost = createAsyncThunk(
  "dashboard/createPost",
  async (postData, { rejectWithValue }) => {
    try {
      const { photo, title, placeDescription, location } = postData;
      const randomId = nanoid();
      // загружаем фото в storage
      const postImageStorageRef = ref(storage, `posts/${randomId}`);
      const responsePhoto = await fetch(photo);
      const photoFile = await responsePhoto.blob();
      await uploadBytes(postImageStorageRef, photoFile);
      const photoURL = await getDownloadURL(postImageStorageRef);
      // ссылка на коллекцию постов
      const postsStorageRef = doc(db, `posts`, randomId);

      await setDoc(postsStorageRef, {
        title,
        placeDescription,
        photo: photoURL,
        location,
        likes: [],
        comments: [],
        postAuthor: auth.currentUser.uid,
        creationDate: new Date().getTime(),
      });
    } catch (error) {
      return rejectWithValue(error.response.data.message || error.message);
    }
  }
);

export const deletePost = createAsyncThunk(
  "dashboard/deletePost",
  async (postId, { rejectWithValue }) => {
    try {
      // удаляем публикацию из database
      const postsStorageRef = doc(db, `posts`, postId);
      await deleteDoc(postsStorageRef);
      // удаляем картинку из storage
      const postImageStorageRef = ref(storage, `posts/${postId}`);
      await deleteObject(postImageStorageRef);
      return;
    } catch (error) {
      return rejectWithValue(error.response.data.message || error.message);
    }
  }
);

export const addLike = createAsyncThunk(
  "dashboard/addLike",
  async (postId, { rejectWithValue }) => {
    try {
      // добавляем лайк и сохраняем в database
      const currentPostRef = doc(db, `posts/${postId}`);
      await updateDoc(currentPostRef, {
        likes: arrayUnion(auth.currentUser.uid),
      });
    } catch (error) {
      return rejectWithValue(error.response.data.message || error.message);
    }
  }
);

export const deleteLike = createAsyncThunk(
  "dashboard/deleteLike",
  async (postId, { rejectWithValue }) => {
    try {
      // удаляем лайк из database
      const currentPostRef = doc(db, `posts/${postId}`);
      await updateDoc(currentPostRef, {
        likes: arrayRemove(auth.currentUser.uid),
      });
    } catch (error) {
      return rejectWithValue(error.response.data.message || error.message);
    }
  }
);

export const addComment = createAsyncThunk(
  "dashboard/addComment",
  async (newCommentData, { rejectWithValue }) => {
    try {
      const currentPostRef = doc(db, `posts/${newCommentData.postId}`);
      await updateDoc(currentPostRef, { comments: arrayUnion(newCommentData) });
    } catch (error) {
      return rejectWithValue(error.response.data.message || error.message);
    }
  }
);

export const deleteComment = createAsyncThunk(
  "dashboard/removeComment",
  async (data, { rejectWithValue }) => {
    try {
      const { comment, postId } = data;
      const currentPostRef = doc(db, `posts/${postId}`);
      await updateDoc(currentPostRef, {
        comments: arrayRemove(comment),
      });
    } catch (error) {
      return rejectWithValue(error.response.data.message || error.message);
    }
  }
);
