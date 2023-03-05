import logo from "./logo.svg";
import "./App.css";
import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import { useOneid } from "react-oneid";

const App = () => {
  const [show, setShow] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState();
  const { handleAuth, isAuthenticated, currentUser, logOut } = useOneid();

  useEffect(() => {
    if (isAuthenticated()) {
      setLoggedIn(true);
      // setShow(true); // Open modal
      currentUser().then((data) => setUser(data.user));
    } else {
      setLoggedIn(false);
    }
  }, [isAuthenticated()]);

  const handleClose = () => setShow(!show);

  console.log(user);

  return (
    <div className="App">
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        <p>
          <code> Welcome to OneID SSO Test App</code>
        </p>
        <a
          className="App-link"
          onClick={() => handleAuth({ type: "login", scope: "profile" })}
        >
          Login with OneID
        </a>
      </header>

      {loggedIn && user ? ( 
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Login with OneID successful</Modal.Title>
          </Modal.Header>
          <Modal.Body>You're logged in as</Modal.Body>
          <button className="btn tbn-primary" onClick={logOut}>Logout</button>
        </Modal>
      ) : (
        "Loading..."
      )}
    </div>
  );
};

export default App;
