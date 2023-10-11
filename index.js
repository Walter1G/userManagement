const usersList = document.getElementById('users');
const createUserForm = document.getElementById('createUserForm');
const userDetailsForm = document.getElementById('userform');


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
}

function displayUserInfo(user){
    
    console.log(user)
    console.log(document.getElementById('firstNameInfo'))
    document.getElementById('firstNameInfo').value="test"

   document.getElementById('firstNameInfo').value=user.firstName;
   document.getElementById('lastNameInfo').value=user.lastName;
   document.getElementById('ageInfo').value=user.age;
   document.getElementById('cityInfo').value=user.city;
   document.getElementById('usernameInfo').value=user.username;
   document.getElementById('emailInfo').value=user.email;


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
        username:e.target.username.value,  
        email:e.target.email.value,      
        firstName: e.target.firstName.value,
        lastName: e.target.lastName.value,
        age:e.target.age.value,
        city:e.target.city.value,       
      
       
    }
   


    createUser(userObj);
    // getAllUsers();
}




function createUser(userObj){
   
       
    return fetch('http://localhost:3000/users',{
        method: "POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(userObj)
    }).then(res => res.json)
    .then(user => console.log(user));

}





getAllUsers();