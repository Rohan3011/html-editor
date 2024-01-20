import { useRouter } from "next/router";
import Editor from "@monaco-editor/react";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";

export default function EditorPage() {
  const router = useRouter();
  const editorRef = useRef<any>(null);
  const [htmlPreview, setHtmlPreview] = useState<any>("");
  const [saveTimeout, setSaveTimeout] = useState<any>(null);

  const [isSaving, setIsSaving] = useState(false);

  function handleEditorDidMount(editor, monaco) {
    editorRef.current = editor;
  }

  const handleAutoSave = () => {
    setIsSaving(true);

    // Clear the previous timeout (if any)
    if (saveTimeout) {
      clearTimeout(saveTimeout);
    }

    // Set a new timeout to save the input after 3 seconds (adjust as needed)
    const newTimeout = setTimeout(() => {
      setHtmlPreview(editorRef.current.getValue());
      setIsSaving(false);
    }, 3000);

    setSaveTimeout(newTimeout);
  };

  const handleSubmit = async () => {
    const resp = await fetch("/api/editor", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fileName: router.query.slug,
        body: htmlPreview,
      }),
    });
    const data = await resp.json();
    console.log(data);
  };

  return (
    <>
      <p className="">
        Post: {router.query.slug}
        {isSaving && <p>Saving...</p>}
        <Button onClick={handleSubmit}>Submit</Button>
      </p>
      <div className=" mx-auto p-4  flex justify-center">
        <Editor
          height="90vh"
          width={"720px"}
          defaultLanguage="html"
          defaultValue="// some comment"
          theme="vs-dark"
          onMount={handleEditorDidMount}
          onChange={handleAutoSave}
        />
        <div className="flex-1 border max-h-[90vh] overflow-y-auto bg-white ">
          <iframe
            srcDoc={htmlPreview}
            title="programiz pro website"
            height="100%"
            width="100%"
          ></iframe>
        </div>
      </div>
    </>
  );
}
