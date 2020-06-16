import { useState, useEffect } from "react"
import axios from "axios";

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const appointmentIdToDayId = (id) => {

    let newId
    if (id >= 1 && id <= 5) {
      newId = 1
    }
    if (id >= 6 && id <= 10) {
      newId = 2
    }
    if (id >= 11 && id <= 15) {
      newId = 3
    }
    if (id >= 16 && id <= 20) {
      newId = 4
    }
    if (id >= 21 && id <= 25) {
      newId = 5
    }
    return newId
  }

  const bookInterview = async (id, interview) => {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    let dayId = appointmentIdToDayId(id)
    const updatedDay = {
      ...state.days[dayId - 1],
      spots: state.days[dayId - 1].spots - 1
    }
    const days = state.days;
    days[dayId - 1] = updatedDay;

    // const days = state.days.map(day=> {
    //   if(day.id !== newId) return day;
    //   return updatedDay;
    // });



    await axios.put(`/api/appointments/${id}`, { interview });
    setState({ ...state, appointments, days });
    return appointments;
  }

  const cancelInterview = async (id, interview) => {
    let dayId = appointmentIdToDayId(id)
    const updatedDay = {
      ...state.days[dayId - 1],
      spots: state.days[dayId - 1].spots + 1
    }
    const days = state.days;
    days[dayId - 1] = updatedDay;
    await axios.delete(`/api/appointments/${id}`, { interview })
    setState({ ...state, days })
  }

  const setDay = day => setState({ ...state, day })

  useEffect(() => {
    Promise.all([
      Promise.resolve(axios.get("/api/days")),
      Promise.resolve(axios.get("/api/appointments")),
      Promise.resolve(axios.get("/api/interviewers"))
    ])
      .then((all) => {
        setState(prev => ({
         ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data
        }))
        //console.log(all)
      })
      .catch((response) => console.log(response))

  }, [])

  return { state, setDay, bookInterview, cancelInterview }
}