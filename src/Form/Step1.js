import React from "react";
import ImageUpload from "../ImageUpload";

export default function Step1({ formData }) {
  function handleImageUpload(url) {
    //console.log("Image URL: ", url);
    formData.set("ProfilePic", url);
  }
  return (
    <div>
      <label htmlFor="name">
        Name:{" "}
        <input
          id="name"
          name="name"
          type="text"
          onInput={(e) => {
            formData.set(e.target.name, e.target.value);
          }}
        />
      </label>
      <br />
      <label htmlFor="email">
        Email:{" "}
        <input
          id="email"
          name="email"
          type="email"
          onInput={(e) => {
            formData.set(e.target.name, e.target.value);
          }}
        />
      </label>

      <br />
      <ImageUpload handleImageUpload={handleImageUpload} />
    </div>
  );
}
