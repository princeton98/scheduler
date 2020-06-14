import React, { useState, useEffect } from "react";
import axios from "axios";
import "components/Application.scss";
import DayList from "components/DayList.js"
import Appointment from "components/Appointment/index"
import  getAppointmentsForDay  from "../helpers/selectors"
import  { getInterview } from "../helpers/selectors"
import { getInterviewersForDay } from "../helpers/selectors"


export default function Application(props) {
  
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const bookInterview =  async (id, interview) => {
    const appointment = {
     ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    await axios.put(`/api/appointments/${id}`, {interview});
    setState({...state,appointments});
    return appointments;
  }

  const cancelInterview = async (id, interview) => {
    await axios.delete(`/api/appointments/${id}`, {interview})
      setState({...state})
  }

  const setDay = day => setState({...state, day})

  useEffect(() => {
    Promise.all([
      Promise.resolve(axios.get("/api/days")),
      Promise.resolve(axios.get("/api/appointments")),
      Promise.resolve(axios.get("/api/interviewers"))
    ])
    .then((all) =>  {
      setState(prev => ({days: all[0].data, appointments: all[1].data, interviewers: all[2].data}) )
      //console.log(all)
    })
    .catch((response) => console.log(response))

  },[])
//const appointments = getAppointmentsForDay(state, state.day)

  return (
    <main className="layout">
      <section className="sidebar">
      <img
  className="sidebar--centered"
  src="images/logo.png"
  alt="Interview Scheduler"
/>
<hr className="sidebar__separator sidebar--centered" />
<nav className="sidebar__menu">
<DayList
  days={state.days}
  day={state.day}
  setDay={day => setDay(day)}
/>
</nav>
<img
  className="sidebar__lhl sidebar--centered"
  src="images/lhl.png"
  alt="Lighthouse Labs"
/>
      </section>
      <section className="schedule">
        <li>
        {getAppointmentsForDay(state, state.day).map( (appointment) => {
          const interview = getInterview(state, appointment.interview);
          const interviewers = getInterviewersForDay(state, state.day);
          return(
            <Appointment 
            key={appointment.id}
            id={appointment.id}
            time={appointment.time}
            interview={interview}
            interviewers={interviewers}
            bookInterview={bookInterview}
            cancelInterview={cancelInterview}
            />)
        
        })}</li>
      </section>
    </main>
  );
}
