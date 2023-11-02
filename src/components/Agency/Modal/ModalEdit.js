import { useEffect, useRef, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { updateProductOfSupplierService } from "../../../services/appService";
import { categoryId, keyMap } from "../../../utils/constant";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import "../../../styles/ModalAddNew.scss";
import { handleFormatArrType } from "../../../utils/formatArrayType";
import { environment } from "../../../utils/constant";

function ModalEdit(props) {
  const [newImage, setNewImage] = useState([]);
  const [saveId, setSaveId] = useState([]);
  const [arrType, setArrType] = useState([]);
  const { show, handle, data, getListProducts } = props;
  const language = useSelector((state) => state.app.language);
  const oldImage = useRef()
  const handleResetData = () => {
    if (data && data.productTypeData) {
      setInputForm({
        name: data?.name,
        image: data?.image,
        price: data?.price,
        description: data?.description,
        categoryId: data?.categoryId,
        quantity: data?.quantity,
        type: "",
        imageType: "",
        size: "",
        quantitySize: "",
      });
      console.log(data.productTypeData)
      setArrType(data.productTypeData);
      setNewImage([])
    }
    oldImage.current = data?.image
  }
  useEffect(() => {
    handleResetData()
  }, [data]);
  const [inputForm, setInputForm] = useState({
    name: data?.name,
    image: data?.image,
    price: data?.price,
    description: data?.description,
    categoryId: data?.categoryId,
    quantity: data?.quantity,
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

  const handleUserEdit = async () => {
    let { name, price, quantity, categoryId, description, image } = inputForm;
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
    if (!price) {
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
    if (!quantity) {
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
    if (image.length === 0 && newImage.length === 0) {
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

    let response = await updateProductOfSupplierService({
      ...inputForm,
      newImage: newImage,
      oldImage: oldImage.current,
      productId: data.id,
      arrType: arrType,
    });
    if (response && response.errCode === 0) {
      getListProducts({ pageSize: 10, pageIndex: 1 });
      handle();
    } else {
      toast.error(
        language === keyMap.EN ? response.messageEN : response.messageVI
      );
    }
  };

  const handleOnchangeImage = (e) => {
    const files = Array.from(e.target.files);
    setNewImage(files);
  };

  const handleRemoveImage = (index) => {
    const updatedImages = [...inputForm.image];
    updatedImages.splice(index, 1);
    setInputForm({ ...inputForm, image: updatedImages });
  };
  const handleRemoveImageNew = (index) => {
    const updatedImages = [...inputForm.image];
    updatedImages.splice(index, 1);
    setNewImage({ ...newImage, image: updatedImages });
  };
  const handleEditArrType = (item) => {
    if (saveId.length === 0) {
      setSaveId({ id: item.id, productId: item.productId });
      setInputForm({
        ...inputForm,
        type: item.type,
        size: item.size,
        quantitySize: item.quantity,
      });
      let newArayyEditType = arrType.filter((itm) => itm.id !== item.id);
      setArrType(newArayyEditType);
    } else {
      toast.error("Vui lòng chỉ sửa 1 type duy nhất");
    }
  };
  const handleDeleteArrType = (item) => {
    let newArrType = arrType.filter((itm) => itm.id !== item.id);
    setArrType(newArrType);
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

    let newArrSizeType = [...arrType];
    newArrSizeType.push({
      id: saveId.id,
      productId: saveId.productId,
      type: inputForm.type,
      size: inputForm.size?.trim() === "" ? null : inputForm.size,
      quantity: inputForm.quantitySize,
    });
    setArrType(newArrSizeType);

    setSaveId([]);
    setInputForm({
      ...inputForm,
      type: "",
      imageType: "",
      size: "",
      quantitySize: "",
    });
  };

  // console.log("new Imgae", newImage)

  return (
    <Modal size="lg" show={show} onHide={() => { handleResetData(); handle() }}>
      <Modal.Header closeButton>
        <Modal.Title>Edit a User</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="container">
          <div className="row">
            <div className="col-3">
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
            <div className="col-3">
              <label>price</label>
              <input
                value={inputForm.price}
                onChange={(e) => handleOnchange("price", e)}
                className="form-control"
                type="text"
              />
              <p style={{ color: "red" }}>{errMessage.price}</p>
            </div>
            <div className="col-3">
              <label>quantity</label>
              <input
                value={inputForm.quantity}
                onChange={(e) => handleOnchange("quantity", e)}
                className="form-control"
                type="text"
              />
              <p style={{ color: "red" }}>{errMessage.quantity}</p>
            </div>
            <div className="col-3">
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

            <div
              className="col-12"
              style={{
                border: "1px solid #cccccc",
                borderRadius: "5px",
                paddingBottom: "10px",
              }}
            >
              <p>Type</p>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div className="col-12">
                  <label>Type</label>
                  <input
                    value={inputForm.type}
                    onChange={(e) => handleOnchange("type", e)}
                    className="form-control"
                    type="text"
                  />
                  <p style={{ color: "red" }}>{errMessage.type}</p>
                </div>
              </div>
              <div></div>
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
              <div></div>
              <button
                style={{
                  backgroundColor: "#2d2aea",
                  border: "none",
                  color: "#ffffff",
                }}
                onClick={() => handleAddArrType()}
              >
                Thêm type
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
                        <div style={{ display: "flex" }}>
                          <span>
                            Size: <b>{item.size}---</b>
                          </span>
                          <span>
                            quantitySize:<b>{item.quantity}</b>
                          </span>
                        </div>
                      </div>
                      <div>
                        <button
                          style={{
                            backgroundColor: "#2d2aea",
                            border: "none",
                            color: "#ffffff",
                          }}
                          onClick={() => handleEditArrType(item)}
                        >
                          Sửa type
                        </button>
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
                          src={`${environment.BASE_URL_BE_IMAGE}${imgUrl}`}
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
                  {newImage &&
                    newImage.map((imgUrl, index) => (
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
                          onClick={() => handleRemoveImageNew(index)}
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
