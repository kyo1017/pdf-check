import React, { useState } from 'react';
import './App.css';

function App() {

  const [file, setFile] = useState(null);

  const handleChange = (e) => {
    setFile(e.target.files[0])
  }

  const upload = async() => {
    const data = new FormData();
    data.append('upload_file', file);
    const res = await fetch('http://localhost:5000/check', {
      method: 'post',
      body: data,
    });
    console.log(res);
  }

  return (
    <div className="App">
      <input type="file" onChange={handleChange} />
      {
        file ? <button onClick={upload}>Check</button> : null
      }

    </div>
  );
}

export default App;
