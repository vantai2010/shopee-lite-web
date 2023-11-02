import { useEffect, useState, useRef } from "react";
import Table from "react-bootstrap/Table";
import { useSelector } from "react-redux";
import { getAllUserByAdminService } from "../../../services/appService";
import { toast } from "react-toastify";
import { keyMap } from "../../../utils/constant";
import { MdNoteAdd } from "react-icons/md";
import ModalEdit from "../ModalAdmin/ModalEdit";
import { FiEdit, FiUser } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import ModalDelete from "../ModalAdmin/ModalDelete";
import ModalAddNewUser from "../ModalAdmin/ModalAddNewUser";

function TableListUser() {
  const language = useSelector(state => state.app.language)
  const [currentRole, setCurrentRole] = useState(keyMap.ADMIN)
  const [listUsers, setListUsers] = useState([])
  const [isShowModelAddNew, setIsShowModalAddNew] = useState();
  const handleClose = () => {
    setIsShowModalAddNew(false);
  };

  const [accountNumber, setAccountNumber] = useState({})
  const [isHideModalEditAgency, setIsHideModalEditAgency] = useState(false);
  const [isHideModalDeleteAgency, setIsHideModalDeleteAgency] = useState(false);
  const userSelected = useRef();

  const optionGender = [
    { valueEN: "Male", valueVI: "Nam", id: keyMap.MALE },
    { valueEN: "Female", valueVI: "Nữ", id: keyMap.FEMALE },
  ]

  const getListUsers = async () => {
    let response = await getAllUserByAdminService(currentRole)
    if (response && response.errCode === 0) {
      setListUsers(response.data.listUsers)
      setAccountNumber(response.data.numberCount)
    } else {
      toast.error(language === keyMap.EN ? response.messageEN : response.messageVI)
    }
  }

  useEffect(() => {
    getListUsers()
  }, [currentRole])

  const handleShowEditUser = (item) => {
    setIsHideModalEditAgency(true);
    // setListEditAgency(item);
  };

  const handleDeleteUser = (item) => {
    userSelected.current = item;
    handleShowDeleteAgency(item);
  };


  const handleHideModalEditUser = () => {
    setIsHideModalEditAgency(false);
  };

  const handleHideModalDeleteUser = () => {
    setIsHideModalDeleteAgency(false);
  };

  const handleShowDeleteAgency = (item) => {
    setIsHideModalDeleteAgency(true);
    // setListDeleteAgency(item);
  };

  return (
    <>
      <div className="my-3 d-flex justify-content-between">
        <span> User:</span>
        <div class="d-grid gap-2 d-md-flex justify-content-md-end">
          <button
            className="btn btn-primary d-flex align-items-center "
            onClick={() => setIsShowModalAddNew(true)}
          >
            <MdNoteAdd />
            Add new User
          </button>
        </div>
      </div>

      <div className="menu_container">
        <div
          className={`menu_container--content ${currentRole === keyMap.ADMIN
            ? "menu_container--color"
            : ""
            }`}
          onClick={() => setCurrentRole(keyMap.ADMIN)}
        >
          {language === keyMap.EN ? "Admin" : "Quản trị viên"} ({accountNumber[keyMap.ADMIN]})
        </div>
        <div
          className={`menu_container--content ${currentRole === keyMap.SUPPLIER
            ? "menu_container--color"
            : ""
            }`}
          onClick={() => setCurrentRole(keyMap.SUPPLIER)}
        >
          {language === keyMap.EN ? "Supplier" : "Đại lý"} ({accountNumber[keyMap.SUPPLIER]})
        </div>

        <div
          className={`menu_container--content ${currentRole === keyMap.USER
            ? "menu_container--color"
            : ""
            }`}
          onClick={() => setCurrentRole(keyMap.USER)}
        >
          {language === keyMap.EN ? "User" : "Người dùng"} ({accountNumber[keyMap.USER]})
        </div>

      </div>

      <Table striped bordered hover variant="light">
        <thead>
          <tr>
            <th>Stt</th>
            <th>Email</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Address</th>
            <th>Phone Number</th>
            <th>Gender</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {
            listUsers.length > 0 ?
              listUsers.map((item, index) => (
                <tr key={item.id}>
                  <td>{index}</td>
                  <td>{item.accountUserData?.email}</td>
                  <td>{item.firstName}</td>
                  <td>{item.lastName}</td>
                  <td>{item.address}</td>
                  <td>{item.phoneNumber}</td>
                  <td>{language === keyMap.EN ? optionGender.find(gender => gender.id === item.genderId).valueEN : optionGender.find(gender => gender.id === item.genderId).valueVI}</td>
                  <td>
                    <FiEdit
                      className="icon_CRUD"
                      onClick={() => {
                        userSelected.current = item;
                        handleShowEditUser(item);
                      }}
                    />
                    <RiDeleteBin6Line
                      className="icon_CRUD"
                      onClick={() => handleDeleteUser(item)}
                    />
                  </td>
                </tr>

              )) :
              <tr>Không có dữ liệu</tr>
          }

        </tbody>
      </Table>

      <ModalAddNewUser show={isShowModelAddNew} handleClose={handleClose} getListUsers={getListUsers} setCurrentRole={setCurrentRole} />

      <ModalEdit
        show={isHideModalEditAgency}
        handle={handleHideModalEditUser}
        data={userSelected.current}
        getListUsers={getListUsers}
        currentRole={currentRole}
      />
      <ModalDelete
        show={isHideModalDeleteAgency}
        handle={handleHideModalDeleteUser}
        userSelected={userSelected.current}
        currentRole={currentRole}
        getListUsers={getListUsers}
      />
    </>
  );
}
export default TableListUser;
