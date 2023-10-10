import { useState } from "react";
import "../../styles/Login.scss";
import "../../styles/Root.scss";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { environment, keyMap } from "../../utils/constant";
import { fetchLoginThunk } from "../../store/slices/appSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function Login() {
  const language = useSelector(state => state.app.language)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [showPassWord, setShowPassWord] = useState(true);

  const [inputForm, setInputForm] = useState({
    email: "",
    password: ""
  });

  const [errMess, setErrMess] = useState({
    email: "",
    password: "",
    result: ""
  });

  const handleOnChange = (type, event) => {
    setInputForm({ ...inputForm, [type]: event.target.value })
  }

  const handleShowPassword = () => {
    setShowPassWord(!showPassWord);
  };
  //

  const handleLogin = async () => {
    let { email, password } = inputForm
    if (!email.trim()) {
      setErrMess({
        email: language === keyMap.EN ? "Please enter this field" : "Vui lòng nhập trường này",
        password: "",
        result: ""
      })
      return
    }
    if (!password.trim()) {
      setErrMess({
        email: "",
        password: language === keyMap.EN ? "Please enter this field" : "Vui lòng nhập trường này",
        result: ""
      })
      return
    }

    let response = await dispatch(fetchLoginThunk(inputForm))
    let data = unwrapResult(response)
    if (data && data.errCode === 0) {
      if (data.roleId === keyMap.USER) {
        return toast.error(language === keyMap.EN ? "Your account is not authorized to be accessed" : "Tài khoản của bạn không được phép truy cập")
      }
      navigate("/home")
      localStorage.setItem(environment.REACT_APP_LOCAL_STORE_TOKEN_NAME, data.token)
      toast.success(language === keyMap.EN ? data?.messageEN : data?.messageVI)
    } else {
      setErrMess({
        email: "",
        password: "",
        result: language === keyMap.EN ? data?.messageEN : data?.messageVI
      })
      return
    }

  }


  return (
    <>
      <div className="block">
        <div className="block_container">
          <div className="block_container--left">
            <div className="block_container--left--title">
              <p>LOGIN</p>
              <p>
                Chu Văn Tài - 195365 <br />
                Trần Văn Thuận - 195365 <br />
                Tạ Đình Hiếu - 195365
                <br />
                Phan Tiến Đạt - 195365
              </p>
            </div>
          </div>
          <div className="block_container--right">
            <div className="login_container">
              <div className="login_container--title">
                <h1>Hello !</h1>
                <p>Sign Up to Get Started</p>
              </div>
              <div className="login_container--button">
                <div className="login_container--button--number">
                  <input
                    type="tel"
                    placeholder="Account..."
                    onChange={e => handleOnChange("email", e)}
                  />
                  <p style={{ color: "red" }}>{errMess.email}</p>
                </div>
                <div className="login_container--button--password">
                  <div>
                    <input
                      type={showPassWord ? "password" : "text"}
                      placeholder="Password..."
                      onChange={e => handleOnChange("password", e)}
                    />
                    <p style={{ color: "red" }}>{errMess.password}</p>
                  </div>
                  <div>
                    {showPassWord ? (
                      <AiFillEyeInvisible
                        onClick={handleShowPassword}
                        className="password_show"
                      />
                    ) : (
                      <AiFillEye
                        onClick={handleShowPassword}
                        className="password_show"
                      />
                    )}
                  </div>
                  <div>
                    <p style={{ color: "red" }}>{errMess.result}</p>
                    <button onClick={handleLogin}>Login</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Login;
