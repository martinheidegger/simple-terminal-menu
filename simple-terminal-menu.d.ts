/// <reference types="node"/>

import TerminalMenu from 'extended-terminal-menu'

declare namespace SimpleTerminalMenu {
  interface IOptions extends TerminalMenu.IOptions {
    separator?: string
    truncate?: string
  }
  interface IMenuItem extends TerminalMenu.IMenuItem {}
  interface IItem extends TerminalMenu.IItem {
    marker?: string
  }
  interface IEntry <TItem extends IItem = IItem> extends TerminalMenu.IEntry<TItem> {}
  interface IPadding extends TerminalMenu.IPadding {}
  type IColor = TerminalMenu.IColor
  type ISelectHandler<TThis> = TerminalMenu.ISelectHandler<TThis>
  type ICloseHandler = TerminalMenu.ICloseHandler
}

declare class SimpleTerminalMenu <TItem extends SimpleTerminalMenu.IMenuItem = SimpleTerminalMenu.IMenuItem> extends TerminalMenu<TItem> {
  readonly entryCount: number
  separator: string
  truncate: string
  addItem (labelOrItem: string | TItem): void
  addItem (labelOrItem: string | TItem, handler: SimpleTerminalMenu.ISelectHandler<TItem>): void
  addItem (labelOrItem: string | TItem, marker: string, handler: SimpleTerminalMenu.ISelectHandler<TItem>): void
  add (labelOrItem: string | TItem): void
  add (labelOrItem: string | TItem, handler: SimpleTerminalMenu.ISelectHandler<TItem>): void
  add (labelOrItem: string | TItem, marker: string, handler: SimpleTerminalMenu.ISelectHandler<TItem>): void
  writeLine (text: string, marker?: string): void
  writeSeparator (): void
  writeTitle (title: string, marker?: string): void
  writeSubtitle (subtitle: string, marker?: string): void
  writeBold (text: string, marker?: string): void
  writeItalic (text: string, marker?: string): void
  start(p?: typeof process): void
}

export = SimpleTerminalMenu
