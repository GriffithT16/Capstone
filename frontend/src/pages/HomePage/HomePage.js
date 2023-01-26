import React from "react";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { useNavigate, Link } from "react-router-dom";

import axios from "axios";

const HomePage = () => {
  // The "user" value from this Hook contains the decoded logged in user information (username, first name, id)
  // The "token" value is the JWT token that you will send in the header of any request requiring authentication

  const [user, token] = useAuth();
  const [jumps, setJumps] = useState([]);

  useEffect(() => {
    fetchJumps();
  }, [token]);

  const fetchJumps = async () => {
    try {
      let response = await axios.get("http://127.0.0.1:8000/api/skydiver/", {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      setJumps(response.data);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  
  return (
    <div className="container">
      <h1>{user.username}'s Skydiving Log!</h1>
      {jumps &&
        jumps.map((jump) => (
          <p key={jump.id}>
            {jump.year}
          </p>
        ))}
      <Link to="/log" style={{ textDecoration: "none", color: "aqua" }}>
        <h4>View Jumps</h4>
      </Link>
      <br></br>
      <Link to="/jumps" style={{ textDecoration: "none", color: "blue" }}>
        <h4>Enter New Jump</h4>
      </Link>
      <br></br>
      <Link to="/weather" style={{ textDecoration: "none", color: "red" }}>
        <h4>View Weather</h4>
      </Link>
      <br></br>
      <Link to="/map" style={{ textDecoration: "none", color: "green" }}>
        <h4>DZ's Nearby</h4>
      </Link>
      <br></br>
      <Link to="/directions" style={{ textDecoration: "none", color: "orange" }} >
        <h4>Get Directions</h4>
      </Link>
    </div>
  );
};

export default HomePage;
