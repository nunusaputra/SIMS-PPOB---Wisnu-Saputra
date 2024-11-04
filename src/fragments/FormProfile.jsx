import React, { useEffect, useState } from "react";
import InputForm from "../elements/InputForm/InputForm";
import { CiAt } from "react-icons/ci";
import { IoMdPerson } from "react-icons/io";
import Button from "../elements/Button/Button";
import { useDispatch, useSelector } from "react-redux";
import { profileAction, updateProfile } from "../redux/Action/profileAction";
import { toast } from "react-toastify";

const FormProfile = ({ open, close }) => {
  const dispatch = useDispatch();
  const { Load, error, sukses, profile, message } = useSelector(
    (state) => state.profile
  );
  const [input, setInput] = useState({
    email: "",
    first_name: "",
    last_name: "",
  });

  const handleInput = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      email: input.email,
      first_name: input.first_name,
      last_name: input.last_name,
    };

    dispatch(updateProfile(data));
  };

  useEffect(() => {
    if (sukses) {
      toast.success(message);
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } else if (error) {
      toast.error(message);
    }
  }, [sukses, error, message]);

  const isFilled = (value) => value.length > 0;

  useEffect(() => {
    if (profile) {
      setInput({
        email: profile.email || "",
        first_name: profile.first_name || "",
        last_name: profile.last_name || "",
      });
    }
  }, [profile]);
  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-sm font-medium">
            Email
          </label>
          <InputForm
            disabled={"disabled"}
            name="email"
            type="email"
            placeholder="masukan email anda"
            icon={
              <CiAt
                className={`w-4 h-4 ${
                  isFilled(input.email) ? "text-black" : "text-gray-300"
                }`}
              />
            }
            style="cursor-not-allowed"
            value={input.email}
            onChange={handleInput}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="first_name" className="text-sm font-medium">
            Nama Depan
          </label>
          <InputForm
            name="first_name"
            type="text"
            placeholder="nama depan"
            icon={
              <IoMdPerson
                className={`w-4 h-4 ${
                  isFilled(input.first_name) ? "text-black" : "text-gray-300"
                }`}
              />
            }
            value={input.first_name}
            onChange={handleInput}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="last_name" className="text-sm font-medium">
            Nama Belakang
          </label>
          <InputForm
            name="last_name"
            type="text"
            placeholder="nama belakang"
            icon={
              <IoMdPerson
                className={`w-4 h-4 ${
                  isFilled(input.last_name) ? "text-black" : "text-gray-300"
                }`}
              />
            }
            value={input.last_name}
            onChange={handleInput}
          />
        </div>

        {open && (
          <div className="mt-2 flex flex-col gap-4">
            <Button style="text-red-500 font-semibold border-2 border-red-500">
              Simpan
            </Button>
            <Button
              type={"button"}
              color="bg-red-500"
              style="text-white font-semibold"
              onClick={close}
            >
              Batalkan
            </Button>
          </div>
        )}
      </div>
    </form>
  );
};

export default FormProfile;
