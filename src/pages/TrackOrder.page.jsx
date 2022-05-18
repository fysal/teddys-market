import clsx from "clsx";
import { useEffect } from "react";
import Moment from "react-moment";
import { useHistory } from "react-router-dom";
import SidePanel from '../components/Nav/UserSidePanel';
const TrackOrder = ({ location }) => {
  const history = useHistory();
  console.log(location);
  const actions = location.state;
  const len = location.state.length -1;
  useEffect(() => {
    document.querySelector("body").classList.add("body_gray");
    return () => {
      document.querySelector("body").classList.remove("body_gray");
    };
  }, []);
  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-12 col-md-3"><SidePanel /></div>
        <div className="col-sm-12 col-md-9">
          <div className="order_inner bg-white my-5 pb-5 rounded border">
            <h6 className="p-3 border-bottom d-flex align-items-center">
              <span
                className="material-icons-outlined pointer"
                style={{fontSize:"18px"}}
                onClick={() => history.goBack()}
              >
                arrow_back
              </span>
              <span>Track order</span>
            </h6>
            {actions.map((action, index) => (
              <div className="m-4">
                <div
                  key={index}
                  className={clsx(
                    "d-flex align-items-start track_action position-relative"
                  )}
                >
                  {index < len && (
                    <div
                      className={clsx(
                        "line_track",
                        action.status.toLowerCase() === "pending"
                          ? "bg_lime_dark"
                          : action.status.toLowerCase() === "completed"
                          ? "bg_lime"
                          : "bg-danger"
                      )}
                    ></div>
                  )}
                  <div className="position-relative flex-grow">
                    <span
                      className={clsx(
                        "material-icons-outlined",
                        action.status.toLowerCase() === "pending"
                          ? "bg_lime_dark"
                          : action.status.toLowerCase() === "completed"
                          ? "bg_lime"
                          : "bg-danger"
                      )}
                    >
                      {action.status.toLowerCase() === "pending" ? "radio_button_checked" : "done" }
                    </span>
                  </div>
                  <div className="ms-3">
                    <div className="ac_header text-muted small">
                      {action.message}
                    </div>
                    <div>
                      <span
                        className={clsx(
                          "ac_status",
                          action.status.toLowerCase() === "pending"
                            ? "bg_lime_dark"
                            : action.status.toLowerCase() === "completed"
                            ? "bg_lime"
                            : "bg-danger"
                        )}
                      >
                        {action.status}
                      </span>
                    </div>
                    <div className="ac_date text-muted mt-1">
                      {
                        <Moment
                          date={action.date
                            .split(" ")
                            .reverse()[2]
                            .split("/")
                            .reverse()
                            .join("-")}
                          format="DD MMM YYYY"
                        />
                      }
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrackOrder;
