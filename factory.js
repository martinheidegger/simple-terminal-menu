var createMenu = require('./simple-terminal-menu')
  , defaultWidth = 65
  , defaultX = 3
  , defaultY = 2

function writeMenu(entries) {
  entries.forEach(menu.addObject)
}

module.exports = function (options, defaults) {
  if (!options)
    options = {}

  if (!defaults)
    defaults = {}

  if (typeof options.width !== 'number')
    options.width = defaultWidth

  if (typeof options.x !== 'number')
    options.x = defaultX

  if (typeof options.y !== 'number')
    options.y = defaultY

  return {
    options: options,
    create: function create(data) {
      var menu = createMenu(options)
        , title = data.title || defaults.title
        , subtitle = data.subtitle || defaults.subtitle

      if (!menu)
        return null

      if (title)
        menu.writeTitle(title)

      if (subtitle)
        menu.writeSubtitle(subtitle)

      if (data.menu) {
        menu.writeSeparator()
        data.menu.forEach(menu.addItem)
      }

      if (data.extras) {
        menu.writeSeparator()
        data.extras.forEach(menu.addItem)
      }
      return menu
    }
  }
}