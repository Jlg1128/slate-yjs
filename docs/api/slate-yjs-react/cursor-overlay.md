# useRemoteCursorOverlayPositions

`useRemoteCursorOverlayPositions` provides a simple way to implement an editor overlay displaying remote cursors. Displaying remote cursors using overlays has a few tradeoffs to keep in mind:

Pros:

- Since cursors overlays aren't part of the by slate rendered content, they don't change the underlying dom structure causing e.g. different line breaks when a remote user changes his selection.
- They don't mess with autocorrect
- Animating them is easier
- They potentially provide better performance since they don't requite re-rendering of parts of the editor content on remote cursor change

Cons:

- They are not part of the actual editor content which makes them harder to keep in sync leading to them visually lagging behind in some scenarios on slower devices.
- It's harder to customize node rendering/behavior based on remote selection since changes of them don't cause node re-renders.

<br/>

**`useRemoteCursorOverlayPositions`** takes an optional options parameter with the following options:

**`containerRef`**

If set, all returned positions will be relative to the containers position.

**`refreshOnResize`**

Set whether the cursors overlay positions should be automatically refreshed on container (provided via containerRef) resize. Defaults to `true`.

<br/>

and returns and object containing:

**`refresh(sync?: boolean): void`**

Used to refresh the cursor overlay positions. If sync != true, calls to refresh will be batched into one until the next animation frame.

**`cursors: CursorOverlayState<TCursorData>[]`**

The cursor overlay states that need to be painted.

<br/>

`useRemoteCursorOverlayPositions` should be used inside the context of a [CursorEditor](../slate-yjs-core/cursor-plugin.md):
