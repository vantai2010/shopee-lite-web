import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { IoIosNotificationsOutline, IoIosNotifications } from "react-icons/io";
import "../styles/Header.scss";
import { keyMap, notifyTitleId } from "../utils/constant";
import { toast } from "react-toastify"
import { deleteNotifyByIdService, getListNotifyService } from "../services/appService";

function Header(props) {
  const { title } = props;
  const userData = useSelector((state) => state.app.userData);
  const language = useSelector((state) => state.app.language);
  const notifySocket = useSelector(state => state.app.notifySocket);
  const [titlePage, setTitlePage] = useState(false);
  const [linkPage, setLinkPage] = useState(false);
  const [listNotify, setListNotify] = useState([])
  const getListNotify = async () => {
    let response = await getListNotifyService()
    if (response && response.errCode === 0) {
      setListNotify(response.data)
    } else {
      toast.error(language === keyMap.EN ? response.messageEN : response.messageVI)
    }
  }

  const notifyTitle = [
    { labelEN: "Successful delivery", labelVI: "Giao hàng thành công", value: notifyTitleId.GIAO_HANG_THANH_CONG },
    { labelEN: "There is a new order", labelVI: "Có đơn hàng mới", value: notifyTitleId.DON_HANG_MOI },
    { labelEN: "Order has been confirmed", labelVI: "Đơn hàng đã được xác nhận", value: notifyTitleId.DON_HANG_DUOC_XAC_NHAN },
    { labelEN: "Order is being delivered", labelVI: "Đơn hàng đang được giao", value: notifyTitleId.DON_HANG_DANG_DUOC_GIAO },
    { labelEN: "Order was cancelled", labelVI: "Đơn hàng bị hủy", value: notifyTitleId.DON_HANG_BI_HUY },
    { labelEN: "System", labelVI: "Hệ thống", value: notifyTitleId.HE_THONG },
  ]

  useEffect(() => {
    getListNotify()
  }, [])
  useEffect(() => {
    const handleSocket = () => {
      getListNotify()
      toast.info(language === keyMap.EN ? "You have a new notifycation" : "Bạn có thông báo mới")
    }
    notifySocket?.on("update-notification", handleSocket)
    return () => {
      notifySocket?.off("update-notification", handleSocket);
    };
  }, [notifySocket])

  useEffect(() => {
    if (title === "Trang Admin") {
      setTitlePage(true);
      setLinkPage(true);
    }
  }, [title]);

  const handleDeleteNotify = async (notifyId) => {
    let response = await deleteNotifyByIdService(notifyId)
    if (response && response.errCode === 0) {
      getListNotify()
      // toast.success(language === keyMap.EN ? response.messageEN : response.messageVI)
    } else {
      toast.error(language === keyMap.EN ? response.messageEN : response.messageVI)
    }
  }

  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      bg="primary"
      data-bs-theme="light"
      className="bg-body-tertiary header_container z-0"
    >
      <Container className="header_content">
        <Navbar.Brand href="#home">
          <Link to="/admin" className="text-decoration-none">
            {titlePage ? "Admin" : "Agency"}
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse className="header_responsive" id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link>
              <Link
                to={linkPage ? "list-agency" : "list-product"}
                className="text-decoration-none"
              >
                {titlePage ? "Supplier" : "Product"}
              </Link>
            </Nav.Link>
            <Nav.Link>
              <Link
                to={linkPage ? "list-user" : "list-transaction"}
                className="text-decoration-none"
              >
                {titlePage ? "User" : "Transaction"}
              </Link>
            </Nav.Link>
            <Nav.Link>
              <Link
                to={linkPage ? "list-history" : "history"}
                className="text-decoration-none"
              >
                {titlePage ? "History" : "History"}
              </Link>
            </Nav.Link>
          </Nav>
          <Nav className="header_nav">
            <nav class="navbar navbar-light header_notifical" >
              <IoIosNotificationsOutline className="icon_notifical" style={{ fontSize: "25px", cursor: "pointer" }} />
              {
                listNotify.length !== 0 &&
                <div className="text_notifical">
                  {listNotify.length}
                </div>
              }
              <div className="hover_notifical">
                {/*  thông báo đây ! */}
                {
                  listNotify.map(item => (
                    <div key={item.id} style={{ backgroundColor: "#f5f5f5", marginBottom: "10px", borderRadius: "5px", lineHeight: "15px", display: "flex", justifyContent: "space-between" }}>
                      <div>
                        <p style={{ margin: "20px 0px 20px 20px", }}>{language === keyMap.EN ? notifyTitle.find(title => title.value === item.titleId).labelEN : notifyTitle.find(title => title.value === item.titleId).labelVI}</p>
                        <p style={{ border: "1px solid #ccc" }}></p>
                        <p style={{
                          margin: "20px 0px 20px 20px",
                          maxHeight: "100%",
                          width: "400px",
                        }}>{language === keyMap.EN ? item.messageEn : item.messageVi}</p>
                      </div>
                      <div onClick={() => handleDeleteNotify(item.id)}>
                        <span style={{ cursor: "pointer", borderTopRightRadius: "5px", display: "flex", alignItems: "center", justifyContent: "center", width: "30px", height: "30px", backgroundColor: "red", color: "#fff" }}>X</span>
                      </div>
                    </div>
                  ))
                }
              </div>
            </nav>
            <NavDropdown title="Language" id="collapsible-nav-dropdown">
              <NavDropdown.Item>Vietnamese</NavDropdown.Item>
              <NavDropdown.Item>English</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title={userData?.email} id="collapsible-nav-dropdown">
              <NavDropdown.Item>
                <Link className="text-decoration-none " to="/">
                  You
                </Link>
              </NavDropdown.Item>
              <NavDropdown.Item>
                <Link className="text-decoration-none" to="/">
                  ME
                </Link>
              </NavDropdown.Item>
              <NavDropdown.Item>
                <Link className="text-decoration-none" to="/">
                  I
                </Link>
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item>
                <Link className="text-decoration-none" to="/">
                  Logout
                </Link>
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar >
  );
}

export default Header;
