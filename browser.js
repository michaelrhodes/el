module.exports = {
  prepend: function(target, element) {
    target.insertBefore(element, target.firstChild)
  },
  append: function(target, element) {
    target.appendChild(element)
  },
  before: function(target, element) {
    target.parentNode.insertBefore(element, target)
  },
  after: function(target, element) {
    if (target.nextSibling) {
      target.parentNode.insertBefore(element, target.nextSibiling)
    }
    else {
      target.parentNode.appendChild(element)
    }
  },
  insert: function(target, element) {
    target.innerHTML = ''
    target.appendChild(element)
  },
  set: function(type) {
    // DGAF, baby!
  }
}
