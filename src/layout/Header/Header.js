import React from "react";
import { Link } from "react-router-dom";
import styles from "./Header.module.scss";

const Header = () => (
  <div className={styles.container}>
    Manal Classroom Quiz Tool<Link to="/">Home</Link>
  </div>
);

export default Header;
