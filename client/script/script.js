let api_URL = 'http://127.0.0.1:5050/user/product';










fetchProducts()

function fetchProducts() {
    fetch(api_URL)
    .then((res) => {
        // console.log(res);
        return res.json()
    })
    .then((data)=> {
        console.log(data);

        for (let index = 0; index < data.length; index++) {
            displayProducts(data[index]);
        }
    })
    .catch((error) => {
        console.log(error);
    })
}



function displayProducts(data) {
    console.log(
        'data'
    );
    // document.getElementById('cards-container').innerHTML = ''

    let card = document.createElement('div')
        card.className = 'card';
    let cardImg = document.createElement('div')
        cardImg.className = 'card-img';
    let image = document.createElement('img')
        image.src = data.image
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

            let productData = {
                'id': data._id
            }
            console.log(typeof(productData));

            fetch('http://127.0.0.1:5050/user/item/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: {'_id': data._id}
            })
            .then((res) => {
                return res.json();
            })
            .then((d) => {
                console.log(d);
                window.location.href = './order_item/item.html'
            })
            .catch((error) => {
                console.log(error);
                alert('An error occurred. Please try again ', error);
            })
        });


        favBtn.addEventListener('click', ()=> {
            alert('Your item saved in favourite.');
            favBtnIcon.classList.toggle('heart-icon-red')
        });

    cardImg.append(image)
    favBtn.append(favBtnIcon)
    buttonCont.append(cartBtn, favBtn)
    card.append(cardImg, name, price, rating, buttonCont)

    document.getElementById('cards-container').append(card);

}


function onClickCartBtn() {

}

