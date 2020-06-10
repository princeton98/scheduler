import React from "react";

import "components/DayListItem.scss";
import classnames from "../../node_modules/classnames"

//export default function DayListItem(props) {
 // let dayClass = classnames("day-list__item", {
 //   "--selected": props.selected,
   // "--full": (props.spots === 0)
 // });

export default function DayListItem(props) {
    const dayClass = classnames("day-list__item", {
      "day-list__item--selected": props.selected,
      "day-list__item--full": props.spots === 0
    });

    const formatSpots = (props) => {
      if (props.spots === 0) {
        return "no spots remaining";
      }
      else if (props.spots === 1) {
        return props.spots + " spot remaining";
      }
      else {
        return props.spots + " spots remaining";
      }
    }

  return (
    <li onClick={props.setDay} className={dayClass} >
      <h2 className="text--regular">{props.name}</h2> 
      <h3 className="text--light">{formatSpots(props)}</h3>
    </li>
  );
}