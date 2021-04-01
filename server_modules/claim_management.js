

const VerifyVC = require('./lib/verifyVC');


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
    
    app.get('/' + this.base_uri + '/index', (req, res) => {
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
      // The direct link should open a new window
      // on axios call redirect to portal 
    });
    
    
    
    
    // CLAIM MANAGER verifies the verifiable credential
    app.get('/' + this.base_uri + '/verify_verifiable_credential/:vc_name', (req, res) => {
      const vcName = req.params.vc_name;
      const verifiableCredentialLink = "./verifiablecredentials/"+vcName+".json";
      const verifyVC = new VerifyVC(verifiableCredentialLink);
      verifyVC.verify().then((res) => {
        console.log(res)
      });
      res.sendStatus(res.statusCode)
    });
    
    
    
    
    
  }
};