var mercadopago = require('mercadopago');
const paymentController = {}

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
    access_token: vendedor_user.access_token,
    integrator_id: integrator_id
});

paymentController.payment = async function (req, res) {
    let payment_data = req.body;
    
    var preference = {}

    preference.external_reference = "bode.matias@hotmail.com";
    preference.items = [
        {
            id: parseInt(payment_data.id),
            title: payment_data.title,
            description: payment_data.description,
            picture_url: payment_data.picture_url,
            quantity: Number(payment_data.quantity),
            unit_price: Number(payment_data.unit_price)
        }
    ]
    preference.payer = payer;
    preference.auto_return = 'approved'
    preference.back_urls = {
        'success':'https://bodematias-mp-commerce-nodejs.herokuapp.com/success',
        'pending':'https://bodematias-mp-commerce-nodejs.herokuapp.com/pending',
        'failure':'https://bodematias-mp-commerce-nodejs.herokuapp.com/failure'
    }

    preference.payment_methods = {
        'excluded_payment_methods': [
            {'id' : 'amex'}
        ],
        'excluded_payment_types': [
            {'id' : 'atm'}
        ],
        "installments": 6
    }

    preference.notification_url = 'https://bodematias-mp-commerce-nodejs.herokuapp.com/notification'

    let response_preference =  await mercadopago.preferences.create(preference)
    res.redirect(response.response.init_point)
    //res.redirect(response_preference.response.sandbox_init_point)
}

module.exports = paymentController