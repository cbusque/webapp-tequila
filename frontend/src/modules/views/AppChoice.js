import React, { useEffect, useState } from "react";
import Iframe from "react-iframe";
import PropTypes from "prop-types";
import ReactProgressMeter from "react-progress-meter";
import Toolbar from "../components/Toolbar";
import { withStyles } from "@material-ui/core/styles";
import ButtonBase from "@material-ui/core/ButtonBase";
import Typography from "@material-ui/core/Typography";
import axios from "axios";

import Popup from "reactjs-popup";

import image_vitre from "../../static/images/bouteille.png";
import image_catapulte from "../../static/images/catapulte.png";
import image_feu from "../../static/images/feu.png";
import image_vote from "../../static/images/vote.png";

import server from "../../public/server";
import "../../public/global";

const styles = theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    minWidth: 0,
    width: "100% !important",
    backgroundColor: "rgb(40, 40, 42);"
  },
  growingBar: {
    backgroundColor: "rgba(87, 202, 244, 0.6) !important"
  },
  allProgressBar: {
    width: "100% !important"
    // flexDirection: "row",
    // flex: 1
  },
  image: {
    position: "relative",
    height: 500,
    [theme.breakpoints.down("xs")]: {
      width: "50% !important", // Overrides inline-style
      height: 250
    },
    zIndex: 1,
    "& $imageBackdrop": {
      opacity: 0.15
    },
    "& $imageMarked": {
      opacity: 0
    },
    "& $imageTitle": {
      border: "4px solid currentColor"
    }
  },
  focusVisible: {},
  imageButton: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: theme.palette.common.white
  },
  imageSrc: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: "cover",
    backgroundPosition: "center 40%"
  },
  imageBackdrop: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: theme.palette.common.black,
    opacity: 0.4,
    transition: theme.transitions.create("opacity")
  },
  imageTitle: {
    position: "relative",
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 4}px ${theme
      .spacing.unit + 6}px`
  },
  imageMarked: {
    height: 3,
    width: 18,
    backgroundColor: theme.palette.common.white,
    position: "absolute",
    bottom: -2,
    //left: "calc(50% - 9px)",
    transition: theme.transitions.create("opacity")
  }
});

const round_1 = [
  {
    url: image_vitre,
    title: "Glass",
    cmd: "vitre",
    width: "50%"
  },
  {
    url: image_feu,
    title: "Fire",
    cmd: "feu",
    width: "50%"
  }
];
const round_21 = [
  {
    url: image_vitre,
    title: "Glass",
    cmd: "vitre",
    width: "50%"
  },
  {
    url: image_catapulte,
    title: "Catapult",
    cmd: "catapulte",
    width: "50%"
  }
];
const round_22 = [
  {
    url: image_feu,
    title: "Fire",
    cmd: "feu",
    width: "50%"
  },
  {
    url: image_catapulte,
    title: "Catapult",
    cmd: "catapulte",
    width: "50%"
  }
];
// const round_3 = [
//   {
//     url: image_vitre,
//     title: "Morceau de vitre",
//     cmd: "vitre",
//     width: "50%"
//   },
//   {
//     url: image_feu,
//     title: "Feu",
//     cmd: "feu",
//     width: "50%"
//   }
// ];
// const round_41 = [
//   {
//     url: image_vitre,
//     title: "Morceau de vitre",
//     cmd: "vitre",
//     width: "50%"
//   },
//   {
//     url: image_catapulte,
//     title: "Catapulte",
//     cmd: "catapulte",
//     width: "50%"
//   }
// ];
// const round_42 = [
//   {
//     url: image_feu,
//     title: "Feu",
//     cmd: "feu",
//     width: "50%"
//   },
//   {
//     url: image_catapulte,
//     title: "Catapulte",
//     cmd: "catapulte",
//     width: "50%"
//   }
// ];
// const round_5 = [
//   {
//     url: image_vitre,
//     title: "Morceau de vitre",
//     cmd: "vitre",
//     width: "50%"
//   },
//   {
//     url: image_feu,
//     title: "Feu",
//     cmd: "feu",
//     width: "50%"
//   }
// ];
// const round_61 = [
//   {
//     url: image_vitre,
//     title: "Morceau de vitre",
//     cmd: "vitre",
//     width: "50%"
//   },
//   {
//     url: image_catapulte,
//     title: "Catapulte",
//     cmd: "catapulte",
//     width: "50%"
//   }
// ];
// const round_62 = [
//   {
//     url: image_feu,
//     title: "Feu",
//     cmd: "feu",
//     width: "50%"
//   },
//   {
//     url: image_catapulte,
//     title: "Catapulte",
//     cmd: "catapulte",
//     width: "50%"
//   }
// ];

var haveVote = false;
var showPopUpOnce = false;
var currentState = "";
var voteState = "";
var player1 = global.isPlayer1;
//const serv = "http://" + server.ip + ":8000/CreativeJam19.html";
function AppChoice(props) {
  const { classes } = props;
  var fadetmp = 0.0;
  var isFading = false;

  const [fadeButton, setfadeButton] = React.useState(fadetmp);

  const [imageChoice, setActImages] = useState([]);
  const [completed, setCompleted] = React.useState(50);
  const [showVoteBar, setshowVoteBar] = React.useState("none");
  const [showVoteButton, setshowVoteButton] = React.useState("flex");
  const [userText, setuserText] = React.useState("");
  const [isVoteTime, setisVoteTime] = React.useState(false);
  const [urlPlayer, seturlPlayer] = React.useState(
    "https://player.twitch.tv/?channel=cbusque"
  );

  useEffect(() => {
    setInterval(async () => {
      axios.get(server.ip + ":3001/api/options").then(Response => {
        currentState = Response.data.state;
        switch (Response.data.state) {
          case "round_1":
            if (!showPopUpOnce) {
              setisVoteTime(true);
              showPopUpOnce = true;
            }
            setActImages(round_1);
            var result = parseInt(
              (Response.data.voteForVitre /
                (Response.data.voteForVitre + Response.data.voteForFeu)) *
                100
            );
            if (result == 100) {
              result = 90;
            } else if (result == 0) {
              result = 10;
            }
            setCompleted(result);
            break;
          case "round_21":
            if (!showPopUpOnce) {
              setisVoteTime(true);
              showPopUpOnce = true;
            }
            setActImages(round_21);
            var result = parseInt(
              (Response.data.voteForVitre /
                (Response.data.voteForVitre + Response.data.voteForCatapulte)) *
                100
            );
            if (result == 100) {
              result = 90;
            } else if (result == 0) {
              result = 10;
            }
            setCompleted(result);
            break;
          case "round_22":
            if (!showPopUpOnce) {
              setisVoteTime(true);
              showPopUpOnce = true;
            }
            setActImages(round_22);
            var result = parseInt(
              (Response.data.voteForFeu /
                (Response.data.voteForFeu + Response.data.voteForCatapulte)) *
                100
            );
            if (result == 100) {
              result = 90;
            } else if (result == 0) {
              result = 10;
            }
            setCompleted(result);
            break;
          // case "round_3":
          //   setActImages(round_3);
          //   setCompleted(
          //     parseInt(
          //       (Response.data.voteForVitre /
          //         (Response.data.voteForVitre + Response.data.voteForFeu)) *
          //         100
          //     )
          //   );
          //   break;
          // case "round_41":
          //   setActImages(round_41);
          //   setCompleted(
          //     parseInt(
          //       (Response.data.voteForVitre /
          //         (Response.data.voteForVitre +
          //           Response.data.voteForCatapulte)) *
          //         100
          //     )
          //   );
          //   break;
          // case "round_42":
          //   setActImages(round_42);
          //   setCompleted(
          //     parseInt(
          //       (Response.data.voteForFeu /
          //         (Response.data.voteForFeu + Response.data.voteForCatapulte)) *
          //         100
          //     )
          //   );
          //   break;
          // case "round_5":
          //   setActImages(round_5);
          //   setCompleted(
          //     parseInt(
          //       (Response.data.voteForVitre /
          //         (Response.data.voteForVitre + Response.data.voteForBateau)) *
          //         100
          //     )
          //   );
          //   break;
          // case "round_61":
          //   setActImages(round_61);
          //   setCompleted(
          //     parseInt(
          //       (Response.data.voteForVitre /
          //         (Response.data.voteForVitre +
          //           Response.data.voteForMontagne)) *
          //         100
          //     )
          //   );
          //   break;
          // case "round_62":
          //   setActImages(round_62);
          //   setCompleted(
          //     parseInt(
          //       (Response.data.voteForBateau /
          //         (Response.data.voteForBateau +
          //           Response.data.voteForMontagne)) *
          //         100
          //     )
          //   );
          //   break;
          case "NULL":
            showPopUpOnce = false;
            setisVoteTime(false);
            setshowVoteButton("none");
            setCompleted(50);
            setuserText("Soon, an important decision...");
            break;
          default:
            break;
        }
        if (Response.data.pWinner === "player1") {
          setshowVoteButton("none");
          setuserText("Player 1 win");
        } else if (Response.data.pWinner === "player2") {
          setshowVoteButton("none");
          setuserText("Player 2 win");
        } else if (haveVote) {
          setshowVoteBar("flex");
          setuserText("Which will be more popular?");
        } else if (!haveVote && Response.data.state !== "NULL") {
          setuserText("Make a choice...");
          setshowVoteButton("flex");
          setshowVoteBar("none");
        } else {
          setshowVoteBar("none");
        }
        if (currentState === voteState) {
          setshowVoteButton("none");
        } else {
          haveVote = false;
          voteState = "";
        }
      });
    }, 500);
    setInterval(async () => {
      if (isFading) {
        fadetmp = fadetmp - 0.1;
        if (fadetmp <= 0.1) {
          isFading = false;
        }
      } else if (!isFading) {
        fadetmp = fadetmp + 0.1;
        if (fadetmp >= 1.0) {
          isFading = true;
        }
      }
      setfadeButton(fadetmp);
      player1 = global.isPlayer1;
      if (player1) {
        seturlPlayer("https://player.twitch.tv/?channel=cbusque");
      } else {
        seturlPlayer("https://player.twitch.tv/?channel=festumplayer1");
      }
    }, 50);
  }, []);

  return (
    <div style={{ backgroundColor: "rgb(40, 40, 42)" }}>
      <Popup
        open={isVoteTime}
        modal
        closeOnDocumentClick
        contentStyle={{
          backgroundColor: "rgb(40, 40, 42)"
        }}
      >
        <div style={{ textAlign: "center" }}>
          <img src={image_vote} height="100%" width="100%" />
        </div>
      </Popup>
      <Iframe
        url={urlPlayer}
        scrolling="no"
        width="100% !important"
        height="300px"
        id="myId"
        className="myClassname"
        display="initial"
        position="relative"
        allowFullScreen
      />
      <Toolbar>
        <Typography
          variant="h6"
          color="inherit"
          style={{ margin: "auto", color: "white" }}
        >
          {userText}
        </Typography>

        {/* <ButtonBase
          style={{ margin: "auto", color: "white" }}
          onClick={() => {
            console.log("p1=" + player1);
            if (player1) {
              player1 = false;
            } else {
              player1 = true;
            }
            console.log("p1post=" + player1);
          }}
        >
          <NextIcon />
        </ButtonBase> */}
      </Toolbar>
      <Toolbar
        height="64px"
        style={{
          display: showVoteBar,
          marginBottom: "20%",
          marginTop: "10%",
          backgroundColor: "rgb(40, 40, 42)"
        }}
      >
        {imageChoice.slice(0, 1).map((image, index) => (
          <img
            src={imageChoice[0].url}
            height="64px"
            style={{
              marginRight: "10%",
              marginTop: "5%"
            }}
          />
        ))}
        <ReactProgressMeter
          currentProgress={completed}
          showPercent={false}
          show={true}
          color="cyan"
        />
        {imageChoice.slice(1, 2).map((image, index) => (
          <img
            src={imageChoice[1].url}
            height="64px"
            style={{
              marginLeft: "10%",
              marginTop: "5%"
            }}
          />
        ))}
      </Toolbar>
      <div
        style={{
          display: showVoteButton,
          backgroundColor: "rgb(40, 40, 42)"
        }}
      >
        {imageChoice.map(image => (
          <ButtonBase
            onClick={() => {
              console.log("onClick");
              if (!haveVote) {
                axios
                  .post(
                    server.ip + ":3001/api/actions/action?action=" + image.cmd
                  )
                  .then(console.log("DONE"));
                haveVote = true;
                voteState = currentState;
              }
              //disable button and maybe higlight the button
            }}
            focusRipple
            focus-visible
            key={image.title}
            className={classes.image}
            focusVisibleClassName={classes.focusVisible}
            style={{
              width: image.width
            }}
          >
            <span
              className={classes.imageSrc}
              style={{
                backgroundImage: `url(${image.url})`
              }}
            />
            <span className={classes.imageBackdrop} />
            <span className={classes.imageButton}>
              <Typography
                component="span"
                variant="subtitle1"
                color="inherit"
                className={classes.imageTitle}
                style={{
                  border: "4px solid rgba(255, 255, 255," + fadeButton + ")"
                }}
              >
                {image.title}
                <span className={classes.imageMarked} />
              </Typography>
            </span>
          </ButtonBase>
        ))}
      </div>
    </div>
  );
}

AppChoice.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(AppChoice);
