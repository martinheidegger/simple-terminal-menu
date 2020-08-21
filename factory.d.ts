import SimpleTerminalMenu, { IItem, IOptions } from './simple-terminal-menu'

declare namespace simpleTerminalMenuFactory {
  interface ITitleData {
    title?: string
    subtitle?: string
  }
  type IMenuItemFactory = (menu: SimpleTerminalMenu) => IItem[]
  interface IData extends ITitleData {
    menu?: IItem[] | IMenuItemFactory
    extras?: IItem[] | IMenuItemFactory
  }
  interface IFactory {
    options: IOptions
    create: (data: IData) => SimpleTerminalMenu
  }
}

declare function simpleTerminalMenuFactory (
  options?: IOptions,
  defaults?: simpleTerminalMenuFactory.ITitleData
): simpleTerminalMenuFactory.IFactory

export = simpleTerminalMenuFactory
