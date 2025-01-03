// Function to create a single employee record
function createEmployeeRecord(arr) {
    return {
        firstName: arr[0],
        familyName: arr[1],
        title: arr[2],
        payPerHour: arr[3],
        timeInEvents: [],
        timeOutEvents: []
    };
}

// Function to create multiple employee records
function createEmployeeRecords(arrOfArr) {
    return arrOfArr.map(createEmployeeRecord);
}

// Function to add timeIn event
function createTimeInEvent(employeeRecord, dateTime) {
    const [date, hour] = dateTime.split(' ');
    employeeRecord.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour),
        date: date
    });
    return employeeRecord;
}

// Function to add timeOut event
function createTimeOutEvent(employeeRecord, dateTime) {
    const [date, hour] = dateTime.split(' ');
    employeeRecord.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour),
        date: date
    });
    return employeeRecord;
}

// Function to calculate hours worked on a date
function hoursWorkedOnDate(employeeRecord, date) {
    const timeIn = employeeRecord.timeInEvents.find(e => e.date === date);
    const timeOut = employeeRecord.timeOutEvents.find(e => e.date === date);
    return (timeOut.hour - timeIn.hour) / 100;
}

// Function to calculate wages earned on a date
function wagesEarnedOnDate(employeeRecord, date) {
    const hoursWorked = hoursWorkedOnDate(employeeRecord, date);
    return hoursWorked * employeeRecord.payPerHour;
}

// Function to calculate total wages for all dates
function allWagesFor(employeeRecord) {
    return employeeRecord.timeInEvents.reduce((total, timeInEvent) => {
        const timeOutEvent = employeeRecord.timeOutEvents.find(e => e.date === timeInEvent.date);
        const hoursWorked = (timeOutEvent.hour - timeInEvent.hour) / 100;
        return total + hoursWorked * employeeRecord.payPerHour;
    }, 0);
}

// Function to calculate the total payroll for multiple employees
function calculatePayroll(employeeRecords) {
    return employeeRecords.reduce((total, employeeRecord) => total + allWagesFor(employeeRecord), 0);
}

