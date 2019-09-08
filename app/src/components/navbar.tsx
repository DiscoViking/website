import * as React from "react";
import { map, zip } from "lodash";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Drawer from "@material-ui/core/Drawer";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import MenuIcon from "@material-ui/icons/Menu";
import Paper from "@material-ui/core/Paper";
import Toolbar from "@material-ui/core/Toolbar";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    grow: {
      flexGrow: 1,
    },
    navBar: {
      minHeight: 40,
      maxHeight: 40,
      background: theme.palette.primary.main,
    },
    linkButton: {
      color: theme.palette.text.primary,
      textDecorationLine: "none",
    },
  }),
);

interface INavbarProps {
  links: string[];
  titles: string[];
  fixed?: boolean;
}

export const Navbar: React.SFC<INavbarProps> = props => {
  const classes = useStyles();
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const { links, titles, fixed } = props;

  let navItems = map(zip(links, titles), (item: string[], ix: number) => (
      <Link key={"nav-item-" + ix} to={item[0]} className={classes.linkButton}>
        <Button>{item[1]}</Button>
      </Link>
  ));

  let drawerItems = map(zip(links, titles), (item: string[], ix: number) => (
      <Link key={"drawer-item-" + ix} to={item[0]} className={classes.linkButton}>
        <MenuItem onClick={() => setDrawerOpen(false)}>
          {item[1]}
        </MenuItem>
      </Link>
  ));

  return (
    <Paper className={fixed ? "app-navbar-container fixed" : "app-navbar-container"} elevation={1} square={true}>
        <Toolbar className={classes.navBar}>
          <div className="desktop-hide">
            <Button onClick={() => setDrawerOpen(open => !open)}>
              <MenuIcon fontSize="large" />
            </Button>
          </div>

          <div className="mobile-hide">
            {navItems}
          </div>

          <div className={classes.grow} />

          <div>
            <Link to="/contact" className={classes.linkButton}><Button>Contact Us</Button></Link>
          </div>
        </Toolbar>

      <Drawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        classes={{ paper: "app-navdrawer" }}
      >
        <MenuList>
          {drawerItems}
        </MenuList>
      </Drawer>
    </Paper>
  );
};
