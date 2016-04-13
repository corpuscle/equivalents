/**
	Instantiate your enyo/Application kind in this file.  Note, application
	rendering should be deferred until the DOM is ready by wrapping it in a
	call to ready().
*/

//require('enyo-luneos');

var
	ready = require('enyo/ready'),
	App = require('./src/App');

ready(function () {
	window.Mojo = {relaunch: function(e) {}};
	window.PalmSystem && PalmSystem.stageReady && PalmSystem.stageReady();
	new App();
});
