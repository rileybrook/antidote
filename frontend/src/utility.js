export function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export function getAge(dateString) {
  var today = new Date()
  var birthDate = new Date(dateString)
  var age = today.getFullYear() - birthDate.getFullYear()
  var m = today.getMonth() - birthDate.getMonth()
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--
  }
  return age
}
<<<<<<< Updated upstream

export function reset() {
  try {
    document.getElementById("patientSearch").children[0].children[0].focus()
  } catch {
    console.log("Unable to set focus to the patient search field")
  }
}
=======
>>>>>>> Stashed changes
