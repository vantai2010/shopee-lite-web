import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
function ModalDetailsHistory(props) {
  const { show, handle } = props;
  return (
    <>
      <Modal show={show} onHide={handle}>
        <Modal.Header closeButton>
          <Modal.Title>Details History</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="container">
            <div className="row">
              <p>Sản phẩm thứ: </p>
              <div className="col-6">
                <label>Name: </label>
                <p></p>
              </div>
              <div className="col-6">
                <label>Image:</label>
                <p></p>
              </div>
              <div className="col-6">
                <label>Price:</label>
                <p></p>
              </div>
              <div className="col-6">
                <label>quantity:</label>
                <p></p>
              </div>
              <div className="col-6">
                <label>description:</label>
                <p></p>
              </div>
              <div className="col-6">
                <label>category:</label>
                <p></p>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handle}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
export default ModalDetailsHistory;
