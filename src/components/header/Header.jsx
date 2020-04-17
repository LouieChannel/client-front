import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import HomeIcon from '@material-ui/icons/Home';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
    cursor: 'pointer',
  },
}));

export default function Header(props) {
  const classes = useStyles();
  return (
    <AppBar
      style={{ background: '#2E3B55' }}
      position="relative"
      color="primary"
    >
      <Toolbar>
        <HomeIcon
          className={classes.icon}
          onClick={() => {
            window.location = '/';
          }}
        />
        <Typography variant="h6" color="inherit" noWrap>
          {props.name ? props.name : 'Ascalon'}
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
