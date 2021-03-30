const Secp256k1KeyPair = require('secp256k1-key-pair');
const EcdsaSepc256k1Signature2019 = require('ecdsa-secp256k1-signature-2019');


async function asyncfunc(){

    const keyPair = await Secp256k1KeyPair.generate();
    keyPair.id = 'https://example.edu/issuers/keys/1'; // See Key ID section
    keyPair.controller = 'https://example.com/i/carol'; // See Controller Document section

    const suite = new EcdsaSepc256k1Signature2019({
    verificationMethod: keyPair.id,
    key: keyPair
    });
    console.log(suite)

    const {sign} = suite.signer;

    const data = 'test data to sign';
    const signature = await sign({data});
    console.log(signature);

    const {verify} = suite.verifier;

    verify({data, signature}).then((res) => { console.log(res)});


}
asyncfunc();