import Spinner from "react-bootstrap/Spinner";
import "../styles/Loading.scss";
function Loading() {
  return (
    <div className="loading_container">
      <Spinner animation="border" variant="primary" />
    </div>
  );
}

export default Loading;
