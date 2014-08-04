var TemplateManager=function(config)
{
	if(config)
	{
		this.path=config.path;
		this.postfix=config.postfix;
	}
}

TemplateManager.prototype.render=function(templateName,data)
{
	var ret="";
	injector.process("hoganTemplates",function(templates){
		ret= templates[templateName].r(data);
	})
	return ret;
}

exports.getInstance=function(config){
	return new TemplateManager(config);
}