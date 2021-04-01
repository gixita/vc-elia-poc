const vc = require('vc-js');
const axios = require('axios');
const keyfile = require('./my-key.json');


const Secp256k1KeyPair = require('secp256k1-key-pair');
const EcdsaSepc256k1Signature2019 = require('ecdsa-secp256k1-signature-2019');
const didContext = require('did-context');
const {Ed25519KeyPair, suites: {Ed25519Signature2018}, extendContextLoader} = require('jsonld-signatures');

async function asyncfunc(){
    
    
    k = await Ed25519KeyPair.from(keyfile)

    // console.log(k)

    
    const suite = new Ed25519Signature2018({
      verificationMethod: k.id,
      key: k
    });

    
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


    // console.log("---- starting ---------");
 


    
    const vc1 = await vc.issue({credential, suite});
    console.log(JSON.stringify(vc1, null, 2));
    
    
    const verifiableCredential = vc1; // either array or single object

    // // optional `id` and `holder`
    const id = 'ebc6f1c2';
    const holder = keyfile.controller;
    
    var presentation = vc.createPresentation({
      verifiableCredential, id, holder
    });
    
    console.log(JSON.stringify(presentation, null, 2));



    const challenge = 'mychallengegivenbytheportal'
    const vp = await vc.signPresentation({
        presentation, suite, challenge
      });

    presentation = vp
    
    const documentLoader = extendContextLoader(async url => {
        if(url.startsWith('did:key:')) {
          return {
            contextUrl: null,
            url,
            document: await get({url})
          };
        }
        const context = didContext.contexts.get(url);
        if(context) {
          return {
            contextUrl: null,
            url,
            document: context
          };
        }
        return vc.defaultDocumentLoader(url);
      });
    // console.log(JSON.stringify(vp, null, 2));

    const result = await vc.verify({
        presentation, 
        challenge, 
        suite: [new Ed25519Signature2018(), new EcdsaSepc256k1Signature2019()],
        documentLoader
    });

    // const result = await vc.verify({presentation, suite, unsignedPresentation: true});
    console.log('---- Verify -------');
    console.log(result);


}

asyncfunc();



