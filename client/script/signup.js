const regBtn = document.getElementById('register-btn');


regBtn.addEventListener('click', ()=> {
    event.preventDefault()
    let userObj = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phonenumber: document.getElementById('number').value,
        password: document.getElementById('password').value
    }
    console.log(userObj);

    fetch('http://127.0.0.1:5050/user/add',
    {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(userObj),
        mode: 'no-cors'
    })
    .then((res) => {
        console.log(res);
    })
    .catch((error) => {
        console.log(error);
    })

})