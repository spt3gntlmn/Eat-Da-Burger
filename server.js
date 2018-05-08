const express = require('express');
const bodyParser = require('body-parser');
//  Lets you use HTTP verbs such as PUT or DELETE in places where the client doesn't support it.
const methodOverride = require('method-override');

const app = express();

app.use(express.static(process.cwd() + '/public'));

app.use(bodyParser.urlencoded({ extended: false }));

//  Handlebars
const exphbs = require('express-handlebars');
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

const router = require('./controllers/burgers_controller.js');
app.use('/', router);

//  open server
const port = process.env.PORT || 3000;
app.listen(port);
