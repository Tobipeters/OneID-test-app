import React, { useState, useEffect } from "react";
import { useOneid } from "react-oneid";
import { useNavigate } from "react-router-dom";

const AuthPage = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoadig] = useState(false)
  const { handleAuth, isAuthenticated } = useOneid();

  useEffect(() => {
    if (isAuthenticated()) {
      console.log(isAuthenticated());
      navigate("/dashboard");
    }
  }, [isAuthenticated()]);

  const handleAuthByOneId = () => {
    handleAuth({ type: "login", scope: "profile" }).then((data) => {
      if (isAuthenticated()) {
        navigate.apply("/dashboard");
      }
    });
  };

  return (
    <div>
      <div className="d-flex justify-content-center align-items-center">
        <button className="btn btn-lg btn-primary" onClick={handleAuthByOneId}>
          Sign up with OneID
        </button>
      </div>
    </div>
  );
};

export default AuthPage;
