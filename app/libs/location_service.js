//This is the simple class to handle the URL
var HASHBANG_REGEX=/^#!\//g;
var HASHBANG_PREFIX='/#!';

var LocationService=function(){

}
LocationService.prototype.getCurrentPath=function(){
	var hashPath=window.location.hash;
	return this.getPath(hashPath);
}

LocationService.prototype.getPath=function(hashPath)
{
	if(hashPath.match(HASHBANG_REGEX))
	{
		return hashPath.replace(HASHBANG_REGEX,"/");
	}else
	{
		return "/";
	}
}

LocationService.prototype.createURL=function(relativePath){
	if(relativePath.indexOf("/")!=0)
	{
		relativePath = '/'+relativePath;
	}
	return HASHBANG_PREFIX + relativePath;
}

exports.getInstance=function(){
	return new LocationService();
}