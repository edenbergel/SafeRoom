import React from "react";
import { Link } from "react-router-dom";

import "./elementmenu.scss";

function ElementMenu(props) {
  return (
    <Link to={"/" + props.id}>
      <div
        className={
          window.location.pathname === "/" + props.id
            ? "ElementMenu active"
            : "ElementMenu"
        }
      >
        {props.name}
      </div>
    </Link>
  );
}

export default ElementMenu;
