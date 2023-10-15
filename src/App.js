import "./App.scss";
import { Routes, Route } from "react-router-dom";

import Supplier from "./views/Supplier";
import Login from "./components/Authenticator/Login";
import Home from "./components/Home";
import ListProductOfSupplier from "./components/Agency/ListProductOfSupplier";
import ListTransactionOfSupplier from "./components/Agency/ListTransactionOfSupplier";
import HistoryOfShop from "./components/Agency/HistoryOfShop";
import Authenticate from "./components/Authenticator/Authenticate";
import Admin from "./views/Admin";
import ListAgencyOfAdmin from "./components/Admin/ListAgencyOfAdmin";
import ListUserOfAdmin from "./components/Admin/ListUserOfAdmin";
import HistoryOfAdmin from "./components/Admin/HistoryOfAdmin";
function App() {
  return (
    <>
      <Authenticate>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/admin" element={<Admin />}>
            <Route path="list-agency" element={<ListAgencyOfAdmin />} />
            <Route path="list-user" element={<ListUserOfAdmin />} />
            <Route path="list-history" element={<HistoryOfAdmin />} />
          </Route>
          <Route path="/supplier" element={<Supplier />}>
            <Route path="list-product" element={<ListProductOfSupplier />} />
            <Route
              path="list-transaction"
              element={<ListTransactionOfSupplier />}
            />
            <Route path="history" element={<HistoryOfShop />} />
          </Route>
        </Routes>
      </Authenticate>
    </>
  );
}

export default App;
