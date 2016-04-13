var kind = require('enyo/kind');
var Panels = require('layout/Panels');
var DecimalsAndMinutes = require('./DecimalsAndMinutes');
var PaceAndSpeed = require('./PaceAndSpeed');
var Altitude = require('./Altitude');
var SchoolYears = require('./SchoolYears');
var About = require('./About');
var CollapsingArranger = require('layout/CollapsingArranger');

module.exports = kind({
    kind: Panels,
    arrangerKind: CollapsingArranger,
    components:[
/*	{kind: "enyo.AppMenu", style: "overflow: hidden;", components: [
	    { kind: "enyo.AppMenuItem", content: "About", ontap: "showAbout" }
	]},*/
	{name: "content", kind: Panels, fit: true, components: [
	     {name: "degreesAndMinutesView", kind: DecimalsAndMinutes},
	     {name: "paceAndSpeedView", kind: PaceAndSpeed},
	     {name: "altitude", kind: Altitude},
	     {name: "schoolYears", kind: SchoolYears},
	     {name: "aboutBox", kind: About}
	]}
    ]/*,
    showAbout: function () {
	this.$.content.selectPanelByName("aboutBox");
    }*/
});
