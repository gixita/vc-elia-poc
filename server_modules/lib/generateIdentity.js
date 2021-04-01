'use strict';
const fs = require('fs-extra');
const vc = require('vc-js');
const {Ed25519KeyPair, suites: {Ed25519Signature2018}} =
require('jsonld-signatures');
const EcdsaSepc256k1Signature2019 = require('ecdsa-secp256k1-signature-2019');
const Secp256k1KeyPair = require('secp256k1-key-pair');
const Gist = require('../../vc-js-cli/lib/Gist');


module.exports = class GenerateIdentity
{
    constructor(indentity_id) {
        this.indentity_id = indentity_id;
    }
    
    async generate() {
        let k = await Ed25519KeyPair.generate();
        
        const gitHubToken = process.env.GITHUBTOKEN;
        if(!gitHubToken) {
            throw new Error('A GitHub token is required. Make a source .env');
        }
        
        const controllerGist = new Gist({gitHubToken});
        const keyGist = new Gist({gitHubToken});
        
        // initialize blank documents for controller and key
        await Promise.all([
            controllerGist.create({filename: 'creator.json', content: {}}),
            keyGist.create({filename: 'key.json', content: {}}),
        ]);
        
        const publicKeyDoc = Object.assign(k.publicNode(), {
            '@context': 'https://w3id.org/security/v2',
            id: keyGist.rawUrl,
            controller: controllerGist.rawUrl
        });
        const controllerDoc = {
            '@context': 'https://w3id.org/security/v2',
            id: controllerGist.rawUrl,
            assertionMethod: [keyGist.rawUrl]
        };
        // update controller and key documents
        await Promise.all([
            controllerGist.update({content: controllerDoc}),
            keyGist.update({content: publicKeyDoc}),
        ]);
        
        return JSON.stringify(Object.assign(k, {
            id: keyGist.rawUrl,
            controller: controllerGist.rawUrl,
        }), null, 2);
    }
}