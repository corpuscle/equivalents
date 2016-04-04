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
	{kind: Toolbar, content: "Decimals and Minutes"},
	{kind: Scroller, fit: true, components: [
	    {kind: Groupbox, components: [
		{kind: GroupboxHeader, content: "Decimal Degrees (or Hours)"},
		{kind: InputDecorator, components: [
		    {name: "decimal", kind: Input, value: 1, type: "number", selectOnFocus: true, placeholder: "Number", onkeypress: "acceptOnlyNumbers", onchange: "decimalChanged"}
		]},
	    ]},
	    {content: "is equivalent to"},
	    {kind: Groupbox, components: [
		{kind: GroupboxHeader, content: "Minutes"},
		{kind: InputDecorator, components: [
		    {name: "minutes", kind: Input, value: 60, type: "number", selectOnFocus: true, placeholder: "Number", onkeypress: "acceptOnlyNumbers", onchange: "minutesChanged"}
		]},
	    ]},
	    {content: "is equivalent to"},
	    {kind: Groupbox, components: [
		{kind: GroupboxHeader, content: "Seconds"},
		{kind: InputDecorator, components: [
		    {name: "seconds", kind: Input, value: 3600, type: "number", selectOnFocus: true, placeholder: "Number", onkeypress: "acceptOnlyNumbers", onchange: "secondsChanged"}
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
    decimalChanged: function(inSender, inEvent) {
	var d = inSender.getValue();
	if (d) {
	    var m = d * 60;
	    var s = d * 3600;

	    this.$.minutes.setValue(m);
	    this.$.seconds.setValue(s);
	}
    },
    minutesChanged: function(inSender, inEvent) {
	var m = inSender.getValue();
	if (m) {
	    var d = m / 60;
	    var s = m * 60;

	    this.$.decimal.setValue(d);
	    this.$.seconds.setValue(s);
	}
    },
    secondsChanged: function(inSender, inEvent) {
	var s = inSender.getValue();
	if (s) {
	    var m = s / 60;
	    var d = s / 3600;

	    this.$.minutes.setValue(m);
	    this.$.decimal.setValue(d);
	}
    }
});
