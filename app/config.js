//configuration of the app
exports.appConfig=
{
	appName: "Leesoft//CA//",
	appDescription: "This is my personal website built on SPA javascript architecture",
	version : "0.1.0",
	menus : [
		["Home","/"],
		["TechTalk","/techtalk"],
		["Stories(Chinese)","/stories"],
		["About","/about"]
	]
}

//configuration of the router
exports.routers={
	"/" : "index",
	"/techtalk" : "techtalk",
	"/stories" : "stories",
	"/about" : "about",
	"/story/(.*)" : "story"
}