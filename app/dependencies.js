(function(){
	var config=require("./config");
	var router=require("./libs/router").getInstance(config.routers);
	//registration of the dependencies
	injector.register("appConfig",config.appConfig);
	injector.register("routerService",router);
	injector.register("locationService",require("./libs/location_service").getInstance());
	injector.register("dispatcher",require("./libs/dispatcher").getInstance());
	injector.register("BaseController",require("./libs/base_controller").BaseController);
})()