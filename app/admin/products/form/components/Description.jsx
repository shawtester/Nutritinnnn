"use client";

import { Editor } from "@tinymce/tinymce-react";
import { useState } from "react";

export default function Description({ data, handleData }) {
  const [content, setContent] = useState(data?.description || "");

  const handleEditorChange = (content) => {
    setContent(content);
    handleData("description", content); // Pass content back to parent
  };

  return (
    <section className="flex flex-col gap-3 bg-white border p-4 rounded-xl overflow-y-auto max-h-[500px]">
      <h1 className="font-semibold text-lg">Description</h1>

      <Editor
        apiKey="de1qnloldjo8ek8emia7kwdaerc863qyxbe98vvi2q62u49j" // Your TinyMCE API key
        value={content}
        init={{
          height: 300,
          menubar: false,
          plugins: [
            "advlist autolink lists link image charmap preview anchor",
            "searchreplace visualblocks code fullscreen",
            "insertdatetime media table paste code help wordcount",
          ],
          toolbar:
            "undo redo | formatselect | bold italic underline | forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image | code | help",
          content_style:
            "body { font-family: Arial, sans-serif; font-size: 14px; }",
          // Make sure TinyMCE loads the correct plugins
          external_plugins: {
            advlist: 'https://cdn.tiny.cloud/1/de1qnloldjo8ek8emia7kwdaerc863qyxbe98vvi2q62u49j/tinymce/7/plugins/advlist/plugin.min.js',
            autolink: 'https://cdn.tiny.cloud/1/de1qnloldjo8ek8emia7kwdaerc863qyxbe98vvi2q62u49j/tinymce/7/plugins/autolink/plugin.min.js',
            lists: 'https://cdn.tiny.cloud/1/de1qnloldjo8ek8emia7kwdaerc863qyxbe98vvi2q62u49j/tinymce/7/plugins/lists/plugin.min.js',
            link: 'https://cdn.tiny.cloud/1/de1qnloldjo8ek8emia7kwdaerc863qyxbe98vvi2q62u49j/tinymce/7/plugins/link/plugin.min.js',
            image: 'https://cdn.tiny.cloud/1/de1qnloldjo8ek8emia7kwdaerc863qyxbe98vvi2q62u49j/tinymce/7/plugins/image/plugin.min.js',
            charmap: 'https://cdn.tiny.cloud/1/de1qnloldjo8ek8emia7kwdaerc863qyxbe98vvi2q62u49j/tinymce/7/plugins/charmap/plugin.min.js',
            preview: 'https://cdn.tiny.cloud/1/de1qnloldjo8ek8emia7kwdaerc863qyxbe98vvi2q62u49j/tinymce/7/plugins/preview/plugin.min.js',
            anchor: 'https://cdn.tiny.cloud/1/de1qnloldjo8ek8emia7kwdaerc863qyxbe98vvi2q62u49j/tinymce/7/plugins/anchor/plugin.min.js',
          },
        }}
        onEditorChange={handleEditorChange}
      />
    </section>
  );
}
