import { useState } from "react";
import { isEmptyString } from "~/utils/strings";

function buttonClasses(disabled: boolean) {
  const baseClasses =
    "inline-flex items-center rounded-xl border border-transparent px-3 py-1 text-sm font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2";
  const additionalClasses = disabled
    ? "disabled bg-indigo-300 focus:ring-indigo-300"
    : "bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500";
  return `${baseClasses}  ${additionalClasses}`;
}

interface CommentFormProps {
  handleSubmit: (x: string) => void;
}

const CommentForm = ({ handleSubmit }: CommentFormProps) => {
  const [disabled, setDisabled] = useState(true);
  const [content, setContent] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const valid = !isEmptyString(e.target.value);
    setContent(e.target.value);
    setDisabled(!valid);
  };

  const handleLocalSubmit = () => {
    handleSubmit(content);
    setContent("");
  };

  return (
    <div className="border bg-white p-4 pt-6 sm:rounded-lg">
      <textarea
        rows={2}
        name="comment"
        id="comment"
        className="block h-fit w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        placeholder="Add your comment..."
        onChange={(x) => handleChange(x)}
        value={content}
      />

      <div className="mt-4 flex justify-end">
        <button
          disabled={disabled}
          className={buttonClasses(disabled)}
          onClick={handleLocalSubmit}
        >
          Comment
        </button>
      </div>
    </div>
  );
};

export default CommentForm;
