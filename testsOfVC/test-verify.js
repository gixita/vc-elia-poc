/*
 * Copyright (c) 2019 Digital Bazaar, Inc. All rights reserved.
*/
'use strict';
const fs = require('fs-extra');
const keyfile = require('./my-key.json');

const documentLoader = require('./vc-js-cli/lib/document-loader');
const getStdin = require('get-stdin');
const vc = require('vc-js');
const {Ed25519KeyPair, suites: {Ed25519Signature2018}} =
  require('jsonld-signatures');
const EcdsaSepc256k1Signature2019 = require('ecdsa-secp256k1-signature-2019');
const Secp256k1KeyPair = require('secp256k1-key-pair');


var verifiableCredentialLink = "./alumnisigned.json";


async function verify(credentialLink) {

  try {
    const credential = JSON.parse(await fs.readFile(verifiableCredentialLink));
    const result = await vc.verify({
      credential,
      suite: [new Ed25519Signature2018(), new EcdsaSepc256k1Signature2019()],
      documentLoader,
    });
    if(result.verified === false) {
      // result can include raw Error
      console.log(JSON.stringify(result, null, 2));
      process.exit(1);
    }
  } catch(e) {
    console.log(JSON.stringify({verified: false, error: e}, null, 2));
    process.exit(1);
  }
  return JSON.stringify({verified: true}, null, 2);
  
}

verify(verifiableCredentialLink).then((res) => {
    console.log(res)
})