(function(){
	var config=require("./config");
	var router=require("./libs/router").getInstance(config.routers);
	
	//registration of the dependencies
	injector.register("appConfig",config.appConfig);
	injector.register("routerService",router);
	injector.register("locationService",require("./libs/location_service").getInstance());
	injector.register("menuController",require("./libs/menu_controller").getInstance($("[data-role=menu]")));
	injector.register("titleController",require("./libs/title_controller").getInstance($("[data-role=title]")));
	injector.register("dispatcher",require("./libs/dispatcher").getInstance());
	injector.register("BaseController",require("./libs/base_controller").BaseController);
	injector.register("templateManager",require("./libs/template_manager").getInstance({
																						path: './template',
																						postfix: 'html'
																					}));
	injector.register("hoganTemplates",require("./views/template").templates);
})()