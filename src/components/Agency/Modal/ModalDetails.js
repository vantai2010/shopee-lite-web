import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "../../../styles/ModalDetails.scss";
import { environment } from "../../../utils/constant";
import { useEffect, useState } from "react";

function ModalDetails(props) {
  const [listProduct, setListProduct] = useState();
  const { show, handle, data } = props;
  // khắc phục lỗi component render trước khi nhận dữ liệu
  // component bắt đầu render trước khi dữ liệu được tải
  //hoặc nhận từ API, data sẽ là undefined
  //hoặc chưa chứa productTypeData khi component render lần đầu tiên
  useEffect(() => {
    if (data && data.productTypeData) {
      setListProduct(data.productTypeData);
    }
  }, [data]);

  return (
    <Modal show={show} onHide={handle}>
      <Modal.Header closeButton>
        <Modal.Title>View user details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="container modal_content">
          <div className="row modal_content--child">
            <div className="col-6">
              <label>Name:</label>
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
              <p>{data?.categoryId}</p>
            </div>
            <div className="col-12">
              <label>description:</label>
              <p>{data?.description}</p>
            </div>

            {listProduct &&
              listProduct.length > 0 &&
              listProduct.map((item, index) => {
                return (
                  <div
                    style={{
                      display: "grid",
                      grid: "auto / auto auto auto auto",
                      marginBottom: "10px",
                    }}
                    key={index}
                  >
                    <div className="col-12">
                      <label>type:</label>
                      <p>{item?.type}</p>
                    </div>

                    <div className="col-12">
                      <label>size:</label>
                      <p>{item?.size}</p>
                    </div>
                    <div className="col-12">
                      <label>quantitySize:</label>
                      <p>{item?.quantity}</p>
                    </div>
                  </div>
                );
              })}

            <div className="col-12">
              <label>Voucher:</label>
              <p>{data?.description}</p>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between" }} className="col-3">
              <label>Image: </label>
              <div style={{ width: "calc(50% - 10px)", marginBottom: "10px" }} className="preview-img-container">
                <div
                  className="preview-image">
                  {
                    data?.image?.map(item => {
                      return (
                        <img
                          style={{
                            width: " 100px",
                            height: "100px",
                            objectFit: "cover",
                          }}
                          src={`${environment.BASE_URL_BE_IMAGE}${item}`}
                        />
                      )
                    })
                  }

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
