import { useState } from "react";

const URLForm = ({ submitURL }) => {
  const initialValue = "Input a URL here...";
  const [currentURL, setCurrentURL] = useState(initialValue);
  let processingURL = false;

  const onFocus = ({ target }) => {
    if (target.value === initialValue) {
      target.value = "";
    }
  };

  const onBlur = ({ target }) => {
    if (target.value === "") {
      target.value = initialValue;
    }
  };

  const submitFunction = async (e) => {
    e.preventDefault();
    if (processingURL) {
      return;
    }
    processingURL = true;
    await submitURL(currentURL);
    processingURL = false;
  };

  return (
    <div className="input-container">
      <form onSubmit={submitFunction}>
        <input
          type="input"
          value={currentURL}
          onChange={({ target }) => setCurrentURL(target.value)}
          onFocus={onFocus}
          onBlur={onBlur}
        />
        <input type="submit" readOnly value="submit" />
      </form>
    </div>
  );
};

export default URLForm;
