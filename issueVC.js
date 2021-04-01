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

module.exports = class IssueVC
{
    constructor(keyLink, credentialLink) {
        this.keyLink = keyLink;        
        this.credentialLink = credentialLink;
    }
    
    async issue() {
        let result;
        try {
            
            let keyDoc;
            try {
                const keyFile = await fs.readFile(this.keyLink);
                keyDoc = JSON.parse(keyFile.toString());
            } catch(e) {
                throw new Error(`Could not read the key file: ${this.keyLink}`);
            }
            
            let credential;
            try {
                credential = JSON.parse(await fs.readFile(this.credentialLink));
            } catch(e) {
                throw new Error('Invalid credential.');
            }
            
            const {controller: issuer, type} = keyDoc;
            
            let suite;
            switch(type) {
                case 'EcdsaSecp256k1VerificationKey2019':
                suite = new EcdsaSepc256k1Signature2019(
                    {key: new Secp256k1KeyPair(keyDoc)});
                    break;
                    case 'Ed25519VerificationKey2018':
                    suite = new Ed25519Signature2018({key: new Ed25519KeyPair(keyDoc)});
                    break;
                    default:
                    throw new Error(`Unknown key type ${type}.`);
                }
                
                credential.issuer = issuer;
                return await vc.issue({
                    credential,
                    suite,
                    documentLoader,
                });
            } catch(e) {
                console.error('Error:', e);
                process.exit(1);
            }
            // console.log(JSON.stringify(result, null, 2));
            
            
            
        }
        
    }
    
