import React, { useEffect, useState } from "react";

import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "../components/AppBar";
import Toolbar from "../components/Toolbar";
import compose from "recompose/compose";
import Typography from "@material-ui/core/Typography";

import ReactCountdownClock from "react-countdown-clock";

import axios from "axios";
import CheeseburgerMenua from "../components/myHambergerMenu";
import server from "../../public/server";

const styles = theme => ({
  margin: {
    margin: theme.spacing.unit
  },
  title: {
    fontSize: 24
  },
  left: {
    flex: 1
  }
});

function AppAppBar(props) {
  const { classes } = props;
  const [timer, setTimer] = useState(13);
  const [showLoading, setShowLoading] = useState(0.0);
  useEffect(() => {
    var localTimer = 0;
    //should be get timer
    axios.get(server.ip + ":3001/api/options").then(Response => {
      setTimeout(() => setShowLoading(0.0));
      setTimer(60);
      localTimer = 60;
    });
    var timerInterval = setInterval(async () => {
      localTimer = localTimer - 1;
      if (localTimer < 15) {
        setTimer(15);
        setTimeout(() => setShowLoading(0.9));
        clearInterval(timerInterval);
      }
    }, 1000);
  }, []);

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <CheeseburgerMenua />

          <Typography variant="h6" color="inherit" className={classes.left}>
            Téquila
          </Typography>
          <ReactCountdownClock
            seconds={timer}
            color="#fff5f8"
            alpha={showLoading}
            size={50}
            onComplete={() => {
              console.log("timer finished");
            }}
          />
        </Toolbar>
      </AppBar>
    </div>
  );
}

AppAppBar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default compose(withStyles(styles))(AppAppBar);
