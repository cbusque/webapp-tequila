import CheeseburgerMenu from "cheeseburger-menu";
import HamburgerMenu from "react-hamburger-menu";
import React, { Component } from "react";
import Typography from "@material-ui/core/Typography";

import qrCode from "../../public/images/qr.png";
import "../../public/global";

class myHambergerMenu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      menuOpen: false
    };
  }

  openMenu() {
    this.setState({ menuOpen: true });
  }

  closeMenu() {
    this.setState({ menuOpen: false });
  }
  render() {
    return (
      <div style={{ marginRight: "10px" }}>
        <CheeseburgerMenu
          isOpen={this.state.menuOpen}
          closeCallback={this.closeMenu.bind(this)}
          backgroundColor="#232530"
        >
          <div className="menu" style={{ marginLeft: "25px" }}>
            <a
              className="menu-item"
              onClick={() => {
                if (global.isPlayer1) {
                  global.isPlayer1 = false;
                } else {
                  global.isPlayer1 = true;
                }
                this.closeMenu();
              }}
              style={{ marginTop: "15px", marginLeft: "15px" }}
            >
              <Typography
                variant="h5"
                color="inherit"
                style={{
                  border: "4px solid rgba(255, 255, 255)",
                  marginRight: "25px",
                  paddingLeft: "10px"
                }}
              >
                Regarder l'autre joueur
              </Typography>
            </a>
            <img src={qrCode} style={{ marginTop: "45px" }} />
          </div>
        </CheeseburgerMenu>
        <HamburgerMenu
          isOpen={this.state.menuOpen}
          menuClicked={this.openMenu.bind(this)}
          width={32}
          height={24}
          strokeWidth={3}
          rotate={0}
          color="white"
          borderRadius={0}
          animationDuration={0.5}
        />
      </div>
    );
  }
}

export default myHambergerMenu;
