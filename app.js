var express = require('express');
var exphbs  = require('express-handlebars');
var bodyParser = require('body-parser');
const fetch = require("node-fetch");
const { json } = require('body-parser');
var mercadopago = require('mercadopago');

var app = express();
 
let integrator_id = 'dev_24c65fb163bf11ea96500242ac130004'

let vendedor_user = {
    collector_id: 469485398,
    public_key: 'APP_USR-7eb0138a-189f-4bec-87d1-c0504ead5626',
    access_token: 'APP_USR-6317427424180639-042414-47e969706991d3a442922b0702a0da44-469485398'
}

let comprador = {
    id: 471923173,
    password: 'qatest2417',
}

let payer = {
    email: 'test_user_63274575@testuser.com',
    name: 'Lalo',
    surname: 'Landa',
    phone: { area_code: '11', number: 22223333 },
    address: {
        zip_code: '1111',
        street_name: 'False',
        street_number: 123
    }
}

mercadopago.configure({
    access_token: vendedor_user.access_token
});

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', function (req, res) {
    res.render('home');
});

app.get('/detail', function (req, res) {
    res.render('detail', req.query);
});

app.post('/pay', async function (req, res) {
    let payment_data = req.body;
    
    var preference = {}

    preference.external_reference = "bode.matias@hotmail.com";
    preference.items = payment_data;
    preference.payer = payer;
    //preference.auto_return = 'approved'
    //preference.back_urls = {}

    let payment_methods = {
        'excluded_payment_methods': [
            {'id' : 'amex'}
        ],
        'excluded_payment_types': [
            {'id' : 'atm'}
        ],
        "installments": 6
    }

    preference.payment_methods = payment_methods

    mercadopago.preferences.create(preference).then((data) => {
        //console.log(data.response.payer);
       console.log(data)
    }).catch((err) => {
        console.log(err);
    });
    
    

    res.sendStatus(200)
})

app.use(express.static('assets'));
app.use('/assets', express.static(__dirname + '/assets'));
app.use(express.static('scripts'));
app.use('/scripts', express.static(__dirname + '/scripts'));

app.listen(3000);