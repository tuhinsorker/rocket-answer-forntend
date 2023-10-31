import { Fragment } from "react";
import AskingZone from "./AskingZone";
import History from "./History";
import User from "./User";

const DashboardMain = () => {
  return (
    <Fragment>
      <History />

      <AskingZone />

      <User />

      {/* <LatestTransaction /> */}
    </Fragment>
  );
};

export default DashboardMain;
