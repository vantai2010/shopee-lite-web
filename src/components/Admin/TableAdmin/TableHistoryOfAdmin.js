import Table from "react-bootstrap/Table";
import "../../../styles/TableHistoryOfAdmin.scss";
import { useState } from "react";
function TableHistoryOfAdmin() {
  const [selectedItem, setSelectedItem] = useState("Delivery online pay");

  const handleClick = (type) => {
    setSelectedItem(type);
  };
  return (
    <>
      <div>
        <div className="menu_container">
          <div
            className={`menu_container--content ${
              selectedItem === "Delivery online pay"
                ? "menu_container--color"
                : ""
            }`}
            onClick={() => handleClick("Delivery online pay")}
          >
            Delivery online pay
          </div>
          <div
            className={`menu_container--content ${
              selectedItem === "Delivery cash pay"
                ? "menu_container--color"
                : ""
            }`}
            onClick={() => handleClick("Delivery cash pay")}
          >
            Delivery cash pay
          </div>
          <div
            className={`menu_container--content ${
              selectedItem === "Wait online pay" ? "menu_container--color" : ""
            }`}
            onClick={() => handleClick("Wait online pay")}
          >
            Wait online pay
          </div>
          <div
            className={`menu_container--content ${
              selectedItem === "Wait cash pay" ? "menu_container--color" : ""
            }`}
            onClick={() => handleClick("Wait cash pay")}
          >
            Wait cash pay
          </div>
        </div>
        <Table striped bordered hover variant="light">
          <thead>
            <tr>
              <th>Stt</th>
              <th>User</th>
              <th>Product</th>
              <th>Supplier</th>
              <th>{selectedItem}</th>
              <th>Start Time</th>
              <th>End Time</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td> 1</td>
              <td> 1</td>
              <td> 1</td>
              <td> 1</td>
              <td> 1</td>
              <td> 1</td>
              <td> 1</td>
            </tr>
          </tbody>
        </Table>
      </div>
    </>
  );
}
export default TableHistoryOfAdmin;
