const vc = require('vc-js');

const {Ed25519KeyPair, suites: {Ed25519Signature2018}} = require('jsonld-signatures');
const Secp256k1KeyPair = require('secp256k1-key-pair');
const EcdsaSepc256k1Signature2019 = require('ecdsa-secp256k1-signature-2019');

// Sample unsigned credential




async function asyncfunc(){

    const keyPair = await Secp256k1KeyPair.generate();
    keyPair.id = 'https://example.edu/issuers/keys/1'; // See Key ID section
    keyPair.controller = 'https://example.com/i/carol'; // See Controller Document section
    
    const suite = new EcdsaSepc256k1Signature2019({
      verificationMethod: keyPair.id,
      key: keyPair
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


    console.log("---- starting ---------");
 


    
    const vc1 = await vc.issue({credential, suite});
    console.log(JSON.stringify(vc1, null, 2));
    
    
    const verifiableCredential = vc1; // either array or single object

    // optional `id` and `holder`
    const id = 'ebc6f1c2';
    const holder = 'did:ex:12345';
    
    const presentation = vc.createPresentation({
      verifiableCredential, id, holder
    });
    
    console.log(JSON.stringify(presentation, null, 2));



    // const challenge = 'mychallengegivenbytheportal'
    // const vp = await vc.signPresentation({
    //     presentation, suite, challenge
    //   });
      
    // console.log(JSON.stringify(vp, null, 2));



    const result = await vc.verify({presentation, suite, unsignedPresentation: true});
    console.log('---- Verify -------');
    console.log(result);


}

asyncfunc()