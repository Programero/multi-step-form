import React from "react";

export default function Step2({ formData }) {
  return (
    <div>
      <label htmlFor="feedback">
        Feedback: <br />{" "}
        <textarea
          id="feedback"
          name="feedback"
          cols="40"
          rows="5"
          onInput={(e) => {
            formData.set(e.target.name, e.target.value);
          }}
        ></textarea>
      </label>
    </div>
  );
}
