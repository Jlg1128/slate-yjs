import { Descendant } from 'slate';

const initialValue: Descendant[] = [
  { "type": "heading-one", "children": [{ "text": "Lorem Ipsum" }] },
  {
    "type": "block-quote",
    "children": [
      {
        "text": "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit..."
      }
    ]
  }
]
;

export default initialValue;