import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { Divider, List } from '@material-ui/core';

import { format } from 'date-fns';
import { AccountCircleSharp, AddCircleOutline } from '@material-ui/icons';
import WbSunnyOutlinedIcon from '@material-ui/icons/WbSunnyOutlined';
import { useRouter } from 'next/router';
import { useStyles } from './LayoutStyles';

const menuItems = [
  {
    text: 'All Products',
    icon: <AddCircleOutline />,
    path: '/',
    query: '',
  },
  {
    text: 'Electronics',
    icon: <AddCircleOutline />,
    path: '/',
    query: 'electronics',
  },
  {
    text: 'Jewelery',
    icon: <AddCircleOutline />,
    path: '/create',
    query: 'jewelery',
  },
  {
    text: `Men's clothing`,
    icon: <AddCircleOutline />,
    path: '/create',
    query: `men's clothing`,
  },
  {
    text: `Women's clothing`,
    icon: <AddCircleOutline />,
    path: '/create',
    query: `women's clothing`,
  },
];

const SideDrawer = ({ isDarkMode, open, handleDrawerClose }) => {
  const classes = useStyles(isDarkMode);
  const router = useRouter();
  return (
    <Drawer
      className={classes.drawer}
      variant='persistent'
      anchor='left'
      open={open}
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <div className={classes.drawerHeader}>
        <IconButton onClick={handleDrawerClose}>
          <ChevronLeftIcon className={classes.menuItem} />
        </IconButton>
      </div>
      <div>
        <Typography variant='h5' align='center' className={classes.drawerTitle}>
          Categories
        </Typography>
      </div>
      <List>
        {menuItems.map((item) => (
          <ListItem
            key={item.text}
            button
            onClick={() => {
              router.push(`/?category=${item.query}`);
              handleDrawerClose();
            }}
            className={router.query.category === item.query && classes.active}
          >
            <ListItemIcon className={classes.menuItem}>
              {item.icon}
            </ListItemIcon>
            <ListItemText className={classes.menuItem} primary={item.text} />
          </ListItem>
        ))}
        <Divider />
        <Typography variant='h5' align='center' className={classes.drawerTitle}>
          Account
        </Typography>
        <ListItem>
          <ListItemIcon className={classes.menuItem}>
            <AccountCircleSharp />
          </ListItemIcon>
          <ListItemText className={classes.menuItem} primary='Sign Up' />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default SideDrawer;
