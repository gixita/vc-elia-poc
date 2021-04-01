const fs = require('fs-extra');
const credentialLink = "./credentials/alumni.jsonld";
const axios = require("axios");
const IssueVC = require('../issueVC');
const VerifyVC = require('../verifyVC');
const GenerateIdentity = require('../generateIdentity');

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
    
    // USER APP sign the claim
    app.get('/' + this.base_uri + '/issue_verifiable_credential', (req, res) => {
      const credentialLink = "./credentials/alumni.jsonld";
      const keyLink = "./my-key.json";
      const issueVC = new IssueVC(keyLink, credentialLink);
      issueVC.issue().then((res) => {
        fs.writeFile('./alumnisigned.json', JSON.stringify(res), function (err) {
          if (err) return console.log(err);
          console.log('VC written in the file');
        });
      })
      res.sendStatus(res.statusCode)
    });
    
    
    // CLAIM MANAGER verifies the verifiable credential
    app.get('/' + this.base_uri + '/verify_verifiable_credential', (req, res) => {
      const verifiableCredentialLink = "./alumnisigned.json";
      const verifyVC = new VerifyVC(verifiableCredentialLink);
      verifyVC.verify().then((res) => {
        console.log(res)
      });
      res.sendStatus(res.statusCode)
    });
    
    // USER APP generate a new identity for the user
    app.get('/' + this.base_uri + '/generate_identity/:identity_id', (req, res) => {
      const identityID = req.params.identity_id;
      const identity = new GenerateIdentity(identityID);
      identity.generate().then((res) => {
        fs.writeFile('./identities/'+identityID+'.json', res, function (err) {
          if (err) return console.log(err);
          console.log('Identity written in the file');
        });
      })
      res.sendStatus(res.statusCode)
    });
    
    
    
  }
};