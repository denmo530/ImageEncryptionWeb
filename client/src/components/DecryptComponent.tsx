// DecryptComponent.jsx

import React, { useState } from "react";
import axios from "axios";

function DecryptComponent() {
  const [file, setFile] = useState(null);
  const [key, setKey] = useState("");
  const [decryptedImage, setDecryptedImage] = useState<string | null>(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setDecryptedImage(null);
  };

  const handleKeyChange = (e) => {
    setKey(e.target.value);
  };

  const handleDecrypt = async () => {
    if (file && key) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("key", key);

      try {
        const response = await axios.post(
          "http://127.0.0.1:5000/decryption",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
            responseType: "blob",
          }
        );

        // Create a blob URL for the decrypted image
        const blob = new Blob([response.data], { type: "image/jpg" });
        const url = URL.createObjectURL(blob);

        // Set the decrypted image URL received from the server
        setDecryptedImage(url);
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div>
      <h2>Decryption</h2>
      <input type="file" onChange={handleFileChange} />
      <input
        type="text"
        placeholder="Decryption Key"
        onChange={handleKeyChange}
      />
      <button onClick={handleDecrypt}>Decrypt</button>
      {decryptedImage && <img src={decryptedImage} alt="Decrypted Image" />}
    </div>
  );
}

export default DecryptComponent;
