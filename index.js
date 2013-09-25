var detect = require('detect-indent')

module.exports = {
  append: function(target, element) {
    return indented(target, element, 'append')  
  },
  prepend: function(target, element) {
    return indented(target, element, 'prepend')
  },
  before: function(target, element) {
    return indented(target, element, 'before')  
  },
  after: function(target, element) {
    return indented(target, element, 'after')  
  },
  insert: function(target, element) {
    return indented(target, element, 'insert')  
  }
}

var indented = function(target, element, position) {
  var level = 1
  var first = target
  var previous = target
  
  // Find indentation level of the target node 
  while (previous = previous.parentNode) {
    // Only take element nodes into account
    if (previous.nodeType === 1) {
      // Ignore root element in partial documents,
      // for they are unfortunate domification cruft.
      var domifyRoot = previous.nodeName === 'DOMIFY'
      var jsdomifyRoot = (
        previous.nodeName === 'HTML' &&
        !previous.parentNode.doctype
      )
      if (domifyRoot || jsdomifyRoot) {
        continue
      }
      first = previous
      level++
    }
  }
  if (position !== 'before' && position !== 'after') {
    level++
  }
  
  // Determine indent size of target document
  // eg. One tab or four spaces
  var indent = '  '

  // detect-indent blows up if there aren’t any space characters.
  // https://github.com/sindresorhus/detect-indent/issues/4
  if (/(\s+<)|(>\s+)/.test(first.outerHTML)) { 
    indent = detect(first.outerHTML)
  }

  // Handle document fragments
  if (/fragment/.test(element.nodeName)) {
    element = element.childNodes
  }
  
  // Get each line of the to-be-inserted html
  var lines = []
  if (element.length > 1) {
    ;[].slice.call(element).forEach(function(node) {
      if (node.nodeType === 1) {
        node.outerHTML.split(/\n|\n\r/).forEach(function(line) {
          lines.push(line)
        })
      }
    })
  }
  else {
    lines = element.outerHTML.split(/\n|\n\r/)
  }

  var output = []
  lines.forEach(function(line) {
    // Prepend indentation 
    output.push(Array(level).join(indent) + line)
  })

  // Insert HTML and reset the trailing indentation
  if (position === 'append') {
    target.innerHTML =
      target.innerHTML.replace(/\s+$/, '') + '\n' +
      output.join('\n') + '\n' +
      Array(level - 1).join(indent)
  }
  else if (position === 'prepend') {
    target.innerHTML =
      '\n' + output.join('\n') +
      target.innerHTML
  }
  else if (position === 'before') {
    var firstLine = target.outerHTML.split(/\n|\n\r/)[0]
    var parentHTML = target.parentNode.innerHTML
    var position = parentHTML.indexOf(firstLine)
    target.parentNode.innerHTML =
      parentHTML.substr(0, position).replace(/\s+$/, '') + '\n' +
      output.join('\n') + '\n' +
      Array(level).join(indent) +
      parentHTML.substr(position)
  }
  else if (position === 'after') {
    var firstLine = target.outerHTML.split(/\n|\n\r/)[0]
    var parentHTML = target.parentNode.innerHTML
    var position = parentHTML.indexOf(firstLine) + target.outerHTML.length
    target.parentNode.innerHTML =
      parentHTML.substr(0, position).replace(/\s+$/, '') + '\n' +
      output.join('\n') + 
      Array(level).join(indent) +
      parentHTML.substr(position)
  }
  else if (position === 'insert') {
    // Align the target's closing tag
    target.innerHTML =
      '\n' + output.join('\n') + '\n' +
      Array(level - 1).join(indent)
  }
}
