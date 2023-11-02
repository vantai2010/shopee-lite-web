import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FaLanguage } from "react-icons/fa";
import { useSelector } from "react-redux";
import { keyMap, categoryId } from "../../../utils/constant";
import { createNewProductOfSupplierService } from "../../../services/appService";
import { toast } from "react-toastify";
import { type } from "@testing-library/user-event/dist/type";
import "../../../styles/ModalAddNew.scss";
import { handleFormatArrType } from "../../../utils/formatArrayType";

function ModalAddNewProduct({ show, handleClose, getListProducts }) {
  const [arrType, setArrType] = useState([]);
  const [sizeOfProduct, setSizeOfProduct] = useState([]);
  const language = useSelector((state) => state.app.language);
  const [inputForm, setInputForm] = useState({
    name: "",
    image: "",
    price: "",
    description: "",
    categoryId: "",
    quantity: "",
    type: "",
    imageType: "",
    size: "",
    quantitySize: "",
  });
  const [errMessage, setErrMessage] = useState({
    name: "",
    image: "",
    price: "",
    description: "",
    categoryId: "",
    quantity: "",
    type: "",
    imageType: "",
    size: "",
    quantitySize: "",
  });


  const handleOnchange = (type, event) => {
    setInputForm({
      ...inputForm,
      [type]: event.target.value,
    });
  };

  const handleOnchangeImage = (e) => {
    const files = Array.from(e.target.files);
    setInputForm({ ...inputForm, image: files });
  };

  const handleOnchangeImageSize = (e) => {
    const files = e.target.files; // Lấy danh sách các tệp ảnh đã chọn
    setInputForm({ ...inputForm, imageType: e.target.files[0] });
  };

  const handleRemoveImage = (index) => {
    const updatedImages = [...inputForm.image];
    updatedImages.splice(index, 1); // Xóa ảnh theo chỉ số index
    setInputForm({ ...inputForm, image: updatedImages }); // Cập nhật state inputForm
  };

  const handleCloseModal = () => {
    setInputForm({
      name: "",
      image: "",
      price: "",
      description: "",
      categoryId: "",
      quantity: "",
      type: "",
      imageType: "",
      size: "",
      quantitySize: "",
    });
    setErrMessage({
      name: "",
      image: "",
      price: "",
      description: "",
      categoryId: "",
      quantity: "",
      type: "",
      imageType: "",
      size: "",
      quantitySize: "",
    });

    handleClose();
  };

  const handleAddSizeOfProduct = () => {
    if (!inputForm.size.trim()) {
      setErrMessage({
        name: "",
        image: "",
        price: "",
        description: "",
        categoryId: "",
        quantity: "",
        type: "",
        imageType: "",
        size:
          language === keyMap.EN
            ? "Please enter this field"
            : "Vui lòng nhập trường này",
        quantitySize: "",
      });
      return;
    }
    if (!inputForm.quantitySize.trim()) {
      setErrMessage({
        name: "",
        image: "",
        price: "",
        description: "",
        categoryId: "",
        quantity: "",
        type: "",
        imageType: "",
        size: "",
        quantitySize:
          language === keyMap.EN
            ? "Please enter this field"
            : "Vui lòng nhập trường này",
      });
      return;
    }
    if (!isNaN(inputForm.size.trim())) {
      setErrMessage({
        name: "",
        image: "",
        price: "",
        description: "",
        categoryId: "",
        quantity: "",
        type: "",
        imageType: "",
        size:
          language === keyMap.EN
            ? "This field must not be a number"
            : "Trường này phải không thể là số",
        quantitySize: "",
      });
      return;
    }
    if (isNaN(inputForm.quantitySize.trim())) {
      setErrMessage({
        name: "",
        image: "",
        price: "",
        description: "",
        categoryId: "",
        quantity: "",
        type: "",
        imageType: "",
        size: "",
        quantitySize:
          language === keyMap.EN
            ? "This field must be number"
            : "Trường này phải là số",
      });
      return;
    }
    if (!(inputForm.quantitySize % 1 === 0)) {
      setErrMessage({
        name: "",
        image: "",
        price: "",
        description: "",
        categoryId: "",
        quantity: "",
        type: "",
        imageType: "",
        size: "",
        quantitySize:
          language === keyMap.EN
            ? "This field must be integer"
            : "Trường này phải là số nguyên",
      });
      return;
    }
    if (sizeOfProduct.find((item) => item.size === inputForm.size)) {
      setErrMessage({
        name: "",
        image: "",
        price: "",
        description: "",
        categoryId: "",
        quantity: "",
        type: "",
        imageType: "",
        size:
          language === keyMap.EN
            ? "Size already exists"
            : "Kiểu sản phẩm này đã bị trùng",
        quantitySize: "",
      });
      return;
    }
    let newSideOfProduct = [...sizeOfProduct];
    newSideOfProduct.push({
      size: inputForm.size,
      quantitySize: inputForm.quantitySize,
    });
    setSizeOfProduct(newSideOfProduct);
    setInputForm({
      ...inputForm,
      size: "",
      quantitySize: "",
    });
  };

  const handleDeleteSizeOfProduct = (item) => {
    let newDeleteSizeOfProduct = sizeOfProduct.filter(
      (itm) => itm.size !== item.size
    );
    setSizeOfProduct(newDeleteSizeOfProduct);
  };

  const handleAddArrType = () => {
    if (!inputForm.type.trim()) {
      setErrMessage({
        name: "",
        image: "",
        price: "",
        description: "",
        categoryId: "",
        quantity: "",
        type:
          language === keyMap.EN
            ? "Please enter this field"
            : "Vui lòng nhập trường này",
        imageType: "",
        size: "",
        quantitySize: "",
      });
      return;
    }
    if (!isNaN(inputForm.type.trim())) {
      setErrMessage({
        name: "",
        image: "",
        price: "",
        description: "",
        categoryId: "",
        quantity: "",
        type:
          language === keyMap.EN
            ? "This field must not be a number"
            : "Trường này phải không thể là số",
        imageType: "",
        size: "",
        quantitySize: "",
      });
      return;
    }
    if (!inputForm.quantitySize.trim()) {
      setErrMessage({
        name: "",
        image: "",
        price: "",
        description: "",
        categoryId: "",
        quantity: "",
        type: "",
        imageType: "",
        size: "",
        quantitySize:
          language === keyMap.EN
            ? "Please enter this field"
            : "Vui lòng nhập trường này",
      });
      return;
    }
    if (isNaN(inputForm.quantitySize)) {
      setErrMessage({
        name: "",
        image: "",
        price: "",
        description: "",
        categoryId: "",
        quantity: "",
        type: "",
        imageType: "",
        size: "",
        quantitySize:
          language === keyMap.EN
            ? "This field must be a numberic"
            : "Trường này phải là số",
      });
      return;
    }
    if (!(inputForm.quantitySize % 1 === 0)) {
      setErrMessage({
        name: "",
        image: "",
        price: "",
        description: "",
        categoryId: "",
        quantity: "",
        type: "",
        imageType: "",
        size: "",
        quantitySize:
          language === keyMap.EN
            ? "This field must be a integer"
            : "Trường này phải là số nguyên",
      });
      return;
    }
    let arrSizeOfProduct = []
    if (sizeOfProduct.length > 0) {
      arrSizeOfProduct = sizeOfProduct
    } else {
      arrSizeOfProduct.push({ quantitySize: inputForm.quantitySize })
    }
    let newArrType = [...arrType];
    newArrType.push({ type: inputForm.type, size: arrSizeOfProduct });
    setArrType(newArrType);
    setInputForm({ ...inputForm, type: "", quantitySize: "" });
    setSizeOfProduct([]);
  };

  const handleDeleteArrType = (item) => {
    let newUpdateArrType = arrType.filter((itm) => itm.type !== item.type);
    setArrType(newUpdateArrType);
  };

  const handleCreateProduct = async () => {
    let {
      name,
      price,
      quantity,
      categoryId,
      description,
      image,
      size,
      type,
      quantitySize,
      imageType,
    } = inputForm;
    if (!name.trim()) {
      setErrMessage({
        name:
          language === keyMap.EN
            ? "Please enter this field"
            : "Vui lòng nhập trường này",
        image: "",
        price: "",
        description: "",
        categoryId: "",
        quantity: "",
        type: "",
        imageType: "",
        size: "",
        quantitySize: "",
      });
      return;
    }
    if (!price.trim()) {
      setErrMessage({
        name: "",
        image: "",
        price:
          language === keyMap.EN
            ? "Please enter this field"
            : "Vui lòng nhập trường này",
        description: "",
        categoryId: "",
        quantity: "",
        type: "",
        imageType: "",
        size: "",
        quantitySize: "",
      });
      return;
    }
    if (!quantity.trim()) {
      setErrMessage({
        name: "",
        image: "",
        price: "",
        description: "",
        categoryId: "",
        quantity:
          language === keyMap.EN
            ? "Please enter this field"
            : "Vui lòng nhập trường này",
        type: "",
        imageType: "",
        size: "",
        quantitySize: "",
      });
      return;
    }
    if (!categoryId) {
      setErrMessage({
        name: "",
        image: "",
        price: "",
        description: "",
        categoryId:
          language === keyMap.EN
            ? "Please enter this field"
            : "Vui lòng nhập trường này",
        quantity: "",
        type: "",
        imageType: "",
        size: "",
        quantitySize: "",
      });
      return;
    }
    if (!description.trim()) {
      setErrMessage({
        name: "",
        image: "",
        price: "",
        description:
          language === keyMap.EN
            ? "Please enter this field"
            : "Vui lòng nhập trường này",
        categoryId: "",
        quantity: "",
        type: "",
        imageType: "",
        size: "",
        quantitySize: "",
      });
      return;
    }
    if (image.length === 0) {
      setErrMessage({
        name: "",
        image:
          language === keyMap.EN
            ? "Please select a photo"
            : "Vui lòng chọn ảnh",
        price: "",
        description: "",
        categoryId: "",
        quantity: "",
        type: "",
        imageType: "",
        size: "",
        quantitySize: "",
      });
      return;
    }
    if (!isNaN(name.trim())) {
      setErrMessage({
        name:
          language === keyMap.EN
            ? "This field must not be a number"
            : "Trường này phải không thể là số",
        image: "",
        price: "",
        description: "",
        categoryId: "",
        quantity: "",
        type: "",
        imageType: "",
        size: "",
        quantitySize: "",
      });
      return;
    }
    if (isNaN(price)) {
      setErrMessage({
        name: "",
        image: "",
        price:
          language === keyMap.EN
            ? "This field must be number"
            : "Trường này phải là số",
        description: "",
        categoryId: "",
        quantity: "",
        type: "",
        imageType: "",
        size: "",
        quantitySize: "",
      });
      return;
    }
    if (isNaN(quantity)) {
      setErrMessage({
        name: "",
        image: "",
        price: "",
        description: "",
        categoryId: "",
        quantity:
          language === keyMap.EN
            ? "This field must be number"
            : "Trường này phải là số",
        type: "",
        imageType: "",
        size: "",
        quantitySize: "",
      });
      return;
    }
    if (!(price % 1 === 0)) {
      setErrMessage({
        name: "",
        image: "",
        price:
          language === keyMap.EN
            ? "This field must be integer"
            : "Trường này phải là số nguyên",
        description: "",
        categoryId: "",
        quantity: "",
        type: "",
        imageType: "",
        size: "",
        quantitySize: "",
      });
      return;
    }
    if (!(quantity % 1 === 0)) {
      setErrMessage({
        name: "",
        image: "",
        price: "",
        description: "",
        categoryId: "",
        quantity:
          language === keyMap.EN
            ? "This field must be integer"
            : "Trường này phải là số nguyên",
        type: "",
        imageType: "",
        size: "",
        quantitySize: "",
      });
      return;
    }

    let arrTypeFormatted = handleFormatArrType(arrType);
    let response = await createNewProductOfSupplierService({
      ...inputForm,
      arrType: arrTypeFormatted,
    });
    if (response && response.errCode === 0) {
      getListProducts({ pageSize: 10, pageIndex: 1 });
      handleCloseModal();
    } else {
      toast.error(
        language === keyMap.EN ? response.messageEN : response.messageVI
      );
    }
  };

  return (
    <Modal show={show} onHide={handleCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>Create a new product</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="container">
          <div className="row">
            <div className="col-6">
              <label>Name</label>
              <input
                required
                value={inputForm.name}
                onChange={(e) => handleOnchange("name", e)}
                className="form-control"
                type="text"
              />
              <p style={{ color: "red" }}>{errMessage.name}</p>
            </div>
            <div className="col-6">
              <label>price</label>
              <input
                value={inputForm.price}
                onChange={(e) => handleOnchange("price", e)}
                className="form-control"
                type="text"
              />
              <p style={{ color: "red" }}>{errMessage.price}</p>
            </div>
            <div className="col-6">
              <label>quantity</label>
              <input
                value={inputForm.quantity}
                onChange={(e) => handleOnchange("quantity", e)}
                className="form-control"
                type="text"
              />
              <p style={{ color: "red" }}>{errMessage.quantity}</p>
            </div>
            <div className="col-6">
              <label>category</label>
              <select
                value={inputForm.categoryId}
                onChange={(e) => handleOnchange("categoryId", e)}
                className="form-control"
              >
                <option value="">Select a category</option>

                {Object.values(categoryId).map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              <p style={{ color: "red" }}>{errMessage.categoryId}</p>
            </div>
            <div className="col-12">
              <label>description</label>
              <input
                value={inputForm.description}
                onChange={(e) => handleOnchange("description", e)}
                className="form-control"
                type="text"
              />
              <p style={{ color: "red" }}>{errMessage.description}</p>
            </div>

            <div style={{ border: "1px solid #cccccc", borderRadius: "5px" }}>
              <p style={{ fontSize: "20px", fontWeight: "500" }}>Type</p>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  paddingBottom: "10px",
                }}
              >
                <div className="col-5">
                  <label>Type</label>
                  <input
                    value={inputForm.type}
                    onChange={(e) => handleOnchange("type", e)}
                    className="form-control"
                    type="text"
                  />
                  <p style={{ color: "red" }}>{errMessage.type}</p>
                </div>

                <div className="col-5">
                  <p style={{ color: "red" }}>{errMessage.imageType}</p>
                  <div
                    className="preview-img-container"
                    style={{ position: "relative" }}
                  >
                    <input
                      id="choise-image-type"
                      className="form-control"
                      type="file"
                      hidden
                      onChange={(e) => handleOnchangeImageSize(e)}
                    />
                    <label
                      htmlFor="choise-image-type"
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
                        display: "flex",
                        flexWrap: "wrap",
                        marginTop: "10px",
                      }}
                    ></div>
                  </div>
                </div>
              </div>
              <div>
                {inputForm.imageType && (
                  <img
                    style={{
                      objectFit: "cover",
                      with: "120px",
                      height: "120px",
                      border: "1px solid #cccccc",
                      borderRadius: "5px",
                    }}
                    src={URL.createObjectURL(inputForm.imageType)}
                  />
                )}
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div className="col-5">
                  <label>Size</label>
                  <input
                    value={inputForm.size}
                    onChange={(e) => handleOnchange("size", e)}
                    className="form-control"
                    type="text"
                  />
                  <p style={{ color: "red" }}>{errMessage.size}</p>
                </div>

                <div className="col-5">
                  <label>quantitySize</label>
                  <input
                    value={inputForm.quantitySize}
                    onChange={(e) => handleOnchange("quantitySize", e)}
                    className="form-control"
                    type="text"
                  />
                  <p style={{ color: "red" }}>{errMessage.quantitySize}</p>
                </div>
              </div>
              {inputForm.size !== "" && inputForm.quantitySize !== "" && (
                <div>
                  <button
                    style={{
                      backgroundColor: "#2d2aea",
                      border: "none",
                      color: "#ffffff",
                      width: "50px",
                    }}
                    onClick={() => handleAddSizeOfProduct()}
                  >
                    +
                  </button>
                </div>
              )}
              {sizeOfProduct &&
                sizeOfProduct.length > 0 &&
                sizeOfProduct.map((item, index) => {
                  return (
                    <div key={index}>
                      <span>
                        Size: <b>{item.size}</b>---
                      </span>
                      <span
                        style={{
                          display: "inline-block",
                          paddingBottom: "10px",
                        }}
                      >
                        quantitySize: <b>{item.quantitySize}</b>
                      </span>
                      <button
                        style={{
                          border: "none",
                          marginLeft: "10px",
                          backgroundColor: "#2d2aea",
                          color: "#ffffff",
                          borderRadius: "5px",
                        }}
                        onClick={() => handleDeleteSizeOfProduct(item)}
                      >
                        Delete
                      </button>
                    </div>
                  );
                })}
              <button
                style={{
                  border: "none",
                  backgroundColor: "#2d2aea",
                  color: "#ffffff",
                  marginBottom: "10px",
                  borderRadius: "5px",
                }}
                onClick={handleAddArrType}
              >
                Them Type
              </button>
            </div>
            <div>
              {arrType &&
                arrType.length > 0 &&
                arrType.map((item, index) => {
                  return (
                    <div key={index}>
                      <div style={{ display: "flex", flexDirection: "column" }}>
                        <span>
                          Type: <b>{item.type}</b>
                        </span>
                        {item.size &&
                          item.size.length > 0 &&
                          item.size.map((itm) => {
                            return (
                              <div style={{ display: "flex" }}>
                                <span>
                                  Size:<b>{itm.size}---</b>
                                </span>
                                <span>
                                  quantitySize:<b>{itm.quantitySize}</b>
                                </span>
                              </div>
                            );
                          })}
                      </div>
                      <div>
                        <button
                          style={{
                            backgroundColor: "#2d2aea",
                            border: "none",
                            color: "#ffffff",
                            marginLeft: "5px",
                          }}
                          onClick={() => handleDeleteArrType(item)}
                        >
                          Xóa Type
                        </button>
                      </div>
                    </div>
                  );
                })}
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
                  multiple
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
                  {inputForm.image &&
                    inputForm.image.map((imgUrl, index) => (
                      <div key={index} className="image-preview-item">
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
                          src={URL.createObjectURL(imgUrl)}
                        />
                        <button
                          className="btn-remove-image"
                          onClick={() => handleRemoveImage(index)}
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
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseModal}>
          Close
        </Button>
        <Button variant="primary" onClick={handleCreateProduct}>
          save
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalAddNewProduct;
