"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import { Editor } from "@tiptap/core";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
export function TextEditor({
  content,
  setContent,
}: {
  content: string;
  setContent: (value: string) => void;
}) {
  const editor = useEditor({
    extensions: [StarterKit, Underline],
    content,
    onUpdate: ({ editor }) => {
      setContent(editor.getHTML());
    },
  });

  useEffect(() => {
    if (editor && editor.getHTML() !== content) {
      editor.commands.setContent(content);
    }
  }, [content, editor]);

  if (!editor) return null;

  const isActive = (name: string, attrs: any = {}) =>
    editor.isActive(name, attrs);

  const applyCommand = (command: () => Editor) => () => command();

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-2 border border-gray-300 rounded-md px-2 py-1 bg-white">
        <Button
          variant={isActive("bold") ? "default" : "outline"}
          onClick={() => editor.chain().focus().toggleBold().run()}
        >
          Bold
        </Button>
        <Button
          variant={isActive("italic") ? "default" : "outline"}
          onClick={() => editor.chain().focus().toggleItalic().run()}
        >
          Italic
        </Button>
        <Button
          variant={isActive("underline") ? "default" : "outline"}
          onClick={() => editor.chain().focus().toggleUnderline().run()}
        >
          Underline
        </Button>
        <select
          className="border rounded px-2 py-1 text-sm"
          value={
            isActive("heading", { level: 1 })
              ? "h1"
              : isActive("heading", { level: 2 })
              ? "h2"
              : isActive("heading", { level: 3 })
              ? "h3"
              : "paragraph"
          }
          onChange={(e: any) => {
            const level = e.target.value;
            editor.chain().focus();
            if (level === "paragraph") {
              editor.chain().focus().setParagraph().run();
            } else {
              editor
                .chain()
                .focus()
                .toggleHeading({ level: Number(level[1]) as 1 | 2 | 3 })
                .run();
            }
          }}
        >
          <option value="paragraph">Paragraph</option>
          <option value="h1">Heading 1</option>
          <option value="h2">Heading 2</option>
          <option value="h3">Heading 3</option>
        </select>

        <Button
          variant={isActive("blockquote") ? "default" : "outline"}
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
        >
          Quote
        </Button>
        <Button
          variant={isActive("codeBlock") ? "default" : "outline"}
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        >
          Code
        </Button>
        <Button
          onClick={() => editor.chain().focus().undo().run()}
          variant="outline"
        >
          Undo
        </Button>
        <Button
          onClick={() => editor.chain().focus().redo().run()}
          variant="outline"
        >
          Redo
        </Button>
        <Button
          onClick={() =>
            editor.chain().focus().clearNodes().unsetAllMarks().run()
          }
          variant="destructive"
        >
          Clear
        </Button>
      </div>

      <div className="min-h-[150px] editor border border-gray-300 rounded-md p-3 bg-white">
        <EditorContent editor={editor} sizes="100%" rows={7} />
      </div>
    </div>
  );
}
