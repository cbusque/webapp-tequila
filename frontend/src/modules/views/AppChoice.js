import React, { useEffect, useState } from "react";
import Iframe from "react-iframe";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import ButtonBase from "@material-ui/core/ButtonBase";
import Typography from "@material-ui/core/Typography";
import axios from "axios";

import image_lions from "../../static/images/lion.jpg";
import image_trap from "../../static/images/trap.png";
import image_water from "../../static/images/water.png";
import image_cheese from "../../static/images/cheese.png";

import server from "../../public/server";

const styles = theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    minWidth: 0,
    width: "100% !important"
  },
  image: {
    position: "relative",
    height: 500,
    [theme.breakpoints.down("xs")]: {
      width: "50% !important", // Overrides inline-style
      height: 250
    },
    "&:hover, &$focusVisible": {
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
    url: image_lions,
    title: "lions",
    width: "100%"
  },
  {
    url: image_water,
    title: "water",
    width: "50%"
  }
];

const round_2 = [
  {
    url: image_lions,
    title: "lions",
    width: "50%"
  },
  {
    url: image_cheese,
    title: "cheese",
    width: "50%"
  }
];
const round_3 = [
  {
    url: image_lions,
    title: "lions",
    width: "50%"
  },
  {
    url: image_trap,
    title: "trap",
    width: "50%"
  }
];

const round_4 = [
  {
    url: image_cheese,
    title: "cheese",
    width: "50%"
  },
  {
    url: image_trap,
    title: "trap",
    width: "50%"
  }
];

const no_image = [];

//const serv = "http://" + server.ip + ":8000/CreativeJam19.html";
function AppChoice(props) {
  const { classes } = props;

  const [imageChoice, setActImages] = useState([]);

  useEffect(() => {
    setInterval(async () => {
      axios.get(server.ip + ":3001/api/options").then(Response => {
        console.log(Response.data);
        switch (Response.data) {
          case "round_1":
            setActImages(round_1);
            break;
          case "round_2":
            setActImages(round_2);
            break;
          case "round_3":
            setActImages(round_3);
            break;
          case "round_4":
            setActImages(round_4);
            break;
          case "NULL":
            setActImages(no_image);
            break;
          default:
            break;
        }
      });
    }, 5000);
  }, []);

  return (
    <div className={classes.root}>
      <Iframe
        //url="https://www.youtube.com/embed/_HXdCe639is"
        url="https://player.twitch.tv/?channel=cbusque"
        scrolling="no"
        width="100% !important"
        height="300px"
        id="myId"
        className="myClassname"
        display="initial"
        position="relative"
        allowFullScreen
      />
      {imageChoice.map(image => (
        <ButtonBase
          onClick={() => {
            console.log("onClick");

            axios
              .post(
                "http://" +
                  server.ip +
                  ":3001/api/actions/action?action=" +
                  image.title
              )
              .then(console.log("DONE"));
            //disable button and maybe higlight the button
          }}
          focusRipple
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
            >
              {image.title}
              <span className={classes.imageMarked} />
            </Typography>
          </span>
        </ButtonBase>
      ))}
    </div>
  );
}

AppChoice.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(AppChoice);
