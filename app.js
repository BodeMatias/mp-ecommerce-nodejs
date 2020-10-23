var express = require('express');
var exphbs  = require('express-handlebars');
var bodyParser = require('body-parser');
const { json } = require('body-parser');
var mercadopago = require('mercadopago');
var cors = require('cors')

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


app.set('port', process.env.PORT || 3000)

mercadopago.configure({
    access_token: vendedor_user.access_token
});

app.options('*', cors())
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

app.get('/success', function (req, res) {
    console.log(req.query)
    res.render('success', req.query);
});

app.get('/pending', function (req, res) {
    res.render('pending', req.query);
});

app.get('/failure', function (req, res) {
    res.render('failure', req.query);
});

app.post('/pay', async function (req, res) {
    let payment_data = req.body;
    
    var preference = {}

    preference.external_reference = "bode.matias@hotmail.com";
    preference.items = payment_data;
    preference.payer = payer;
    preference.auto_return = 'approved'
    preference.back_urls = {
        'success':'https://bodematias-mp-commerce-nodejs.herokuapp.com/success',
        'pending':'https://bodematias-mp-commerce-nodejs.herokuapp.com/pending',
        'failure':'https://bodematias-mp-commerce-nodejs.herokuapp.com/failure'
        /*'success':'https://localhost:3000/success',
        'pending':'https://localhost:3000/pending',
        'failure':'https://localhost:3000/failure'*/
    }

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
        console.log(data)
        res.redirect(data.body.init_point)
    }).catch((err) => {
        res.render('home')
    });

    

})

app.use(express.static('assets'));
app.use('/assets', express.static(__dirname + '/assets'));
app.use(express.static('scripts'));
app.use('/scripts', express.static(__dirname + '/scripts'));

app.listen(app.get('port'));