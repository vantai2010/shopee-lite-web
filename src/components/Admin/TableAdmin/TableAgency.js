import Table from "react-bootstrap/Table";
import { FiUser } from "react-icons/fi";
import ModalDetailsAdmin from "../ModalAdmin/ModalDetailsAdmin";
import { useState } from "react";
function TableListAgency() {
  const [showModalAdmin, setShowModalAdmin] = useState(false);
  const handleHidenModalAdmin = () => {
    setShowModalAdmin(false);
  };
  const handleShowModalAdmin = () => {
    setShowModalAdmin(true);
  };
  return (
    <>
      <Table striped bordered hover variant="light">
        <thead>
          <tr>
            <th>Stt</th>
            <th>Name Shop</th>
            <th>Owner Name</th>
            <th>Address</th>
            <th>Phone Number</th>
            <th>Start Time</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td onClick={handleShowModalAdmin}>
              <FiUser className="icon_CRUD" />
            </td>
          </tr>
        </tbody>
        <ModalDetailsAdmin
          show={showModalAdmin}
          handle={handleHidenModalAdmin}
        />
      </Table>
    </>
  );
}
export default TableListAgency;
