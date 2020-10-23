const express = require('express')
const router = express.Router()
const paymentController = require('../controllers/paymentController')

router.get('/', function (req, res) {
    res.render('home');
});

router.get('/detail', function (req, res) {
    res.render('detail', req.query);
});

router.get('/success', function (req, res) {
    res.render('success', req.query);
});

router.get('/pending', function (req, res) {
    res.render('pending', req.query);
});

router.get('/failure', function (req, res) {
    res.render('failure', req.query);
});

router.get('/notification', function (req, res) {
    console.log(req.body)
    res.sendStatus(200)
})

router.post('/pay', paymentController.payment)

module.exports = router