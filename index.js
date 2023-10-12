const usersList = document.getElementById('users');
const createUserForm = document.getElementById('createUserForm');
const userDetailsForm = document.getElementById('userform');
const editBtn = document.getElementById('editBtn');
const saveBtn = document.getElementById('saveBtn');
const deleteBtn = document.getElementById('deleteBtn');


function getAllUsers(){
     
    return fetch('http://localhost:3000/users')
    .then(res => res.json())
    .then(users => displayUsers(users))
}

function displayUsers(users){
    
        for(const user of users){
           
            const listItem = document.createElement('li');
            listItem.textContent=`${user.firstName} ${user.lastName}`; 
            listItem.addEventListener('click',e=>{
                e.preventDefault();
                displayUserInfo(user);
            })       
            usersList.appendChild(listItem);
        }

        // editBtn.addEventListener('click', e=>{e.preventDefault(); console.log('edit')})
      



       

}

//input fields for info
const firstNameInfo =document.getElementById('firstNameInfo');
const lastNameInfo =document.getElementById('lastNameInfo');
const ageInfo =document.getElementById('ageInfo');
const cityInfo =document.getElementById('cityInfo');
const usernameInfo =document.getElementById('usernameInfo');
const emailInfo =document.getElementById('emailInfo');


//handle user info section
function displayUserInfo(user){
    
    console.log(user)
    console.log(document.getElementById('firstNameInfo'))
    

    firstNameInfo.value=user.firstName;
    lastNameInfo.value=user.lastName;
    ageInfo.value=user.age;
    cityInfo.value=user.city;
    usernameInfo.value=user.username;
    emailInfo.value=user.email;


    editBtn.addEventListener('click', e=>{
        e.preventDefault();
        console.log('edit cliecked');
        firstNameInfo.removeAttribute("disabled");
        lastNameInfo.removeAttribute("disabled");
        ageInfo.removeAttribute("disabled");
        cityInfo.removeAttribute("disabled");
        usernameInfo.removeAttribute("disabled");
        emailInfo.removeAttribute("disabled");
        console.log('after disabling');

        saveBtn.addEventListener('click',e=>{
            e.preventDefault();
     

            user.firstName=firstNameInfo.value;
            user.lastName=lastNameInfo.value;
            user.age= ageInfo.value;
            user.city=cityInfo.value;
            user.username=usernameInfo.value;
            user.email=emailInfo.value;
            updateUser(user);

            firstNameInfo.setAttribute("disabled");
            lastNameInfo.setAttribute("disabled");
            ageInfo.setAttribute("disabled");
            cityInfo.setAttribute("disabled");
            usernameInfo.setAttribute("disabled");
            emailInfo.setAttribute("disabled");
            
            console.log('save clicked')
        });


        deleteBtn.addEventListener('click',e=>{e.preventDefault(); console.log('delete cliecked')});

        
    });

   


}


// document.getElementById('createUserForm').addEventListener('submit', function(event) {
//     event.preventDefault();

//         // Get the form data
//     const formData = new FormData(event.target);

//     // Convert form data to an object
//     const data = {};
//     formData.forEach((value, key) => {
//     data[key] = value;
//     });
//     // Send the data using a POST request
//     fetch('your_server_endpoint', {
//         method: 'POST',
//         body: JSON.stringify(data),
//         headers: {
//         'Content-Type': 'application/json',
//         },
//     })
//     .then(response => response.json()) // Assuming the server responds with JSON
//     .then(responseData => {
//         // Handle the response from the server if needed
//         console.log('Response from the server:', responseData);
//     })
//     .catch(error => {
//         // Handle any errors that occur during the fetch request
//         console.error('Error:', error);
//     });

// })

document.getElementById('createUserForm').addEventListener('submit',handleSubmit);

function handleSubmit(e){
    e.preventDefault();
    let userObj ={
        username:e.target.userName.value,  
        email:e.target.email.value,      
        firstName: e.target.firstName.value,
        lastName: e.target.lastName.value,
        age:e.target.age.value,
        city:e.target.city.value,       
      
       
    }   


    createUser(userObj);
    getAllUsers();
}





//add user
function createUser(userObj){
   
       
    return fetch('http://localhost:3000/users',{
        method: "POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(userObj)
    }).then(res => res.json)
    .then(user => console.log(user));

}

function updateUser(user){    

    return fetch(`http://localhost:3000/users/${user.id}`,{
        method:'PATCH',
        headers:{'Content-type':'application/json'},
        body:JSON.stringify(user),
    }).then(res => res.json())
    .then(user => console.log(user))



}





getAllUsers();