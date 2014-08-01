(function(){
	//register the global core event
	var dispatch=function(){
		injector.process("routerService","dispatcher",
			function(routerService,dispatcher){
				var controllerDef=routerService.routeByCurrentLocation();		
				dispatcher.dispatch(controllerDef);
		})
	}
	$(window).on("hashchange",dispatch);
	dispatch();
})()