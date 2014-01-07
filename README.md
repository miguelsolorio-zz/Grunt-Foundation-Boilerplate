# Grunt Foundation Boilerplate
Welcome to my responsive boilerplate! I've created this template for myself to help jump-start my web development process. This boilerplate runs on [Grunt](http://gruntjs.com/) and [Bower](http://bower.io/) while utilizing the following libraries:
- [Assemble](http://assemble.io/)
- [Foundation](foundation.zurb.com/)
- [RequireJS](http://requirejs.org/)
- [Modernizr](http://modernizr.com/)
- [jQuery](http://jquery.com/)

## File Structure

### HTML
All pages can be found under <code>src > template > pages</code> which use the default layout template found under <code>src > template > layouts > default.hbs</code>

### SASS
All CSS dependencies are imported at <code>src > css > main.scss</code>

### JavaScript
RequireJS handles all dependencies and are defined at <code>src > js > config.js</code> and included at <code>src > js > app.js</code>

## Build for Production

### Grunt Build
When you're ready to build for production simply run: <code>grunt build</code> and your files will be minified under the <code>_public</code> directory.