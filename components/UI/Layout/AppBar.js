import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import MenuIcon from '@material-ui/icons/Menu';
import {
  Avatar,
  Link as MaterialLink,
  List,
  Typography,
} from '@material-ui/core';
import Brightness3Icon from '@material-ui/icons/Brightness3';
import WbSunnyOutlinedIcon from '@material-ui/icons/WbSunnyOutlined';
import { useStyles } from './LayoutStyles';
import clsx from 'clsx';
import IconButton from '@material-ui/core/IconButton';
import { useRouter } from 'next/router';

const Appbar = ({ isDarkMode, setIsDarkMode, open, handleDrawerOpen }) => {
  const classes = useStyles(isDarkMode);
  const router = useRouter();
  return (
    <AppBar
      position='fixed'
      elevation={0}
      className={clsx(classes.appBar, {
        [classes.appBarShift]: open,
      })}
    >
      <Toolbar>
        <IconButton
          color='inherit'
          aria-label='open drawer'
          onClick={handleDrawerOpen}
          edge='start'
          className={clsx(classes.menuButton, open && classes.hide)}
        >
          <MenuIcon />
        </IconButton>
        <List className={classes.menu}>
          <MaterialLink
            color='inherit'
            variant='h6'
            component='button'
            className={classes.listItem}
            onClick={() => {
              router.push('/');
            }}
          >
            Home
          </MaterialLink>
        </List>
        <Typography>Welcome Mario</Typography>
        <Avatar src='/mario-av.png' className={classes.avatar} />
        {isDarkMode ? (
          <WbSunnyOutlinedIcon
            onClick={() => {
              setIsDarkMode(!isDarkMode);
            }}
            color='secondary'
            style={{ marginLeft: 20 }}
          />
        ) : (
          <Brightness3Icon
            onClick={() => {
              setIsDarkMode(!isDarkMode);
            }}
            color='secondary'
            style={{ marginLeft: 20 }}
          />
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Appbar;
