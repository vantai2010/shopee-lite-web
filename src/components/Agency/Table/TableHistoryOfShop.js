import Table from "react-bootstrap/Table";
import { FiUser } from "react-icons/fi";
import "../../../styles/TableHistoryOfShop.scss";
import { useState } from "react";
import ModalDetailsHistory from "../Modal/ModalDetailsHistory";
import { BsSearch } from "react-icons/bs";
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
function TableHistoryOfShop() {
  const [isShowModalHistory, setIsShowModalHistory] = useState(false)
  const [selectedItem, setSelectedItem] = useState("Day");

  const handleClick = (type) => {
    setSelectedItem(type);
  };

  const handleHidenModalDetailsHistory = () => {
    setIsShowModalHistory(false)
  }

  const handleShowModalDetailsHistory = () => {
    setIsShowModalHistory(true)
  }
  return (
    <>
      <div>
        <div className="mt-4 tool_container colum d-flex align-items-center justify-content-between ">
          <div className=" tool_container-content col-sm-5 colum d-flex align-items-center">
            <input
              type="text"
              class="form-control"
              id="inputPassword2"
              placeholder="Search..."
            />
            <div className="col-auto">
              <button class="btn btn-primary mb-3">
                <BsSearch />
              </button>
            </div>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center" }}>
          <div className="menu_container">
            <div
              className={`menu_container--content ${selectedItem === "Day" ? "menu_container--color" : ""
                }`}
              onClick={() => handleClick("Day")}
            >
              Day
            </div>
            <div
              className={`menu_container--content ${selectedItem === "Week" ? "menu_container--color" : ""
                }`}
              onClick={() => handleClick("Week")}
            >
              Week
            </div>
            <div
              className={`menu_container--content ${selectedItem === "Month" ? "menu_container--color" : ""
                }`}
              onClick={() => handleClick("Month")}
            >
              Month
            </div>
          </div>
          <div style={{ display: "flex", marginLeft: "20%", flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
            <Form noValidate >
              <Row className="mb-3">
                <Form.Group as={Col} md="6" controlId="validationCustom01">
                  <Form.Label>Start Time</Form.Label>
                  <Form.Control
                    required
                    type="date"
                  />
                </Form.Group>
                <Form.Group as={Col} md="6" controlId="validationCustom02">
                  <Form.Label>End Time</Form.Label>
                  <Form.Control
                    required
                    type="date"
                  />
                </Form.Group>
              </Row>
            </Form>
            <div style={{ marginLeft: " 30px", marginTop: "30px" }} className="col-auto">
              <button class="btn btn-primary mb-3">
                <BsSearch />
              </button>
            </div>
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
              <th>Details</th>
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
              <td onClick={handleShowModalDetailsHistory}>
                <FiUser className="icon_CRUD" />
              </td>
            </tr>
          </tbody>
          <ModalDetailsHistory show={isShowModalHistory} handle={handleHidenModalDetailsHistory} />
        </Table>
      </div>
    </>
  );
}
export default TableHistoryOfShop;
