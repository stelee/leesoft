var Dispatcher=function(){
}
Dispatcher.prototype.redirect=function(path)
{
	window.location.hash="!"+path;
}
Dispatcher.prototype.dispatch=function(controllerDef)
{
	var controllerName=controllerDef;
	var args=[];
	if(typeof controllerDef === "object")
	{
		controllerName=controllerDef.handler;
		args=controllerDef.params;
	}

	var basePath="./controllers";
	var path=basePath + "/" + controllerName;
	var controller=null;
	var that=this;
	new Promise(function(resolve,reject){
		var createControllerFn = require(path).getInstance;
		if(typeof createControllerFn === "undefined")
		{
			reject({
				code : "404"
			});
			return;
		}

		controller=createControllerFn();
		
		if("auth" in controller)
		{
			controller.auth.apply(controller,[resolve,reject].concat(args));
		}else
		{
			resolve();
		}
	}).then(function(){
		controller.render.apply(controller,args);
	}).catch(function(error){
		if(error.code === "401")
		{
			that.redirect("/");
		}else if(error.code === "404")
		{
			injector.process("BaseController",function(BaseController){
				new BaseController().render_404();
			})
		}
	})

}

exports.getInstance=function(){
	return new Dispatcher();
}