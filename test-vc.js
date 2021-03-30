const vc = require('vc-js');

const {Ed25519KeyPair, suites: {Ed25519Signature2018}} = require('jsonld-signatures');

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


const Secp256k1KeyPair = require('secp256k1-key-pair');
const EcdsaSepc256k1Signature2019 = require('ecdsa-secp256k1-signature-2019');

const keyPair = Secp256k1KeyPair.generate();
keyPair.id = 'https://example.edu/issuers/keys/1'; // See Key ID section
keyPair.controller = 'https://example.com/i/carol'; // See Controller Document section

const suite = new EcdsaSepc256k1Signature2019({
  verificationMethod: keyPair.id,
  key: keyPair
});

const signedVC = vc.issue({credential, suite});
console.log(JSON.stringify(signedVC, null, 2));