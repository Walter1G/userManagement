const usersList = document.getElementById('users');

function getAllUsers(){
     
    return fetch('http://localhost:3000/users')
    .then(res => res.json())
    .then(users => displayUsers(users))
}

function displayUsers(users){
        for(const user of users){
           
            const listItem = document.createElement('li');
            listItem.textContent=`${user.firstName} ${user.lastName}`;
        
            usersList.appendChild(listItem);
        }
}



getAllUsers();