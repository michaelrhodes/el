# indented
indented is a module for inserting DOM elements into other DOM elements. The interesting part is that the inserted elements respect their parents’ indentation levels — this makes for tidy HTML output.

[![Build status](https://travis-ci.org/michaelrhodes/indented.png?branch=master)](https://travis-ci.org/michaelrhodes/indented)

[![Browser support](https://ci.testling.com/michaelrhodes/indented.png)](https://ci.testling.com/michaelrhodes/indented)

## Install
```
npm install indented
```

## API
``` js
// Make the element the target’s first/last child.
.prepend(target, element)
.append(target, element)

// Add the element before/after the target.
.before(target, element)
.after(target, element)

// Replace whichever elements were inside the target with the new element.
.insert(target, element)

// If a target has no indentation whitespace, use this type ('  ', '\t', etc). Note that it will only be used if no existing indentation is found.
.set(indent)
```

### Example
``` js
var fs = require('fs')
var indent = require('indented')
var mkdom = require('mkdom')

var wrapper = fs.readFileSync('./templates/blog.html')
var article = fs.readFileSync('./templates/blog-article.html')

// Create DOM elements
var page = mkdom(wrapper)
var content = mkdom(article)

// Add data
page.querySelector('title').textContent =
content.querySelector('h1').textContent = 'My post title'
content.querySelector('p').textContent = 'Once upon a time…'

indent.insert(page.querySelector('body'), content)

process.stdout.write(page.doctype + page.outerHTML)
```

#### Note
When an element is inserted it gets converted into HTML. This means it can no longer be manipulated, so leave all your insertions until the last minute. 

### License
[MIT](http://opensource.org/licenses/MIT)
