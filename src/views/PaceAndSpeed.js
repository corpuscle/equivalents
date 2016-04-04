var kind = require('enyo/kind');
var FittableRows = require('layout/FittableRows');
var Toolbar = require('onyx/Toolbar');
var Scroller = require('enyo/Scroller');
var Groupbox = require('onyx/Groupbox');
var GroupboxHeader = require('onyx/GroupboxHeader');
var Input = require('onyx/Input');
var InputDecorator = require('onyx/InputDecorator');

module.exports = kind({
    kind: FittableRows,
    fit: true,
    components:[
	{kind: Toolbar, content: "Pace and Speed"},
	{kind: Scroller, fit: true, components: [
	    {kind: Groupbox, components: [
		{kind: GroupboxHeader, content: "Pace (minutes per mile)"},
		{kind: InputDecorator, components: [
		    {name: "pace", kind: Input, value: 3, type: "number", selectOnFocus: true, placeholder: "Number", onkeypress: "acceptOnlyNumbers", onchange: "paceChanged"}
		]},
	    ]},
	    {content: "is equivalent to"},
	    {kind: Groupbox, components: [
		{kind: GroupboxHeader, content: "Speed (miles per hour)"},
		{kind: InputDecorator, components: [
		    {name: "mph", kind: Input, value: 20, type: "number", selectOnFocus: true, placeholder: "Number", onkeypress: "acceptOnlyNumbers", onchange: "mphChanged"}
		]},
	    ]},
	    {content: "is equivalent to"},
	    {kind: Groupbox, components: [
		{kind: GroupboxHeader, content: "Speed (km per s)"},
		{kind: InputDecorator, components: [
		    {name: "kps", kind: Input, value: 0.0089408, type: "number", selectOnFocus: true, placeholder: "Number", onkeypress: "acceptOnlyNumbers", onchange: "kpsChanged"}
		]},
	    ]}
	]}
    ],
    acceptOnlyNumbers: function(inSender, inEvent) {
	switch (inEvent.keyCode) {
	case 48: // 0
	case 49:
	case 50:
	case 51:
	case 52:
	case 53:
	case 54:
	case 55:
	case 56:
	case 57: // 9
	case 46: // .
	    break;
	default:
	    inEvent.returnValue = false;
	}
    },
    paceChanged: function(inSender, inEvent) {
	var p = inSender.getValue();
	if (p) {
	    var mph = 60 / p;
	    var kps = mph * (2.54 * 12 * 3 * 1760) / (60 * 60 * 1000 * 100);
	    this.$.mph.setValue(mph);
	    this.$.kps.setValue(kps);
	}
    },
    mphChanged: function(inSender, inEvent) {
	var mph = inSender.getValue();
	if (mph) {
	    var p = 60 / mph;
	    var kps = mph * (2.54 * 12 * 3 * 1760) / (60 * 60 * 1000 * 100);
	    this.$.pace.setValue(p);
	    this.$.kps.setValue(kps);
	}
    },
    kpsChanged: function(inSender, inEvent) {
	var kps = inSender.getValue();
	if (kps) {
	    var mph = kps * (60 * 60 * 1000 * 100) / (2.54 * 12 * 3 * 1760);
	    var p = 60 / mph;
	    this.$.pace.setValue(p);
	    this.$.mph.setValue(mph);
	}
    }
});
