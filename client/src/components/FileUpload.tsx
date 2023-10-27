import React, { useState, ChangeEvent } from "react";
import axios from "axios";

function FileUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [response, setResponse] = useState<any | null>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (file) {
      const formData = new FormData();
      formData.append("file", file);

      try {
        const res = await axios.post(
          "http://127.0.0.1:5000/encryption",
          formData
        );
        setResponse(res.data);
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      {response && (
        <div>
          <p>Year: {response.year}</p>
          <p>Message: {response.message}</p>
          <p>Name: {response.name}</p>
          <p>Key: {response.key}</p>
          <p>Image: {response.image}</p>
        </div>
      )}
    </div>
  );
}

export default FileUpload;
