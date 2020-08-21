const tmenu = require('extended-terminal-menu')
const wcstring = require('wcstring')
const chalk = require('chalk')

const maxListenersPerEvent = 10

process.stdin.pause()

function repeat (ch, sz) {
  return new Array(sz + 1).join(ch)
}

function applyTextMarker (truncate, width, text, marker) {
  const availableSpace = width - wcstring(marker).size()
  const wText = wcstring(text)

  if (availableSpace < wText.size()) {
    text = wText.truncate(availableSpace, truncate)
  } else {
    text += repeat(' ', availableSpace - wText.size())
  }
  return text + marker
}


function simpleTerminalMenu (opts) {
  if (!process.stdin.isTTY) {
    return null
  }

  opts = Object.assign({
    separator: '\u2500',
    truncate: '...'
  }, opts)

  const menu = tmenu(opts)
  const _add = menu.add.bind(menu)
  const _close = menu.close.bind(menu)
  const txtMarker = applyTextMarker.bind(null, opts.truncate, menu.width)

  menu.entryCount = 0

  menu.addItem = function (item) {
    menu.add(item.label, item.marker, item.handler)
  }

  menu.add = function (label, marker, cb) {
  	if (typeof marker == 'function') {
  		cb = marker
  		marker = null
  	}
    menu.entryCount += 1
    menu.setMaxListeners(menu.entryCount * maxListenersPerEvent)
    _add(txtMarker(label, marker || ''), function () {
      if (typeof cb === 'function')
        cb(label, marker)
    })
  }

  menu.writeLine = function (label, marker) {
    menu.write(txtMarker(label, marker || '') + '\n')
  }

  menu.writeSeparator = function () {
    menu.write(repeat(opts.separator, menu.width) + '\n')
  }

  menu.writeTitle = function (title) {
    menu.writeLine(chalk.bold(title))
  }

  menu.writeSubtitle = function (subtitle) {
    menu.writeLine(chalk.italic(subtitle))
  }

  menu.close = function () {
    menu.y = 0
    menu.reset()
    _close()
    close()
  }

  menu.reset()

  function passDataToMenu (data) {
    // Node 0.10 fix
    menuStream.write(data)
  }

  function close () {
    process.stdin.pause()
    process.stdin.removeListener('data', passDataToMenu)
    menuStream.unpipe(process.stdout)
    process.stdin.unpipe(menuStream)
    process.stdin.setRawMode(false)
  }

  menu.on('select', menu.close.bind(menu))

  const menuStream = menu.createStream()
  process.stdin
    .on('data', passDataToMenu)

  menuStream.pipe(process.stdout, { end: false })
  menuStream.on('end', close)
  process.stdin.setRawMode(true)
  process.stdin.resume()

  return menu
}

module.exports = simpleTerminalMenu
