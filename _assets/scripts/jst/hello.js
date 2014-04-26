define(['jade'], function(jade) { if(jade && jade['runtime'] !== undefined) { jade = jade.runtime; }

this["Templates"] = this["Templates"] || {};

this["Templates"]["hello"] = function template(locals) {
var buf = [];
var jade_mixins = {};
var locals_ = (locals || {}),paths = locals_.paths,pageId = locals_.pageId,pageClasses = locals_.pageClasses,trimLeadingSlash = locals_.trimLeadingSlash,_ = locals_._,hello = locals_.hello;
function pagevar(key, value) { var undef; return (value===undef) ? locals[key] || null : locals[key] = value; }
paths.root = '/fierce';
pageId = pagevar('pageId') || '';
pageClasses = pagevar('pageClasses') || [pageId];
jade_mixins["projectLink"] = function(url){
var block = (this && this.block), attributes = (this && this.attributes) || {};
var path = url || attributes.href || null;
path = trimLeadingSlash(path);
attributes.href = paths["header"]["home"] + path;
buf.push("<a" + (jade.attrs(jade.merge([attributes]), false)) + ">");
block && block();
buf.push("</a>");
};
jade_mixins["projectStyle"] = function(file){
var block = (this && this.block), attributes = (this && this.attributes) || {};
var path = file || attributes.href || null;
path = trimLeadingSlash(path);
if ( path)
{
attributes.href = paths["assets"]["styles"] + path;
attributes.rel = 'stylesheet'
buf.push("<link" + (jade.attrs(jade.merge([attributes]), false)) + "/>");
}
};
jade_mixins["projectScript"] = function(file){
var block = (this && this.block), attributes = (this && this.attributes) || {};
var path = file || attributes.src || null;
path = trimLeadingSlash(path);
if ( path)
{
attributes.src = paths["assets"]["scripts"] + path;
buf.push("<script" + (jade.attrs(jade.merge([attributes]), false)) + "></script>");
}
};
jade_mixins["projectImage"] = function(file){
var block = (this && this.block), attributes = (this && this.attributes) || {};
var path = file || attributes.src || null;
path = trimLeadingSlash(path);
if ( path)
{
attributes.src = paths["assets"]["images"] + path;
attributes.alt = attributes.alt || 'OnePage Image of'
buf.push("<img" + (jade.attrs(jade.merge([attributes]), false)) + "/>");
}
};
_.mixin({capitalize: function(string) {return string.charAt(0).toUpperCase() + string.substring(1);}});
buf.push(jade.escape(null == (jade.interp = hello) ? "" : jade.interp));;return buf.join("");
};

return this["Templates"];

});