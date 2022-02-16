import React, { useState } from 'react';
import './App.css';

function App() {

  const [file, setFile] = useState(null);
  const [checkData, setCheckData] = useState(null);

  const handleChange = (e) => {
    setFile(e.target.files[0])
  }

  const upload = () => {
    const data = new FormData();
    data.append('upload_file', file);
    fetch('http://localhost:5000/check', {
      method: 'post',
      body: data,
    }).then(res => res.json())
      .then(data => {
        setCheckData(data);
      })
  }

  return (
    <div className="App">
      <div className='input-area'>
        <input type="file" onChange={handleChange} />
        {
          file ? <button onClick={upload}>Check</button> : null
        }
      </div>
      <div className='output-area'>
        {
          checkData ? <p>Found {checkData.num} &lt;{checkData.keyword}&gt;</p> : null
        }
      </div>
    </div>
  );
}

export default App;
