var kind = require('enyo/kind');
var FittableRows = require('layout/FittableRows');
var Toolbar = require('onyx/Toolbar');

module.exports = kind({
    kind: FittableRows,
    fit: true,
    components:[
	// Fall-back content if we're not on webOS
	{name: "identity", kind: Toolbar, content: "Equivalents in the browser"},
	{name: "copyright", content: "\251 Copyright 2015 Ian Miller"}
    ],
    create: function() {
	this.inherited(arguments);
	if (window.PalmSystem) {
	    this.$.identity.setContent(webos.fetchAppInfo().title + " " + webos.fetchAppInfo().version);
	    this.$.copyright.setContent("\251 Copyright 2015 " + webos.fetchAppInfo().vendor);
	}
    }
});
