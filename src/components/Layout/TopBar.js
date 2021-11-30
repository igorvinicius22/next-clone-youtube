import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Hidden from '@material-ui/core/Hidden';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import { AccountCircle, Apps, MoreVert, SingleBedOutlined, VideoCall } from '@material-ui/icons';
import { Button } from '@material-ui/core';
import Brightness7Icon from '@material-ui/icons/Brightness7'
import Brightness4Icon from '@material-ui/icons/Brightness4'
import { signIn, signOut, useSession } from 'next-auth/client';
import RouterLink from 'next/link';
import useSettings from 'src/hooks/useSettings';
import { THEMES } from 'src/utils/constants';

const useStyles = makeStyles((theme) => ({
  root: {
    boxShadow: 'none',
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: theme.palette.background.default,
  },
  toolbar: {
    minHeight: 56,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  link: {
    cursor: 'pointer',
    fontWeight: theme.typography.fontWeightMedium,
    '& + &': {
      marginLeft: theme.spacing(2),
    },
  },
  divider: {
    width: 1,
    height: 32,
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
  },
  avatar: {
    height: 32,
    width: 32,
  },
  popover: {
    width:200,
  },
  logo: {
    cursor: 'pointer',
    height: 18,
    marginLeft: theme.spacing(3),
  },
  search: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    height: 35,
    width: 700,
  },
  input: {
    flex: 1,
  },
  icons: {
    paddingRight: theme.spacing(2),
  },
}));

const TopBar = ({ className, ...rest }) => {
  const classes = useStyles();
  const [session] = useSession();
  const { settings, saveSettings } = useSettings();

  return (
    <AppBar className={classes.root} color="default" {...rest}>
      <Toolbar className={classes.toolbar}>
        <Box display="flex" alignItems="center" >
          <MenuIcon />
          <RouterLink href="/">
          <img 
          className={classes.logo}
          alt="logo" 
          src={
            settings.theme === THEMES.DARK
            ? '/logoAccontech.svg'
            : '/logoAccontech.svg'
            } 
          />
        </RouterLink>
        </Box>
        <Hidden mdDown>
          <Box>
          <Paper component="form" className={classes.search}>
            <InputBase 
              className={classes.input}
              placeholder="Pesquisar"
              inputProps={{ 'aria-label': 'search google maps'}}
            />
            <IconButton type="submit" className={classes.iconButton} aria-label="search">
              <SearchIcon />              
            </IconButton>
          </Paper>
        </Box>
        </Hidden>
        
        <Box display="flex">
          <IconButton className={classes.icons}>
            {settings.theme === THEMES.DARK ? (
              <Brightness7Icon
                onClick={() => saveSettings({ theme: THEMES.LIGHT })}
              />
            ) : (
              <Brightness4Icon
                onClick={() => saveSettings({ theme: THEMES.DARK })}
              />
            )}
          </IconButton>
          <IconButton className={classes.icons}>
            <VideoCall />
          </IconButton>
          <IconButton className={classes.icons}>
            <Apps />
          </IconButton>
          <IconButton className={classes.icons}>
            <MoreVert />
          </IconButton>
          {!session ? (
          <Button
          color="secondary"
          component="a"
          variant="outlined"
          startIcon={<AccountCircle />}
          onClick={() => signIn()}
          >Fazer Login
          </Button>
          ) : (
            <Box display="flex" alignItems="center">
              <Avatar
                onClick={() => signOut()}
                alt="User"
                className={classes.avatar}
                src={session?.user?.image}
              />
            </Box>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default TopBar;