import React, { useState } from 'react';
import './App.css';

function App() {

  const [file, setFile] = useState(null);
  const [checkData, setCheckData] = useState(null);

  const handleChange = (e) => {
    setFile(e.target.files[0])
  }

  const upload = () => {
    const formData = new FormData();
    formData.append('upload_file', file);
    fetch('http://localhost:5000/check', {
      method: 'post',
      body: formData,
    }).then(res => res.json())
      .then(data => {
        let arr = []
        for (let item in data) {
          arr = [...arr, {
            keyword: item,
            num: data[item]
          }];
        }
        setCheckData(arr);
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
          checkData?.map((item, index)=>{
            return <p key={index}>{item.num} &lt;{item.keyword}&gt;</p>;
          })
        }
      </div>
    </div>
  );
}

export default App;
