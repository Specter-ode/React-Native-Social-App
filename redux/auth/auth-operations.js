import { createAsyncThunk } from "@reduxjs/toolkit";
import { auth, storage } from "../../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
} from "firebase/auth";

import { uploadBytes, getDownloadURL, ref } from "firebase/storage";

const handleRegistration = createAsyncThunk(
  "auth/registration",
  async (data, { rejectWithValue }) => {
    try {
      const { name, email, password, avatar } = data;
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      // загружаем аватар в storage
      const avatarStorageRef = ref(storage, `avatars/${user.uid}`);
      const responseAvatar = await fetch(avatar);
      const photoFile = await responseAvatar.blob();
      await uploadBytes(avatarStorageRef, photoFile);
      const avatarURL = await getDownloadURL(avatarStorageRef);
      // обновляем профиль юзера, добавляем имя и аватар
      await updateProfile(auth.currentUser, {
        displayName: name,
        photoURL: avatarURL,
      });

      const userData = {
        id: user.uid,
        name: user.displayName,
        email: user.email,
        avatar: user.photoURL,
      };
      return userData;
    } catch (error) {
      return rejectWithValue(error.response.data.message || error.message);
    }
  }
);

const handleLogin = createAsyncThunk(
  "auth/login",
  async (data, { rejectWithValue }) => {
    try {
      const { email, password } = data;
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      const userData = {
        id: user.uid,
        name: user.displayName,
        email: user.email,
      };
      return userData;
    } catch (error) {
      return rejectWithValue(error.response.data.message || error.message);
    }
  }
);

const handleLogout = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      await signOut(auth);
    } catch (error) {
      return rejectWithValue(error.response.data.message || error.message);
    }
  }
);

const changeAvatar = createAsyncThunk(
  "auth/avatar",
  async (avatar, { rejectWithValue }) => {
    try {
      await updateProfile(auth.currentUser, {
        photoURL: avatar,
      });
      return avatar;
    } catch (error) {
      return rejectWithValue(error.response.data.message || error.message);
    }
  }
);

export { handleRegistration, handleLogin, handleLogout, changeAvatar };
