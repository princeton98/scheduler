export default function getAppointmentsForDay(state, day) {
  let arr = [];
  for (let number of state.days) {
    if (number.name === day) {
      for (let num of number.appointments) {
        arr.push(state.appointments[num]);
      }
    }
  }
  return arr;
}

export function getInterview(state, appointment) {
  let obj = {};
  // if no interview, return null
  if (appointment === null || appointment.interview === null) {
    return null;
  }
  const idNum = appointment.interview.interviewer;
  for (let key in state.appointments) {
    if (state.appointments[key].interview === null) {
    }
    // if state's appointment key is equal to appointment.id, then update obj information
    else if (state.appointments[key].id === appointment.id) {
      obj.student = state.appointments[key].interview.student
      obj.interviewer = {
        id: idNum,
        name: state.interviewers[idNum].name,
        avatar: state.interviewers[idNum].avatar
      }
      return obj;
    }

  }
  return null;
}

export function getInterviewersForDay(state, day) {
  let arr = [];
  // iterate over state.days
  for (let indivDay of state.days) {
    // if individual day is equal to parameter day, push looped interviewer into array
    if (indivDay.name === day) {
      for (let num of indivDay.interviewers) {
        arr.push(state.interviewers[num]);
      }
    }
  }
  return arr;
}