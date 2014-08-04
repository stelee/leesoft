function initialize(){
	injector.process("menuController","titleController",
		function(menuContrller,titleController){
			titleController.render();
			menuContrller.render();
		})
}
(function(){
	//register the global core event
	var dispatch=function(){
		injector.process("routerService","dispatcher","menuController",
			function(routerService,dispatcher,menuController){
				var controllerDef=routerService.routeByCurrentLocation();		
				dispatcher.dispatch(controllerDef);
				menuController.setCurrentSelected();
		})
	}
	$(window).on("hashchange",dispatch);
	initialize();
	dispatch();
})()