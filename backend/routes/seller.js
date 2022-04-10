var express = require('express');
var sellerHelper = require('../helper/sellerHelper');
const db = require('../config/connection');
const { route } = require('./seller');
const { response } = require('express');
const e = require('express');
const objectId = require('mongodb').ObjectID;
var router = express.Router();
let nwslr = {};

const verifySignedIn = (req, res, next) => {
    if (nwslr) {
        next();
    } else {
        res.json({ message: 'login first' });
    }
};
router.get('/',(req,res)=>{
    sellerHelper.showShop().then((shop)=>{
        res.json({shop})
    })
})
router.get('/signup', function (req, res) {
    if (req.session.signedIn) {
        res.redirect('/seller');
    } else {
        res.render('/signup', { admin: false, user: false });
    }
});

router.post('/signup', function (req, res) {
    console.log('hlo');
    if (!req.body.Name || !req.body.Email || !req.body.Password) {
        res.json({ message: 'all fields are required' });
    } else {
        sellerHelper.doSignup(req.body).then((response) => {
            req.session.signedIn = true;
            req.session.user = response;
            console.log('arr', response);

            res.json({ message: 'set', response }).status(200);
        });
    }
});
router.get('/signin', function (req, res) {
    if (nw) {
        res.json({ user: nw.seller });
    } else {
        res.json({ message: not });
    }
});
// signin
router.post('/signin', function (req, res) {
    console.log('input is', req.body);
    sellerHelper.doSignin(req.body).then((response) => {
        if (response.status) {
            req.session.signedIn = true;
            req.session.seller = response.seller;
            // res.redirect("/");
            nwslr = req.session.seller;
            res.json({ session: req.session, response }).status(200);
        } else {
            req.session.signInErr = 'Invalid Email/Password';
            // res.redirect("/signin");
            res.json({ message: 'Invalid Email/Password' }).status(422);
        }
    });
});
// add shop
router.get('/addshop', verifySignedIn, (req, res) => {
    console.log('seller', req.session.seller);
    res.render('sellers/seller-add-shop');
});
router.post('/addshop', verifySignedIn, (req, res) => {
    // console.log(req.body);
    console.log(req.body);
    let seller = nwslr;

    sellerHelper.addShop(req.body, seller).then((response) => {
        res.json({ response: response, vibe: true });
    });
});
// add product
router.get('/addproduct', verifySignedIn, (req, res) => {
    console.log('seller', req.session.seller);
    res.render('sellers/seller-add-product');
});
// get all prod and delete

router.get('/edit-product/:id', verifySignedIn, async function (req, res) {
    let administator = req.session.seller;
    let productId = req.params.id;
    let product = await sellerHelper.getProductDetails(productId);
    console.log(product);
    res.render('seller/edit-product', { seller: true, product, administator });
});

router.post('/edit-product/:id', verifySignedIn, function (req, res) {
    let productId = req.params.id;
    sellerHelper.updateProduct(productId, req.body).then(() => {
        if (req.files) {
            let image = req.files.Image;
            if (image) {
                image.mv(
                    './public/images/product-images/' + productId + '.png'
                );
            }
        }
        res.redirect('/seller/all-products');
    });
});

router.get('/shop-orders', function (req, res) {
    console.log('first');
    let administator = req.session.seller;
    sellerHelper.getAllOrders().then((orders) => {
        res.json({ seller: true, administator, orders });
    });
});

router.post('/addproduct', (req, res) => {
    sellerHelper.addProduct(req.body).then((response) => {
        res.json({ response: response, vibe: true });
    });
});

router.get('/all-prod/:email', (req, res) => {
    console.log(req.params?.email);
    if (req.params?.email) {
        sellerHelper.getAllProducts(req.params.email).then((response) => {
            res.json({ response });
        });
    } else {
        res.json({ error: 'email not provided' });
    }
});

router.delete('/delete-product/:id', function (req, res) {
    let productId = req.params.id;
    console.log('proid', productId);

    sellerHelper.deleteProduct(productId).then((response) => {
        // fs.unlinkSync("./public/images/product-images/" + productId + ".png");
        res.json({ message: 'delete success' });
    });
});

router.get('/shop-orders', (req, res) => {
    sellerHelper.getAllOrders().then((response) => {
        res.json({ response });
    });
});
router.get('/messages',verifySignedIn,function(req,res,next){
          console.log("inside");
        let user=nwslr;
        console.log("new",nwslr)
        sellerHelper.getmessages(user).then((msg)=>{
          console.log("imad",msg)
          res.json(msg)
        })
    })

module.exports = router;
