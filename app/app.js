
(function()
{	//initialize the context
	script("../bower_components/jquery/dist/jquery");
	script("../bower_components/bootstrap/dist/js/bootstrap");
	if('undefined' === typeof Promise)
	{
		script("./libs/rsvp-latest");
		Promise = RSVP.Promise;
	}
	require("./dependencies");
	require("./libs/core");
})()