import React from "react";
import { Link as RouterLink } from "react-router-dom";
// import styles from "./Header.module.scss";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import { useStyles } from "app/Theme";

const Header = () => {
  const classes = useStyles();
  return (
    // <div className={styles.container}>
    //   Manal Classroom Quiz Tool
    // </div>
    <AppBar position="absolute" color="primary" className={classes.appBar}>
      <Toolbar>
        <Typography variant="h6" color="inherit" noWrap>
          Manal Classroom Quiz Tool
        </Typography>
        <Link to="/" component={RouterLink}>
          <Typography variant="h6" color="secondary" noWrap>
            Home
          </Typography>
        </Link>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
