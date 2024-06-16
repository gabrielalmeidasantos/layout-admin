// src/components/DraggableBlock.js
import React, { useState } from "react";
import { Background } from "reactflow";

const DraggableBlock = ({ block, index, onChange }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(block.content);

  const handleEdit = () => {
    if (block.type === "message") {
      setIsEditing(true);
    }
  };

  const handleSave = () => {
    setIsEditing(false);
    onChange(index, text);
  };

  const styleBtn = {
    color: "#fff",
    padding: "10px",
    backgroundColor: "#000",
    borderRadius: "10px",
  };

  return (
    <div
      style={{
        padding: "8px",
        border: "1px solid gray",
        marginBottom: "4px",
        borderRadius: "4px",
      }}
      onDoubleClick={handleEdit}
    >
      {isEditing ? (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            height: "fit-content",
          }}
        >
          <textarea
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button
            style={styleBtn}
            onClick={handleSave}
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Save
          </button>
        </div>
      ) : (
        <div>
          {text} {block.type !== "message" && ""}
        </div>
      )}
    </div>
  );
};

export default DraggableBlock;
