// flowbit.config.ts
export const flows = [
  {
    id: "email_processor",
    name: "Email Processor",
    category: "Unassigned",
    engine: "Langflow",
    flowFile: "flows/email.json",
  },
  {
    id: "pdf_processor",
    name: "PDF Processor",
    category: "Data Processing",
    engine: "Langflow",
    flowFile: "flows/pdf.json",
  },
  {
    id: "json_parser",
    name: "JSON Parser",
    category: "Data Processing",
    engine: "Langflow",
    flowFile: "flows/json_parser.json",
  },
  {
    id: "text_classifier",
    name: "Text Classifier",
    category: "Marketing Automation",
    engine: "Langflow",
    flowFile: "flows/classifier.json",
  },
];
