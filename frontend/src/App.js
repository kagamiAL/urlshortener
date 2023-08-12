import { useState } from "react";
import URLForm from "./components/URLForm";
import InfoBox from "./components/InfoBox";

import URLservice from "./services/URLs";

function App() {
  const [shortURl, setShortURL] = useState("");

  const submitURL = async (originalURL) => {
    setShortURL("");
    try {
      const urlObject = await URLservice.postNewURL(originalURL);
      setShortURL(urlObject.shortURL);
    } catch (exception) {
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
    </div>
  );
}

export default App;
