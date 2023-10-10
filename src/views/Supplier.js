
import { useSelector } from "react-redux";
import Header from "./Header";
import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { keyMap } from "../utils/constant";
function Supplier() {
  const navigate = useNavigate()
  const userData = useSelector(state => state.app.userData)

  useEffect(() => {
    if (userData?.roleId !== keyMap.SUPPLIER) {
      return navigate("/home")
    } else if (userData) {
      return navigate("/supplier/list-product")
    } else {
      return navigate("/")
    }
  }, [])

  return (
    <>
      <Header title="Trang Agency" />
      <Outlet />
    </>
  );
}
export default Supplier;
