var MenuController=function($menuBar)
{
	this.$menuBar=$menuBar
}

MenuController.prototype.render=function(){
	var that=this;
	injector.process('appConfig','locationService',function(appConfig,locationService){
		if(appConfig.menus)
		{
			that.$menuBar.empty();
			appConfig.menus.forEach(function(menu){
				var url=locationService.createURL(menu[1]);
				that.$menuBar.append("<li><a href='" + url + "'>" + menu[0] + "</a></li>");
			})
			that.$menuBar.children(":first").addClass("active");
		}
		
	});
}

MenuController.prototype.setCurrentSelected=function(){
	var that=this;
	injector.process('locationService','appConfig',function(locationService,appConfig){
		var path=locationService.getCurrentPath();
		that.$menuBar.children().removeClass("active");
		for(var i=0;i<appConfig.menus.length;i++)
		{
			if(appConfig.menus[i][1] === path)
			{
				$(that.$menuBar.children()[i]).addClass("active");
				return;
			}
		}
		that.$menuBar.children(":first").addClass("active");
	})
}

exports.getInstance=function($menuBar)
{
	return new MenuController($menuBar)
}