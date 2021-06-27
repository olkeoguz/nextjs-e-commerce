import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import MenuIcon from '@material-ui/icons/Menu';
import { AccountCircleSharp } from '@material-ui/icons';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import {
  Avatar,
  Badge,
  Button,
  Link as MaterialLink,
  Menu,
  MenuItem,
  Popover,
  Tooltip,
  Typography,
} from '@material-ui/core';
import Brightness3Icon from '@material-ui/icons/Brightness3';
import WbSunnyOutlinedIcon from '@material-ui/icons/WbSunnyOutlined';
import { useStyles } from './LayoutStyles';
import clsx from 'clsx';
import IconButton from '@material-ui/core/IconButton';
import { useRouter } from 'next/router';
import { signOut } from 'next-auth/client';
import { useSession } from 'next-auth/client';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import { useSelector, useDispatch } from 'react-redux';
import { Fragment, useState } from 'react';

import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';
import CartItems from '../../cart/CartItems';

import * as CartActions from '../../../store/actions/cart';

const Appbar = ({ isDarkMode, setIsDarkMode, open, handleDrawerOpen }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const [session, loading] = useSession();

  const { numOfCartItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const classes = useStyles(isDarkMode);
  const router = useRouter();

  const handleClickMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = (route) => {
    router.push('/' + route);
    setAnchorEl(null);
  };

  return (
    <AppBar
      position='fixed'
      elevation={0}
      className={clsx(classes.appBar, {
        [classes.appBarShift]: open,
      })}
    >
      <Toolbar className={classes.toolbar}>
        <IconButton
          color='inherit'
          aria-label='open drawer'
          onClick={handleDrawerOpen}
          edge='start'
          className={clsx(classes.menuButton, open && classes.hide)}
        >
          <MenuIcon />
        </IconButton>

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

        {!session && !loading && (
          <MaterialLink
            color='inherit'
            variant='h6'
            component='button'
            className={classes.listItem}
            onClick={() => {
              router.push('/auth');
            }}
          >
            Sign In
          </MaterialLink>
        )}

        <div className={classes.appBarEnd}>
          {session && !loading && (
            <Fragment>
              <Typography className={classes.welcome}>
                Welcome {session.user.name}
              </Typography>

              {session.user.image ? (
                <Avatar src={session.user.image} className={classes.avatar} />
              ) : (
                <AccountCircleSharp className={classes.cartIcon} />
              )}
            </Fragment>
          )}

          {/* UserMenu */}

          {session && (
            <Fragment>
              <Button
                aria-controls='simple-menu'
                aria-haspopup='true'
                onClick={handleClickMenu}
              >
                <ExpandMoreIcon className={classes.cartIcon} />
              </Button>
              <Menu
                id='simple-menu'
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleCloseMenu}
              >
                <MenuItem onClick={() => handleCloseMenu('my-orders')}>
                  My Orders
                </MenuItem>
                <MenuItem onClick={() => handleCloseMenu('wishlist')}>
                  My Wishlist
                </MenuItem>
                <MenuItem onClick={() => signOut()}>Logout</MenuItem>
              </Menu>
            </Fragment>
          )}

          {/* PopOver */}

          <PopupState variant='popover' popupId='demo-popup-popover'>
            {(popupState) => (
              <div>
                <Tooltip title='Cart' {...bindTrigger(popupState)}>
                  <IconButton aria-label='Cart'>
                    <Badge color='error' badgeContent={numOfCartItems}>
                      <ShoppingCartIcon
                        fontSize='large'
                        className={classes.cartIcon}
                      />
                    </Badge>
                  </IconButton>
                </Tooltip>
                <Popover
                  {...bindPopover(popupState)}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                  }}
                >
                  <CartItems controlCart />

                  <div style={{ textAlign: 'center' }}>
                    <Button
                      variant='contained'
                      color='secondary'
                      onClick={() => {
                        popupState.close();
                        router.push('/cart');
                      }}
                      fullWidth
                    >
                      Go To Cart
                    </Button>
                    <Button
                      variant='contained'
                      onClick={() => {
                        dispatch(CartActions.emptyCart());
                        popupState.close();
                      }}
                      fullWidth
                    >
                      Clear Cart
                    </Button>
                  </div>
                </Popover>
              </div>
            )}

            {/* PopOver End */}
          </PopupState>
          {isDarkMode ? (
            <WbSunnyOutlinedIcon
              onClick={() => {
                setIsDarkMode(!isDarkMode);
              }}
              className={classes.darkModeIcon}
            />
          ) : (
            <Brightness3Icon
              onClick={() => {
                setIsDarkMode(!isDarkMode);
              }}
              className={classes.darkModeIcon}
            />
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Appbar;
