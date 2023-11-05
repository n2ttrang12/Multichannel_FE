import React from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const HTMLEditor = ({ id, onChange, onBlur, data, isInvalid }) => {
  return (
    <div>
      <CKEditor
        id={id}
        config={{
          toolbar: {
            items: [
              "undo",
              "redo",
              "|",
              "heading",
              "|",
              "fontfamily",
              "fontsize",
              "fontColor",
              "fontBackgroundColor",
              "|",
              "bold",
              "italic",
              "code",
              "strikethrough",
              "underline",
              "|",
              "alignment",
              "link",
              "blockQuote",
              "codeBlock",
              "|",
              "insertTable",
              "|",
              "bulletedList",
              "numberedList",
              "todoList",
              "outdent",
              "indent",
            ],
            shouldNotGroupWhenFull: true,
          },
        }}
        editor={ClassicEditor}
        data={data}
        onReady={(editor) => {
          // You can store the "editor" and use when it is needed.
          // console.log("Editor is ready to use!", editor);
        }}
        onChange={(event, editor) => {
          const data = editor.getData();
          // console.log("data", data);
          onChange(data);
        }}
        onBlur={(event, editor) => {
          //console.log("Blur.", editor);
          onBlur();
        }}
        onFocus={(event, editor) => {
          //console.log("Focus.", editor);
        }}
      />
    </div>
  );
};

export default HTMLEditor;
