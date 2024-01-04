document.addEventListener('DOMContentLoaded', function () {
    // Sample data for employee list and attendance log
    const employeeList = ['Employee1', 'Employee2', 'Employee3'];
    const attendanceData = {
        '2024-01-04': ['Employee1', 'Employee3'],
        // Add more date entries as needed
    };

    // Sample data for user list (initially retrieved from localStorage)
    let userList = JSON.parse(localStorage.getItem('userList')) || [];

    // Populate employee list on page load
    const employeeListElement = document.getElementById('employee-list').querySelector('ul');
    populateList(employeeListElement, employeeList);

    // Populate attendance log for the current date on page load
    const attendanceListElement = document.getElementById('attendance-list');
    updateAttendanceLog();

    // Populate user list on page load
    const userListElement = document.getElementById('employee-list').querySelector('ul');
    populateUserList(userListElement, userList);

    // Function to populate a list (ul) with items
    function populateList(listElement, items) {
        listElement.innerHTML = '';
        items.forEach(item => {
            const li = document.createElement('li');
            li.textContent = item;
            listElement.appendChild(li);
        });
    }

    // Function to populate the user list
    function populateUserList(listElement, users) {
        listElement.innerHTML = '';
        users.forEach(user => {
            const li = document.createElement('li');
            li.textContent = `${user.name} (ID: ${user.employeeId})`;
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
        const selectedDate = selectedDateElement ? selectedDateElement.value : getFormattedDate();
        const attendanceLog = attendanceData[selectedDate] || [];

        const attendanceListElement = document.getElementById('attendance-list');
        populateList(attendanceListElement, attendanceLog);

        const selectedDateDisplayElement = document.getElementById('selected-date');
        if (selectedDateDisplayElement) {
            selectedDateDisplayElement.textContent = selectedDate;
        }
    }

    // Function to add a new user
    function addNewUser() {
        const nameInput = document.getElementById('name');
        const employeeIdInput = document.getElementById('employee-id');

        // Get the values from the form
        const name = nameInput.value;
        const employeeId = employeeIdInput.value;

        // Validate the input (you can add more validation as needed)

        // Add the new user to the list
        const newUser = { name, employeeId };
        userList.push(newUser);

        // Save the updated user list to localStorage
        localStorage.setItem('userList', JSON.stringify(userList));

        // Update the user list on the page
        populateUserList(userListElement, userList);

        // Clear the form fields
        nameInput.value = '';
        employeeIdInput.value = '';

        // You can also save the user data to the server or database at this point
    }

    // Function to get the current date in 'YYYY-MM-DD' format
    function getFormattedDate() {
        const now = new Date();
        const year = now.getFullYear();
        const month = (now.getMonth() + 1).toString().padStart(2, '0');
        const day = now.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    // Initialize current date on page load
    updateCurrentDate();
});
