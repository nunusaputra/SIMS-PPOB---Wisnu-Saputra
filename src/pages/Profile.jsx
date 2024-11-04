import React, { useEffect, useState } from "react";
import photo_profile from "../assets/img/Profile-Photo.png";
import { IoPencil } from "react-icons/io5";
import FormProfile from "../fragments/FormProfile";
import Button from "../elements/Button/Button";
import { useNavigate } from "react-router-dom";
import { reset } from "../redux/Slice/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import axios from "axios";
import { profileAction } from "../redux/Action/profileAction";
import Loading from "../components/Loading";

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { profile } = useSelector((state) => state.profile);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleImage = (e) => {
    const selectedImage = e.target.files[0];

    // Validation image size
    if (selectedImage && selectedImage.size > 100 * 1024) {
      return toast.error("Image tidak boleh lebih dari 100 kb");
    }
    setImage(selectedImage);

    // Preview image before upload
    const reader = new FileReader();
    reader.onload = () => {
      setPreview(reader.result);
    };

    reader.readAsDataURL(selectedImage);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("file", image);

    setIsLoading(true);
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/profile/image`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      );
      toast.success(response.data.message);
      setTimeout(() => {
        window.location.reload();
      }, 2000);
      return response.data;
    } catch (error) {
      if (error.response) {
        return toast.error(error.response.data.message);
      }
    } finally {
      setIsLoading(false);
    }
  };
  const handleLogout = () => {
    if (window.confirm("Are you sure want to logout?")) {
      sessionStorage.removeItem("token");
      toast.success("Logout Success");
      navigate("/");
      dispatch(reset());
    }
  };

  return (
    <section className="container flex flex-col gap-4 items-center justify-center">
      {/* profile photo */}
      <div className="relative w-36 h-36 rounded-full border-2 border-gray-300">
        {preview === null ? (
          <img
            src={
              profile?.profile_image !==
              "https://minio.nutech-integrasi.com/take-home-test/null"
                ? profile.profile_image
                : photo_profile
            }
            alt=""
            className="w-full h-full rounded-full object-cover"
          />
        ) : (
          <img
            src={preview ? preview : photo_profile}
            alt=""
            className="w-full h-full rounded-full object-cover"
          />
        )}
        <label
          htmlFor="doc"
          className="bg-white absolute bottom-2 right-1 transform translate-x-1/4 translate-y-1/4 rounded-full w-8 h-8 border-2 border-secondary cursor-pointer text-secondary flex items-center justify-center"
        >
          <IoPencil className="w-4 h-4" />
          <form action="" onSubmit={handleSubmit}>
            <input
              type="file"
              id="doc"
              name="doc"
              accept="image/png, image/jpeg"
              hidden
              onChange={handleImage}
            />
            {preview !== null && (
              <button className="absolute bottom-16 -right-12 transform translate-x-1/2 translate-y-1/2 px-4 py-2 bg-red-500 text-white rounded-md font-semibold">
                {isLoading ? <Loading /> : "Upload"}
              </button>
            )}
          </form>
        </label>
      </div>

      {/* profile name */}
      <h1 className="text-3xl font-semibold">
        {profile?.first_name + " " + profile?.last_name}
      </h1>

      {/* profile form */}
      <div className="w-[90%] lg:w-[50%] mt-4">
        <FormProfile open={show} close={handleClose} />
      </div>

      {/* profile button */}
      {!show && (
        <div className="w-[90%] lg:w-[50%] mt-4 flex flex-col gap-4">
          <Button
            style="text-red-500 font-semibold border-2 border-red-500"
            onClick={handleShow}
          >
            Edit Profile
          </Button>
          <Button
            color="bg-red-500"
            style="text-white font-semibold"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </div>
      )}
    </section>
  );
};

export default Profile;
