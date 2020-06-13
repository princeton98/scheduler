import React from "react"
import "./styles.scss"
import Header from "./Header"
import Show from "./Show"
import Empty from "./Empty"
import useVisualMode from "../../hooks/useVisualMode"
import Form from "./Form"
import Status from "./Status"

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING"

export default function Appointment(props) {
   const {mode, transition, back } = useVisualMode(props.interview ? SHOW : EMPTY) 
   function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition("SAVING")
    props.bookInterview(props.id, interview, transition)
    console.log("hello from save");
    //transition(SHOW)
  }

  function remove(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition("DELETING")
    props.cancelInterview(props.id, interview, transition)
  }
  return (
  <article className="appointment">
    <Header time={props.time}/>
  {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
  {mode === SHOW && (
  <Show
    student={props.interview.student}
    interviewer={props.interview.interviewer}
    onDelete={remove}
  />
)}
  {mode === CREATE && (
    <Form 
    interviewers={props.interviewers}
    name={props.name}
    interviewer={props.interviewer}
    onSave={save}
    onCancel={back}
    interview={props.bookInterview} />
  )}
  {mode === SAVING && <Status message="Saving"/> }
  {mode === DELETING && <Status message="Deleting" />}
    </article>)
}