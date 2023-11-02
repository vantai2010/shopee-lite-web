import { useEffect, useRef, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { updateProductOfSupplierService, updateRoleUserByAdminService } from "../../../services/appService";
import { categoryId, keyMap } from "../../../utils/constant";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import "../../../styles/ModalAddNew.scss";
import { handleFormatArrType } from "../../../utils/formatArrayType";
import { environment } from "../../../utils/constant";

function ModalEdit({ show, handle, data, getListUsers, currentRole }) {
  const [newImage, setNewImage] = useState([]);
  const language = useSelector((state) => state.app.language);
  const oldImage = useRef()

  const [inputForm, setInputForm] = useState({
    firstName: data?.firstName,
    image: data?.image,
    lastName: data?.lastName,
    address: data?.address,
    genderId: data?.genderId,
    phoneNumber: data?.phoneNumber,
    roleId: currentRole
  });
  const [errMessage, setErrMessage] = useState({
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
    if (data) {
      setInputForm({
        firstName: data?.firstName,
        image: data?.image,
        lastName: data?.lastName,
        address: data?.address,
        genderId: data?.genderId,
        phoneNumber: data?.phoneNumber,
        roleId: currentRole

      });
    }
    oldImage.current = data?.image
  }

  useEffect(() => {
    handleResetData()
  }, [data]);



  const handleOnchange = (type, event) => {
    setInputForm({
      ...inputForm,
      [type]: event.target.value,
    });
  };

  const handleUserEdit = async () => {
    if (!inputForm.roleId) {
      setErrMessage({
        firstName: "",
        image: "",
        lastName: "",
        address: "",
        genderId: "",
        phoneNumber: "",
        roleId: language === keyMap.EN ? "Please select role for user" : "Vui lòng chọn vai trò của người dùng"
      })
      return
    }

    let response = await updateRoleUserByAdminService({ userId: data.id, roleId: inputForm.roleId })
    if (response && response.errCode === 0) {
      getListUsers(currentRole);
      handle();
    } else {
      toast.error(
        language === keyMap.EN ? response.messageEN : response.messageVI
      );
    }
  };

  const handleOnchangeImage = (e) => {
    console.log(e.target.files[0])
    setInputForm({ ...inputForm, image: e.target.files[0] });
  };

  const handleRemoveImage = () => {

    setInputForm({ ...inputForm, image: "" });
  };



  // console.log("new Imgae", newImage)

  return (
    <Modal show={show} onHide={() => { handleResetData(); handle() }}>
      <Modal.Header closeButton>
        <Modal.Title>Edit a User</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="container">
          <div className="row">
            {/* <div className="col-6">
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
                onChange={(e) => handleOnchange("address", e)}
                className="form-control"
                type="text"
              />
              <p style={{ color: "red" }}>{errMessage.address}</p>
            </div> */}

            <div className="col-12">
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

            {/* <div className="col-3">
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
                          src={typeof inputForm.image === "string" ? `${environment.BASE_URL_BE_IMAGE}${inputForm.image}` : inputForm.image instanceof File
                            ? URL.createObjectURL(inputForm.image)
                            : ""}
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
            </div> */}
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => { handleResetData(); handle() }}>
          Close
        </Button>
        <Button variant="primary" onClick={handleUserEdit}>
          Confirm
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalEdit;
