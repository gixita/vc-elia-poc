const express = require('express')

const claimManagement = require('./server_modules/claim_management.js')
const portal = require('./server_modules/portal.js')
const userApp = require('./server_modules/user_app.js')
const vc = require('vc-js');

const claimManagementModule = new claimManagement('claim_management', 'claim_management');
const portalModule = new claimManagement('portal', 'portal');
const userAppModule = new claimManagement('user_app', 'user_app');

//import data from './data/artists.json'
const app = express();
app.set('view engine', 'pug');
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({extended: true}));
app.use(express.json())

app.get('/', (req,res) =>{
	res.redirect('/index')
})

app.get('/index', (req, res) => {
    res.render('index')
})


claimManagementModule.regApp(app);
portalModule.regApp(app);
userAppModule.regApp(app);

const port = process.env.PORT || 3000;
app.listen(port, () => {
	console.log(`http://localhost:${port}`)
})

