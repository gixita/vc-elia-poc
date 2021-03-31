const vc = require('vc-js');
const axios = require('axios');

const {Ed25519KeyPair, suites: {Ed25519Signature2018}} = require('jsonld-signatures');
const Secp256k1KeyPair = require('secp256k1-key-pair');
const EcdsaSepc256k1Signature2019 = require('ecdsa-secp256k1-signature-2019');

var controllerDoc;
var publicKeyDoc;
// Sample unsigned credential


class KMSInteraction {
  constructor({timeout = 5000}) {
    this.axiosInstance = axios.create({
      baseURL: 'http://localhost:3000',
      headers: {Authorization: `token none`},
      timeout,
    });
    this.filename = null;
    this.url = null;
    this.fullRawUrl = null;
  }
  

  async create({filename, content}) {
    let result;
    try {
      result = await this.axiosInstance.post('/publickeydoc', {
        public: false,
        files: {
          [filename]: {
            content: JSON.stringify(content, null, 2)
          }
        }
      });
    } catch(e) {
      throw new Error('Error creating gist', e);
    }
    this.filename = filename;
    this.url = "http://localhost:3000/publickeydoc";
    // We need to adapt the full raw url
    this.fullRawUrl = "http://localhost:3000/publickeydoc/"+filename;
  }

  async update({content}) {
    if(!this.filename) {
      throw new Error('Gist has not been created.');
    }
    let result;
    try {
      result = await this.axiosInstance.post(this.url, {
        public: false,
        files: {
          [this.filename]: {
            content: JSON.stringify(content, null, 2)
          }
        }
      });
    } catch(e) {
      throw new Error('Error updating gist', e);
    }
    this.fullRawUrl = "http://localhost:3000/publickeydoc/";//+filename;
  }
}

async function asyncfunc(){

    const k = await Secp256k1KeyPair.generate();
    k.id = 'https://example.edu/issuers/keys/1'; // See Key ID section
    k.controller = 'https://example.com/i/carol'; // See Controller Document section
    
    const suite = new EcdsaSepc256k1Signature2019({
      verificationMethod: k.id,
      key: k
    });

    const controllerStore = new KMSInteraction({});
    const keyStore = new KMSInteraction({});

    await Promise.all([
      controllerStore.create({filename: 'creator.json', content: {}}),
      keyStore.create({filename: 'key.json', content: {}}),
    ]);

    const publicKeyDoc = Object.assign(k.publicNode(), {
      '@context': 'https://w3id.org/security/v2',
      id: "http://localhost/publickeydoc",
      controller: "http://localhost/controllerdoc"
    });
    const controllerDoc = {
      '@context': 'https://w3id.org/security/v2',
      id: "http://localhost/controllerdoc",
      assertionMethod: ["http://localhost/publickeydoc"]
    };
    // update controller and key documents
    await Promise.all([
      controllerStore.update({content: controllerDoc}),
      keyStore.update({content: publicKeyDoc}),
    ]);
    // Sample unsigned credential
    const credential = {
      "@context": [
        "https://www.w3.org/2018/credentials/v1",
        "https://www.w3.org/2018/credentials/examples/v1"
      ],
      "id": "https://example.com/credentials/1872",
      "type": ["VerifiableCredential", "AlumniCredential"],
      "issuer": "https://example.edu/issuers/565049",
      "issuanceDate": "2010-01-01T19:23:24Z",
      "credentialSubject": {
        "id": "did:example:ebfeb1f712ebc6f1c276e12ec21",
        "alumniOf": "Example University"
      }
    };


    console.log("---- starting ---------");
 


    
    const vc1 = await vc.issue({credential, suite});
    // console.log(JSON.stringify(vc1, null, 2));
    
    
    const verifiableCredential = vc1; // either array or single object

    // optional `id` and `holder`
    const id = 'ebc6f1c2';
    const holder = 'did:ex:12345';
    
    const presentation = vc.createPresentation({
      verifiableCredential, id, holder
    });
    
    // console.log(JSON.stringify(presentation, null, 2));



    // const challenge = 'mychallengegivenbytheportal'
    // const vp = await vc.signPresentation({
    //     presentation, suite, challenge
    //   });
      
    // console.log(JSON.stringify(vp, null, 2));



    const result = await vc.verify({presentation, suite, unsignedPresentation: true});
    // console.log('---- Verify -------');
    // console.log(result);


}

asyncfunc();



