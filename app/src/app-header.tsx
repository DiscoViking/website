import * as React from "react";
import * as ReactDOM from "react-dom";
import Paper from "material-ui/Paper";

import FloatingLogo from "./components/floating-logo";
import ImageGallery from "./components/image-gallery";
import LoginWidget from "./components/login-widget";
import Navbar from "./components/navbar";

import ScrollListener from "./components/scroll-listener";

let navbarLinks: string[] = [
  "/front",
  "/about",
  "/teachers",
  "/services"
];

let navbarTitles: string[] = [
  "Home",
  "About",
  "Our Teachers",
  "Our Services",
];

const headerImages: string[] = [
  "/api/images/dtc-mindmap.banner.jpg",
  "/api/images/snow-writing.banner.jpg",
  "/api/images/Girl writing.banner.jpeg",
  "/api/images/Ipad apps tilted.banner.jpeg",
];

const logoImage: string = "/api/images/dtc-logo-small.jpg";

interface AppHeaderState {
  navbarFixed: boolean;
}

export default class AppHeader extends React.Component<{}, AppHeaderState> {
  constructor() {
    super();
    this.state = { navbarFixed: false };
  }

  render() {
    return (
      <div className="app-header">
        <Paper zDepth={1} rounded={false}>
          <LoginWidget />
          <FloatingLogo src={logoImage} />
          <div className="app-header-image-container">
            <ImageGallery images={headerImages} interval={10000} />
          </div>
          <ScrollListener onScroll={this.handleScroll.bind(this)} ref="scroller" />
        </Paper>
        <Navbar links={navbarLinks} titles={navbarTitles} fixed={this.state.navbarFixed} />
      </div>
    );
  }

  private handleScroll() {
    const thisTop = ReactDOM.findDOMNode(this.refs["scroller"]).getClientRects()[0].top;
    const navbarFixed = thisTop <= 0 ? true : false;
    this.setState({ navbarFixed });
  }
}