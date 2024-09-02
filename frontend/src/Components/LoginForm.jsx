import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { LoginSchema } from "../Validations/loginValidation";
import { Login } from "../Axios/Services/CommonServices";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { UserLogin } from "../Redux/UserSlice";
import { AdminLogin } from "../Redux/AdminSlice";

const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmit = async () => {
    try {
      const response = await Login(values);

      if (response?.status == 200) {
        toast.success(response?.message);
        if (response?.person == "user") {
          dispatch(
            UserLogin({
              refreshToken: response?.refresh,
              accessToken: response?.access,
              user: { username: response?.username, person: response?.person },
              premium: response?.premium,
              requested: response?.requested,
            })
          );
          navigate("/");
        } else if (response.person === "admin") {
          dispatch(
            AdminLogin({
              refreshToken: response?.refresh,
              accessToken: response?.access,
              admin: { username: response?.username, person: response?.person },
            })
          );
          navigate("/admin/dashboard");
        }
      } else if (response?.status === 700) {
        toast.error(response?.message);
      } else if (response?.status === 800) {
        toast.error(response?.message);
      } else if (response?.status === 404) {
        toast.error(response?.message);
      } else {
        toast.error("something went wrong");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Formikk

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      validationSchema: LoginSchema,
      onSubmit,
    });

  return (
    <section className="bg-primary h-screen ">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        {/* <h1 className="flex items-center mb-6 text-4xl font-semibold text-btnColor">
      Bon Appetit 
      </h1> */}

        <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 ">
          <div className=" p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight ml-[40%]  tracking-tight text-gray-900 md:text-2xl ">
              LogIn
            </h1>
            <form
              className="space-y-4 md:space-y-6"
              onSubmit={handleSubmit}
              encType="multipart/form-data"
            >
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="Enter your Email"
                />
                {errors.email && touched.email && (
                  <p className="text-red-600">{errors.email}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Enter your Password"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                />
                {errors.password && touched.password && (
                  <p className="text-red-600">{errors.password}</p>
                )}
              </div>

              <button
                type="submit"
                className="w-full text-white bg-btnColor hover:bg-newPeach hover:text-black font-medium rounded-lg text-sm px-5 py-2.5 text-center "
              >
                LogIn
              </button>
              <p className="text-sm font-light text-gray-500 ">
                Don't have an account?{" "}
                <Link
                  to={"/register"}
                  className="font-medium text-primary-600 hover:underline "
                >
                  SignUp here
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginForm;
