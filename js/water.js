$(function() {

// this is far from complete - much left to do
// but putting one piece at a time will help
// figure out the best workflow
/*
$('#saveButton').on('click', function(e) {

	var gist = {
		description: 'watertest',
		public: true,
		files: {
			'water.txt': {
				content: 'contents'
			}
		}
	};

	$.post('https://api.github.com/gists', JSON.stringify(gist), function(data) {
	});
});
*/

// initially we were setting the svg dimensions on the html, as %,
// but retrieving those dimensions in firefox returns %, not pixels
// so we need to set the dimensions in pixels, based on the parent container
// which in this case is #display
function setSvgDimensions() {
	var padding = 0.02;
	$('svg').width($('#display').width() * (1 - padding));
	$('svg').height($('#display').height() * (1 - padding));
	$('svg').css('top', $('#display').height() * (padding/2));
	$('svg').css('left', $('#display').width() * (padding/2));
}
setSvgDimensions();

window.aceEditor = ace.edit("editor");

// set the theme
window.aceEditor.setTheme("ace/theme/twilight");

// set mode to javascript
var JavaScriptMode = require("ace/mode/javascript").Mode;
window.aceEditor.getSession().setMode(new JavaScriptMode());

function redrawSvg() {
	// clear the window
	$('svg').empty();

	try {
		// get the ide code
		var thisCode = window.aceEditor.getSession().getValue();

		// run it
		eval(thisCode);

		// save it in local storage
		setLocalStorageValue('code', thisCode);
	}
	catch (error) {
        console.log(error);
    }
	finally {};
}

// redraw svg when we update our code or resize the window
window.aceEditor.getSession().on('change', redrawSvg);
$(window).on('resize', function() {

	setSvgDimensions();
	redrawSvg();
});

//d3.text('../static/submodule/water/data/chord.txt', function(data) {
//
//	// do we have stored code? if not, set the demo code
//	window.aceEditor.getSession().setValue(getLocalStorageValue('code') ? getLocalStorageValue('code') : data);
//});

// local storage getter/setter
function getLocalStorageValue(key) {
	var localStorageKey = 'gabrielflor.it/water1';
	return localStorage.getItem([localStorageKey, key].join('/'));
}
function setLocalStorageValue(key, value) {
	var localStorageKey = 'gabrielflor.it/water1';
	localStorage.setItem([localStorageKey, key].join('/'), value);
}

// turn off horizontal scrollbar
window.aceEditor.renderer.setHScrollBarAlwaysVisible(false);

// turn off print margin visibility
window.aceEditor.setShowPrintMargin(false);

// load font-size from local storage
if (getLocalStorageValue('font-size')) {
	$('#editor').css('font-size', getLocalStorageValue('font-size'));
}

// increase/decrease font
$('.font-control').on('click', function(e) {
	e.preventDefault();

	if ($(this).attr('class').indexOf('decrease') != -1) {
		$('#editor').css('font-size', '-=1');
	} else {
		$('#editor').css('font-size', '+=1');
	}

	setLocalStorageValue('font-size', $('#editor').css('font-size'));
});

// from https://github.com/ajaxorg/ace/issues/305
// this replaces the current replace functionality
// replace just replaces the current selection with the replacement text,
// and highlights the replacement text
// it does not go to the next selection (which the default version does)
window.aceEditor.replace = function(replacement) {
	var range = this.getSelectionRange();
	if (range !== null) {
		this.$tryReplace(range, replacement);
		if (range !== null)
			this.selection.setSelectionRange(range);
	}
}

// we're not a numeric, by default
// if we are, the editor click will handle it
$('body').on('focus click', function(e) {
	onNumeric = false;
});

// pulse numeric constants (until user clicks on them)
var pulseNumerics = true;
var pulse = setInterval(function() {
	$('.ace_numeric').animate({opacity: 0.5}).animate({opacity: 1});
}, 1000);

});
