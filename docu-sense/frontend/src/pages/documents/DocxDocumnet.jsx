// components/docs/PdfDocument.jsx
import React from "react";
import { Card } from "../../components/ui/card";

// components/docs/DocxDocument.jsx


export function DocxDocument({ doc, onDelete }) {
  return (
    <Card className="flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">{doc.title}</h3>
        <button onClick={() => onDelete(doc._id)} className="text-red-500">
          Delete
        </button>
      </div>
      <p className="text-sm text-gray-600 mb-6">{doc.description}</p>
      <footer className="mt-auto text-sm text-gray-500 flex justify-between">
        <span>{new Date(doc.createdAt).toLocaleDateString()}</span>
        <a
          href={doc.document}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline"
        >
          Download .{doc.fileType.split("/")[1]}
        </a>
      </footer>
    </Card>
  );
}
