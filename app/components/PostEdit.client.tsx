import Header from "@editorjs/header";
import { type DataProp } from "editorjs-blocks-react-renderer";
import React, { useState } from "react";
import { createReactEditorJS } from "react-editor-js";
import { ClientOnly } from "remix-utils";
// @ts-ignore
import ImageTool from "@editorjs/image";
import { isEmptyString } from "~/utils/strings";

function buttonClasses(disabled: boolean) {
  const baseClasses =
    "inline-flex items-center rounded-xl border border-transparent px-3 py-1 text-sm font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2";
  const additionalClasses = disabled
    ? "disabled bg-indigo-300 focus:ring-indigo-300"
    : "bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500";
  return `${baseClasses}  ${additionalClasses}`;
}

interface PostEditProps {
  handleSubmit: (title: string, body: DataProp) => void;
  buttonText?: string;
  placeholder?: string;
}
const PostEdit = ({
  handleSubmit,
  placeholder = "Type here",
}: PostEditProps) => {
  // @ts-ignore
  const [title, setTitle] = useState("");
  const [disabled, setDisabled] = useState(isEmptyString(title));

  const ReactEditorJS = createReactEditorJS();
  const editorCore = React.useRef(null);

  const handleInitialize = React.useCallback((instance: any) => {
    editorCore.current = instance;
  }, []);

  const handleTitleChange = (val: string) => {
    setTitle(val);
    setDisabled(isEmptyString(val));
  };

  // const handleSave = React.useCallback(async () => {
  //   // @ts-ignore
  //   const savedData = await editorCore.current.save();
  //   console.log("TITLE", title);
  //   // handleSubmit(title, savedData);
  //   // // @ts-ignore
  //   // editorCore.current.clear();
  // }, [handleSubmit]);

  const handleSave = async () => {
    // @ts-ignore
    const savedData = await editorCore.current.save();
    handleSubmit(title, savedData);
    // @ts-ignore
    editorCore.current.clear();
  };

  return (
    <div className="border bg-white p-4 pt-6 sm:rounded-lg">
      <ClientOnly fallback={<p>Loading...</p>}>
        {() => (
          <div className="w-full">
            <div className="mx-0 sm:mx-[124px]">
              <input
                className="ring-none w-full border-none bg-white py-4 px-0 text-xl font-bold leading-tight text-gray-700  focus:ring-transparent"
                placeholder="Title"
                type="text"
                onChange={(x) => handleTitleChange(x.target.value)}
              />
            </div>
            <div className="w-full">
              <ReactEditorJS
                placeholder={placeholder}
                onInitialize={handleInitialize}
                tools={{
                  header: {
                    // @ts-ignore
                    class: Header,
                    config: {
                      placeholder: "Header",
                      levels: [1],
                      defaultLevel: 1,
                    },
                  },
                  image: {
                    class: ImageTool,
                    config: {
                      endpoints: {
                        byFile: "/api/upload", // Your backend file uploader endpoint
                      },
                    },
                  },
                }}
              />
            </div>
          </div>
        )}
      </ClientOnly>

      <div className="mt-4 flex justify-end">
        <button
          onClick={handleSave}
          disabled={disabled}
          className={buttonClasses(disabled)}
        >
          Publish
        </button>
      </div>
    </div>
  );
};

export default PostEdit;
