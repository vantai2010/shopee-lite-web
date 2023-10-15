import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { keyMap } from "../utils/constant";

function Home() {
  const navigate = useNavigate();
  const userData = useSelector((state) => state.app.userData);
  useEffect(() => {
    if (!userData?.roleId || userData?.roleId === keyMap.USER) {
      return navigate("/");
    }
  }, []);

  return (
    <>
      {userData && userData?.roleId && userData?.roleId === keyMap.ADMIN ? (
        <Navigate to="/admin" />
      ) : (
        <Navigate to="/supplier" />
      )}
    </>
  );
}

export default Home;
