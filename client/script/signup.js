
document.getElementById("registrationForm").addEventListener("click", function(event) {
    event.preventDefault();

    let name = document.getElementById('name').value;
    let email = document.getElementById('email').value;
    let phoneNumber = document.getElementById('phoneNumber').value
    let password = document.getElementById('password').value
    let checkbox = document.getElementById('checkbox');

    if (name && email && phoneNumber && password && checkbox.checked) {
        
        let userObj = {
            'name': name,
            'email': email,
            'phoneNumber': phoneNumber,
            'password': password
        };
        
        fetch('http://127.0.0.1:5050/user/add', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userObj)
        })
        .then((res) => {
            if (!res.ok) {
                throw new Error('Network response was not ok');
            }
            return res.json();
        })
        .then((data) => {
            console.log(data);
            alert(data.msg); // Display success message
            window.location.href = "../signIn/signin.html";
        })
        .catch((error) => {
            console.error('Error:', error);
            alert('An error occurred. Please try again');
        });
    } else{
        console.log('wg');
        alert('Something went wrong!')
    }
});