function gulpInjectFile(opts, input) {
    const FILENAME_PATTERN = '\\s*([\\w\\-.\\\\/]+)\\s*'; //Unescaped \s*([\w\-.\\\/]+)\s*
    const FILENAME_MARKER = '<filename>';
    const DEFAULT_PATTERN = '<!--\\s*inject:<filename>-->';

    opts = opts || {};
    opts.pattern = opts.pattern || DEFAULT_PATTERN;

    function doInject(in_string) {

        var content = in_string;
        var injectPattern = '^([ \\t]*)(.*?)' + opts.pattern.replace(FILENAME_MARKER, FILENAME_PATTERN);
        var regex = new RegExp(injectPattern, 'm');
        var fileName, textBefore, whitespace;

        console.log(JSON.stringify(regex + ""));

        var counter = 0;
        // while (currMatch = regex.exec(content)) {
        (currMatch = regex.exec(content))
        	regex.lastIndex++;
            match = currMatch[0];
            whitespace = currMatch[1];
			textBefore = currMatch[2];
            fileName = currMatch[3];

            console.log(fileName, currMatch);
            if (counter++ > 3) process.exit();
        // }
        process.exit();
    }
    doInject(input);
}


var opts = { pattern: '<script\\s*src=["]<filename>["]\\s*<\\/script>' };
// '<script\\s*src="<fileName>\\s*<\/script>'
// /^([ \\t]*)(.*?)<script\s*src="\s*([\w\-.\\\/]+)"\s*>\s*<\/script>/

gulpInjectFile(
	opts,
	'<script src="../bower_components/jquery/dist/jquery.js"></script>'
);
