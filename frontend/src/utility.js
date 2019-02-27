export function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}
<<<<<<< HEAD

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
=======
/*export function1 (){try {
  document.getElementById("patientSearch").children[0].children[0].focus()
} catch {
  console.log("Unable to set focus to the patient search field")
}
} else if (!this.props.userClickedInvoice) {
if (this.props.selectedPatientMedicare === "") {
  this.toggleNoPatientSelected()
} else {
  this.props.setUserClickedInvoice()
  this.props.newBillingLine()
}
}}*/
>>>>>>> c3b74b27b4e267ae86b58ba1e95c2a12abec6c07
