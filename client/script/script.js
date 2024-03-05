let api_URL = 'http://127.0.0.1:5050/user/product';

fetchProducts()

function fetchProducts() {
    fetch(api_URL)
    .then((res) => {
        return res.json()
    })
    .then((data)=> {
        // console.log(data);

        for (let index = 0; index < data.length; index++) {
            displayProducts(data[index]);
            let name = data[index].name;
            let changeName = name.toLowerCase();

            for (let ind = 0; ind < changeName.length; ind++) {
                let element = changeName[ind];
                document.getElementById('search').addEventListener('input', ()=> {
                    if (document.getElementById('search').value == element) {
                        console.log('his.value');
                    }
                })
                
            }
        }
    })
    .catch((error) => {
        // console.log(error);
    })
}

function a() {
    console.log("work");
}

function displayProducts(data) {
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
    let buttonCont = document.createElement('div')
        buttonCont.className = 'card-buttons';
    let cartBtn = document.createElement('button')
        cartBtn.innerHTML = 'Add Cart';
        cartBtn.classList = 'card-cart-btn';
        cartBtn.id = 'card-cart-btn';
    let favBtnIcon = document.createElement('i');
        favBtnIcon.className = 'fa-solid fa-heart';
    let favBtn = document.createElement('button')
        favBtn.classList = 'card-fav-btn';
        favBtn.id = 'card-fav-btn';


        cartBtn.addEventListener('click', ()=> {

            let productId = {
                'id': data._id
            }
            // console.log((productId));

            fetch('http://127.0.0.1:5050/user/item/add/65e5846b807fa9c887f55ec5', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(productId)
            })
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                // console.log(data.msg);
                window.location.href = './order_item/item.html'
            })
            .catch((error) => {
                // console.log(error);
                alert('An error occurred. Please try again ', error);
            })
        });


        favBtn.addEventListener('dblclick', ()=> {
            alert('Your item saved in favourite.');
            favBtnIcon.classList.toggle('heart-icon-red')
        });

    cardImg.append(image)
    favBtn.append(favBtnIcon)
    buttonCont.append(cartBtn, favBtn)
    card.append(cardImg, name, price, rating, buttonCont)

    document.getElementById('cards-container').append(card);

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

    