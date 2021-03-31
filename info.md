# My bash results
➜  vc-demo git:(master) ✗ vc keygen --key-type ed25519 --git-hub-token xxxxxxxxxxxx > my-key.json
➜  vc-demo git:(master) ✗ cat my-key.json 
{
  "passphrase": null,
  "id": "https://gist.githubusercontent.com/gixita/2337b8a236df1f9a777a3379a9fed41a/raw",
  "controller": "https://gist.githubusercontent.com/gixita/4adb0e23ed3b1a8f93d6cc631c8bbbb2/raw",
  "type": "Ed25519VerificationKey2018",
  "privateKeyBase58": "2Dzz6p44y8n3Wf9AZ7ssLunS188js1GJ6rvfURjGhaCfo4gjKZdSACihjrXWr76Aoq36BDmRDALP2wCuGdsvKGdk",
  "publicKeyBase58": "4fwUW7MnnWcnoLteLTWFWHghPf9jvCiR8zTNrRCku6G6"
}
➜  vc-demo git:(master) ✗ vc issue --key my-key.json < credentials/alumni.jsonld > alumni-signed.jsonld
➜  vc-demo git:(master) ✗ ls
alumni-signed.jsonld  credentials  LICENSE  my-key.json  README.md
➜  vc-demo git:(master) ✗ cat alumni-signed.jsonld 
{
  "@context": [
    "https://www.w3.org/2018/credentials/v1",
    "https://www.w3.org/2018/credentials/examples/v1"
  ],
  "id": "https://example.com/credentials/1872",
  "type": [
    "VerifiableCredential",
    "AlumniCredential"
  ],
  "issuanceDate": "2010-01-01T19:23:24Z",
  "credentialSubject": {
    "id": "did:example:ebfeb1f712ebc6f1c276e12ec21",
    "alumniOf": "Example University"
  },
  "issuer": "https://gist.githubusercontent.com/gixita/4adb0e23ed3b1a8f93d6cc631c8bbbb2/raw",
  "proof": {
    "type": "Ed25519Signature2018",
    "created": "2021-03-31T06:23:54Z",
    "jws": "eyJhbGciOiJFZERTQSIsImI2NCI6ZmFsc2UsImNyaXQiOlsiYjY0Il19..ZvkjEDXsFgMjoP5celoBThoCkMdxWYhgYX-hwZ4FnSFYM81z1dZxd0ZLjHFnq6Tm68yCd2g0lR8EKvjSM9wyAA",
    "proofPurpose": "assertionMethod",
    "verificationMethod": "https://gist.githubusercontent.com/gixita/2337b8a236df1f9a777a3379a9fed41a/raw"
  }
}
➜  vc-demo git:(master) ✗ vc verify < alumni-signed.jsonld
{
  "verified": true
}

