import * as React from "react";
import * as map from "lodash/map";
import * as zip from "lodash/zip";
import {Link} from "react-router";
import Drawer from "material-ui/Drawer";
import FlatButton from "material-ui/FlatButton";
import IconButton from "material-ui/IconButton";
import MenuItem from "material-ui/MenuItem";
import Paper from "material-ui/Paper";
import NavigationMenu from "material-ui/svg-icons/navigation/menu";
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from "material-ui/Toolbar";

interface INavbarProps {
  links: string[];
  titles: string[];
  fixed?: boolean;
}

interface INavbarState {
  drawerOpen?: boolean;
}

export default class Navbar extends React.Component<INavbarProps, INavbarState> {
  private navbar: any;

  constructor(props: INavbarProps) {
    super(props);
    this.state = { drawerOpen: false };
  }

  render() {
    let navItems = map(zip(this.props.links, this.props.titles),
                         function(item: string[], ix: number) {
      return (
        <Link key={"nav-item-" + ix} to={item[0]}>
          <FlatButton label={item[1]} />
        </Link>
      );
    });

    let drawerItems = map(zip(this.props.links, this.props.titles),
                         function(item: string[], ix: number) {
      return (
        <Link key={"drawer-item-" + ix} to={item[0]}>
          <MenuItem onTouchTap={this.closeDrawer.bind(this)}>
            {item[1]}
          </MenuItem>
        </Link>
      );
    }.bind(this));

    return (
      <Paper className={this.props.fixed ? "app-navbar-container fixed" : "app-navbar-container"} zDepth={1} rounded={false}>
        <Toolbar className="app-navbar">
          <ToolbarGroup className="desktop-hide" firstChild={true}>
            <IconButton onTouchTap={this.toggleDrawer.bind(this)}>
             <NavigationMenu />
            </IconButton>
          </ToolbarGroup>

          <ToolbarGroup className="mobile-hide">
            {navItems}
          </ToolbarGroup>

          <ToolbarGroup lastChild={true}>
            <Link to="/contact"><FlatButton label="Contact Us" /></Link>
          </ToolbarGroup>
        </Toolbar>

        <Drawer
          containerClassName="app-navdrawer"
          open={this.state.drawerOpen}
          docked={false}
          onRequestChange={this.setDrawer.bind(this)}>
          {drawerItems}
        </Drawer>
      </Paper>
    );
  }

  private toggleDrawer() {
    this.setDrawer(!this.state.drawerOpen);
  }

  private closeDrawer() {
    this.setDrawer(false);
  }

  private setDrawer(open: boolean) {
    this.setState({ drawerOpen: open });
  }
}
