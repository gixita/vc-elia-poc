
const check_claim = function()
{ 
    console.log("checking claim")
    $.getJSON('get_notification_verification_is_available', function(data) {
    // JSON result in `data` variable

    if(data)
    {
        console.log("verfication is valid")
        window.location.replace("../portal/verified");
    }
    else
    {
        console.log("waiting on verification")
    }
});
}

setInterval(check_claim, 5000);
console.log("check_claim_management initialized")