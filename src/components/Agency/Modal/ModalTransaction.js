import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
function ModalTransaction(props) {
  const { show, handle } = props;
  return (
    <>
      <Modal show={show} onHide={handle}>
        <Modal.Header closeButton>
          <Modal.Title>Transaction Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="container">
            <div className="row">
              <div className="col-6">
                <label>Image Product: </label>
                <p></p>
              </div>
              <div className="col-6">
                <label>Quantity:</label>
                <p></p>
              </div>
              <div className="col-6">
                <label>Payment Method:</label>
                <p></p>
              </div>
              <div className="col-6">
                <label>Phone Number: </label>
                <p></p>
              </div>
              <div className="col-6">
                <label>Start Time:</label>
                <p></p>
              </div>
              <div className="col-6">
                <label>End Time:</label>
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
export default ModalTransaction;
