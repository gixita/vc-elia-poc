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
app.get('/did/<user>', (req,res) =>{
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

app.post('/init_claim', (req,res) =>{
	// call the format init claim function
	// store the claim to be presented to user
	// return the id of claim for the redirection
})

