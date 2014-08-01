//require.js
//version 2.1.2
(function(scope){
	'use strict'

	var CONFIG_REQUIRE_ONCE=true;
	var __module_cache__={};
	var config={
		async:false,
		root: './app',
		alias: {
			require : "require",
			mix: "mixin",
			injector: "injector",
			newInjector: "newInjector",
			script: "script"
		}
	}

	var pathResolver=function(path){
		path=config.root + '/' + path;
		if(config.pathResolver)
		{
			return config.pathResolver(path);
		}
		else
		{
			if(path.match(/\.js$/g)===null)
			{
				path += ".js";
			}
			return path;
		}
	}

	var contentResolver=function(path,callback){
		var ret=null;
		path=pathResolver(path);
		ajaxGet(path,function(data){
			if("function"==typeof(callback)){
				callback(data);
			}else
			{
				ret=data;
			}
		})
		return ret;
	}

	var errorHandler=function(url,xmlHttpRequest,textStatus)
	{
		console.error("Error fetch the content: "+url);
	}
	var createXMLHTTPRequest=function(){
		if(window.XMLHttpRequest){//firefox,mozillar, opera,safari,IE7, IE8
			var xmlHttpRequest=new XMLHttpRequest();
			if(xmlHttpRequest.overrideMimeType){
				xmlHttpRequest.overrideMimeType("text/xml");
			}
			return xmlHttpRequest;
		}else
		{
			console.error("Old browser is not supported");
			return null;
		}
	}
	var ajaxGet=function(url,callback){
		if('function'!=typeof(jQuery)){//work with no jquery
			var xmlHttpRequest=createXMLHTTPRequest();
			xmlHttpRequest.onreadystatechange=function(){
				if(xmlHttpRequest.readyState==4){
					if(xmlHttpRequest.status==200){
						callback(xmlHttpRequest.responseText);
					}else
					{
						errorHandler(url,xmlHttpRequest,xmlHttpRequest.status);
					}
				}
			}
			xmlHttpRequest.open('GET',url,config.async);
			xmlHttpRequest.send();
		}else
		{
			jQuery.ajax(url,{
				async:config.async,
				dataType:"html",
				scriptCharset:"UTF-8",
				success:function(data)
				{
					callback(data);
				},
				error: function(request, status, errorThrown){
					errorHandler(url,request,status)
				}
			})
		}
	}

	var define=function(fn){
		if("object"==typeof(fn)){
		    return fn;
		}else if("function"==typeof(fn)){
			var module={
			  exports:{}
			}
			fn(require,module.exports,module,scope);
			return module.exports;
		}
	}

	var webnpmEval=function(content,filePath){
		try{
			var fn=new Function("require","exports","module","scope",content);
			return define(fn);
		}catch(exception)
		{
			console.error("error on "+filePath)
			console.error(exception)
			console.error(exception.stack)
			return null;
		}
		
	}

	var script=function(path)
	{
		if(CONFIG_REQUIRE_ONCE&&__module_cache__[path])
		{
			return __module_cache__[path];
		}
		var content=contentResolver(path);
		var obj=eval(content,path);
		if(CONFIG_REQUIRE_ONCE){
			__module_cache__[path]=obj;
		}
		return obj;
	}

	var require=function(path,callback){
		if(CONFIG_REQUIRE_ONCE&&__module_cache__[path])
		{
			return __module_cache__[path];
		}
		if("function"==typeof(callback)){
			contentResolver(path,function(content){
				var obj=webnpmEval(content,path);
				if(CONFIG_REQUIRE_ONCE){
					__module_cache__[path]=obj;
				}
				callback(obj);
			})
		}else{
			var content=contentResolver(path);
			var obj=webnpmEval(content,path);
			if(CONFIG_REQUIRE_ONCE){
				__module_cache__[path]=obj;
			}
			
			return obj;
		}
		
	}

	var mix=function(targetClass, traits){
		for(var prop in traits){
			targetClass.prototype[prop]=traits[prop];
		}
	}
	//injector
	var Injector=function()
	{
		this.deps={};
	}

	Injector.prototype={
		register : function(name, content)
		{
			switch(typeof content)
			{
				case "function":
					this.deps[name]=content;
					break;
				case "object":
					this.deps[name]=content;
					break;
				case "string" : //content is the path name of dep
					this.deps[name]=require(content);
					break;
				default:
					//do nothing
			}
		},
		process: function()
		{
			var that=this;
			var argumentsLength=arguments.length;
			var args=[];
			for(var i=0;i<argumentsLength;i++){
				args.push(arguments[i]);
			}
			var toInjects=args
							.slice(0,argumentsLength-1)
							.map(function(injectName){
								var toInject=that.deps[injectName];
								if(typeof toInject === 'undefined' 
									|| toInject === null)
								{
									toInject=require(injectName);
								}
								return toInject;
							})
			var fn=args[argumentsLength-1];
			var fnScope=scope;
			if(typeof fn === 'object')
			{
				fnScope=fn['scope'];
				fn=fn['fn'];
			}
			fn.apply(fnScope,toInjects);
		},
		cloneDeps: function(anotherInjector)
		{
			for(var key in anotherInjector.deps)
			{
				this.deps[key]=anotherInjector.deps[key];
			}
		}
	}

	var injector=new Injector();
	
	scope[config.alias.require]=require;
	scope[config.alias.mix]=mix;
	scope[config.alias.injector]=injector;
	scope[config.alias.newInjector]=function(){
		return new Injector();
	}
	scope[config.alias.script]=script;
})(this);
require("app");