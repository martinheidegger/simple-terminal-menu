const factory = require('../factory')
const SimpleTerminalMenu = require('../simple-terminal-menu')

process.stdin.pause()

function showSelection (label, marker) {
  console.log(`label: ${label}\nmarker: ${marker}\nscope: ${JSON.stringify(this, null, 2)}`)
}

function mainMenu () {
  const menu = new SimpleTerminalMenu({
    bg: 'teal',
    fg: 'bisque'
  })
  if (menu === null) {
    return true
  }
  menu.writeTitle('Example')
  menu.writeSubtitle('... for being clever')
  menu.writeLine('')
  menu.writeLine('Main Menu', 'tm')
  menu.writeSeparator()
  menu.add('A', '[selected]', showSelection)
  menu.addItem({ label: 'B', handler: showSelection, special: true })
  menu.writeSeparator()
  menu.add('open submenu x', subMenuX)
  menu.add('open submenu y', subMenuY)
  menu.add('exit', menu.close)
  return false
}

const { create } = factory({
  x: 5,
  y: 5,
  padding: 2,
  bg: 'red',
  fg: 'yellow'
}, {
  title: 'Example sub menu',
  subtitle: '... for being extra clever',
  before: menu => {
    menu.writeLine('')
  }
})

const subExtras = menu => [
  { label: 'return to main', handler: mainMenu },
  { label: 'exit', handler: menu.close }
]

function subMenuX () {
  create({
    before: menu => menu.writeLine('X'),
    menu: [
      { label: 'C', marker: '[selected]', handler: showSelection },
      { label: 'D', handler: showSelection }
    ],
    extras: subExtras
  })
}

function subMenuY () {
  const menu = create({
    before: menu => menu.writeLine('Y'),
    menu: [
      { label: 'E も問題なく動いている。' },
      { label: 'F is longer than you might think, a lot longer in fact, long enough to force trimming', marker: '[selected]' }
    ],
    extras: subExtras
  })
  menu.on('select', function (label, index, item) {
    if (index < 2) {
      showSelection.call(item, label, index, item)
    }
  })
}

if (mainMenu()) {
  console.log('Not an interactive terminal.')
  process.exit(1)
}
