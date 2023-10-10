import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FaLanguage } from "react-icons/fa";
import { useSelector } from "react-redux";
import { keyMap, categoryId } from "../../../utils/constant";
import { createNewProductOfSupplierService } from "../../../services/appService";
import { toast } from "react-toastify";

function ModalAddNewProduct({ show, handleClose, getListProducts }) {
  const language = useSelector(state => state.app.language)
  const [inputForm, setInputForm] = useState({
    name: '',
    image: '',
    price: '',
    description: '',
    categoryId: '',
    quantity: '',
  })
  const [errMessage, setErrMessage] = useState({
    name: '',
    image: '',
    price: '',
    description: '',
    categoryId: '',
    quantity: '',
  })

  const handleUserEdit = async () => {
    // let res = await PutEditUser(firstName, lastName);
  };

  const handleOnchange = (type, event) => {
    setInputForm({
      ...inputForm,
      [type]: event.target.value,
    })
  }

  const handleCreateProduct = async () => {
    let { name, price, quantity, categoryId, description, image } = inputForm
    if (!name.trim()) {
      setErrMessage({
        name: language === keyMap.EN ? "Please enter this field" : "Vui lòng nhập trường này",
        image: '',
        price: '',
        description: '',
        categoryId: '',
        quantity: '',
      })
      return
    }
    if (!price.trim()) {
      setErrMessage({
        name: "",
        image: '',
        price: language === keyMap.EN ? "Please enter this field" : "Vui lòng nhập trường này",
        description: '',
        categoryId: '',
        quantity: '',
      })
      return
    }
    if (!quantity.trim()) {
      setErrMessage({
        name: "",
        image: '',
        price: "",
        description: '',
        categoryId: '',
        quantity: language === keyMap.EN ? "Please enter this field" : "Vui lòng nhập trường này",
      })
      return
    }
    if (!categoryId) {
      setErrMessage({
        name: "",
        image: '',
        price: "",
        description: '',
        categoryId: language === keyMap.EN ? "Please enter this field" : "Vui lòng nhập trường này",
        quantity: "",
      })
      return
    }
    if (!description.trim()) {
      setErrMessage({
        name: "",
        image: '',
        price: "",
        description: language === keyMap.EN ? "Please enter this field" : "Vui lòng nhập trường này",
        categoryId: "",
        quantity: "",
      })
      return
    }
    if (image.length === 0) {
      setErrMessage({
        name: "",
        image: language === keyMap.EN ? "Please select a photo" : "Vui lòng chọn ảnh",
        price: "",
        description: "",
        categoryId: "",
        quantity: "",
      })
      return
    }
    if (!isNaN(name.trim())) {
      setErrMessage({
        name: language === keyMap.EN ? 'This field must not be a number' : "Trường này phải không thể là số",
        image: '',
        price: '',
        description: '',
        categoryId: '',
        quantity: '',
      })
      return
    }
    if (isNaN(price)) {
      setErrMessage({
        name: "",
        image: '',
        price: language === keyMap.EN ? 'This field must be number' : "Trường này phải là số",
        description: '',
        categoryId: '',
        quantity: '',
      })
      return
    }
    if (isNaN(quantity)) {
      setErrMessage({
        name: "",
        image: '',
        price: "",
        description: '',
        categoryId: '',
        quantity: language === keyMap.EN ? 'This field must be number' : "Trường này phải là số",
      })
      return
    }
    if (!(price % 1 === 0)) {
      setErrMessage({
        name: "",
        image: '',
        price: language === keyMap.EN ? 'This field must be integer' : "Trường này phải là số nguyên",
        description: '',
        categoryId: '',
        quantity: '',
      })
      return
    }
    if (!(quantity % 1 === 0)) {
      setErrMessage({
        name: "",
        image: '',
        price: "",
        description: '',
        categoryId: '',
        quantity: language === keyMap.EN ? 'This field must be integer' : "Trường này phải là số nguyên",
      })
      return
    }

    let response = await createNewProductOfSupplierService(inputForm)
    console.log(response)
    if (response && response.errCode === 0) {
      getListProducts({ pageSize: 10, pageIndex: 1 })
      handleCloseModal()
    } else {
      toast.error(language === keyMap.EN ? response.messageEN : response.messageVI)
    }
  }


  const handleOnchangeImage = (e) => {
    const files = e.target.files; // Lấy danh sách các tệp ảnh đã chọn
    const newImages = [];

    for (let i = 0; i < files.length; i++) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64String = event.target.result;
        newImages.push(base64String);

        if (newImages.length === files.length) {
          setInputForm({ ...inputForm, image: newImages }); // Cập nhật state inputForm
        }
      };
      reader.readAsDataURL(files[i]);
    }
  };

  const handleRemoveImage = (index) => {
    const updatedImages = [...inputForm.image];
    updatedImages.splice(index, 1); // Xóa ảnh theo chỉ số index
    setInputForm({ ...inputForm, image: updatedImages }); // Cập nhật state inputForm
  };

  const handleCloseModal = () => {
    setInputForm({
      name: '',
      image: '',
      price: '',
      description: '',
      categoryId: '',
      quantity: '',
    })
    setErrMessage({
      name: '',
      image: '',
      price: '',
      description: '',
      categoryId: '',
      quantity: '',
    })

    handleClose()
  }

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
              <input required value={inputForm.name} onChange={(e) => handleOnchange('name', e)} className="form-control" type="text" />
              <p style={{ color: 'red' }}>{errMessage.name}</p>
            </div>
            <div className="col-6">
              <label>price</label>
              <input value={inputForm.price} onChange={(e) => handleOnchange('price', e)} className="form-control" type="text" />
              <p style={{ color: 'red' }}>{errMessage.price}</p>
            </div>
            <div className="col-6">
              <label>quantity</label>
              <input value={inputForm.quantity} onChange={(e) => handleOnchange('quantity', e)} className="form-control" type="text" />
              <p style={{ color: 'red' }}>{errMessage.quantity}</p>
            </div>
            <div className="col-6">
              <label>category</label>
              <select
                value={inputForm.categoryId}
                onChange={(e) => handleOnchange('categoryId', e)}
                className="form-control"
              >
                <option value="">Select a category</option>

                {Object.values(categoryId).map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              <p style={{ color: 'red' }}>{errMessage.categoryId}</p>
            </div>
            <div className="col-12">
              <label>description</label>
              <input value={inputForm.description} onChange={(e) => handleOnchange('description', e)} className="form-control" type="text" />
              <p style={{ color: 'red' }}>{errMessage.description}</p>
            </div>

            <div className="col-3">
              <label>Image</label>
              <p style={{ color: "red" }}>{errMessage.image}</p>
              <div className="preview-img-container" style={{ position: "relative" }}>
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
                  <i className="fas fa-upload" style={{ marginLeft: "5px" }}></i>
                </label>
                <div
                  className="preview-image"
                  style={{
                    display: "flex",
                    // flexDirection: "row",
                    flexWrap: "wrap",
                    marginTop: "10px",
                  }}
                >
                  {inputForm.image &&
                    inputForm.image.map((imgUrl, index) => (
                      <div
                        key={index}
                        style={{
                          backgroundImage: `url(${imgUrl})`,
                          backgroundSize: "cover",
                          width: "100px",
                          height: "100px",
                          marginRight: "10px",
                          marginBottom: "10px",
                          borderRadius: "5px",
                          position: "relative",
                        }}
                        className="image-preview-item"
                      >
                        <button
                          className="btn-remove-image"
                          onClick={() => handleRemoveImage(index)}
                          style={{
                            position: "absolute",
                            top: "5px",
                            right: "5px",
                            backgroundColor: "red",
                            color: "white",
                            borderRadius: "50%",
                            padding: "5px",
                            cursor: "pointer",
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
