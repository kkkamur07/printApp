import React, { useState } from 'react';
import axios from 'axios';

const UploadForm = () => {
  const [name, setName] = useState('');
  const [file, setFile] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('file', file);
    axios.post('/upload', formData)
      .then(response => {
        console.log(response.data); // Debug statement
        setSuccessMessage(`File uploaded and saved as ${name}_${file.name}`);
      })
      .catch(error => {
        console.log(error); // Debug statement
        setSuccessMessage('File upload failed');
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </label>
      <label>
        Upload Document:
        <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      </label>
      <button type="submit">Submit</button>
      {successMessage && <p>{successMessage}</p>}
    </form>
  );
};

export default UploadForm;
