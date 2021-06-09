import { makeStyles } from '@material-ui/core/styles';

const drawerWidth = 240;

export const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    backgroundColor: (isDarkMode) => (isDarkMode ? 'black' : '#f4f4f4'),
    color: (isDarkMode) => (isDarkMode ? 'white' : 'black'),
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    backgroundColor: (isDarkMode) => (isDarkMode ? 'black' : '#f4f4f4'),
    color: (isDarkMode) => (isDarkMode ? 'white' : 'black'),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: (isDarkMode) => (isDarkMode ? 'black' : '#f4f4f4'),
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  menu: {
    flexGrow: 1,
    display: 'flex',
    justifyContent: 'center',
  },
  listItem:{
    margin:theme.spacing(0,2),
  },
  avatar: {
    marginLeft: theme.spacing(2),
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
  drawerTitle: {
    color: (isDarkMode) => (isDarkMode ? 'white' : 'black'),
    padding: theme.spacing(1),
  },
  active: {
    background: 'orange',
  },
  menuItem:{
    color: (isDarkMode) => (isDarkMode ? 'white' : 'black'),
  }
}));
