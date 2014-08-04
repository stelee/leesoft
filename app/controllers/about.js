var About=function(){

}

injector.process("BaseController",function(BaseController)
{
	About.prototype=new BaseController();
})

About.prototype.render=function(){
	var that=this;
	this.getBody().empty();
	injector.process('templateManager',function(templateManager){
		that.getBody().append(templateManager.render("about"));
	})
}

exports.getInstance=function(){
	return new About();
}