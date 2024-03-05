document.querySelector('#Login-btn').addEventListener('click', (event)=> {
    event.preventDefault();

    let username = document.getElementById('username').value
    let userpassword = document.getElementById('password').value
    let checkbox = document.getElementById('checkbox');

    if (username && userpassword && checkbox.checked) {

        let userObj = {
            'username': username,
            'password': userpassword
        };

        fetch('http://127.0.0.1:5050/user/login',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userObj),
        })
        .then((res) => {
            if (!res.ok) {
                throw new Error('Network response was not ok');
            }
            return res.json();
        })
        .then((data) => {
            console.log(data.session);
            // Save a persistent cookie named "username" with value "john_doe"
            setCookie('status', data.session.status, 1);
            setCookie('name', data.session.name, 1);
            setCookie('user_id', data.session.user_id, 1);
            window.location.href = "../index.html";
        })
        .catch((error) => {
            console.log(error);
            alert(error);
        })

    }
    else {
        alert("Something went wrong!")
    }
})


function setCookie(name, value, days) {
    var expires = '';
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = '; expires=' + date.toUTCString();
    }
    document.cookie = name + '=' + value + expires + '; path=/';
}

