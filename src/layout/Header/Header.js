import React, { useState, useContext, Fragment } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MoreIcon from '@material-ui/icons/MoreVert';
import AuthContext from 'context/AuthContext';
import { Link, Button } from '@material-ui/core';
import { RouterLink } from 'layout/material-ui/core';
import useRouter from 'use-react-router';
import useStyles from './Header.styles';

const Header = () => {
  const { history } = useRouter();
  const { isLoading, authToken, logout } = useContext(AuthContext);
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = event => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleLogout = () => {
    logout(() => history.push('/'));
    handleMenuClose();
  };

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleLogout}>Log Out</MenuItem>
    </Menu>
  );

  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      {authToken && (
        <MenuItem variant="text" color="inherit">
          <Link
            to="/sessions"
            color="inherit"
            onClick={handleMenuClose}
            component={RouterLink}
          >
            My Sessions
          </Link>
        </MenuItem>
      )}
      {authToken && (
        <MenuItem variant="text" color="inherit">
          <Link
            to="/"
            color="inherit"
            onClick={handleMenuClose}
            component={RouterLink}
          >
            Profile
          </Link>
        </MenuItem>
      )}
      {authToken && <MenuItem onClick={handleLogout}>Log Out</MenuItem>}
      {!authToken && (
        <MenuItem variant="text" color="inherit">
          <Link to="/login" color="inherit" component={RouterLink}>
            Login
          </Link>
        </MenuItem>
      )}
      {!authToken && (
        <MenuItem variant="text" color="inherit">
          <Link to="/signup" color="inherit" component={RouterLink}>
            Signup
          </Link>
        </MenuItem>
      )}
    </Menu>
  );

  if (isLoading) return null;

  return (
    <div className={classes.grow}>
      <AppBar position="static" color="default">
        <Toolbar>
          <Link to="/" color="inherit" component={RouterLink}>
            <Typography
              className={classes.title}
              variant="h6"
              noWrap
              color="primary"
            >
              QuizBank
            </Typography>
          </Link>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <Button variant="contained" color="secondary">
              <Link to="/join" color="inherit" component={RouterLink}>
                Join A Session
              </Link>
            </Button>
            {authToken ? (
              <Fragment>
                <Button variant="text" color="inherit">
                  <Link to="/sessions" color="inherit" component={RouterLink}>
                    My Sessions
                  </Link>
                </Button>
                <IconButton
                  edge="end"
                  onClick={handleProfileMenuOpen}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
              </Fragment>
            ) : (
              <Fragment>
                <Button variant="text" color="inherit">
                  <Link to="/login" color="inherit" component={RouterLink}>
                    Login
                  </Link>
                </Button>
                <Button variant="text" color="inherit">
                  <Link to="/signup" color="inherit" component={RouterLink}>
                    Signup
                  </Link>
                </Button>
              </Fragment>
            )}
          </div>
          <div className={classes.sectionMobile}>
            <Button variant="contained" color="secondary">
              <Link to="/join" color="inherit" component={RouterLink}>
                Join A Session
              </Link>
            </Button>
            <IconButton onClick={handleMobileMenuOpen} color="inherit">
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMenu}
      {renderMobileMenu}
    </div>
  );
};

export default Header;
