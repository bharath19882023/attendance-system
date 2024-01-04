document.addEventListener('DOMContentLoaded', function () {
    // Initialize current date on page load
    updateCurrentDate();

    // Sample data for employee list and attendance log
    const employeeList = ['Employee1', 'Employee2', 'Employee3'];
    const attendanceData = {
        '2024-01-04': ['Employee1', 'Employee3'],
        // Add more date entries as needed
    };

    // Populate employee list on page load
    const employeeListElement = document.getElementById('employee-list').querySelector('ul');
    populateList(employeeListElement, employeeList);

    // Populate attendance log for the current date on page load
    const attendanceListElement = document.getElementById('attendance-list');
    updateAttendanceLog();

    // Function to populate a list (ul) with items
    function populateList(listElement, items) {
        listElement.innerHTML = '';
        items.forEach(item => {
            const li = document.createElement('li');
            li.textContent = item;
            listElement.appendChild(li);
        });
    }

    // Function to update the current date and day
    function updateCurrentDate() {
        const currentDateElement = document.getElementById('current-date');
        const currentDayElement = document.getElementById('current-day');
        const now = new Date();
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        currentDateElement.textContent = 'Date: ' + now.toLocaleDateString('en-US', options);
        currentDayElement.textContent = 'Day: ' + now.toLocaleDateString('en-US', { weekday: 'long' });
    }

    // Function to update the attendance log based on the selected date
    function updateAttendanceLog() {
        const selectedDateElement = document.getElementById('select-date');
        const selectedDate = selectedDateElement.value;
        const attendanceLog = attendanceData[selectedDate] || [];

        const attendanceListElement = document.getElementById('attendance-list');
        populateList(attendanceListElement, attendanceLog);

        const selectedDateDisplayElement = document.getElementById('selected-date');
        selectedDateDisplayElement.textContent = selectedDate;
    }
});
