//This is the simple class to handle the URL
var HASHBANG_REGEX=/^#!\//g;
var LocationService=function(){

}
LocationService.prototype.getCurrentPath=function(){
	var hashPath=window.location.hash;
	if(hashPath.match(HASHBANG_REGEX))
	{
		return hashPath.replace(HASHBANG_REGEX,"/");
	}else
	{
		return "/";
	}
}

exports.getInstance=function(){
	return new LocationService();
}