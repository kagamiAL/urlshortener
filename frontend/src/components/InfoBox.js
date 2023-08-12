import { CSSTransition } from "react-transition-group";
import "../App.css"; // Import your CSS file
const InfoBox = ({ shortenedURL }) => (
  <CSSTransition
    in={!!shortenedURL} // Determines whether to show the content
    timeout={300} // Duration of the animation in milliseconds
    classNames="fade"
    unmountOnExit
  >
    <div className="info-box">
      <p>
        {shortenedURL && (
          <strong>
            Your new URL is: <a href={shortenedURL}>{shortenedURL}</a>
          </strong>
        )}
      </p>
    </div>
  </CSSTransition>
);

export default InfoBox;
