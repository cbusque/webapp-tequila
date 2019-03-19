import withRoot from "./modules/withRoot";
// --- Post bootstrap -----
import React from "react";
import AppAppBar from "./modules/views/AppAppBar";
import AppChoice from "./modules/views/AppChoice";
import AppFooter from "./modules/views/AppFooter";

function Index() {
  return (
    <React.Fragment>
      <AppAppBar />
      <AppChoice disabled={false} />
      <AppFooter />
    </React.Fragment>
  );
}

export default withRoot(Index);
