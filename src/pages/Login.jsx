import React, { useEffect, useState } from "react";
import AuthLayouts from "../layouts/AuthLayouts";
import FormLogin from "../fragments/FormLogin";
import LoadingPage from "../components/LoadingPage";

const Login = () => {
  const [Loading, setLoading] = useState(true);

  useEffect(() => {
    requestAnimationFrame(() => {
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    });
  }, [Loading]);
  return (
    <div>
      {Loading ? (
        <LoadingPage />
      ) : (
        <AuthLayouts
          title={"Masuk atau buat akun untuk memulai"}
          type={"login"}
        >
          <FormLogin />
        </AuthLayouts>
      )}
    </div>
  );
};

export default Login;
