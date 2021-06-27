import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import AppBar from './AppBar';
import SideDrawer from './SideDrawer';
import { useStyles } from './LayoutStyles';

export default function Layout({ children, isDarkMode, setIsDarkMode }) {
  const [open, setOpen] = useState(false);

  const classes = useStyles(isDarkMode);


  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <AppBar
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
        open={open}
        handleDrawerOpen={handleDrawerOpen}
      />
      <SideDrawer
        isDarkMode={isDarkMode}
        open={open}
        handleDrawerClose={handleDrawerClose}
      />

      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
        {children}
      </main>
    </div>
  );
}
