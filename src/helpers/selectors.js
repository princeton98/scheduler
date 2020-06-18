 export default function getAppointmentsForDay(state, day) {
  let arr = []
  for (let number of state.days) {
    if (number.name === day) {
      for (let num of number.appointments) {
        arr.push(state.appointments[num]);
      }
    }
  }
  return arr
}

export  function getInterview(state, appointment) {
  let obj = {}
  // return object, insert state, containing interview data
  // pass in an object that contains the interviewer
  //so it returns the interview with the added interviewer object
  if (appointment === null || appointment.interview === null) {
    return null;
  }
  const idNum = appointment.interview.interviewer
  for (let key in state.appointments ) {
    if (state.appointments[key].interview === null) {
      
    }
    else if (state.appointments[key].id === appointment.id) {
      obj.student = state.appointments[key].interview.student
      //obj.idNum.student = state.appointments[key].interview.student
      obj.interviewer = {
        id: idNum,
        name: state.interviewers[idNum].name,
        avatar: state.interviewers[idNum].avatar
      }
      return obj
    }
    
  }
  return null;
}

export function getInterviewersForDay(state, day) {
  let arr = []
  for (let number of state.days) {
    if (number.name === day) {
      for (let num of number.interviewers) {
        arr.push(state.interviewers[num]);
      }
    }
  }
  return arr
}