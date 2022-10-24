import React, { useState, useRef } from "react";
import { InfinitySpin } from "react-loader-spinner";
// import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import axios from "axios";

export default function ImageUpload({ handleImageUpload }) {
  const [isUploading, setIsUploading] = useState(false);
  const imgURLRef = useRef("");

  function handleFileSelect(e) {
    setIsUploading(true);
    const formData = new FormData();
    formData.set(e.target.name, e.target.files[0]);
    axios
      .post("http://localhost:3004/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => {
        setIsUploading(false);
        console.log("Upload Successful, res: ", res);
        imgURLRef.current = res.data.url;
        handleImageUpload(res.data.url);
      })
      .catch((err) => {
        setIsUploading(false);
        console.log("error: ", err);
      });
  }
  return (
    <div>
      <label htmlFor="image">
        Image:
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleFileSelect}
        />
      </label>
      <br />
      {isUploading && <InfinitySpin width="200" color="#4fa94d" />}
      {imgURLRef.current && (
        <img
          style={{ width: "50%", borderRadius: "30px" }}
          src={imgURLRef.current}
        />
      )}
    </div>
  );
}
