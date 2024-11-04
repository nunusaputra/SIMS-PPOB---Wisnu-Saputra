import React, { useEffect, useRef, useState } from "react";
import InputForm from "../elements/InputForm/InputForm";
import InputPassword from "../elements/InputForm/InputPassword";
import Button from "../elements/Button/Button";
import { CiAt } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { loginAction } from "../redux/Action/authAction";
import { toast } from "react-toastify";
import { reset } from "../redux/Slice/authSlice";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";

const FormLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, isSuccess, isError, message } = useSelector(
    (state) => state.auth
  );
  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const handleInput = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    const newErrors = {};

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

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      const data = {
        email: input.email,
        password: input.password,
      };
      dispatch(loginAction(data));
    }
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Login Success");
      navigate("/dashboard");
    } else if (isError) {
      toast.error(message);
      // dispatch(reset);
    }
  }, [isSuccess, isError, message, dispatch]);

  const emailRef = useRef();
  const isFilled = input.email.length > 0;

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
            icon={
              <CiAt
                className={`w-4 h-4 ${
                  isFilled ? "text-black" : "text-gray-300"
                }`}
              />
            }
            placeholder="masukan email anda"
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
      </div>
      <Button color="bg-red-500 text-white" margin={"mt-6"}>
        {loading ? <Loading /> : "Masuk"}
      </Button>
    </form>
  );
};

export default FormLogin;
