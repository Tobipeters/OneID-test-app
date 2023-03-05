import React, { useEffect, useState } from "react";
import { useOneid } from "react-oneid";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const { isAuthenticated, currentUser, logOut } = useOneid();
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (isAuthenticated()) {
      currentUser().then((res) => {
        localStorage.setItem("oneid_token", res.token);
        // console.log(res);
        setUser(res);
      });
    } else {
      navigate("/");
    }
  }, [isAuthenticated()]);

  return (
    <section className="d-flex justify-content-center align-items-center h-100">
      <div>
        <p className="text-muted fw-bold">
          You're Logged Successfully,
          <br />
          Welcome{" "}
          <span className="text-dark"> {user?.user.profile?.fullName}</span> to
          Dashboard
        </p>

        <br />
        <button
          className="btn btn-primary"
          onClick={() => {
            logOut();
            navigate("/");
          }}
        >
          Logout with OneID
        </button>
      </div>
    </section>
  );
};

export default Dashboard;
