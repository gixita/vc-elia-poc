const fs = require('fs-extra');
const axios = require("axios");

async function getClaim(credentialLink) {
    return await fs.readFile(credentialLink);
  }

module.exports = class Portal 
{
    constructor(base_uri, view_folder) 
    {
        this.base_uri = base_uri;
        this.view_folder = view_folder;
    }
  
    regApp(app) 
    {
      app.get('/' + this.base_uri + '/index', (req, res) => {
          console.log("here is the portal");
          const credentialLink = "./credentials/alumni.jsonld";
          getClaim(credentialLink).then((claim_from_file) => { 
            axios.post('http://localhost:3000/claim_management/claim_setter', {claim: claim_from_file.toString()})
          });
          res.render(this.view_folder + '/index')
      });

      //app.use(express.static(__dirname + '/' + this.view_folder + '/Elia_files'));
    }
};