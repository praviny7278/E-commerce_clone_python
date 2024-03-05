
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

function setCookie(name, value, days) {
    var expires = '';
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = '; expires=' + date.toUTCString();
    }
    document.cookie = name + '=' + value + expires + '; path=/';
}


function toggleMenu() {
    var menu = document.querySelector('.menu');
    if (menu.style.right === '0%') {
        menu.style.right = '-100%';
    } else {
        menu.style.right = '0%';
    }
}


function getCookies() {
    const cookies = document.cookie.split(';').reduce((acc, cookie) => {
        const [name, value] = cookie.trim().split('=');
        acc[name] = decodeURIComponent(value);
        return acc;
    }, {});
    return cookies;
}

let cookies = getCookies();
console.log(cookies.user_id);


fetchData()

function fetchData() {

    fetch(`http://127.0.0.1:5050/user/cart/data`)
    .then((res) => {
        return res.json();
    })
    .then((data)=> {
        // console.log(data[0].user_id);
        for (let index = 0; index < data.length; index++) {
            if (data[index].user_id == cookies.user_id) {
                // console.log(data[index]);
                displayProducts(data[index].cart_item)
            }
        }
    })
    .catch((error) => {
        console.log(error);
    })
}


function displayProducts(data) {
    console.log(data);
    let card = document.createElement('div')
        card.className = 'card';
    let cardImg = document.createElement('div')
        cardImg.className = 'card-img';
    let image = document.createElement('img')
        image.src = data.image
        image.onload = 'lazy';
    let name = document.createElement('h4')
        name.innerHTML = data.name;
        name.className = 'card-name';
    let price = document.createElement('h4')
        price.innerHTML = `Rs : ${data.price }`;
        price.className = 'card-price';
    let rating = document.createElement('p')
        rating.innerHTML = `Rating : ${data.rating}`;
        rating.className = 'card-rating';
    let order = document.createElement('p');
        order.innerHTML = 'Order Placed';
        order.className = 'cart-order';    
    let buttonCont = document.createElement('div')
        buttonCont.className = 'card-buttons';
    let cartBtn = document.createElement('button')
        cartBtn.innerHTML = 'View Details';
        cartBtn.classList = 'view-more';
        cartBtn.id = 'view-more';


    cardImg.append(image)
    buttonCont.append(cartBtn)
    card.append(cardImg, name, price, rating, order, buttonCont)

    document.getElementById('cards-container').append(card);

}