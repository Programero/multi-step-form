import "./App.css";
import React, { useCallback } from "react";
import Form from "./Form";

export default function App() {
  const handleFormDataSubmission = useCallback((formData) => {
    //use axios to post it
    console.log(formData);
  });
  return (
    <div className="App">
      <h1>MultiStep Form</h1>
      <Form handleFormDataSubmission={handleFormDataSubmission} />
    </div>
  );
}
