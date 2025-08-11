import { useRef, useState } from "react";
import ReactMarkdown from "react-markdown";

export const CommentBox = () => {
  const textareaRef = useRef(null);
  const [content, setContent] = useState("");

  const applyBold = () => {
    const textarea = textareaRef.current;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value;

    const selected = text.slice(start, end);
    const boldText = `**${selected}**`;
    const updatedText = text.slice(0, start) + boldText + text.slice(end);

    setContent(updatedText);

    // Restore cursor position
    setTimeout(() => {
      textarea.setSelectionRange(start + 2, end + 2);
      textarea.focus();
    }, 0);
  };

  const handleChange = (e) => {
    setContent(e.target.value);
  };

  return (
    <div style={{ width: "500px" }}>
      <button
        onClick={applyBold}
        style={{
          marginBottom: "8px",
          padding: "6px 12px",
          fontWeight: "bold",
          cursor: "pointer",
        }}
      >
        B
      </button>

      <textarea
        ref={textareaRef}
        value={content}
        onChange={handleChange}
        placeholder="Write your comment..."
        style={{
          width: "100%",
          height: "150px",
          padding: "12px",
          fontSize: "16px",
          borderRadius: "8px",
          border: "1px solid #ccc",
          resize: "vertical",
        }}
      />

      <h4>Preview:</h4>
      <div
        style={{
          padding: "12px",
          border: "1px solid #ccc",
          borderRadius: "6px",
          backgroundColor: "#000000ff",
          color:"black"
        }}
      >
        <ReactMarkdown>{content}</ReactMarkdown>
      </div>
    </div>
  );
};
