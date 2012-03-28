$(function() {

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
// window.aceEditor.setTheme("ace/theme/twilight");
window.aceEditor.setTheme("ace/theme/crimson_editor");

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

if (window.location.hash) {
    var filename = window.location.hash.substring(1);
    d3.text('examples/' + filename +'.js', function(data) {
        window.aceEditor.getSession().setValue(data);
    });
}

// turn off horizontal scrollbar
window.aceEditor.renderer.setHScrollBarAlwaysVisible(false);

// turn off print margin visibility
window.aceEditor.setShowPrintMargin(false);

// increase/decrease font
$('.font-control').on('click', function(e) {
	e.preventDefault();

	if ($(this).attr('class').indexOf('decrease') != -1) {
		$('#editor').css('font-size', '-=1');
	} else {
		$('#editor').css('font-size', '+=1');
	}
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

});
