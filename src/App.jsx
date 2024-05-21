// src/App.js
// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import axios from "axios";
import { FaClipboard } from "react-icons/fa"; 
import "./App.css"; // Import the CSS file

function App() {
  const [url, setUrl] = useState("");
  const [message, setMessage] = useState("");
  const [downloadLink, setDownloadLink] = useState("");
  const [loading, setLoading] = useState(false);

  const handleDownload = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:5000/download", {
        url,
      });
      if (response.data.url) {
        setDownloadLink(response.data.url);
        setMessage("");
      } else {
        setMessage(response.data.message || "Failed to download video.");
        setDownloadLink("");
      }
    } catch (error) {
      setMessage("Error downloading the video.");
      setDownloadLink("");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(downloadLink);
  };

  return (
    <div className='App'>
      <h1>Video Downloader</h1>
      <p className='form-header'>
        Easy download Insta, Facebook, X, YouTube videos in high quality
      </p>
      <form onSubmit={handleDownload}>
        <input
          type='text'
          placeholder='Enter video URL'
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <button type='submit' disabled={loading} style={{ padding: 18 }}>
          {loading ? <div className='spinner'></div> : "Download"}
        </button>
      </form>
      {message && <p className='message error'>{message}</p>}
      {downloadLink && (
        <div>
          <p className='message'>Video can be downloaded from:</p>
            <FaClipboard size={20} className='copy-icon' onClick={copyToClipboard} style={{marginRight:10, marginTop:-10}} />
          <div className='download-link-container'>
            <a
              className='download-link'
              href={downloadLink}
              target='_blank'
              rel='noopener noreferrer'
            >
              {downloadLink}
            </a>
            <div className='full-link-tooltip'>{downloadLink}</div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
