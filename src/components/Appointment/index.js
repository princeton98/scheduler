import React from "react"
import "./styles.scss"
import Header from "./Header"
import Show from "./Show"
import Empty from "./Empty"
import useVisualMode from "../../hooks/useVisualMode"
import Form from "./Form"
import Status from "./Status"
import Confirm from "./Confirm"
import Error from './Error'

export const EMPTY = "EMPTY";
export const SHOW = "SHOW";
export const CREATE = "CREATE";
export const SAVING = "SAVING";
export const DELETING = "DELETING";
export const CONFIRM = "CONFIRM";
export const EDIT = "EDIT";
export const ERROR_SAVE = "ERROR_SAVE";
export const ERROR_DELETE = "ERROR_DELETE";

export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(props.interview ? SHOW : EMPTY);
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING)
    props.bookInterview(props.id, interview, transition)
      .then(response => {
        transition(SHOW);
      })
      .catch(response => {
        transition(ERROR_SAVE, true);
        console.log(mode)
      });
  }

  function remove(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(DELETING, true);
    props.cancelInterview(props.id, interview, transition)
      .then((response) => {
        console.log("this is the cancel",mode);
        transition(EMPTY);
      })
      .catch((response) => {
        transition(ERROR_DELETE, true)
        console.log(mode)
      })
  }
  return (
    <article data-testid="appointment" className="appointment">
      <Header time={props.time} />
      {mode === ERROR_SAVE && <Error error="Could not save appointment" onClose={back} />}
      {mode === ERROR_DELETE && <Error error="Could not delete appointment" onClose={back} />}
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={() => transition(CONFIRM)}
          onEdit={() => transition(EDIT)}
        />
      )}
      {mode === CREATE && (
        <Form
          key={props.id}
          interviewers={props.interviewers}
          name={props.name}
          interviewer={props.interviewer}
          onSave={save}
          onCancel={back}
          interview={props.bookInterview} />
      )}
      {mode === SAVING && <Status message="Saving" />}
      {mode === DELETING && <Status message="Deleting" />}
      {mode === CONFIRM && <Confirm message="Are you sure you would like to delete?" onConfirm={remove} onCancel={() => transition(SHOW)} />}
      {mode === EDIT && (<Form
        key={props.id}
        interviewers={props.interviewers}
        name={props.interview.student}
        interviewer={props.interview.interviewer.id}
        onSave={save}
        onCancel={back}
        interview={props.bookInterview} />)}
    </article>);
}