import React, { useEffect, useState } from "react";
import AuthLayouts from "../layouts/AuthLayouts";
import FormRegister from "../fragments/FormRegister";
import LoadingPage from "../components/LoadingPage";

const Register = () => {
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
          title={"Lengkapi data untuk membuat akun"}
          type={"register"}
        >
          <FormRegister />
        </AuthLayouts>
      )}
    </div>
  );
};

export default Register;
