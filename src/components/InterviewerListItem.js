import React from "react"
import "components/InterviewerListItem.scss"
import classnames from "../../node_modules/classnames"

export default function InterviewerListItem(props) {
  let interviewClass = classnames("interviewers__item", {
    "interviewers__item--selected-image": (props.selected, props.avatar),
    "interviewers__item--selected": props.selected,
    "interviewers__item-image": props.avatar
  });

  return (
    <li className={interviewClass} onClick={props.onChange}>
      <img
        src={props.avatar}
        className="interviewers__item-image"
        alt={props.name}
      />
      {props.selected && props.name}
    </li>);
}