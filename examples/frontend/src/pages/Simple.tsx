import { HocuspocusProvider } from '@hocuspocus/provider';
import { slateNodesToInsertDelta, withYHistory, withYjs, YjsEditor } from '@slate-yjs/core';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { createEditor, Descendant, Transforms } from 'slate';
import { Slate, withReact } from 'slate-react';
import * as Y from 'yjs';
import { ConnectionToggle } from '../components/ConnectionToggle/ConnectionToggle';
import { CustomEditable } from '../components/CustomEditable/CustomEditable';
import { FormatToolbar } from '../components/FormatToolbar/FormatToolbar';
import { HOCUSPOCUS_ENDPOINT_URL } from '../config';
import initialValue from '../const';
import { withMarkdown } from '../plugins/withMarkdown';

const yDoc = new Y.Doc();

// @ts-ignore
window.yDoc = yDoc;
// @ts-ignore
window.Y = Y;
// @ts-ignore
window.slateNodesToInsertDelta = slateNodesToInsertDelta;
// @ts-ignore
window.Transforms = Transforms;
export function SimplePage() {
  const [value, setValue] = useState<Descendant[]>([]);
  const [connected, setConnected] = useState(false);

  const sharedType = useMemo(() => {
    // Load the initial value into the yjs document
    let actualSharedType = yDoc.get('content', Y.XmlText);
    // @ts-ignore
    actualSharedType.applyDelta(slateNodesToInsertDelta(initialValue));
    return actualSharedType as Y.XmlText;
  }, []);

  const editor = useMemo(() => withYjs(withReact(createEditor()), sharedType), []);

  useEffect(() => {
    YjsEditor.connect(editor);
    return () => YjsEditor.disconnect(editor);
  }, [editor]);

  useEffect(() => {
    // @ts-ignore
    window.editor = editor;
    // @ts-ignore
    window.sharedType = sharedType;
  }, []);

  return (
    <div className="flex justify-center my-32 mx-10">
      <Slate value={value} onChange={(value) => setValue([...value])} editor={editor}>
        <FormatToolbar />
        <CustomEditable className="max-w-4xl w-full flex-col break-words" />
      </Slate>
    </div>
  );
}
