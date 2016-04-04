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
	{kind: Toolbar, content: "School Years"},
	{kind: Scroller, fit: true, components: [
	    {kind: Groupbox, components: [
		{kind: GroupboxHeader, content: "School Year"},
		{kind: InputDecorator, components: [
		    {name: "year", kind: Input, value: 1, type: "number", selectOnFocus: true, placeholder: "Number", onkeypress: "acceptOnlyDigits", onchange: "yearChanged"}
		]},
	    ]},
	    {content: "is equivalent to"},
	    {kind: Groupbox, components: [
		{kind: GroupboxHeader, content: "Age at Start of Year"},
		{kind: InputDecorator, components: [
		    {name: "age", kind: Input, value: 5, type: "number", selectOnFocus: true, placeholder: "Number", onkeypress: "acceptOnlyDigits", onchange: "ageChanged"}
		]},
	    ]}
	]}
    ],
    acceptOnlyDigits: function(inSender, inEvent) {
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
	    break;
	default:
	    inEvent.returnValue = false;
	}
    },
    yearChanged: function(inSender, inEvent) {
	var y = inSender.getValue();
	if (y) {
	    var a = +y + 4;
	    this.$.age.setValue(a);
	}
    },
    ageChanged: function(inSender, inEvent) {
	var a = inSender.getValue();
	if (a) {
	    var y = +a - 4;
	    this.$.year.setValue(y);
	}
    }
});
