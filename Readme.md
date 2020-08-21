# simple-terminal-menu

[`terminal-menu`](https://github.com/substack/terminal-menu) does a good job for starting a menu but it is a bit tedious to set-up reliably for process.stdin / process.stdout and also for the use with double width characters.

For simply taking charge of the power this terminal menu offers a few things:

## Automatically connects to process.stdin/stdout
You don't have to do that, it will just work :)

You can manually trigger start if you like using the `.autoStart: false` option and start it by hand:

```javascript
const menu = new TerminalMenu({
  autoStart: false
})
// Then start it manually
menu.start(process) // Optionally you can pass in a custom process here for testing.
```

## Markers
`.add` gets an new signature

```JavaScript
const label = 'hello' // will be aligned left
const marker = '(tm)' // (optional) will be aligned right
const handler = (label, marker) => {
  // (optional) will be called in case the item is chosen
}
menu.add(label, marker, handler)
```

With this you can add entries that have a right-aligned marker text shown.

## Menu Items
You can also use `.addItem` to use objects to add menu items.

```JavaScript
menu.addItem({
  label: 'hello', // will be aligned left
  marker: '(tm)', // (optional) will be aligned right
  handler: (label, index, item) => {
    // (optional) will be called in case the item is chosen
  }
})
```

## Separators
Just use ```.writeSeparator()``` to create a separator line.

## Automatic truncating of entries
If an entry exceeds the width of the menu it will be truncated with `opts.truncator` or `...`

## Writing of text
Similar like `.add` it supports `.writeLine` that allows you to write a text that is both left & right aligned.

```JavaScript
.writeLine(<left>[, <right>])
```

## tty Tests
If the terminal doesn't support TTY `new TerminalMenu` will just `null`!

```js
const TerminalMenu = require('simple-terminal-menu')
const menu = new TerminalMenu()
if (menu === null) {
  console.log('interactive menu not supported')
  process.exit(1)
}
```

## Comfort functions
To write a nice title and subtitle the comfort functions `.writeTitle` and `.writeSubtitle` exist.

## Factory
If you have several menus that need to look alike, you can use the factory. It is available via `require('simple-terminal-menu/factory')`.


# Installation & Usage
Install it using npm

```
npm install simple-terminal-menu --save
```

And then create a menu it in your code using

```JavaScript
const TerminalMenu = require('../simple-terminal-menu')

function showSelection(label, index, item) {
  console.log("label: " + label + "; marker: " + item.marker + ";")
}

function mainMenu() {
  const menu = new TerminalMenu({ // settings passed through to terminal-menu
    width: 80,   // menu width in columns
    x: 1,        // top-left corner x offset, default: 1
    y: 1,        // top-left corner y offset, default: 1
    fg: 'white', // foreground color, default: 'white'
    bg: 'blue',  // background color, default: 'blue'
    padding: {
      left: 0    // left padding in columns
      right: 0   // right padding in columns
      top: 0     // top padding in rows
      bottom: 0  // bottom padding in rows
    },
    selected: 0  // set the selected element by its index
  })

  if (menu === null) {
    // In case the terminal is not interactive the result is null
    console.log('terminal is not interactive')
    return
  }
  menu.writeLine("My Menu", "(tm)")
  menu.writeSeparator()
  menu.add("A", "[selected]", showSelection)
  menu.add("B", showSelection)
  menu.writeSeparator()
  menu.add("open submenu", subMenu)
  menu.add("exit", menu.close)
}

function subMenu() {
  const menu = new TerminalMenu()
  menu.writeLine("SubMenu")
  menu.writeSeparator()
  menu.add("C", "[selected]", showSelection)
  menu.add("D", showSelection)
  menu.writeSeparator()
  menu.add("cancel", mainMenu)
  menu.add("niceTitle", nicelyTitledMenu)
  menu.add("exit", menu.close)
}

function nicelyTitledMenu() {
  const menu = new TerminalMenu();
  menu.writeTitle("Awesome window")
  menu.writeSubtitle("A little more colorful")
  menu.writeSeparator()
  menu.add("cancel", subMenu)
  menu.add("factoryA", factoryMenuA)
  menu.add("exit", menu.close)
}


// Options for the menu when created through the factory
var factoryMenuOptions = {} // Can be empty! the factory uses some sensible defaults!

// Defaults for creating menu with the factory
var defaultFactoryOptions = {
  title: "Factory Title",
  // you could also specify `subtitle:`, menu & extras are not available.
}
var factory = require('simple-terminal-menu/factory')(factoryMenuOptions, defaultFactoryOptions);

function factoryMenuA() {
  factory.create({
    subtitle: "factory-a",
    before: (menu) => {
      // Do anything you like before menu/extras are added
    }
    menu: [{
      label: "E",
      handler: showSelection
    }, {
      label: "F",
      handler: showSelection
    }],
    extras: [{
        label: "factoryB",
        handler: factoryMenuB
      },{
        label: "cancel",
        handler: nicelyTitledMenu
      }],
    after: (menu) => {
      // Do anything you like after menu/extras are added
    }
  })
}

function factoryMenuB() {
  factory.create({
    subtitle: "factory-b",
    menu: [{
        label: "G",
        handler: showSelection
      }],
    extras: [{
        label: "factoryA",
        handler: factoryMenuA
      },{
        label: "cancel",
        handler: nicelyTitledMenu
      }]
  });
}


mainMenu()
```

## License

[MIT](./LICENSE)
