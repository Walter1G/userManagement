// const usersList = document.getElementById('users');
// const createUserForm = document.getElementById('createUserForm');
// const addUserImg = document.getElementById('addUserIcon');
// const userDetailsForm = document.getElementById('userform');
// const editBtn = document.getElementById('editBtn');
// const saveBtn = document.getElementById('saveBtn');
// const deleteBtn = document.getElementById('deleteBtn');
// const addUserIcon = document.getElementsByClassName('nav');
// const FormArea= document.getElementsByClassName('formArea')
const addUserBtn = document.getElementById('addUsrBtn');
const createUsrFieldset =document.getElementById('CreateUser');


// //view create user form
addUserBtn.addEventListener('click',e=>{
    e.preventDefault();
    createUsrFieldset.style.visibility='visible';
    console.log('add user clicked');

}
)

// //add user
function createUser(userObj){
   
       
    return fetch('http://localhost:3000/users',{
        method: "POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(userObj)
    }).then(res => res.json)
    .then(user => console.log(user));

}

const usersList = document.getElementById('users');
const createUserForm = document.getElementById('createUserForm');
const editBtn = document.getElementById('editBtn');
const saveBtn = document.getElementById('saveBtn');
const deleteBtn = document.getElementById('deleteBtn');
const FormArea = document.getElementsByClassName('formArea');

let selectedUser = null; // Variable to store the currently selected user

function getAllUsers() {
    return fetch('http://localhost:3000/users')
        .then(res => res.json())
        .then(users => displayUsers(users));
}

function displayUsers(users) {
    for (const user of users) {
        const listItem = document.createElement('li');
        listItem.textContent = `${user.firstName} ${user.lastName}`;
        listItem.addEventListener('click', (e) => {
            e.preventDefault();
            displayUserInfo(user);
            // Enable edit button
            editBtn.removeAttribute('disabled');
        });
        usersList.appendChild(listItem);
    }
}

//input fields for info
const firstNameInfo = document.getElementById('firstNameInfo');
const lastNameInfo = document.getElementById('lastNameInfo');
const ageInfo = document.getElementById('ageInfo');
const cityInfo = document.getElementById('cityInfo');
const usernameInfo = document.getElementById('usernameInfo');
const emailInfo = document.getElementById('emailInfo');

function displayUserInfo(user) {
    // Store the currently selected user
    selectedUser = user;

    //display user info in the fields
    firstNameInfo.value = user.firstName;
    lastNameInfo.value = user.lastName;
    ageInfo.value = user.age;
    cityInfo.value = user.city;
    usernameInfo.value = user.username;
    emailInfo.value = user.email;

    //enable user edit
    editBtn.addEventListener('click', (e) => {
        e.preventDefault();

        firstNameInfo.removeAttribute("disabled");
        lastNameInfo.removeAttribute("disabled");
        ageInfo.removeAttribute("disabled");
        cityInfo.removeAttribute("disabled");
        usernameInfo.removeAttribute("disabled");
        emailInfo.removeAttribute("disabled");

        //enable save and delete buttons on edit
        saveBtn.removeAttribute("disabled");
        deleteBtn.removeAttribute("disabled");

        //handle update and delete
        handleUpdate();
        handleDelete();
    });
}

function handleUpdate() {
    if (!selectedUser) {
        // No user selected, do nothing
        return;
    }

    saveBtn.addEventListener('click', (e) => {
        e.preventDefault();
        // Update the selected user
        selectedUser.firstName = firstNameInfo.value;
        selectedUser.lastName = lastNameInfo.value;
        selectedUser.age = ageInfo.value;
        selectedUser.city = cityInfo.value;
        selectedUser.username = usernameInfo.value;
        selectedUser.email = emailInfo.value;
        updateUser(selectedUser);

        // Disable input fields after saving
        disableInputFields();
    });
}

function handleDelete() {
    if (!selectedUser) {
        // No user selected, do nothing
        return;
    }

    deleteBtn.addEventListener('click', (e) => {
        e.preventDefault();
        deleteUser(selectedUser.id);

        // Clear input fields after deletion
        clearInputFields();
        // Disable input fields after deletion
        disableInputFields();
    });
}

function disableInputFields() {
    firstNameInfo.setAttribute("disabled", "disabled");
    lastNameInfo.setAttribute("disabled", "disabled");
    ageInfo.setAttribute("disabled", "disabled");
    cityInfo.setAttribute("disabled", "disabled");
    usernameInfo.setAttribute("disabled", "disabled");
    emailInfo.setAttribute("disabled", "disabled");
}

function clearInputFields() {
    firstNameInfo.value = "";
    lastNameInfo.value = "";
    ageInfo.value = "";
    cityInfo.value = "";
    usernameInfo.value = "";
    emailInfo.value = "";
}

function createUser(userObj) {
    return fetch('http://localhost:3000/users', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userObj)
    }).then(res => res.json())
        .then(user => alert(`User added on record`));
}

function updateUser(user) {
    return fetch(`http://localhost:3000/users/${user.id}`, {
        method: 'PATCH',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(user),
    }).then(res => res.json())
        .then(user => console.log(user))
}

function deleteUser(id) {
    return fetch(`http://localhost:3000/users/${id}`, {
        method: 'DELETE',
        headers: { "Content-Type": "application/json" },
    }).then(res => res.json())
        .then(() => alert("RECORD DELETED"))
        .catch(err => console.error(err));
}

document.getElementById('createUserForm').addEventListener('submit', handleSubmit);

function handleSubmit(e) {
    e.preventDefault();
    let userObj = {
        username: e.target.userName.value,
        email: e.target.email.value,
        firstName: e.target.firstName.value,
        lastName: e.target.lastName.value,
        age: e.target.age.value,
        city: e.target.city.value,
    }

    createUser(userObj);
    // Reload the user list after creating a new user
    getAllUsers();
}

// Call getAllUsers on load
getAllUsers();
