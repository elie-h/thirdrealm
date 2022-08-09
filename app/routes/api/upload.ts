import { type ActionFunction } from "@remix-run/server-runtime";
import invariant from "tiny-invariant";

export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData();
  const file = form.get("image");
  invariant(file, "File is required");
  const uploadRes = await fetch("https://api.upload.io/v1/files/basic", {
    method: "POST",
    body: file,
    headers: {
      Authorization: `Bearer ${process.env.UPLOAD_IO_API_KEY}`,
      // @ts-ignore
      "X-Upload-File-Name": file._name,
    },
  });

  const uploadData = await uploadRes.json();

  return {
    success: 1,
    file: {
      url: uploadData.fileUrl,
      // ... and any additional fields you want to store, such as width, height, color, extension, etc
    },
  };
};
