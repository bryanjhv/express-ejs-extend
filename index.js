var ejs  = require('ejs'),
    path = require('path');


/**
 * Express EJS engine with layout support.
 *
 * This function is the only export for the module, and it's
 * ready to be used as an Express engine.
 * It exports to the view a method named `extend`, which in
 * opposite to the normal `include` built-in, it captures the
 * content in the file which is called and passes to the
 * filename specified in it. It just intercepts the first call
 * to `extend` so if you try to use more than a layout it will
 * use the last one.
 *
 * @param {string} filename - The filename of rendered view.
 * @param {object} options - Passed by Express.
 * @param {function(Error, string?)} callback - Once finished.
 * @throws {Error} If no filename was given to `extend`.
 */
module.exports = function expressEjsExtend(filename, options, callback) {
  var extension = null;
  options.extend = function (filename, data) {
    if (!filename) throw new Error('Missing filename for EJS extend.');

    if (!data) data = {};
    extension = {filename: filename, data: data};
    return null;
  };

  // render normally the view
  ejs.renderFile(filename, options, function (err, str) {
    if (err) return callback(err);
    if (!extension) return callback(err, str);

    // if we get here, `extend` was called
    var data = extension.data;
    // copy `extend` data
    for (var key in data) {
      options[key] = data[key];
    }
    options.content = str;

    // render layout with content
    var layout = extension.filename;
    if (!path.extname(layout)) layout += '.ejs';
    layout = path.resolve(path.dirname(filename), layout);
    ejs.renderFile(layout, options, callback);
  });
};
