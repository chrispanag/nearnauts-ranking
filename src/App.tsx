import React from 'react';
import './App.css';

function App() {
  const [ranking, setRanking] = React.useState<number | null>(null);
  const [inputText, setInputText] = React.useState<string>("");
  const [hash, setHash] = React.useState<number | null>();

  const updateHash = (e: React.ChangeEvent<HTMLInputElement>) => {
    const parsedHash = parseInt(e.target.value);
    if (isNaN(parsedHash)) {
      setInputText("");
      return
    }

    setInputText(e.target.value)
    setHash(parsedHash)
  }

  const updateRanking = async () => {
    if (inputText.length === 0) {
      return;
    }

    if (hash === null) {
      return;
    }
    const res = await fetch('https://api.nearnauts.io/get_mintnauts', {
      method: 'POST',
      body: JSON.stringify({
        account: "naut",
        hash: [hash]
      }),
      headers: {
        'content-type': 'application/json'
      }
    });

    const data = await res.json();
    setInputText("")

    if (data.data.length < 1) {
      return
    }

    setRanking(data.data[0].rank)
  }

  return (
    <div className="App">
      <header className="App-header">
        {ranking ? <div><p>Nearnaut {'#' + hash} is of rank...</p><h1>{ranking}</h1></div> : <h1>Enter the Nearnaut id # to get its ranking...</h1>}
        <input onChange={updateHash} value={inputText} style={{ width: '50%', height: '50px', fontSize: '1em' }} />
        <button style={{ marginTop: '50px', width: '25%' }} className='button' onClick={() => updateRanking()}><b>Check</b></button>
      </header>
    </div>
  );
}

export default App;
