if (!!!templates) var templates = {};
templates["about"] = new Hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<h1>About me</h1>");t.b("\n");t.b("\n" + i);t.b("<p>Stephen Li. A Chinese who is living in Montreal, Canada. A full stack web programmer. A Javascript expert. Have been working in some big companies. Like writing the code on his own, like the music, reading and staying home. Can speak Chinese, English and some French.</p>");return t.fl(); },partials: {}, subs: {  }});
templates["welcome"] = new Hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<h3>Welcome!</h3>\r");t.b("\n" + i);t.b("<p>Hello, My name is Stephen. I come from China and this is my website</p>");return t.fl(); },partials: {}, subs: {  }});
exports.templates=templates 
