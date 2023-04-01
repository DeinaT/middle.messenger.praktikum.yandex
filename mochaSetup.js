var { JSDOM } = require('jsdom');
var Handlebars = require('handlebars');
var fs = require('fs');

var { window } = new JSDOM('<div id="app"></div>', {
    url: 'http://localhost:3000'
});

global.window = window;
global.document = window.document;
global.DocumentFragment = window.DocumentFragment;

require.extensions['.hbs'] = function (module, filename) {
    var contents = fs.readFileSync(filename, 'utf-8');

    module.exports = Handlebars.compile(contents);
};
require.extensions['.sass'] = function () {
    module.exports = () => ({});
};
