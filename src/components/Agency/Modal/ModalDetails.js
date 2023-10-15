import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function ModalDetails(props) {
  const { show, handle, data } = props;

  return (
    <Modal show={show} onHide={handle}>
      <Modal.Header closeButton>
        <Modal.Title>View user details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="container">
          <div className="row">
            <div className="col-6">
              <label>Name: </label>
              <p>{data?.name}</p>
            </div>
            <div className="col-6">
              <label>price:</label>
              <p>{data?.price}</p>
            </div>
            <div className="col-6">
              <label>quantity:</label>
              <p>{data?.quantity}</p>
            </div>
            <div className="col-6">
              <label>category:</label>
              <p>{data?.category}</p>
            </div>
            <div className="col-12">
              <label>description:</label>
              <p>{data?.description}</p>
            </div>
            <div className="col-12">
              <label>type:</label>
              <p></p>
            </div>
            <div className="col-12">
              <label>imageType:</label>
              <p></p>
            </div>
            <div className="col-12">
              <label>size:</label>
              <p></p>
            </div>
            <div className="col-12">
              <label>imageType:</label>
              <p></p>
            </div>

            <div className="col-3">
              <label>Image</label>

              <div
                className="preview-img-container"
                style={{ position: "relative" }}
              >
                <div
                  className="preview-image"
                  style={{
                    display: "flex",
                    // flexDirection: "row",
                    flexWrap: "wrap",
                    marginTop: "10px",
                  }}
                >
                  {data?.image &&
                    data?.image.map((imgUrl, index) => (
                      <div
                        key={index}
                        style={{
                          backgroundImage: `url(${imgUrl})`,
                          backgroundSize: "cover",
                          width: "100px",
                          height: "100px",
                          marginRight: "10px",
                          marginBottom: "10px",
                          borderRadius: "5px",
                          position: "relative",
                        }}
                        className="image-preview-item"
                      ></div>
                    ))}
                </div>
              </div>
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
  );
}

export default ModalDetails;
