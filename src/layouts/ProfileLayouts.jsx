import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Profile from "../pages/Profile";
import { useDispatch } from "react-redux";
import { profileAction } from "../redux/Action/profileAction";
import LoadingPage from "../components/LoadingPage";

const ProfileLayouts = () => {
  const dispatch = useDispatch();
  const token = sessionStorage.getItem("token");
  const [Loading, setLoading] = useState(true);

  useEffect(() => {
    requestAnimationFrame(() => {
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    });
  }, [Loading]);

  useEffect(() => {
    dispatch(profileAction(token));
  }, [dispatch, token]);

  return (
    <div>
      {Loading ? (
        <LoadingPage />
      ) : (
        <>
          <Navbar />
          <Profile />
        </>
      )}
    </div>
  );
};

export default ProfileLayouts;
