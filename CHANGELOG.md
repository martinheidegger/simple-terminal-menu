## Version 2

- **Breaking Change:** Colors used to only support terminal named colors (i.e. black), now any color can be defined as ansi256 colors (extended-terminal-menu@3)
- **Breaking Change:** License changed from ISC to MIT - compatible
- **Breaking Change:** Now `createMenu` is not a function anymore, you need to instantiate the class `SimpleTerminalMenu` returned by the package.(extended-terminal-menu@3)
- **Breaking Change:** The event handlers of the items and on `.select` now have the same signature `(this: IItem, label: string, index: number, item: IItem): any`
- **Breaking Change:** (very edge cases) handlers for items are now executed properly on the item's scope.
- feat: `.add` and `.addItem` now have the same signature
- feat: `.writeItalic`, `.writeBold` added to write methods
- feat: factory now accepts `before` and `after` hooks that allow for 
- fix: the event handlers now have the correct scope and receive the item each handler is looking for
- fix: the label passed to the event handlers now really is the entry's label and not a fixed version of it.
- _Internal Change:_ Code is now linted using standardjs