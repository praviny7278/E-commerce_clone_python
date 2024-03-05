let productData = '';

fetchData()

function fetchData() {
    // console.log("uy");

    fetch('http://127.0.0.1:5050/user/items', {
        method: "GET"
    })
    .then((res)=> {
        return res.json();
    })
    .then((data) => {
        // console.log(data[0].product_Id);
        fetch(`http://127.0.0.1:5050/user/product/${data[0].product_Id}`,{
            method: "GET"
        })
        .then((res) => {
            return res.json()
        })
        .then((data)=> {
            // console.log(data);
            displayData(data)
            productData = data;
        })
        .catch((error) => {
            console.log(error);
        })
    })
    .catch((error) => {
        console.log(error);
        alert(error);
    })
}


function displayData(data) {

    let card = document.createElement('div');
        card.className = 'card';
    let imgCard = document.createElement('div');
        imgCard.className = 'card-img';
    let image = document.createElement('img');
        image.src = data.image;
    let name = document.createElement('h4');
        name.innerHTML = `${data.name}`;
        name.className = 'card-name';
    let price = document.createElement('h4');
        price.innerHTML = `Rs: ${data.price}`;
        price.className = 'card-price';
    let rating = document.createElement('p');
        rating.innerHTML = `Rating: ${data.rating}`;
        rating.className = 'card-rating';
    let cardBtn = document.createElement('div');
        cardBtn.className = 'card-buttons';
    let buyBtn = document.createElement('button');
        buyBtn.innerHTML = 'Proceed to Buy';
        buyBtn.id = 'card-buy-btn';
        buyBtn.className = 'card-buy-btn';
        buyBtn.addEventListener('click', ()=> {
            addToPayment(data.price);
            document.querySelector('.product-purchase-cont').style.display = 'block';
            document.querySelector('.product-purchase-cont').style.pointerEvents = 'auto';
        });
        // buyBtn.style.pointerEvents


    imgCard.append(image);
    cardBtn.append(buyBtn);
    card.append(imgCard, name, price, rating, cardBtn);

    document.querySelector('.product-container').append(card);

     
}

document.querySelector('.fa-xmark').addEventListener('click', ()=> {
    document.querySelector('.product-purchase-cont').style.display = 'none';
});


function getCookies() {
    const cookies = document.cookie.split(';').reduce((acc, cookie) => {
        const [name, value] = cookie.trim().split('=');
        acc[name] = decodeURIComponent(value);
        return acc;
    }, {});
    return cookies;
}



document.getElementById('submit-btn').addEventListener('click', (e)=> {
    e.preventDefault();
    
    let name = document.getElementById('name').value;
    let email = document.getElementById('email').value;
    let address = document.getElementById('address').value;
    let city = document.getElementById('city').value;
    let state = document.getElementById('state').value;
    let pinCode = document.getElementById('pin-code').value;
    let cookie = getCookies();
    let userId = cookie.user_id;
    if (name && email
        && address && city
        && state && pinCode
        && userId
        ) {
        let deliveryAddress = {
            'name': name,
            'email': email,
            'address': address,
            'city': city,
            'state': state,
            'pincode': pinCode
        }

        let userAndDelDetails = {
            'user_id': userId,
            'cart_item': productData,
            'delivery_address': deliveryAddress
        }
        sendDataToCart(userAndDelDetails)
        alert("Your order has been added to the cart successfully");
        console.log(userAndDelDetails);
    } else {
        alert('please fill out your detals!');
    }
});




function sendDataToCart(data) {

    fetch('http://127.0.0.1:5050/user/cart/add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then((res) => res.json())
    .then((data) => {
        console.log(data);
        window.location.href = "../cart_page/cart.html";
    })
    .catch((error) => alert(error));

}


function addToPayment(price) {

    let gst = price/18;
        gst = gst.toFixed(2)
    let delchrg = 0;

    if (price > 500) {
        delchrg = 70;
    }
    else if(price > 2000) {
        delchrg = 100;
    }
    else {
        delchrg = 50;
    }

    let fPrice = parseInt(price) + parseFloat(gst) + delchrg;


    document.getElementById('rate').innerHTML = `${price} rs`;
    document.getElementById('gst').innerHTML = `${gst} rs`;
    document.getElementById('del-charge').innerHTML = `${delchrg} rs`;
    document.getElementById('f-price').innerHTML = `${(fPrice)} rs`;
}









// ====== Logout and cookies finctionality here ======= //

function setCookie(name, value, days) {
    var expires = '';
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = '; expires=' + date.toUTCString();
    }
    document.cookie = name + '=' + value + expires + '; path=/';
}


function getCookies() {
    const cookies = document.cookie.split(';').reduce((acc, cookie) => {
        const [name, value] = cookie.trim().split('=');
        acc[name] = decodeURIComponent(value);
        return acc;
    }, {});
    return cookies;
}


window.addEventListener('DOMContentLoaded', ()=> {

    const cookies = getCookies();

    if (cookies && cookies.status === 'true') {
        console.log(cookies.status);
        let name = cookies.name
        name = name.charAt(0).toUpperCase() + name.slice(1);
        document.getElementById('nav-buttos').style.display = 'none';
        document.getElementById('nav-profile').style.display = 'block';
        document.getElementById('logout').style.display = 'block';
        document.getElementById('user-name').innerHTML = name;
        document.getElementById('cart').addEventListener('click', ()=> {
            window.location.href = '../cart_page/cart.html';
        });

        const logoutBtn1 = document.getElementById('logout-btn');
        const logoutBtn2 = document.getElementById('logout');
        if (logoutBtn1) {
            logoutBtn1.addEventListener('click', () => {
                fetch('http://127.0.0.1:5050/user/logout', {
                    method: 'POST',
                })
                .then((res) => res.json())
                .then((data) => {
                    console.log(data);
                    setCookie('status', false, 1);
                    // window.location.reload(); // Consider if reloading is necessary
                })
                .catch((error) => alert(error)); // Handle errors properly
                console.log('button');
                document.getElementById('nav-buttos').style.display = 'block';
                document.getElementById('nav-profile').style.display = 'none';
            });
        }
        else {
            console.log('not found');
        }

        if (logoutBtn2) {
            logoutBtn2.addEventListener('click', () => {
                fetch('http://127.0.0.1:5050/user/logout', {
                    method: 'POST',
                })
                .then((res) => res.json())
                .then((data) => {
                    console.log(data);
                    setCookie('status', false, 1);
                    window.location.reload(); // Consider if reloading is necessary
                })
                .catch((error) => alert(error)); // Handle errors properly
                console.log('button');
                document.getElementById('nav-buttos').style.display = 'block';
                document.getElementById('nav-profile').style.display = 'none';
            });
        }
        else {
            console.log('not found');
        }
    }else {
        console.log('Session status not found or false');
        document.getElementById('logout').style.display = 'none';
    } 
   

})



function toggleMenu() {
    var menu = document.querySelector('.menu');
    if (menu.style.right === '0%') {
        menu.style.right = '-100%';
    } else {
        menu.style.right = '0%';
    }
}