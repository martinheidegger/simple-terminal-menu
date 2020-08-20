const createMenu = require('./simple-terminal-menu')
const moduleDefaults = {
  width: 65,
  x: 3,
  y: 2
}

function writeEntries (menu, items) {
  if (typeof items === 'function') {
    items = items(menu)
  }
  if (!Array.isArray(items) || items.length === 0) {
    return
  }
  menu.writeSeparator()
  items.forEach(menu.addItem)
}

module.exports = function (options, defaults) {
  options = Object.assign({}, moduleDefaults, options)

  return {
    options: options,
    create: function create (data) {
      const menu = createMenu(options)

      if (!menu) {
        return null
      }

      const title = data.title || defaults && defaults.title
      if (title) {
        menu.writeTitle(title)
      }

      const subtitle = data.subtitle || defaults && defaults.subtitle
      if (subtitle) {
        menu.writeSubtitle(subtitle)
      }


      writeEntries(menu, data.menu)
      writeEntries(menu, data.extras)
      return menu
    }
  }
}
