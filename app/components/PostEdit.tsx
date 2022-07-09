import { useMemo, useState } from "react";
import { createEditor, type Descendant } from "slate";
import { withHistory } from "slate-history";
import { Editable, Slate, withReact } from "slate-react";
import { serialize, validatePostContent } from "~/utils/strings";

function buttonClasses(disabled: boolean) {
  const baseClasses =
    "inline-flex items-center rounded-md border border-transparent px-3 py-1 text-sm font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2";
  const additionalClasses = disabled
    ? "disabled bg-indigo-300 focus:ring-indigo-300"
    : "bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500";
  return `${baseClasses}  ${additionalClasses}`;
}

const PostEdit = ({ handleChange, handleSubmit }: any) => {
  // @ts-ignore
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);
  const [disabled, setDisabled] = useState(true);

  function handleLocalChange(markdown: Descendant[]) {
    const serialised = serialize(markdown);
    setDisabled(!validatePostContent(serialised));
    handleChange(serialised);
  }

  function handleLocalSubmit() {
    handleSubmit();
    editor.children = initialValue;
    editor.onChange();
  }

  return (
    <div>
      <div>
        <Slate
          editor={editor}
          value={initialValue}
          onChange={(x) => handleLocalChange(x)}
        >
          <Editable placeholder="Chime in..." className="text-md h-10" />
        </Slate>
      </div>
      <div className="mt-4 flex justify-end">
        <button
          onClick={handleLocalSubmit}
          disabled={disabled}
          className={buttonClasses(disabled)}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

const initialValue: Descendant[] = [
  {
    children: [{ text: "" }],
  },
];

export default PostEdit;
