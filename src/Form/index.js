import React, { useState, useRef, useEffect } from "react";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Success from "./Success";

function componentToRender(step, formData) {
  switch (step) {
    case 1:
      return <Step1 formData={formData} />;
    case 2:
      return <Step2 formData={formData} />;
    default:
      return <Success formData={formData} />;
  }
}

export default function Form({ handleFormDataSubmission }) {
  const stepsRef = useRef(2);
  const formDataRef = useRef(new FormData());
  const [currStep, setCurrStep] = useState(1);
  useEffect(() => {
    if (currStep > stepsRef.current) {
      for (let [name, value] of formDataRef.current) {
        console.log(`${name} = ${value}`); // key1 = value1, then key2 = value2
      }
    }
  }, [currStep, stepsRef, formDataRef, handleFormDataSubmission]);
  return (
    <>
      <h3>Form Parent Component</h3>
      {componentToRender(currStep, formDataRef.current)}
      {currStep <= stepsRef.current && (
        <button
          onClick={(e) => {
            setCurrStep((prev) => prev + 1);
          }}
        >
          Next
        </button>
      )}
    </>
  );
}
