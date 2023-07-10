/* Your Code Here */
function createEmployeeRecord(array){
    return {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: [],
    }
}
function createEmployeeRecords(arrayOfArrays){
    return arrayOfArrays.map(array => createEmployeeRecord(array));
}

let createTimeInEvent = function(timeStamp){
  let [date, hour] = timeStamp.split(' ')
  this.timeInEvents.push({
      type: "TimeIn",
      hour: parseInt(hour, 10),
      date,
  })
  return this
}

let createTimeOutEvent = function(timeStamp){
  let [date, hour] = timeStamp.split(' ')
  this.timeOutEvents.push({
      type: "TimeOut",
      hour: parseInt(hour, 10),
      date,
  })
  return this
}
  
  let hoursWorkedOnDate = function(findDate) {
  let inEvent = this.timeInEvents.find(function(e){
      return e.date === findDate
  })
  let outEvent = this.timeOutEvents.find(function(e){
      return e.date === findDate
  })

  return (outEvent.hour - inEvent.hour) / 100
}

let wagesEarnedOnDate = function(dateSought){
  let rawWage = hoursWorkedOnDate.call(this, dateSought)
      * this.payPerHour
  return parseFloat(rawWage.toString())
}

let findEmployeeByFirstName = function(srcArray, firstName){
return srcArray.find(function(record){
  return record.firstName === firstName
})
}

let calculatePayroll = function(arrayOfEmployeeRecords){
  return arrayOfEmployeeRecords.reduce(function(memo, record){
      return memo + allWagesFor.call(record)
  }, 0)
}
/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

