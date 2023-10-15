import Table from "react-bootstrap/Table";
import { FiUser } from "react-icons/fi";
import ModalEdit from "../Modal/ModalEdit";
import ModalTransaction from "../Modal/ModalTransaction";
import { useState } from "react";
function TableListTransaction() {
  const [showModalTransaction, setShowModalTransaction] = useState(false);
  const handleHideModalTransaction = () => {
    setShowModalTransaction(false);
  };
  const handleShowModalTransaction = () => {
    setShowModalTransaction(true);
  };
  return (
    <>
      <Table striped bordered hover variant="light">
        <thead>
          <tr>
            <th>ID</th>
            <th>Product Name</th>
            <th>Buyer</th>
            <th>Price</th>
            <th>Address</th>
            <th>Transaction Status</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Áo giáp</td>
            <td>Trần Văn Thuận</td>
            <td>120K</td>
            <td>Số 10, ngách 30, ngõ 75 Giải Phóng</td>
            <td>Hoàn tất</td>
            <td onClick={handleShowModalTransaction}>
              <FiUser className="icon_CRUD" />
            </td>
          </tr>
        </tbody>
        <ModalTransaction
          show={showModalTransaction}
          handle={handleHideModalTransaction}
        />
      </Table>
    </>
  );
}
export default TableListTransaction;
