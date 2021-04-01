const fs = require('fs-extra');
const credentialLink = "./credentials/alumni.jsonld";
const axios = require("axios");
var bodyParser = require('body-parser')

async function getClaim() {
  return await fs.readFile(credentialLink);
}

module.exports = class ClaimManagement 
{
  constructor(base_uri, view_folder) 
  {
    this.base_uri = base_uri;
    this.view_folder = view_folder;
    this.claim = 'not initialized claim';
  }
  
  
  regApp(app) 
  {
    // PORTAL send post request to the claim manager to initialize the claim
    app.get('/' + this.base_uri + '/index', (req, res) => {
      getClaim().then((res) => { 
        axios.post('http://localhost:3000/claim_management/claim_setter', {claim: res.toString()})
      });
      res.render(this.view_folder + '/index')
    });
    
    
    // CLAIM MANAGER get the post request and store the claim for further use
    app.post('/' + this.base_uri + '/claim_setter', (req, res) => {
      this.claim = JSON.parse(req.body.claim);
      res.sendStatus(res.statusCode)
      
    });
    
    // CLAIM MANAGER display QR code with the claim received from the PORTAL
    app.get('/' + this.base_uri + '/qrcode', (req, res) => {
      res.render(this.view_folder + '/qrcode', {claim: this.claim})
    });
    
  }
};