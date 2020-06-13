import React from "react"
import "components/InterviewerList.scss"
import InterviewerListItem from "./InterviewerListItem"

export default function InterviewerList(props) {
  return (
  <section className = "interviewers">
    <h4 className="interviewers__header text--light">Interviewer</h4>
    <ul className="interviewers__list">{props.interviewers.map((mentor) => {
      return (<InterviewerListItem
      id={mentor.id}
       name={mentor.name}
       avatar={mentor.avatar}
       onChange={(event) => props.onChange(mentor.id)}
       selected={mentor.id === props.value}
       />)
    })}
    </ul>
    </section>
    )
}