import Table from "react-bootstrap/Table";
import { FiUser } from "react-icons/fi";
import { GiConfirmed } from "react-icons/gi";

import ModalTransaction from "../Modal/ModalTransaction";
import "../../../styles/TableListTransaction.scss";
import { useState } from "react";
import { keyMap, transactionType } from "../../../utils/constant";
import { useSelector } from "react-redux";
import { confirmTransactionSuccessService, getTransactionByStatusIdService } from "../../../services/appService";
import { toast } from "react-toastify";
import { useEffect } from "react";

function TableListTransaction() {
  const language = useSelector(state => state.app.language)
  const userData = useSelector(state => state.app.userData)
  const [showModalTransaction, setShowModalTransaction] = useState(false);
  const notifySocket = useSelector(state => state.app.notifySocket);
  const [transactionData, setTransactionData] = useState({})

  const handleHideModalTransaction = () => {
    setShowModalTransaction(false);
  };
  const handleShowModalTransaction = () => {
    setShowModalTransaction(true);
  };
  const [selectedItem, setSelectedItem] = useState(transactionType.CHOXACNHAN_CHUATHANHTOAN);

  const handleClick = async (type) => {
    setSelectedItem(type);
    let response = await getTransactionByStatusIdService(type)
    if (response && response.errCode === 0) {
      setTransactionData(response.data)

    } else {
      toast.error(language === keyMap.EN ? response.messageEN : response.messageVI)
    }
  };

  useEffect(() => {
    handleClick(transactionType.CHOLAYHANG_CHUATHANHTOAN)
  }, [])
  useEffect(() => {
    const handleNotificationUpdate = () => {
      handleClick(selectedItem)
    }
    notifySocket?.on("update-notification", handleNotificationUpdate)
    return () => {
      notifySocket?.off("update-notification", handleNotificationUpdate);
    };
  }, [notifySocket])

  const handleConfirmTransaction = async (item) => {
    console.log(item, userData)
    let response = await confirmTransactionSuccessService({ cartId: item.id })
    if (response && response.errCode === 0) {
      handleClick(selectedItem)
      toast.success(language === keyMap.EN ? response.messageEN : response.messageVI)

      notifySocket?.emit("supplier-confirm-order", {
        statusOrder: selectedItem,
        productId: item.productId,
        senderId: userData.id,
        receiverId: item.userId,
        nameProduct: item.productCartData?.name
      })

    } else {
      toast.error(language === keyMap.EN ? response.messageEN : response.messageVI)
    }
  }

  return (
    <>
      <div className="menu_container">
        <div
          className={`menu_container--content ${selectedItem === transactionType.CHOXACNHAN_CHUATHANHTOAN
            ? "menu_container--color"
            : ""
            }`}
          onClick={() => handleClick(transactionType.CHOXACNHAN_CHUATHANHTOAN)}
        >
          {language === keyMap.EN ? "Waiting for confirm (Unpaid)" : "Chờ xác nhận (Chưa thanh toán)"} ({transactionData.transCount && transactionData.transCount[transactionType.CHOXACNHAN_CHUATHANHTOAN]})
        </div>

        <div
          className={`menu_container--content ${selectedItem === transactionType.CHOXACNHAN_DATHANHTOAN
            ? "menu_container--color"
            : ""
            }`}
          onClick={() => handleClick(transactionType.CHOXACNHAN_DATHANHTOAN)}
        >
          {language === keyMap.EN ? "Waiting for confirm (paid)" : "Chờ xác nhận (Đã thanh toán)"} ({transactionData.transCount && transactionData.transCount[transactionType.CHOXACNHAN_DATHANHTOAN]})
        </div>

        <div
          className={`menu_container--content ${selectedItem === transactionType.CHOLAYHANG_CHUATHANHTOAN
            ? "menu_container--color"
            : ""
            }`}
          onClick={() => handleClick(transactionType.CHOLAYHANG_CHUATHANHTOAN)}
        >
          {language === keyMap.EN ? "Waiting for delivery (Unpaid)" : "Chờ lấy hàng (Chưa thanh toán)"} ({transactionData.transCount && transactionData.transCount[transactionType.CHOLAYHANG_CHUATHANHTOAN]})
        </div>
        <div
          className={`menu_container--content ${selectedItem === transactionType.CHOLAYHANG_DATHANHTOAN ? "menu_container--color" : ""
            }`}
          onClick={() => handleClick(transactionType.CHOLAYHANG_DATHANHTOAN)}
        >
          {language === keyMap.EN ? "Waiting for delivery (Paid)" : "Chờ lấy hàng (Đã thanh toán)"} ({transactionData.transCount && transactionData.transCount[transactionType.CHOLAYHANG_DATHANHTOAN]})
        </div>
        <div
          className={`menu_container--content ${selectedItem === transactionType.DANGSHIP_CHUATHANHTOAN ? "menu_container--color" : ""
            }`}
          onClick={() => handleClick(transactionType.DANGSHIP_CHUATHANHTOAN)}
        >
          {language === keyMap.EN ? "Shipping (Unpaid)" : "Đang vận chuyển (Chưa thanh toán)"} ({transactionData.transCount && transactionData.transCount[transactionType.DANGSHIP_CHUATHANHTOAN]})
        </div>
        <div
          className={`menu_container--content ${selectedItem === transactionType.DANGSHIP_DATHANHTOAN ? "menu_container--color" : ""
            }`}
          onClick={() => handleClick(transactionType.DANGSHIP_DATHANHTOAN)}
        >
          {language === keyMap.EN ? "Shipping (Paid)" : "Đang vận chuyển (Đã thanh toán)"} ({transactionData.transCount && transactionData.transCount[transactionType.DANGSHIP_DATHANHTOAN]})
        </div>
      </div>
      <Table striped bordered hover variant="light">
        <thead>
          <tr>
            <th>ID</th>
            <th>Product Name</th>
            <th>Product Type</th>
            <th>quantity</th>
            <th>Buyer</th>
            <th>Price</th>
            <th>Address</th>
            <th>Time</th>
            <th>Details</th>

          </tr>
        </thead>
        <tbody>
          {
            transactionData.products?.map((item, index) => {
              return (
                <tr key={item.id}>
                  <td>{index}</td>
                  <td>{item.productCartData?.name}</td>
                  <td>{item.productTypeCartData?.type ? item.productTypeCartData?.type : ""} {item.productTypeCartData?.size ? `- ${item.productTypeCartData?.size}` : ""}</td>
                  <td>{item.quantity}</td>
                  <td>{language === keyMap.EN ? `${item.userCartData?.firstName} ${item.userCartData?.lastName}` : `${item.userCartData?.lastName} ${item.userCartData?.firstName}`}</td>
                  <td>{item.productFee}- ship:{item.shipFee}</td>
                  <td>{item.userCartData?.address}</td>
                  <td>{item.time}</td>
                  <td >
                    {
                      (selectedItem === transactionType.DANGSHIP_CHUATHANHTOAN || selectedItem === transactionType.DANGSHIP_DATHANHTOAN) ?
                        <FiUser className="icon_CRUD" onClick={handleShowModalTransaction} />
                        :
                        <>
                          <GiConfirmed onClick={() => handleConfirmTransaction(item)} />
                          <FiUser className="icon_CRUD" onClick={handleShowModalTransaction} />
                        </>
                    }
                  </td>
                </tr>
              )
            })
          }

        </tbody>
        <ModalTransaction
          show={showModalTransaction}
          handle={handleHideModalTransaction}
        />
      </Table>
    </>
  );
}
export default TableListTransaction;
