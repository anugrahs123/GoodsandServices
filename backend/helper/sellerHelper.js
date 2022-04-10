var db = require('../config/connection');
var collections = require('../config/collections');
var bcrypt = require('bcrypt');
const objectId = require('mongodb').ObjectID;

module.exports = {
    doSignup: (sellerData) => {
        console.log('Data is ', sellerData);
        return new Promise(async (resolve, reject) => {
            sellerData.Password = await bcrypt.hash(sellerData.Password, 10);
            db.get()
                .collection(collections.SELLERS_COLLECTION)
                .insertOne(sellerData)
                .then((data) => {
                    console.log(data);

                    resolve(data.ops[0]);
                });
        });
    },

    doSignin: (sellerData) => {
        console.log('login det', sellerData);
        return new Promise(async (resolve, reject) => {
            let response = {};
            let seller = await db
                .get()
                .collection(collections.SELLERS_COLLECTION)
                .findOne({ Email: sellerData.Email });
            if (seller) {
                bcrypt
                    .compare(sellerData.Password, seller.Password)
                    .then((status) => {
                        if (status) {
                            console.log('Login Success');
                            response.seller = seller;
                            response.status = true;
                            resolve(response);
                        } else {
                            console.log('wrong password');
                            resolve({ status: false });
                        }
                    });
            } else {
                console.log('Login Failed');
                resolve({ status: false });
            }
        });
    },

    showShop:(email) => {
        return new Promise(async (resolve, reject) => {
          let products = await db
            .get()
            .collection(collections.SHOPS_COLLECTION)
            .find()
            .toArray();
          resolve(products);
        });
    },

    addShop: async (shop, seller, callback) => {
        return new Promise((resolve, reject) => {
            // console.log("my",seller);
            // console.log(product);
            //product.input.price = parseInt(product.input.price);
            const shops = {
                Name: shop.input.name,
                Category: shop.input.category,
                Price: shop.input.price,
                Description: shop.input.description,
                url: shop.url,
                CreatedBy: seller?.sellerId,
                SellerId: seller?._id,
                reviews: [],
            };

            db.get()
                .collection(collections.SHOPS_COLLECTION)
                .insertOne(shops)
                .then((data) => {
                    console.log(data);
                    resolve(data.ops[0].seller?._id);
                });
        });
    },

    addProduct: (product, seller, callback) => {
        return new Promise((resolve, reject) => {
            console.log('my', seller);
            console.log(product);
            product.input.price = parseInt(product.input.price);
            const products = {
                Name: product.input.name,
                Category: product.input.category,
                Price: product.input.price,
                Description: product.input.description,
                url: product.url,
                CreatedBy: product.sellerId.Email,
                reviews: [],
            };

            db.get()
                .collection(collections.PRODUCTS_COLLECTION)
                .insertOne(products)
                .then((data) => {
                    // console.log(data);
                    resolve(data.ops[0]._id);
                });
        });
    },

    // view and delete prod
    getAllProducts: (email) => {
        return new Promise(async (resolve, reject) => {
            let products = await db
                .get()
                .collection(collections.PRODUCTS_COLLECTION)
                .find({ CreatedBy: email })
                .toArray();
            resolve(products);
            console.log(products)
        });
    },

    getSignedSellerProducts: (email) => {
        console.log('mail is', email);
        return new Promise(async (resolve, reject) => {
            let items = await db
                .get()
                .collection(collections.PRODUCTS_COLLECTION)
                .find({ CreatedBy: email })
                .toArray();
            resolve(items);
        });
    },

    editprod: async (sellerid) => {
        const prodData = await db
            .get()
            .collection(collections.PRODUCTS_COLLECTION)
            .findOne({ _id: objectId(sellerid) });
        return prodData;
    },

    // get seller detail
    getSellerDetails: (id) => {
        return new Promise((resolve, reject) => {
            db.get()
                .collection(collections.SELLERS_COLLECTION)
                .findOne({ _id: objectId(id) })
                .then((response) => {
                    resolve(response);
                });
        });
    },

    deleteProduct: (proId) => {
        return new Promise(async (resolve, reject) => {
            await db
                .get()
                .collection(collections.PRODUCTS_COLLECTION)
                .deleteOne({ _id: objectId(proId) })
                .then((result) => {
                    console.log('deleted');
                    resolve({ message: 'deleted' });
                });
        });
    },

    getSellerOrder: (sellerId) => {
        return new Promise(async (resolve, reject) => {
            let orders = await db
                .get()
                .collection(collections.ORDER_COLLECTION)
                .find({ 'orderObject.seller._id': objectId(sellerId) })
                .toArray();
            resolve(orders);
        });
    },
    getmessages:(user)=>{
        return new Promise(async (resolve, reject) => {
          const msg= await db.get().collection('chat').find({reciver:user.Email} ).toArray()
          console.log("sent are",msg);
          resolve(msg)
    
      });
    }
};
