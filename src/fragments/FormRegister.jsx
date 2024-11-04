import React, { useEffect, useRef, useState } from "react";
import InputForm from "../elements/InputForm/InputForm";
import InputPassword from "../elements/InputForm/InputPassword";
import Button from "../elements/Button/Button";
import { CiAt } from "react-icons/ci";
import { IoMdPerson } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { regisAction } from "../redux/Action/authAction";
import { toast } from "react-toastify";
import { reset } from "../redux/Slice/authSlice";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";

const FormRegister = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  const [input, setInput] = useState({
    email: "",
    first_name: "",
    last_name: "",
    password: "",
    confPassword: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    first_name: "",
    last_name: "",
    password: "",
    confPassword: "",
  });

  const handleInput = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    const newErrors = {};

    // Contoh validasi per field
    if (!input.email) {
      newErrors.email = "Email harus diisi.";
    } else if (!/\S+@\S+\.\S+/.test(input.email)) {
      newErrors.email = "Format email tidak valid!";
    }

    if (!input.password) {
      newErrors.password = "Password harus diisi.";
    } else if (input.password.length < 8) {
      newErrors.password = "Password harus terdiri minimum 8 karakter.";
    }

    if (input.confPassword !== input.password) {
      newErrors.confPassword = "Passwords dan konfirmasi password tidak sama.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      const data = {
        email: input.email,
        first_name: input.first_name,
        last_name: input.last_name,
        password: input.password,
      };
      dispatch(regisAction(data));
    }
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(message);
      navigate("/");
    } else if (isError) {
      toast.error(message);
      dispatch(reset());
    }
  }, [isSuccess, isError, message, dispatch]);

  const emailRef = useRef();
  const isFilled = (value) => value.length > 0;
  const isFormComplete = Object.values(input).every(
    (value) => value.length > 0
  );

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col gap-6">
        <div>
          <InputForm
            name="email"
            type="email"
            placeholder="masukan email anda"
            icon={
              <CiAt
                className={`w-4 h-4 ${
                  isFilled(input.email) ? "text-black" : "text-gray-300"
                } ${errors.email ? "text-red-500" : ""}`}
              />
            }
            value={input.email}
            onChange={handleInput}
            ref={emailRef}
            style={`peer ${
              errors.email ? "border-red-500 focus:ring-red-500" : ""
            }`}
          />
          {errors.email && (
            <p className="text-sm text-right text-red-500 peer-invalid:block">
              {errors.email}
            </p>
          )}
        </div>
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
        <div>
          <InputPassword
            name="password"
            type="password"
            placeholder="********"
            value={input.password}
            onChange={handleInput}
            style={`peer ${
              errors.password ? "border-red-500 focus:ring-red-500" : ""
            }`}
          />
          {errors.password && (
            <p className="text-sm text-right text-red-500 peer-invalid:block">
              {errors.password}
            </p>
          )}
        </div>
        <div>
          <InputPassword
            name="confPassword"
            type="password"
            placeholder="********"
            value={input.confPassword}
            onChange={handleInput}
            style={`peer ${
              errors.confPassword ? "border-red-500 focus:ring-red-500" : ""
            }`}
          />
          {errors.confPassword && (
            <p className="text-sm text-right text-red-500 peer-invalid:block">
              {errors.confPassword}
            </p>
          )}
        </div>
      </div>
      <Button
        color={`text-white ${
          isFormComplete ? "bg-red-500" : "bg-gray-300 cursor-not-allowed"
        }`}
        margin={"mt-6"}
        disabled={!isFormComplete}
      >
        {loading ? <Loading /> : "Register"}
      </Button>
    </form>
  );
};

export default FormRegister;
