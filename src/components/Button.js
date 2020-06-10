import React from "react";

import "components/Button.scss";
import classNames from "../../node_modules/classnames"

export default function Button(props) {
   let buttonTotal =  classNames({
      button: true,
      " button--confirm": props.confirm,
      " button--danger": props.danger,
   })
   return <button className={buttonTotal} disabled={props.disabled} onClick={props.onClick}>{props.children}</button>;
}
