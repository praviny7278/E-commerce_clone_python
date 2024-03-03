from flask import Flask, jsonify, request, session
from pymongo import MongoClient
from bson import ObjectId
from flask_cors import CORS, cross_origin
import os
import base64



app = Flask(__name__)

CORS(app)

client = MongoClient('mongodb+srv://praveen:praveen@cluster0.dhjmuqu.mongodb.net/?retryWrites=true&w''=majority')

# Create database name
mongoDb = client.e_commerce


def generate_secret_key():
    seceret_key_bytes = os.urandom(32)
    seceret_key_base64 = base64.b64encode(seceret_key_bytes).decode('utf-8')

    return seceret_key_base64

app.secret_key = generate_secret_key()


# Get All User_data Route
@app.route('/user', methods=['GET'])
def get_user():
    user_data = list(mongoDb.user.find({}))
    user_data_serializable = [
        {**user, '_id': str(user['_id'])} for user in user_data
    ]
    print(user_data)
    return jsonify(user_data_serializable)



# Get User_data by ID
@app.route('/user/<id>', methods=['GET'])
def get_user_id(id):
    uid = ObjectId(id)
    use = mongoDb.user.find_one({'_id': uid})
    if use is not None:
        user_data_serializable = {**use, '_id': str(use['_id'])}
        print(user_data_serializable)
        return jsonify(user_data_serializable)
    else:
        return jsonify({'message': 'User not found'}), 404



# Register Route
@app.route('/user/add', methods=['POST'])
@cross_origin()
def reg_user():
    
    user_name = request.json['name']
    user_email = request.json['email']
    use_phone_number = request.json['phoneNumber']
    user_password = request.json['password']
    
    user_data = {
        'name': user_name,
        'email': user_email,
        'phoneNumber': use_phone_number,
        'password': user_password,
    }
    mongoDb.user.insert_one(user_data)
    return jsonify({'msg': 'You have been registerd successfully'})






# Login Route
@app.route('/user/login', methods=['POST'])
def login():
    user_name = request.json.get('username')
    user_password = request.json.get('password')
    user = mongoDb.user.find_one({'email': user_name}, {'_id': False})
    user_id = mongoDb.user.find_one({'email': user_name}, {'_id': True})
    # print(user_id)
    # print(user_id)
    # return jsonify({'msg': 'Email or password does not match'})
    if user and user_password == user['password']:
        session['user_id'] = str(user_id['_id']) 
        return jsonify({'msg': "login work", 'session': session}), 200
    else:
        return jsonify({'msg': 'Email or password does not match'}), 404



# Logout Route
@app.route('/user/logout', methods=['POST'])
def logout():
    session.pop('username', None)  # Clear the 'username' key from the session

    # print(session)
    return jsonify({'message': 'Logout successful!'}), 200



#  Product Route
@app.route('/user/product/add', methods=['POST'])
def product_reg():
    
    pro_name = request.json['name']
    pro_price = request.json['price']
    pro_image = request.json['image']
    pro_rating = request.json['rating']
    # pro_id = request.json['id']
    
    producr_container = {
        # 'id': pro_id,
        'name': pro_name,
        'price': pro_price,
        'image': pro_image,
        'rating': pro_rating,
    }
    mongoDb.product.insert_one(producr_container)
    return jsonify({'msg': 'Product successfully registerd'})



@app.route('/user/item/add', methods=['POST'])
def item_reg():
    pro_id = request.json['_id']
    
    producr_container = {
        'product_Id': pro_id
    }
    mongoDb.one_product.insert_one(producr_container)
    return jsonify({'msg': 'successfull.'})





@app.route('/user/items', methods=['GET'])
def get_one_item():
    product_data = list(mongoDb.one_product.find({}))
    product_data_serializable = [
        {**user, '_id': str(user['_id'])} for user in product_data
    ]
    print(product_data)
    return jsonify(product_data_serializable)




# Get All Product Route
@app.route('/user/product', methods=['GET'])
def get_all_product():
    product_data = list(mongoDb.product.find({}))
    product_data_serializable = [
        {**user, '_id': str(user['_id'])} for user in product_data
    ]
    print(product_data)
    return jsonify(product_data_serializable)



# Get User_data by ID
@app.route('/user/product/<id>', methods=['GET'])
def get_product_id(id):
    uid = ObjectId(id)
    use = mongoDb.product.find_one({'_id': uid})
    if use is not None:
        user_data_serializable = {**use, '_id': str(use['_id'])}
        print(user_data_serializable)
        return jsonify(user_data_serializable)
    else:
        return jsonify({'message': 'User not found'}), 404


# Cart Item Route
@app.route('/user/cart/add', methods=['POST'])
def user_product():
    pro_img = request.json.get('img')
    pro_name = request.json.get('name')
    pro_price = request.json.get('price')
    pro_rating = request.json.get('rating')
    pro_id = request.json.get('id')
    # user_id = ObjectId(id)

    product_details = {
        'id': pro_id,
        'img': pro_img,
        'name': pro_name,
        'price': pro_price,
        'rating': pro_rating,
        'order': "successfull",
    }

    cart_item = {
        "user_id": 'id',
        "cart_item": product_details
    }

    mongoDb.cart_items.insert_one(cart_item)
    return jsonify({'msg': "Your order have been successflly placed."}), 200



if __name__ == '__main__':
    app.run('0.0.0.0', port=5050, debug=True)