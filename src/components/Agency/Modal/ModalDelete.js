import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { deleteProductOfSupplierService } from "../../../services/appService";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { keyMap } from "../../../utils/constant";



function ModalDeleteAgency(props) {
  const { show, handle, idSelected, getListProducts } = props;
  const language = useSelector(state => state.app.language)
  const handleDelete = async () => {
    let response = await deleteProductOfSupplierService({ productId: idSelected })
    if (response && response.errCode === 0) {
      handle()
      getListProducts()
    } else {
      toast.error(language === keyMap.EN ? response.messageEN : response.messageVI)
    }
  };

  return (
    <Modal show={show} onHide={handle}>
      <Modal.Header closeButton>
        <Modal.Title>Delete</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form>
          <div class="mb-3">
            <p>You confirm you want to delete the</p>

          </div>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handle}>
          Close
        </Button>
        <Button variant="primary" onClick={handleDelete}>
          Confirm
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalDeleteAgency;
