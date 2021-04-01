const IssueVC = require('./lib/issueVC');
const GenerateIdentity = require('./lib/generateIdentity');
const fs = require('fs-extra');

module.exports = class UserApp 
{
    constructor(base_uri, view_folder) 
    {
        this.base_uri = base_uri;
        this.view_folder = view_folder;
    }
    
    regApp(app) 
    {
        app.get('/' + this.base_uri + '/index', (req, res) => {
            console.log('test user app');
            res.render(this.view_folder + '/index');
        });
        
        // USER APP sign the claim :> vc_name by default should be "consent"
        app.get('/' + this.base_uri + '/issue_verifiable_credential/:identity_id/:vc_name', (req, res) => {
            const credentialLink = "./credentials/alumni.jsonld";
            const identityID = req.params.identity_id;
            const vcName = req.params.vc_name;
            const keyLink = "./identities/"+identityID+".json";
            const issueVC = new IssueVC(keyLink, credentialLink);
            issueVC.issue().then((res) => {
                fs.writeFile('./verifiablecredentials/'+vcName+'.json', JSON.stringify(res), function (err) {
                    if (err) return console.log(err);
                    console.log('VC written in the file');
                });
            })
            // make a axios call to the claim manager
            res.sendStatus(res.statusCode)
        });
        
        // USER APP allow to select identity for the user
        app.get('/' + this.base_uri + '/select_identity', (req, res) => {
            const dir = './identities/';
            var identities = [];
            fs.readdir(dir, (err, files) => {
                if (err) {
                    throw err;
                }
                files.forEach(file => {
                    let filename = file.split('.')[0];
                    identities.push(filename)  
                });
                console.log(identities)
                res.sendStatus(res.statusCode)
            });
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