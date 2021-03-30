const express = require('express')
//import data from './data/artists.json'
const app = express();
app.set('view engine', 'pug');
app.use(express.static(__dirname + '/public'));



app.get('/', (req,res) =>{
	res.redirect('/charles')
})

app.get('/charles', (req, res) => {
    res.render('index')
})

const port = process.env.PORT || 3000;
app.listen(port, () => {
	console.log(`http://localhost:${port}`)
})
