import Header from "./Header";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
function Admin() {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("list-history");
  }, []);
  return (
    <>
      <Header title="Trang Admin" />
      <Outlet />
    </>
  );
}
export default Admin;
