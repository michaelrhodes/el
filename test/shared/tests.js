var domify = require('domlin')
var indent = require('../../')

var list = '<ul class="navigation">\n  <li>Some existing item</li>\n</ul>\n'
var item = '<li class="item">\n  <a href="/items/1">Item 1</a>\n</li>\n'
var subitem = '<strong>Bad</strong>\n'

module.exports = function(run) {
 
  run('append', function(test) {
    var expected = '<ul class="navigation">\n  <li>Some existing item</li>\n  <li class="item">\n    <a href="/items/1">Item 1</a>\n  </li>\n</ul>'

    var ul = domify(list)
    var li = domify(item)

    indent.append(ul, li)

    test.equal(ul.outerHTML, expected, expected)
    test.end()
  })
  
  run('prepend', function(test) {
    var expected = '<ul class="navigation">\n  <li class="item">\n    <a href="/items/1">Item 1</a>\n  </li>\n  <li>Some existing item</li>\n</ul>'

    var ul = domify(list)
    var li = domify(item)

    indent.prepend(ul, li)

    test.equal(ul.outerHTML, expected, expected)
    test.end()
  })
  
  run('before', function(test) {
    var expected = '<ul class="navigation">\n  <li class="item">\n    <strong>Bad</strong>\n    <a href="/items/1">Item 1</a>\n  </li>\n  <li>Some existing item</li>\n</ul>'

    var ul = domify(list)
    var li = domify(item)
    var strong = domify(subitem)

    indent.before(li.querySelector('a'), strong)
    indent.before(ul.querySelector('li'), li)

    test.equal(ul.outerHTML, expected, expected) 

    test.end()
  })

  run('after', function(test) {
    var expected = '<li class="item">\n  <a href="/items/1">Item 1</a>\n  <strong>Bad</strong>  \n</li>'

    var li = domify(item)
    var strong = domify(subitem)

    indent.after(li.querySelector('a'), strong)

    test.equal(li.outerHTML, expected, expected) 
    test.end()
  })
  
  run('insert', function(test) {
    var expected = '<ul class="navigation">\n  <li class="item">\n    <strong>Bad</strong>\n  </li>\n</ul>'

    var ul = domify(list)
    var li = domify(item)
    var strong = domify(subitem)

    indent.insert(li, strong)
    indent.insert(ul, li)

    test.equal(ul.outerHTML, expected, expected)
    test.end()
  })

  run('no existing whitespace', function(test) {
    var expected = '<strong>Bad\n  <strong>Bad</strong>\n</strong>'
    var strong = domify(subitem)

    indent.append(strong, strong)

    test.equal(strong.outerHTML, expected, expected)
    test.end()
  })

  run('no existing whitespace with set' ,function(test) {
    var expected = '<strong>Bad\n\t<strong>Bad</strong>\n</strong>'
    var strong = domify(subitem)

    indent.set('\t')
    indent.append(strong, strong)

    test.equal(strong.outerHTML, expected, expected)
    test.end()

  })

}
