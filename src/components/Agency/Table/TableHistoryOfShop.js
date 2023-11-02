import Table from "react-bootstrap/Table";
import { FiUser } from "react-icons/fi";
import "../../../styles/TableHistoryOfShop.scss";
import { useEffect, useState, useRef } from "react";
import ModalDetailsHistory from "../Modal/ModalDetailsHistory";
import { BsSearch } from "react-icons/bs";
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import { getListHistoriesBySupplierService } from "../../../services/appService";
import { useSelector } from "react-redux"
import { toast } from "react-toastify"
import { keyMap } from "../../../utils/constant";

function TableHistoryOfShop() {
  const language = useSelector(state => state.app.language)
  const [isShowModalHistory, setIsShowModalHistory] = useState(false)
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [selectedItem, setSelectedItem] = useState("DAY");
  const [listHistories, setListHistories] = useState([])
  const historySelected = useRef()

  const getListHistories = async () => {
    let response = await getListHistoriesBySupplierService({
      timeType: selectedItem
    })
    if (response && response.errCode === 0) {
      setListHistories(response.data)
    } else {
      toast.error(language === keyMap.EN ? response.messageEN : response.messageVI)
    }
  }

  const getListHistoriesForDuringTime = async () => {
    if (!startTime || !endTime) {
      return toast.error(language == keyMap.EN ? "please select a time" : "Vui lòng chọn thời gian")
    }
    let response = await getListHistoriesBySupplierService({
      timeType: "DURING",
      start: startTime,
      end: endTime
    })
    if (response && response.errCode === 0) {
      setListHistories(response.data)
    } else {
      toast.error(language === keyMap.EN ? response.messageEN : response.messageVI)
    }
  }

  useEffect(() => {
    getListHistories()
  }, [selectedItem])

  const handleClick = (type) => {
    setSelectedItem(type);
  };

  const handleHidenModalDetailsHistory = () => {
    setIsShowModalHistory(false)
  }

  const handleShowModalDetailsHistory = () => {
    setIsShowModalHistory(true)
  }

  // console.log(startTime, endTime)
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
              className={`menu_container--content ${selectedItem === "DAY" ? "menu_container--color" : ""
                }`}
              onClick={() => handleClick("DAY")}
            >
              DAY
            </div>
            <div
              className={`menu_container--content ${selectedItem === "WEEK" ? "menu_container--color" : ""
                }`}
              onClick={() => handleClick("WEEK")}
            >
              WEEK
            </div>
            <div
              className={`menu_container--content ${selectedItem === "MONTH" ? "menu_container--color" : ""
                }`}
              onClick={() => handleClick("MONTH")}
            >
              MONTH
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
                    onChange={e => setStartTime(e.target.value)}
                  />
                </Form.Group>
                <Form.Group as={Col} md="6" controlId="validationCustom02">
                  <Form.Label>End Time</Form.Label>
                  <Form.Control
                    required
                    type="date"
                    onChange={e => setEndTime(e.target.value)}
                  />
                </Form.Group>
              </Row>
            </Form>
            <div style={{ marginLeft: " 30px", marginTop: "30px" }} className="col-auto">
              <button class="btn btn-primary mb-3" onClick={getListHistoriesForDuringTime}>
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
              <th>product type</th>
              <th>Start Time</th>
              <th>End Time</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            {
              listHistories.length > 0 ?
                listHistories.map((item, index) => (
                  <tr key={item.id}>
                    <td>{index}</td>
                    <td>{language === keyMap.EN ? `${item.userHistoryData?.firstName} ${item.userHistoryData?.lastName}` : `${item.userHistoryData?.lastName} ${item.userHistoryData?.firstName}`}</td>
                    <td>{item.productHistoryData?.name}</td>
                    <td>{item.productTypeHistoryData?.type ? item.productTypeHistoryData?.type : ''} {item.productTypeHistoryData?.size ? `- ${item.productTypeHistoryData?.size}` : ''}</td>
                    <td>{item.startTime}</td>
                    <td>{item.endTime}</td>
                    <td onClick={() => { historySelected.current = item; handleShowModalDetailsHistory() }}>
                      <FiUser className="icon_CRUD" />
                    </td>
                  </tr>
                ))
                :
                <tr>không có dữ liệu</tr>
            }

          </tbody>
          <ModalDetailsHistory show={isShowModalHistory} handle={handleHidenModalDetailsHistory} data={historySelected.current} />
        </Table>
      </div>
    </>
  );
}
export default TableHistoryOfShop;
