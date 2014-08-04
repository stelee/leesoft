var TitleController=function($titleContainer)
{
	this.$titleContainer=$titleContainer
}
TitleController.prototype.render=function()
{
	var that=this;
	injector.process("appConfig",function(appConfig){
		that.$titleContainer.text(appConfig.appName);
	});
}

exports.getInstance=function($titleContainer)
{
	return new TitleController($titleContainer);
}