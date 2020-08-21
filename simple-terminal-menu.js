const TerminalMenu = require('extended-terminal-menu')
const wcstring = require('wcstring')
const ansi = require('ansi-styles')

function repeat (ch, sz) {
  return new Array(sz + 1).join(ch)
}

module.exports = class SimpleTerminalMenu extends TerminalMenu {
  constructor (opts) {
    super(opts)
    this.truncate = (opts && opts.truncate) || '...'
    this.separator = (opts && opts.separator) || '\u2500'

    this.add = this.add.bind(this)
    this.addItem = this.addItem.bind(this)
    this.close = this.close.bind(this)
    this.reset = this.reset.bind(this)
    this.write = this.write.bind(this)
    this.writeLine = this.writeLine.bind(this)
    this.writeSeparator = this.writeSeparator.bind(this)
    this.writeSubtitle = this.writeSubtitle.bind(this)
    this.writeTitle = this.writeTitle.bind(this)
    this.writeBold = this.writeBold.bind(this)
    this.writeItalic = this.writeItalic.bind(this)

    if (opts.autoStart !== false) {
      this.start()
    }
  }

  _txtMarker (label, marker) {
    marker = marker || ''
    const availableSpace = this.width - wcstring(marker).size()
    const wText = wcstring(label)

    let line
    if (availableSpace < wText.size()) {
      line = wText.truncate(availableSpace, this.truncate)
    } else {
      line = label + repeat(' ', availableSpace - wText.size())
    }
    return line + marker
  }

  get entryCount () {
    return this.entries.length
  }

  addItem (item) {
    this.add(item) // legacy
  }

  add (label, marker, handler) {
    let item
    if (typeof label === 'string') {
      item = { label: label }
    } else {
      item = label
    }
    if (typeof marker === 'function') {
      item.handler = marker
    } else {
      item.marker = item.marker || marker
      item.handler = item.handler || handler
    }
    if (!item.line) {
      item.line = this._txtMarker(item.label, item.marker)
    }
    super.add(item)
  }

  writeLine (label, marker) {
    this.write(this._txtMarker(label, marker) + '\n')
  }

  writeSeparator () {
    this.write(repeat(this.separator, this.width) + '\n')
  }

  writeBold (label, marker) {
    this.writeLine(ansi.bold.open + this._txtMarker(label, marker) + ansi.bold.close)
  }

  writeItalic (label, marker) {
    this.writeLine(ansi.italic.open + this._txtMarker(label, marker) + ansi.italic.close)
  }

  writeTitle (title, marker) {
    this.writeBold(title, marker)
  }

  writeSubtitle (subtitle, marker) {
    this.writeItalic(subtitle, marker)
  }

  close () {
    this.reset()
    this.y = 0
    this.charm.erase('screen')
    super.close()
  }

  confirmSelection () {
    this._output.once('end', () => {
      super.confirmSelection()
    })
    this.close()
  }

  start (p) {
    if (p === undefined) {
      p = process
    }
    this.reset()
    const pass = data => menuStream.write(data)
    const menuStream = this.createStream()
    menuStream.pipe(p.stdout, { end: false })
    this._output.once('end', () => {
      p.stdin.pause()
      menuStream.unpipe(p.stdout)
      p.stdin.setRawMode(false)
      p.stdin.removeListener('data', pass)
    })
    p.stdin.on('data', pass)
    p.stdin.setRawMode(true)
    p.stdin.resume()
  }
}
