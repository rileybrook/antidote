# Antidote

A web app for electronic medical billing

## Backend Node.js

# Express Server routes
/claim/add
/claim/get
/patient/add
/patient/search
/billingCode/list
/billingCode/search

# MongoDB Collections
- claims
- counters (to increment the chitNumber when inserting a new claim)
- patients
- billingCodes

## Frontend React.js

# Reactstrap
- leveraged layout components (container/row/col)

# Redux reducers
- main
- billing
- patient
- modal
 
# Redux middleware
- thunk
- billing field validation
- claim validation upon submit
- api to transmit claim to backend

# Other libraries
- moment
- react-datepicker
- react-autosuggest
- react-sidenav
- material-ui/core
