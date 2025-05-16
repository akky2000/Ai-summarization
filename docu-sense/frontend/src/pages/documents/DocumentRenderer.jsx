// components/DocumentRenderer.jsx
import React from "react";
import { PdfDocument } from "./PdfDocument";
import { DocxDocument } from "./DocxDocumnet";


const subtypeMap = {
  pdf:  PdfDocument,
  doc:  DocxDocument,
  docx: DocxDocument,
//   ppt:  DefaultDocument,
//   pptx: DefaultDocument,
//   txt:  DefaultDocument,
};

export function DocumentRenderer({ doc, onDelete }) {
  const subtype = doc.fileType.split("/")[1].toLowerCase();
  const Component = subtypeMap[subtype] 
  return <Component doc={doc} onDelete={onDelete} />;
}
