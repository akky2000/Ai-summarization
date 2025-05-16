// components/docs/PdfDocument.jsx
import React from "react";
import { Card } from "../../components/ui/card";


export function PdfDocument({ doc, onDelete }) {
    return (
      <Card className="flex flex-col">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-lg font-semibold">{doc.title}</h3>
          <button onClick={() => onDelete(doc._id)} className="text-red-500">
            Delete
          </button>
        </div>
        <embed
          src={doc.document}
          type="application/pdf"
          className="w-full flex-1 rounded-lg border"
          height="200"
        />
        <footer className="mt-4 text-sm text-gray-500 flex justify-between">
          <span>{new Date(doc.createdAt).toLocaleDateString()}</span>
          <a
            href={doc.document}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            Download
          </a>
        </footer>
      </Card>
    );
  }
  