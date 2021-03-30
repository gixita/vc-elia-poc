//////////////////////////////
// User DID document
//////////////////////////////

// Get the did document
// example of DID
// {
// 	"@context": "https://www.w3.org/ns/did/v1",
// 	"id": "did:url:http://localhost/did/eliagroup",
// 	"verificationMethod": [{
// 	  "id": "did:url:http://localhost/did/eliagroup#key-1",
// 	  "type": "Ed25519VerificationKey2018", 
  
  
// 	  "controller": "did:url:http://localhost/did/eliagroup",
// 	  "publicKeyBase58": "H3C2AVvLMv6gmMNam3uVAjZpfkcJCwDwnZn6z3wXmqPV"
// 	}, ...],
// 	"authentication": [
  
  
// 	  "#key-1"
// 	]
//   }
app.get('/did/:user', (req,res) =>{
	// return the did document of the user
})



//////////////////////////////
// Claim management functions
//////////////////////////////


// Is used by the portal to initialize the claim that needs to be validated by the user after redirection
// the post should contain: 
// The claim, the constrains, the claim type
// the claim type should be in our case : ConsentClaim
// The claim should be 
// "consentOf": {
// 	"id": "did:url:http://localhost/did/eliagroup",
// 	"consentContract": [{
// 	  "value": "The user gives his consent to Elia to blabla",
// 	  "lang": "en"
// 	}, {
// 	  "value": "L'utilisateur donne son consentement à Elia pour blabla",
// 	  "lang": "fr"
// 	}]
// }
// The constrains should look like:
// {
// 	"constrains": [{
// 		"type": "IdentyProviderClaimAttached",
// 		"required": true
// 	}]
// }
// The claim type should be like 
// {
// 	"claimType": {
// 		"type": "consentOf"
// 	}
// }
// Everything should be bundle in 
// {
// 	"claimRequest": {
// 		"claimType": {},
// 		"constrains": {},
// 		"claims": {}
//  	}
// }

app.post('/init_claim', (req,res) =>{
	// call the format init claim function
	// store the claim to be presented to user
	// return the id of claim for the redirection
})


// Should display the payload to the user, so he can copy it and paste it in the user interface
// the payload should look like : 
// {
// 	"@context": [
// 	  "https://www.w3.org/2018/credentials/v1",
// 	  "http://localhost/schema/v1/vc-consentcontract"
// 	],
// 	"id": "did:url:http://localhost/did/<<user>>",
// 	"type": ["VerifiableCredential", "ConsentContract"],
// 	"issuer": "did:url:http://localhost/did/<<user>>",
// 	"issuanceDate": "2010-01-01T19:73:24Z",
// 	"credentialSubject": {
// 	  "id": "did:url:<<user>>",
	// "consentOf": {
	// 	"id": "did:url:http://localhost/did/eliagroup",
	// 	"consentContract": [{
	// 	  "value": "The user gives his consent to Elia to blabla",
	// 	  "lang": "en"
	// 	}, {
	// 	  "value": "L'utilisateur donne son consentement à Elia pour blabla",
	// 	  "lang": "fr"
	// 	}]
// }
// 	},
// 	"proof": {
// 	  "type": "RsaSignature2018",
// 	  "created": "2017-06-18T21:19:10Z",
// 	  "proofPurpose": "assertionMethod",
// 	  "verificationMethod": "did:url:http://localhost/did/<<user>>#key-1",
// 	  "jws": "eyJhbGciOiJSUzI1NiIsImI2NCI6ZmFsc2UsImNyaXQiOlsiYjY0Il19..TCYt5X
// 		sITJX1CxPCT8yAV-TVkIEq_PbChOMqsLfRoPsnsgw5WEuts01mq-pQy7UJiN5mgRxD-WUc
// 		X16dUEMGlv50aqzpqh4Qktb3rk-BuQy72IFLOqV0G_zS245-kronKb78cPN25DGlcTwLtj
// 		PAYuNzVBAh4vGHSrQyHUdBBPM"
// 	}
//   }

app.get('/display_qr_code/:id', (req,res) =>{
	// display the payload that the user will need to sign
	// res.render(payload[id])
})