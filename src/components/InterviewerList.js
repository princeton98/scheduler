import React from "react"
import PropTypes from "prop-types"
import "components/InterviewerList.scss"
import InterviewerListItem from "./InterviewerListItem"

export default function InterviewerList(props) {
  let value = props.value
  return (
  <section className = "interviewers">
    <h4 className="interviewers__header text--light">Interviewer</h4>
    <ul className="interviewers__list">{props.interviewers.map((mentor) => {
      return (<InterviewerListItem
      key={mentor.id}
       name={mentor.name}
       avatar={mentor.avatar}
       onChange={(event) => props.onChange(mentor.id)}
       selected={mentor.id === value}
       />)
    })}
    </ul>
    </section>
    )
}
InterviewerList.propTypes = {
  value: PropTypes.number,
  onChange : PropTypes.func.isRequired
}