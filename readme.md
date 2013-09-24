# indented
indented is a module for inserting DOM elements into other DOM elements. The interesting part is that the inserted elements respect their parents’ indentation levels — this makes for tidy output.

[![Build status](https://travis-ci.org/michaelrhodes/indented.png?branch=master)](https://travis-ci.org/michaelrhodes/indented)

[![Browser support](https://ci.testling.com/michaelrhodes/indented.png)](https://ci.testling.com/michaelrhodes/indented)

## Install
```
npm install indented
```

## API
``` js
.append(target, element)
.prepend(target, element)
.before(target, element)
.after(target, element)
.insert(target, element)
```

### Example
``` js
var fs = require('fs')
var indent = require('indented')
var dom = require('domlin')

var wrapper = fs.readFileSync('./templates/blog.html')
var article = fs.readFileSync('./templates/blog-article.html')

// Create DOM elements
var page = dom(wrapper)
var content = dom(article)

// Add data
page.querySelector('title').textContent =
content.querySelector('h1').textContent = 'My post title'
content.querySelector('p').textContent = 'Once upon a time…'

indent.insert(page.querySelector('body'), content)

process.stdout.write(page.doctype + page.outerHTML)
```

#### Note
When an element is inserted into another, it can no longer be manipulated, so leave all your insertions until the last minute. 

### License
[MIT](http://opensource.org/licenses/MIT)
