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
	{kind: Toolbar, content: "Altitude"},
	{kind: Scroller, fit: true, components: [
	    {kind: Groupbox, components: [
		{kind: GroupboxHeader, content: "Feet"},
		{kind: InputDecorator, components: [
		    {name: "feet", kind: Input, value: 0, type: "number", selectOnFocus: true, placeholder: "Number", onkeypress: "acceptOnlyNumbers", onchange: "feetChanged"}
		]},
	    ]},
	    {content: "is equivalent to"},
	    {kind: Groupbox, components: [
		{kind: GroupboxHeader, content: "Metres"},
		{kind: InputDecorator, components: [
		    {name: "metres", kind: Input, value: 0, type: "number", selectOnFocus: true, placeholder: "Number", onkeypress: "acceptOnlyNumbers", onchange: "metresChanged"}
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
    feetChanged: function(inSender, inEvent) {
	var f = inSender.getValue();
	if (f) {
	    var m = f * 0.3048; // 12 * 0.0254
	    this.$.metres.setValue(m);
	}
    },
    metresChanged: function(inSender, inEvent) {
	var m = inSender.getValue();
	if (m) {
	    var f = m / 0.3048;
	    this.$.feet.setValue(f);
	}
    }
});
