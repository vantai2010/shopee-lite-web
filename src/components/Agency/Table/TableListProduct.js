import Table from "react-bootstrap/Table";
import "../../../styles/TableUser.scss";
import { useEffect, useRef, useState } from "react";
import { FiEdit, FiUser } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import ModalDetails from "../Modal/ModalDetails";
import ModalEdit from "../Modal/ModalEdit";
import ModalDelete from "../Modal/ModalDelete";
import "../../../styles/Tabs.scss"
import "../../../styles/TableAgency.scss"

function TableListProduct({ data, getListProducts }) {
  const [isHideModalDetailsAgency, setIsHideModalDetailsAgency] = useState(false);
  const [isHideModalEditAgency, setIsHideModalEditAgency] = useState(false);
  const [isHideModalDeleteAgency, setIsHideModalDeleteAgency] = useState(false);
  const [listDetailsAgency, setListDetailsAgency] = useState({});
  const [listEditAgency, setListEditAgency] = useState({});
  const [listDeleteAgency, setListDeleteAgency] = useState({});
  const productSelected = useRef()
  const handleHideModalDetailsAgency = () => {
    setIsHideModalDetailsAgency(false);
  };

  const handleShowAgency = (item) => {
    setListDetailsAgency(item);
    setIsHideModalDetailsAgency(true);
  };

  const handleHideModalEditAgency = () => {
    setIsHideModalEditAgency(false);
  };

  const handleShowEditAgency = (item) => {
    setIsHideModalEditAgency(true);
    setListEditAgency(item);
  };

  const handleHideModalDeleteAgency = () => {
    setIsHideModalDeleteAgency(false);
  };

  const handleShowDeleteAgency = (item) => {
    setIsHideModalDeleteAgency(true);
    setListDeleteAgency(item);
  };

  const handleDeleteProduct = (item) => {
    productSelected.current = item
    handleShowDeleteAgency(item)
  }

  return (
    <>

      <Table striped bordered hover variant="light">
        <thead>
          <tr>
            <th>Stt</th>
            <th>Name</th>
            <th>category</th>
            <th>Quantity</th>
            <th>Bought</th>
            <th>Details</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.length > 0 &&
            data.map((item, index) => {
              return (
                <tr key={`user-${index}`}>
                  <td>{index}</td>
                  <td>{item.name}</td>
                  <td>{item.categoryId}</td>
                  <td>{item.quantity}</td>
                  <td>{item.bought}</td>
                  <td>
                    <FiUser
                      className="icon_CRUD"
                      onClick={() => { productSelected.current = item; handleShowAgency(item) }}
                    />
                  </td>
                  <td>
                    <FiEdit
                      className="icon_CRUD"
                      onClick={() => { productSelected.current = item; handleShowEditAgency(item) }}
                    />
                  </td>
                  <td>
                    <RiDeleteBin6Line
                      className="icon_CRUD"
                      onClick={() => handleDeleteProduct(item)}
                    />
                  </td>
                </tr>
              );
            })}
        </tbody>
        <ModalDetails
          show={isHideModalDetailsAgency}
          handle={handleHideModalDetailsAgency}
          data={productSelected.current}
        />
        <ModalEdit
          show={isHideModalEditAgency}
          handle={handleHideModalEditAgency}
          data={productSelected.current}
          getListProducts={getListProducts}
        />
        <ModalDelete
          show={isHideModalDeleteAgency}
          handle={handleHideModalDeleteAgency}
          idSelected={productSelected.current?.id}
          getListProducts={getListProducts}
        />
      </Table>

    </>
  );
}
export default TableListProduct;
