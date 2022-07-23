import Header from "@editorjs/header";
import { type DataProp } from "editorjs-blocks-react-renderer";
import React, { useState } from "react";
import { createReactEditorJS } from "react-editor-js";
import { ClientOnly } from "remix-utils";
// @ts-ignore
import ImageTool from "@editorjs/image";

function buttonClasses(disabled: boolean) {
  const baseClasses =
    "inline-flex items-center rounded-xl border border-transparent px-3 py-1 text-sm font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2";
  const additionalClasses = disabled
    ? "disabled bg-indigo-300 focus:ring-indigo-300"
    : "bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500";
  return `${baseClasses}  ${additionalClasses}`;
}

interface PostEditProps {
  handleSubmit: (x: DataProp) => void;
  buttonText?: string;
  placeholder?: string;
}
const PostEdit = ({
  handleSubmit,
  placeholder = "Type here",
}: PostEditProps) => {
  // @ts-ignore
  const [disabled] = useState(false);

  const ReactEditorJS = createReactEditorJS();
  const editorCore = React.useRef(null);

  const handleInitialize = React.useCallback((instance) => {
    editorCore.current = instance;
  }, []);

  const handleSave = React.useCallback(async () => {
    // @ts-ignore
    const savedData = await editorCore.current.save();
    handleSubmit(savedData);
    // @ts-ignore
    editorCore.current.clear();
  }, [handleSubmit]);

  return (
    <div className="border bg-white p-4 pt-6 sm:rounded-lg">
      <ClientOnly fallback={<p>Loading...</p>}>
        {() => (
          <div>
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
                      // byUrl: "/api/upload", // Your endpoint that provides uploading by Url
                    },
                    // additionalRequestHeaders: {
                    //   Authorization:
                    //     "Bearer public_kW15at381Uc1mXEPk4uK1nsfD1bx",
                    //   "Content-Type": "image/png",
                    // },
                  },
                },
              }}
            />
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
