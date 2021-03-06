var express = require('express');
var exphbs  = require('express-handlebars');
var bodyParser = require('body-parser');
const { json } = require('body-parser');

var app = express();
 
app.set('port', process.env.PORT || 3000)

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(require('./routes/appRoutes'))


app.use(express.static('assets'));
app.use('/assets', express.static(__dirname + '/assets'));

app.listen(app.get('port'));