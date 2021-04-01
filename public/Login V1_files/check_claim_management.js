
const check_claim = function()
{ 
    console.log("checking claim")
    $.getJSON('claim_management_verify', function(data) {
    // JSON result in `data` variable
});
}

setInterval(check_claim, 5000);

console.log("check_claim_management initialized")