import { useState } from "react";
import URLForm from "./components/URLForm";
import InfoBox from "./components/InfoBox";

import URLservice from "./services/URLs";

function App() {
  const [shortURl, setShortURL] = useState("");
  const [loading, setLoading] = useState(false);

  const submitURL = async (originalURL) => {
    if (loading) {
      return;
    }
    setShortURL("");
    setLoading(true);
    try {
      const urlObject = await URLservice.postNewURL(originalURL);
      setLoading(false);
      setShortURL(urlObject.shortURL);
    } catch (exception) {
      setLoading(false);
      console.log(exception);
    }
  };

  return (
    <div>
      <h1 className="title">
        <strong>URL Shortener</strong>
      </h1>
      <URLForm submitURL={submitURL} />
      <InfoBox
        shortenedURL={shortURl && `${window.location.href}${shortURl}`}
      />
      {loading && (
        <div className="loading-container">
          <div className="loader"></div>
        </div>
      )}
    </div>
  );
}

export default App;
