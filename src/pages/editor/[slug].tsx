import { useRouter } from "next/router";
import Editor from "@monaco-editor/react";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { Post } from "@/types";
import axios from "axios";

import localFont from "next/font/local";

const myFont = localFont({
  src: "../../assets/fonts/CalSans-SemiBold.woff2",
});

export default function EditorPage() {
  const router = useRouter();
  const editorRef = useRef<any>(null);
  const [htmlPreview, setHtmlPreview] = useState<any>("");
  const [saveTimeout, setSaveTimeout] = useState<any>(null);

  const [isSaving, setIsSaving] = useState(false);

  function handleEditorDidMount(editor: any, monaco: any) {
    editorRef.current = editor;
  }

  const mutation = useMutation({
    mutationFn: (post: Partial<Post>) => {
      return axios.post("/api/editor", post);
    },
  });

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
    }, 1500);

    setSaveTimeout(newTimeout);
  };

  const handleSubmit = async () => {
    mutation.mutate({
      filename: String(router.query.slug),
      body: htmlPreview,
    });
  };

  return (
    <>
      <div className="p-4 flex">
        <button
          onClick={handleSubmit}
          className={`flex justify-center items-center px-6 py-3 bg-neutral-950 rounded-2xl overflow-hidden  shadow-[2px_2px_0px_1px_#353333] border active:scale-95 transition-all duration-150 uppercase  ${myFont.className}`}
        >
          Submit
        </button>
        {isSaving && (
          <p className="ml-auto  px-6 py-3 flex justify-center items-center  bg-neutral-700 rounded-2xl overflow-hidden">
            <svg
              className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Saving...
          </p>
        )}
      </div>
      <div className=" mx-auto p-4  flex justify-center">
        <Editor
          height="84vh"
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
