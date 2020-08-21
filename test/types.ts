import { IOptions, IItem } from '../simple-terminal-menu'
import { ITitleData, IData } from '../factory'

const SimpleTerminalMenu = require('../simple-terminal-menu')
const sTMF = require('../factory')

let opts: IOptions
opts = {
  separator: 'hi'
}
opts = {
  truncate: 'ho'
}
opts = {
  bg: 'orange'
}
opts = {
  fg: 'aliceblue'
}
opts = {
  padding: 1
}
opts = {
  padding: {
    top: 2,
    left: 1,
    bottom: 3,
    right: 5
  }
}
opts = {
  x: 1
}
opts = {
  y: 2
}
opts = {
  width: 100
}
opts = {
  selected: 3
}
let menu: typeof SimpleTerminalMenu
menu = new SimpleTerminalMenu()
menu.close()
menu = new SimpleTerminalMenu(opts)
menu.add('label')
menu.add('label', 'marker')
menu.add('label', (label, marker) => { 
  let x: string = label
  let y: string = marker
})
menu.add('label', 'marker', (label, marker) => {
  let x: string = label
  x = marker
  x = this.label
  x = this.marker
  let y: Function = this.handler
})
menu.add('label', 'marker')
let item: IItem
item = {
  label: 'hello'
}
item = {
  label: 'hello',
  marker: 'hi'
}
item = {
  label: 'hello',
  handler: function (label, index, receivedItem) {
    let str: string = label
    item = receivedItem
    item = this
    let num: number = index
  }
}
menu.writeLine('hello')
menu.writeLine('hello', 'world')
menu.writeSeparator()
menu.close()
menu.reset()

let def: ITitleData
def = {
}
def = {
  title: 'hi'
}
def = {
  subtitle: 'ho'
}

const factory = sTMF(opts, def)
opts = factory.options

let data: IData
data = {
  menu: []
}
data = {
  menu: [
    { label: 'hi' }
  ]
}
data = {
  extras: []
}
data = {
  extras: [
    { label: 'ho' }
  ]
}
menu = factory.create(data)
menu.close()
