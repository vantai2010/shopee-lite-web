import { useEffect, useRef, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { createNewUserByAdminService, updateProductOfSupplierService, updateRoleUserByAdminService } from "../../../services/appService";
import { categoryId, keyMap } from "../../../utils/constant";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import "../../../styles/ModalAddNew.scss";
import { handleFormatArrType } from "../../../utils/formatArrayType";
import { environment } from "../../../utils/constant";
import axios from "axios";

function ModalAddNewUser({ show, handleClose, getListUsers, setCurrentRole }) {
  const language = useSelector((state) => state.app.language);

  const [arrSuggess, setSuggess] = useState([])
  const idTime = useRef()

  const [inputForm, setInputForm] = useState({
    email: "",
    password: "",
    firstName: "",
    image: "",
    lastName: "",
    address: "",
    genderId: "",
    phoneNumber: "",
    roleId: ""
  });
  const [errMessage, setErrMessage] = useState({
    email: "",
    password: "",
    firstName: "",
    image: "",
    lastName: "",
    address: "",
    genderId: "",
    phoneNumber: "",
    roleId: ""

  });

  const arrGenderId = [
    { labelEN: "Male", labelVI: "Nam", value: keyMap.MALE },
    { labelEN: "Female", labelVI: "Nữ", value: keyMap.FEMALE },
  ]

  const arrRoleId = [
    { labelEN: "Admin", labelVI: "Quản trị viên", value: keyMap.ADMIN },
    { labelEN: "Supplier", labelVI: "Nhà cung cấp", value: keyMap.SUPPLIER },
    { labelEN: "User", labelVI: "Người dùng", value: keyMap.USER },
  ]

  const handleResetData = () => {

    setInputForm({
      firstName: "",
      image: "",
      lastName: "",
      address: "",
      genderId: "",
      phoneNumber: "",
      roleId: ""

    });

  }

  // useEffect(() => {
  //   handleResetData()
  // }, [data]);



  const handleOnchange = (type, event) => {
    setInputForm({
      ...inputForm,
      [type]: event.target.value,
    });
  };

  const handleCreateNewUser = async () => {
    let { email, password, firstName, lastName, address, phoneNumber, genderId, roleId } = inputForm
    if (!email.trim()) {
      setErrMessage({
        email: language === keyMap.EN ? "Please enter this field" : "Vui lòng nhập trường này",
        password: "",
        firstName: "",
        lastName: "",
        image: "",
        address: "",
        genderId: "",
        phoneNumber: "",
        roleId: ""
      })
      return
    }
    if (!password.trim()) {
      setErrMessage({
        email: "",
        password: language === keyMap.EN ? "Please enter this field" : "Vui lòng nhập trường này",
        firstName: "",
        lastName: "",
        image: "",
        address: "",
        genderId: "",
        phoneNumber: "",
        roleId: ""
      })
      return
    }
    if (!firstName.trim()) {
      setErrMessage({
        email: "",
        password: "",
        firstName: language === keyMap.EN ? "Please enter this field" : "Vui lòng nhập trường này",
        lastName: "",
        image: "",
        address: "",
        genderId: "",
        phoneNumber: "",
        roleId: ""
      })
      return
    }
    if (!lastName.trim()) {
      setErrMessage({
        email: "",
        password: "",
        firstName: "",
        lastName: language === keyMap.EN ? "Please enter this field" : "Vui lòng nhập trường này",
        image: "",
        address: "",
        genderId: "",
        phoneNumber: "",
        roleId: ""
      })
      return
    }
    if (!address.trim()) {
      setErrMessage({
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        image: "",
        address: language === keyMap.EN ? "Please enter this field" : "Vui lòng nhập trường này",
        genderId: "",
        phoneNumber: "",
        roleId: ""
      })
      return
    }
    if (!phoneNumber.trim()) {
      setErrMessage({
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        image: "",
        address: "",
        genderId: "",
        phoneNumber: language === keyMap.EN ? "Please enter this field" : "Vui lòng nhập trường này",
        roleId: ""
      })
      return
    }
    if (!genderId.trim()) {
      setErrMessage({
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        image: "",
        address: "",
        genderId: language === keyMap.EN ? "Please enter this field" : "Vui lòng nhập trường này",
        phoneNumber: "",
        roleId: ""
      })
      return
    }
    if (!roleId.trim()) {
      setErrMessage({
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        image: "",
        address: "",
        genderId: "",
        phoneNumber: "",
        roleId: language === keyMap.EN ? "Please enter this field" : "Vui lòng nhập trường này"
      })
      return
    }

    if (/^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)*(\.[a-z]{2,})$/.test(email)) {
      setErrMessage({
        email: language === keyMap.EN ? "This field must be email" : "Trường này phải là email",
        password: "",
        firstName: "",
        lastName: "",
        image: "",
        address: "",
        genderId: "",
        phoneNumber: "",
        roleId: ""
      })
      return
    }
    if (!isNaN(firstName)) {
      setErrMessage({
        email: "",
        password: "",
        firstName: language === keyMap.EN ? "This field isn't numberic" : "Trường này không thể là số",
        lastName: "",
        image: "",
        address: "",
        genderId: "",
        phoneNumber: "",
        roleId: ""
      })
      return
    }
    if (!isNaN(lastName)) {
      setErrMessage({
        email: "",
        password: "",
        firstName: "",
        lastName: language === keyMap.EN ? "This field isn't numberic" : "Trường này không thể là số",
        image: "",
        address: "",
        genderId: "",
        phoneNumber: "",
        roleId: ""
      })
      return
    }
    if (isNaN(phoneNumber)) {
      setErrMessage({
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        image: "",
        address: "",
        genderId: "",
        phoneNumber: language === keyMap.EN ? "This field must be numberic" : "Trường này phải là số",
        roleId: ""
      })
      return
    }
    if (!(phoneNumber % 1 === 0)) {
      setErrMessage({
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        image: "",
        address: "",
        genderId: "",
        phoneNumber: language === keyMap.EN ? "This field must be integer" : "Trường này phải là số nguyên",
        roleId: ""
      })
      return
    }
    if (phoneNumber.trim().length !== 10) {
      setErrMessage({
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        image: "",
        address: "",
        genderId: "",
        phoneNumber: language === keyMap.EN ? "Haven't entered 10 numbers yet" : "Chưa nhập đủ 10 số",
        roleId: ""
      })
      return
    }

    let response = await createNewUserByAdminService(inputForm)
    if (response && response.errCode === 0) {
      getListUsers(inputForm.roleId);
      setCurrentRole(inputForm.roleId)
      handleClose();
    } else {
      toast.error(
        language === keyMap.EN ? response.messageEN : response.messageVI
      );
    }
  };

  const handleOnchangeImage = (e) => {
    setInputForm({ ...inputForm, image: e.target.files[0] });
  };

  const handleRemoveImage = () => {
    setInputForm({ ...inputForm, image: "" });
  };

  const handleSuggestion = (text) => {
    if (idTime.current) {
      clearTimeout(idTime.current)
    }
    idTime.current = setTimeout(async () => {
      axios
        .get(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(text)}`)
        .then((response) => {
          if (response.data) {
            setSuggess(response.data);
          }
        })
        .catch((error) => {
          console.error('Lỗi khi tìm kiếm gợi ý địa chỉ:', error);
        });
    }, 650)
  }

  return (
    <Modal show={show} onHide={() => { handleResetData(); handleClose() }}>
      <Modal.Header closeButton>
        <Modal.Title>Create a User</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="container">
          <div className="row">
            <div className="col-6">
              <label>email</label>
              <input
                required
                value={inputForm.email}
                onChange={(e) => handleOnchange("email", e)}
                className="form-control"
                type="text"
              />
              <p style={{ color: "red" }}>{errMessage.email}</p>
            </div>
            <div className="col-6">
              <label>password</label>
              <input
                value={inputForm.password}
                onChange={(e) => handleOnchange("password", e)}
                className="form-control"
                type="text"
              />
              <p style={{ color: "red" }}>{errMessage.password}</p>
            </div>

            <div className="col-6">
              <label>firstName</label>
              <input
                required
                value={inputForm.firstName}
                onChange={(e) => handleOnchange("firstName", e)}
                className="form-control"
                type="text"
              />
              <p style={{ color: "red" }}>{errMessage.firstName}</p>
            </div>

            <div className="col-6">
              <label>lastName</label>
              <input
                required
                value={inputForm.lastName}
                onChange={(e) => handleOnchange("lastName", e)}
                className="form-control"
                type="text"
              />
              <p style={{ color: "red" }}>{errMessage.lastName}</p>
            </div>

            <div className="col-6">
              <label>phoneNumber</label>
              <input
                value={inputForm.phoneNumber}
                onChange={(e) => handleOnchange("phoneNumber", e)}
                className="form-control"
                type="text"
              />
              <p style={{ color: "red" }}>{errMessage.phoneNumber}</p>
            </div>
            <div className="col-6">
              <label>gender</label>
              <select
                value={inputForm.genderId}
                onChange={(e) => handleOnchange("genderId", e)}
                className="form-control"
              >
                <option value="">Select a gender</option>

                {arrGenderId.map((item) => (
                  <option key={item.value} value={item.value}>
                    {language === keyMap.EN ? item.labelEN : item.labelVI}
                  </option>
                ))}
              </select>
              <p style={{ color: "red" }}>{errMessage.genderId}</p>
            </div>

            <div className="col-12">
              <label>address</label>
              <input
                value={inputForm.address}
                onChange={(e) => { handleOnchange("address", e); handleSuggestion(e.target.value); }}
                className="form-control"
                type="text"
              />
              <p style={{ color: "red" }}>{errMessage.address}</p>
            </div>
            {
              arrSuggess.length > 0 &&
              arrSuggess.map(item => (
                <div key={item.display_name} onClick={() => { setInputForm({ ...inputForm, address: item.display_name }); setSuggess([]) }}>
                  <p>{item.display_name}</p>
                </div>
              ))
            }
            <div className="col-6">
              <label>role</label>
              <select
                value={inputForm.roleId}
                onChange={(e) => handleOnchange("roleId", e)}
                className="form-control"
              >
                <option value="">Select a role</option>

                {arrRoleId.map((item) => (
                  <option key={item.value} value={item.value}>
                    {language === keyMap.EN ? item.labelEN : item.labelVI}
                  </option>
                ))}
              </select>
              <p style={{ color: "red" }}>{errMessage.roleId}</p>
            </div>

            <div className="col-3">
              <label>Image</label>
              <p style={{ color: "red" }}>{errMessage.image}</p>
              <div
                className="preview-img-container"
                style={{ position: "relative" }}
              >
                <input
                  id="choise-image"
                  className="form-control"
                  type="file"
                  hidden
                  onChange={(e) => handleOnchangeImage(e)}
                />
                <label
                  htmlFor="choise-image"
                  className="btn-choise-image"
                  style={{
                    display: "inline-block",
                    width: "140px",
                    padding: "10px 15px",
                    backgroundColor: "#007bff",
                    color: "#fff",
                    cursor: "pointer",
                  }}
                >
                  Choose Image
                  <i
                    className="fas fa-upload"
                    style={{ marginLeft: "5px" }}
                  ></i>
                </label>
                <div
                  className="preview-image"
                  style={{
                    marginTop: " 10px",
                    display: "grid",
                    grid: "auto / auto auto auto",
                  }}
                >
                  <div className="image-preview-item">
                    {
                      inputForm.image &&
                      <>
                        <img
                          style={{
                            backgroundSize: "cover",
                            objectFit: "cover",
                            width: "120px",
                            height: "120px",
                            marginRight: "10px",
                            marginBottom: "10px",
                            borderRadius: "5px",
                            position: "relative",
                            border: "1px solid #cccccc",
                          }}
                          src={inputForm.image instanceof File ? URL.createObjectURL(inputForm.image) : ""}
                        />
                        <button
                          className="btn-remove-image"
                          onClick={() => handleRemoveImage()}
                          style={{
                            position: "absolute",
                            top: "0px",
                            right: "10px",
                            backgroundColor: "#cccccc",
                            color: "red",
                            borderTopRightRadius: "5px",
                            padding: "5px",
                            cursor: "pointer",
                            border: "none",
                          }}
                        >
                          X
                        </button>
                      </>
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => { handleResetData(); handleClose() }}>
          Close
        </Button>
        <Button variant="primary" onClick={handleCreateNewUser}>
          Confirm
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalAddNewUser;
