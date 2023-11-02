import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from 'react-bootstrap/Form';
import { keyMap, voucherTypeId } from "../../../utils/constant";
import { useState } from "react";
import { useSelector } from "react-redux";
import { addNewVoucherBySupplierService } from "../../../services/appService";
import { toast } from "react-toastify";

function ModalAddNewVoucher({ show, handle, productSelected }) {
    const language = useSelector(state => state.app.language)
    const [inputForm, setInputForm] = useState({
        discountNumber: "",
        discountType: "",
        conditionsPrice: "",
        timeEnd: ""
    })
    const [errMess, setErrMess] = useState({
        discountNumber: "",
        discountType: "",
        conditionsPrice: "",
        timeEnd: ""
    })

    const handleResetState = () => {
        setInputForm({
            discountNumber: "",
            discountType: "",
            conditionsPrice: "",
            timeEnd: ""
        })
        setErrMess({
            discountNumber: "",
            discountType: "",
            conditionsPrice: "",
            timeEnd: ""
        })
    }
    const handleOnChange = (type, e) => {
        setInputForm({ ...inputForm, [type]: e.target.value })
    }

    const handleAddVourcher = async () => {
        let { discountNumber, discountType, conditionsPrice, timeEnd } = inputForm
        if (!discountNumber.trim()) {
            setErrMess({
                discountNumber: language === keyMap.EN ? "Please enter this field" : "Vui lòng nhập trường này",
                discountType: "",
                conditionsPrice: "",
                timeEnd: ""
            })
            return
        }
        if (!discountType.trim()) {
            setErrMess({
                discountNumber: "",
                discountType: language === keyMap.EN ? "Please enter this field" : "Vui lòng nhập trường này",
                conditionsPrice: "",
                timeEnd: ""
            })
            return
        }
        if (!conditionsPrice.trim()) {
            setErrMess({
                discountNumber: "",
                discountType: "",
                conditionsPrice: language === keyMap.EN ? "Please enter this field" : "Vui lòng nhập trường này",
                timeEnd: ""
            })
            return
        }
        if (!timeEnd.trim()) {
            setErrMess({
                discountNumber: "",
                discountType: "",
                conditionsPrice: "",
                timeEnd: language === keyMap.EN ? "Please enter this field" : "Vui lòng nhập trường này"
            })
            return
        }
        if (isNaN(discountNumber)) {
            setErrMess({
                discountNumber: language === keyMap.EN ? "This field must be numberic" : "Trường này phải là số",
                discountType: "",
                conditionsPrice: "",
                timeEnd: ""
            })
            return
        }
        if (isNaN(conditionsPrice)) {
            setErrMess({
                discountNumber: "",
                discountType: "",
                conditionsPrice: language === keyMap.EN ? "This field must be numberic" : "Trường này phải là số",
                timeEnd: ""
            })
            return
        }
        if (!(discountNumber % 1 === 0)) {
            setErrMess({
                discountNumber: language === keyMap.EN ? "This field must be integer" : "Trường này phải là số nguyên",
                discountType: "",
                conditionsPrice: "",
                timeEnd: ""
            })
            return
        }
        if (!(conditionsPrice % 1 === 0)) {
            setErrMess({
                discountNumber: "",
                discountType: "",
                conditionsPrice: language === keyMap.EN ? "This field must be integer" : "Trường này phải là số nguyên",
                timeEnd: ""
            })
            return
        }

        let response = await addNewVoucherBySupplierService({
            discount: discountNumber.trim() + discountType,
            conditionsPrice: conditionsPrice,
            timeEnd: timeEnd,
            productId: productSelected.id
        })
        if (response && response.errCode === 0) {
            toast.success(language === keyMap.EN ? response.messageEN : response.messageVI)
            handle()
        } else {
            toast.error(language === keyMap.EN ? response.messageEN : response.messageVI)
        }

    }



    return (
        <>
            <Modal show={show} onHide={() => { handleResetState(); handle() }}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Voucher </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="container">
                        <div className="row">
                            {/* <div className="col-12">
                                <label>Type</label>
                                <Form.Select aria-label="Default select example">
                                    <option>Open this select menu</option>
                                    <option value="1">One</option>
                                    <option value="2">Two</option>
                                    <option value="3">Three</option>
                                </Form.Select>
                            </div> */}
                            <div className="col-6">
                                <label>Discount</label>
                                <input
                                    className="form-control"
                                    type="text"
                                    value={inputForm.discountNumber}
                                    onChange={(e) => handleOnChange("discountNumber", e)}
                                />
                                <p style={{ color: "red" }}>{errMess.discountNumber}</p>
                            </div>
                            <div className="col-6">
                                <label>Unit</label>
                                <Form.Select aria-label="Default select example" onChange={(e) => handleOnChange("discountType", e)}>
                                    <option value="">Select</option>
                                    <option value="đ">đ</option>
                                    <option value="%">%</option>
                                </Form.Select>
                                <p style={{ color: "red" }}>{errMess.discountType}</p>
                            </div>

                            <div className="col-12">
                                <label>Condtions Price</label>
                                <input
                                    className="form-control"
                                    type="text"
                                    onChange={(e) => handleOnChange("conditionsPrice", e)}
                                />
                                <p style={{ color: "red" }}>{errMess.conditionsPrice}</p>
                            </div>
                            <div className="col-12">
                                <label>Time End</label>
                                <input
                                    className="form-control"
                                    type="date"
                                    onChange={(e) => handleOnChange("timeEnd", e)}
                                />
                                <p style={{ color: "red" }}>{errMess.timeEnd}</p>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => { handleResetState(); handle() }}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleAddVourcher}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
export default ModalAddNewVoucher;
