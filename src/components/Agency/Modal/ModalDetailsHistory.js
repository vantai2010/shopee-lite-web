import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useSelector } from "react-redux";
import { keyMap } from "../../../utils/constant";
function ModalDetailsHistory({ show, handle, data }) {
  const language = useSelector(state => state.app.language)
  return (
    <>
      <Modal show={show} onHide={handle}>
        <Modal.Header closeButton>
          <Modal.Title>Details History</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="container">
            <div className="row">
              <h3>Thông tin sản phẩm: </h3>
              <div className="col-6">
                <label>Name: </label>
                <p>{data?.productHistoryData?.name}</p>
              </div>
              <div className="col-6">
                <label>Image: </label>
                <p></p>
              </div>
              <div className="col-6">
                <label>type:</label>
                <p>{data?.productTypeHistoryData?.type ? data?.productTypeHistoryData?.type : ''} {data?.productTypeHistoryData?.size ? `- ${data?.productTypeHistoryData?.size}` : ''}</p>
              </div>
            </div>

            <div className="row">
              <h3>Thông tin người mua: </h3>
              <div className="col-6">
                <label>Tên: </label>
                <p>{language === keyMap.EN ? `${data?.userHistoryData.firstName} ${data?.userHistoryData.lastName}` : `${data?.userHistoryData.lastName} ${data?.userHistoryData.firstName}`}</p>
              </div>
              <div className="col-6">
                <label>phone: </label>
                <p>{data?.userHistoryData?.phoneNumber}</p>
              </div>
              <div className="col-6">
                <label>address:</label>
                <p>{data?.userHistoryData?.address}</p>
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
