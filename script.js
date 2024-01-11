employeeList = document.getElementById('employees-list');

employees = getEmployees();

// make a request to the API and then call renderEmployees
function getEmployees() {
    fetch('https://emplistapi-258220.appspot.com/')
        .then(response => response.json())
        .then(data => {
            console.log(data);
            renderEmployees(data);
        });
}


// render the employees to the page
function renderEmployees(employees) {
        employees.forEach(employee => {
            const firstName = employee.name.first;
            const lastName = employee.name.last;
            const position = employee.jobTitle;
            
            //if first name, last name, and position are not null, then add to the list
            if (firstName && lastName && position) {
                const image = employee.photoURL || "https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg";
                employeeList.innerHTML += `
                    <li>
                        <div class="card">
                            <div class="card-content">
                                <div class="media">
                                <div class="media-left">
                                    <img class="custom" src="${image}">
                                </div>
                                <div class="media-content">
                                    <p class="title is-4">${firstName} ${lastName}</p>
                                    <p class="subtitle is-6">${position}</p>
                                </div>
                                </div>
                            </div>
                        </div>
                    </li>
                `;
            }
        });

        //add event listener to each li element, to allow for color change when clicked
        document.querySelectorAll('li').forEach(function(item) {
            item.addEventListener('click', function() {
                if (item.childNodes[1].classList.contains('color-change')) {
                    item.childNodes[1].classList.remove('color-change');
                    return;
                } else {
                    item.childNodes[1].classList.add('color-change');
                }
                
            });
        });
}



const closeModal = document.getElementById('close-modal');
const modal = document.getElementById('modal-id')
const form = document.getElementById('add-employee-form')
const saveButton = document.getElementById('save-button');
const cancelButton = document.getElementById('cancel-button');
const firstName = document.getElementById('first-name');
const lastName = document.getElementById('last-name');
const jobTitle = document.getElementById('job-title');
const photoURL = document.getElementById('photo-url');

//add event listener to the save button for form
saveButton.addEventListener('click', (e) => {
    e.preventDefault();
    if (firstName.value === "" || lastName.value === "" || jobTitle.value === "") {
        alert('First name, last name, and job title are required');
        return "";
    }
    const newEmployee = {
        name: {
            first: firstName.value,
            last: lastName.value
        }
    };
    if (jobTitle.value !== "") {
        newEmployee.jobTitle = jobTitle.value;
    }
    if (photoURL.value !== "") {
        newEmployee.photoURL = photoURL.value;
    }
    firstName.value = "";
    lastName.value = "";
    jobTitle.value = "";
    photoURL.value = "";
    modal.classList.remove('is-active');
    alert('Employee was added');
    console.log(newEmployee);
    return newEmployee;
});

//add event listener to the add employee button, enables modal
function addButton() {
    console.log('Button was clicked');
    modal.classList.add('is-active');
};

closeModal.addEventListener('click', (e) => {
    e.preventDefault();
    modal.classList.remove('is-active');
});

cancelButton.addEventListener('click', (e) => {
    e.preventDefault();
    modal.classList.remove('is-active');
});

