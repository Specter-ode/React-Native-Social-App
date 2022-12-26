import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import MainNavigation from "./MainNavigation";
import AuthNavigation from "./AuthNavigation";
import { getIsAuth } from "../../redux/auth/auth-selectors";
import { auth } from "../../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { getCurrentUser } from "../../redux/auth/auth-slice";

const Main = () => {
  const isAuth = useSelector(getIsAuth);
  const dispatch = useDispatch();

  useEffect(() => {
    const checkUserAuth = () => async (dispatch) => {
      onAuthStateChanged(auth, (user) => {
        if (!user) return;
        const userData = {
          id: user.uid,
          name: user.displayName,
          email: user.email,
          avatar: user.photoURL,
        };
        dispatch(getCurrentUser(userData));
      });
    };

    if (!isAuth) {
      dispatch(checkUserAuth());
    }
  }, [isAuth]);

  return <>{isAuth ? <MainNavigation /> : <AuthNavigation />}</>;
};

export default Main;
