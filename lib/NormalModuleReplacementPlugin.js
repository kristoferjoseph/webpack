/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
function NormalModuleReplacementPlugin(resourceRegExp, newResource) {
	this.resourceRegExp = resourceRegExp;
	this.newResource = newResource
}
module.exports = NormalModuleReplacementPlugin;
NormalModuleReplacementPlugin.prototype.apply = function(compiler) {
	var resourceRegExp = this.resourceRegExp;
	var newResource = this.newResource;
	compiler.plugin("normal-module-factory", function(nmf) {
		nmf.plugin("before-resolve", function(result, callback) {
			if(!result) return callback();
			if(resourceRegExp.test(result.request)) {
				result.request = newResource;
			}
			return callback(null, result);
		});
		nmf.plugin("after-resolve", function(result, callback) {
			if(!result) return callback();
			if(resourceRegExp.test(result.resource)) {
				result.resource = newResource;
			}
			return callback(null, result);
		});
	});
};