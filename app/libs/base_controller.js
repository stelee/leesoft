var BaseController=function()
{
	this.$body=null;
}
BaseController.prototype.getBody=function(){
	this.$body=$("[data-controller]");
	return this.$body;
}
BaseController.prototype.render_404=function(){
	this.getBody().empty();
	this.getBody().append("<h3>404 Not found</h3>")
	this.getBody().append("<p>The page you request does not exist</p>")
}
exports.BaseController=BaseController;