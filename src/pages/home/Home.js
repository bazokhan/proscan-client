import React from "react";
import { Link } from "react-router-dom";

const Home = () => (
  <div>
    <Link to="/sessions">My Sessions</Link>
    <Link to="/join">Join Session</Link>
  </div>
);
export default Home;
