//////////////////////////////
// Claim management functions
//////////////////////////////


// Is used by the portal to initialize the claim that needs to be validated by the user after redirection
// the post should contain: 
// The claim, the constrains, the claim type
app.post('/init_claim', (req,res) =>{
	// call the format init claim function
	// store the claime to be presented to user
	// return the id of claim for the redirection
})

