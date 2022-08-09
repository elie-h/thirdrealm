import { Node } from "slate";

export const truncateString = (input: string | undefined, n: number) => {
  if (input == undefined) {
    return "";
  }
  return input.length > n ? `${input.substring(0, n)}...` : input;
};

export function isEmptyString(content: string) {
  if (
    content === null ||
    content.replace(/(\r\n|\n|\r)/gm, "").replace(/\s/g, "").length <= 0 ||
    content.length <= 0
  ) {
    return true;
  }
  return false;
}

// Define a serializing function that takes a value and returns a string.
export const serialize = (value: Node[]) => {
  return (
    value
      // Return the string content of each paragraph in the value's children.
      .map((n) => Node.string(n))
      // Join them all with line breaks denoting paragraphs.
      .join("\n")
      .trim()
  );
};

// Define a deserializing function that takes a string and returns a value.
export const deserialize = (string: string) => {
  // Return a value array of children derived by splitting the string.
  return string.split("\n").map((line) => {
    return {
      children: [{ text: line }],
    };
  });
};
