import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Header = () => {
  const initialValues = {
    username: "",
    email: "",
    password: "",
    phoneNumber: "",
  };

  const navigate = useNavigate();

  const [User, setUser] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [accountType, setAccountType] = useState("candidate");
  const [message, setMessage] = useState();
  const [data, setData] = useState();

  const [isLoggedin, setIsLoggedin] = useState(false);
  const [Type, setType] = useState(false);

  const location = useLocation();
  const employerType = localStorage.getItem("accountType");

  console.log("employerType", employerType);

  useEffect(() => {
    if (employerType === "employer") {
      setType(true);
    } else {
      setType(false);
    }
  });

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setIsLoggedin(true);
    } else {
      setIsLoggedin(false);
    }
  }, [location.pathname]);

  console.log("check ====", isLoggedin);

  // HANDLE LOGOUT EVENT
  const logout = (event) => {
    event.preventDefault();

    console.log(isLoggedin);

    localStorage.removeItem("token");
    localStorage.removeItem("userInfo");
    localStorage.removeItem("accountType");
    setIsLoggedin(false);
    navigate("/login");
  };

  // const [error, setError] = useState()

  // const [state, setState] = useState('')

  const candidates = (name) => {
    setAccountType(name);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...User, [name]: value });
  };

  // useEffect(() => {
  // 	console.log(message);
  // 	if(Object.keys(message).length === 0 && isSubmit) {
  // 		console.log(User);

  // 	}
  // },[])

  const handleSubmit = (e) => {
    e.preventDefault();
    const { username, email, password, phoneNumber } = User;

    const object = {
      username: username.trim(),
      email: email.trim(),
      password: password.trim(),
      phoneNumber: phoneNumber.trim(),
      accountType: accountType,
    };

    setFormErrors(validate(User));

    // add entity - POST
    // e.preventDefault();
    // creates entity
    const passwordLength2 = /^.{6,}$/;
    // const regex1 = /^[^@]+@(yahoo|gmail|mail)\.(com)$/i;
    // /^[^@]+@(yahoo|gmail|mail|rocketmail)\.(com|in|co\.uk)$/i;
    const regex1 = /^[^@]+@(yahoo|gmail|mail)\.(com)$/i;
    if (
      username.trim() === "" ||
      email.trim() === "" ||
      password.trim() === "" ||
      phoneNumber.trim() === "" ||
      regex1.test(email.trim()) === false ||
      passwordLength2.test(password.trim()) === false
    ) {
      return;
    } else {
      fetch("http://localhost:5000/register", {
        method: "POST",
        mode: "cors",
        body: JSON.stringify(object),
        headers: {
          "Content-type": "application/json",
          Accept: "application/json",
        },
      })
        .then((response) => response.json(console.log(response)))

        .then((json) => {
          setData({
            User: json,
          });

          if (json.message === "successfully register") {
            navigate("/login");
          }
          // if (json.message === "successfully register") {
          //   navigate("/login");
          // }
          // setMessage(json.message);
          console.log(json);
        })
        .catch((err) => {
          console.log(err);
        });
      // setState(valid(json.message));

      setIsSubmit(true);
    }
  };

  useEffect(() => {
    const res = data?.User?.message;
    setMessage(res);
  }, [data]);

  useEffect(() => {
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(User);
      // fetchData()
    }
  }, [formErrors, User, isSubmit]);

  const validate = (values) => {
    const errors = {};

    const passwordLength = /^.{6,}$/;
    const regex = /^[^@]+@(yahoo|gmail|mail)\.(com)$/i;
    if (!values.username) {
      errors.username = "!'Please Enter Your Name'";
    }
    if (!values.email) {
      errors.email = "!'Please Enter Your Email'";
    } else if (!regex.test(values.email)) {
      errors.email = "!'This is not Email Format'";
    }
    if (!values.password) {
      errors.password = "!'Please Enter Your Password'";
    } else if (!passwordLength.test(values.password)) {
      errors.password = "!'Please Enter maximum 6 character'";
    }

    if (!values.phoneNumber) {
      errors.phoneNumber = "!'Please Enter phoneNumber Number'";
    }
    return errors;
  };

  const [fetchAllcompanyDetails, setFetchAllcompanyDetails] = useState([]);
  const [load, setLoad] = useState(false);
  useEffect(() => {
    // setIsLoading(true);

    const tokenID = localStorage.getItem("token");
    fetch("http://localhost:5000/companyDetails", {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        authorization: `${tokenID}`,
      },
    })
      .then((res) => res.json(console.log(res)))
      .then((response) => {
        setFetchAllcompanyDetails(response.message);
        if (response.message.length < 1) {
          setLoad(true);
        }

        console.log(load);

        // setFetchData(filterData[0]);
        // console.log(fetchData[0]);
        // setIsLoading(false);
        console.log(response.message.length);

        console.log(response.message);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <header className="site-header header-style-3 mobile-sider-drawer-menu">
        <div className="sticky-header main-bar-wraper  navbar-expand-lg">
          <div className="main-bar">
            <div className="container-fluid clearfix">
              <div className="logo-header">
                <div className="logo-header-inner logo-header-one">
                  <Link to="/">
                    <img src="jobzilla/images/logo-dark.png" alt="" />
                  </Link>
                </div>
              </div>

              {/* <!-- NAV Toggle Button --> */}
              <button
                id="mobile-side-drawer"
                data-target=".header-nav"
                data-toggle="collapse"
                type="button"
                className="navbar-toggler collapsed"
              >
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar icon-bar-first"></span>
                <span className="icon-bar icon-bar-two"></span>
                <span className="icon-bar icon-bar-three"></span>
              </button>

              {/* <!-- MAIN Vav --> */}
              <div className="nav-animation header-nav navbar-collapse collapse d-flex justify-content-center">
                <ul className=" nav navbar-nav">
                  <li className="has-child">
                    <Link to="">Home</Link>
                    {/* <ul className="sub-menu">
                      <li>
                        <Link to="/">Home-1</Link>
                      </li>
                      <li>
                        <Link to="index-2">Home-2</Link>
                      </li>
                      <li>
                        <Link to="index-3">Home-3</Link>
                      </li>
                      <li>
                        <Link to="index-4">Home-4</Link>
                      </li>
                      <li>
                        <Link to="index-5">Home-5</Link>
                      </li>
                      <li>
                        <Link to="index-6">Home-6</Link>
                      </li>
                      <li>
                        <Link to="index-7">Home-7</Link>
                      </li>
                    </ul> */}
                  </li>
                  <li className="has-child">
                    <Link to="">Jobs</Link>
                    <ul className="sub-menu">
                      <li>
                        <Link to="job-grid">Jobs Grid</Link>
                      </li>
                      <li>
                        <Link to="job-grid-with-map">Jobs Grid with Map</Link>
                      </li>
                      <li>
                        <Link to="job-list">Jobs List</Link>
                      </li>
                      <li className="has-child">
                        <Link to="">Job Detail</Link>
                        <ul className="sub-menu">
                          <li>
                            <Link to="job-detail">Detail 1</Link>
                          </li>
                          <li>
                            <Link to="job-detail-v2">Detail 2 </Link>
                          </li>
                        </ul>
                      </li>
                      <li>
                        <Link to="apply-job">Apply Jobs</Link>
                      </li>
                    </ul>
                  </li>
                  {isLoggedin === true ? (
                    <li className="has-child">
                      <Link>Employers</Link>

                      <ul className="sub-menu">
                        <li>
                          <Link to="/employer-profile">Profile</Link>
                        </li>
                        <li>
                          <Link to="/employer-list">Employers List</Link>
                        </li>
                      </ul>
                    </li>
                  ) : (
                    <>
                      <li className="has-child">
                        <Link>Employers</Link>
                        <ul className="sub-menu">
                          <li
                            data-bs-toggle="modal"
                            href="#exampleModalToggle2"
                            role="button"
                          >
                            <Link>Profile</Link>
                          </li>
                          <li>
                            <Link to="/employer-list">Employers List</Link>
                          </li>
                        </ul>
                      </li>
                    </>
                  )}

                  <li className="has-child">
                    <Link to="">Pages</Link>
                    <ul className="sub-menu">
                      <li>
                        <Link to="about-1">About Us</Link>
                      </li>
                      <li>
                        <Link to="pricing">Pricing</Link>
                      </li>
                      <li>
                        <Link to="error-404">Error-404</Link>
                      </li>
                      <li>
                        <Link to="faq">FAQ's</Link>
                      </li>
                      <li>
                        <Link to="contact">Contact Us</Link>
                      </li>
                      <li>
                        <Link to="under-maintenance">Under Maintenance</Link>
                      </li>
                      <li>
                        <Link to="coming-soon">Coming soon</Link>
                      </li>
                      <li>
                        <Link to="login">Login</Link>
                      </li>
                      <li>
                        <Link to="after-login">After Login</Link>
                      </li>
                      <li>
                        <Link to="icons">Icons</Link>
                      </li>
                    </ul>
                  </li>
                  {isLoggedin === true && Type === false ? (
                    <li className="has-child">
                      <Link>Candidates</Link>
                      <ul className="sub-menu">
                        <li>
                          <Link to="candidate-dashboard">Dashboard</Link>
                        </li>
                        <li>
                          <Link to="/candidate-list">Candidates List</Link>
                        </li>
                      </ul>
                    </li>
                  ) : Type === false ? (
                    <li className="has-child">
                      <Link
                        data-bs-toggle="modal"
                        href="#exampleModalToggle2"
                        role="button"
                      >
                        Candidates
                      </Link>
                      <ul className="sub-menu">
                        <li>
                          <Link to="/candidate-list">Candidates List</Link>
                        </li>
                      </ul>
                    </li>
                  ) : (
                    <li className="has-child">
                      <Link>Candidates</Link>
                      <ul className="sub-menu">
                        <li>
                          <Link to="/candidate-list">Candidates List</Link>
                        </li>
                      </ul>
                    </li>
                  )}
                  <li className="has-child">
                    <Link to="">Blog</Link>
                    <ul className="sub-menu">
                      <li>
                        <Link to="blog">Blog</Link>
                      </li>
                      <li>
                        <Link to="blog-grid">Blog Grid</Link>
                      </li>
                      <li>
                        <Link to="blog-grid-2">Blog Grid-2</Link>
                      </li>
                      <li>
                        <Link to="blog-list">Blog List</Link>
                      </li>
                      <li>
                        <Link to="blog-single">Blog Detail</Link>
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>

              {/* <!-- Header Right Section--> */}
              <div className="extra-nav header-2-nav">
                <div className="extra-cell">
                  <div className="header-search">
                    <button
                      type="button"
                      data-bs-toggle="modal"
                      data-bs-target="#staticBackdrop"
                      className="header-search-icon bg-transparent border-0 text-primary fs-4"
                    >
                      <i className="feather-search"></i>
                    </button>
                  </div>
                </div>

                <div className="extra-cell">
                  <div className="header-nav-btn-section">
                    {isLoggedin === false ? (
                      <div className="twm-nav-btn-left">
                        <Link
                          className="twm-nav-sign-up fs-6"
                          data-bs-toggle="modal"
                          to="#sign_up_popup"
                          role="button"
                        >
                          <i className="feather-log-in"></i> Sign Up
                        </Link>
                      </div>
                    ) : (
                      <div className="twm-nav-btn-left">
                        <Link
                          className="twm-nav-sign-up fs-6"
                          onClick={logout}
                          role="button"
                        >
                          <i className="feather-log-in"></i> Log Out
                        </Link>
                      </div>
                    )}

                    {isLoggedin === true && load === false ? (
                      <div className="twm-nav-btn-right ">
                        <Link
                          to="/employer-post-job"
                          className="twm-nav-post-a-job fs-6"
                        >
                          <i className="feather-briefcase"></i> Post a job
                        </Link>
                      </div>
                    ) : (
                      <div
                        className="twm-nav-btn-right "
                        data-bs-toggle="modal"
                        href="#exampleModalToggle"
                        role="button"
                      >
                        <Link className="twm-nav-post-a-job fs-6 ">
                          <i className="feather-briefcase"></i> Post a job
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* <!-- SITE Search --> */}
          <div id="search">
            <span className="close"></span>
            <form
              role="search"
              id="searchform"
              action="https://thewebmax.org/search"
              method="get"
              className="radius-xl"
            >
              <input
                className="form-control"
                value=""
                name="q"
                type="search"
                placeholder="Type to search"
              />
              <span className="input-group-append">
                <button type="button" className="search-btn">
                  <i className="fa fa-paper-plane"></i>
                </button>
              </span>
            </form>
          </div>
        </div>

        <div
          className="modal fade twm-sign-up"
          id="sign_up_popup"
          aria-hidden="true"
          aria-labelledby="sign_up_popupLabel"
          tabIndex="-1"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h2 className="modal-title" id="sign_up_popupLabel">
                  Sign Up
                </h2>
                <p>Sign Up and get access to all the features of Jobzilla</p>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>

              <div className="modal-body">
                <div className="twm-tabs-style-2">
                  <form onSubmit={handleSubmit}>
                    <ul className="nav nav-tabs mb-3" id="myTab" role="tablist">
                      {/* <!--Signup Candidate-->   */}
                      <li className="nav-item" role="presentation">
                        <button
                          name="candidate"
                          className="nav-link active"
                          data-bs-toggle="tab"
                          value="candidate"
                          onChange={handleChange}
                          onClick={() => candidates("candidate")}
                          data-bs-target="#sign-candidate"
                          type="button"
                        >
                          <i className="fas fa-user-tie"></i>Candidate
                        </button>
                      </li>
                      {/* <!--Signup Employer--> */}
                      <li className="nav-item" role="presentation">
                        <button
                          name="employer"
                          value="employer"
                          onChange={handleChange}
                          onClick={() => candidates("employer")}
                          className="nav-link"
                          data-bs-toggle="tab"
                          data-bs-target="#sign-Employer"
                          type="button"
                        >
                          <i className="fas fa-building"></i>Employer
                        </button>
                      </li>
                    </ul>
                    <div className="tab-content" id="myTabContent">
                      {/* <!--Signup Candidate Content-->   */}
                      <div
                        className="tab-pane fade show active"
                        id="sign-candidate"
                      >
                        <input
                          name="username"
                          type="text"
                          onChange={handleChange}
                          required=""
                          className="form-control"
                          placeholder="Username*"
                        />

                        <p style={{ color: "red" }}>{formErrors.username}</p>

                        <input
                          name="email"
                          type="email"
                          onChange={handleChange}
                          className="form-control"
                          required=""
                          placeholder="Email*"
                        />

                        <p style={{ color: "red" }}>{formErrors.email}</p>

                        <input
                          name="password"
                          type="password"
                          onChange={handleChange}
                          className="form-control"
                          required=""
                          placeholder="Password*"
                        />

                        <p style={{ color: "red" }}>{formErrors.password}</p>

                        <input
                          name="phoneNumber"
                          type="number"
                          onChange={handleChange}
                          className="form-control"
                          required=""
                          placeholder="phoneNumber*"
                        />

                        <p style={{ color: "red" }}>{formErrors.phoneNumber}</p>

                        <div className="col-lg-12">
                          <div className="form-group mb-3">
                            <div className=" form-check">
                              <p>
                                Already registered?
                                <Link className="twm-backto-login" to="/login">
                                  Log in here
                                </Link>
                              </p>
                            </div>
                          </div>
                        </div>

                        <button type="submit" className="site-button ">
                          Sign Up
                        </button>

                        {message === "successfully register" ? (
                          <span className="text-primary">{message}</span>
                        ) : (
                          <span className="text-danger">{message}</span>
                        )}
                      </div>
                    </div>
                  </form>
                  {/* <!--Signup Employer Content-->  */}
                  {/* 
                  
                  
                  <div className="tab-pane fade" id="sign-Employer">
                        <div className="row">
                          <div className="col-lg-12">
                            <div className="form-group mb-3">
                              <input
                                name="username"
                                type="text"
                                required=""
                                className="form-control"
                                placeholder="Usearname*"
                              />
                            </div>
                          </div>

                          <div className="col-lg-12">
                            <div className="form-group mb-3">
                              <input
                                name="email"
                                type="text"
                                className="form-control"
                                required=""
                                placeholder="Password*"
                              />
                            </div>
                          </div>

                          <div className="col-lg-12">
                            <div className="form-group mb-3">
                              <input
                                name="phoneNumber"
                                type="text"
                                className="form-control"
                                required=""
                                placeholder="Email*"
                              />
                            </div>
                          </div>

                          <div className="col-lg-12">
                            <div className="form-group mb-3">
                              <input
                                name="phoneNumber"
                                type="text"
                                className="form-control"
                                required=""
                                placeholder="phoneNumber*"
                              />
                            </div>
                          </div>

                          <div className="col-lg-12">
                            <div className="form-group mb-3">
                              <div className=" form-check">
                                <input
                                  type="checkbox"
                                  className="form-check-input"
                                  id="agree2"
                                />
                                <label className="form-check-label" for="agree2">
                                  I agree to the{" "}
                                  <Link to="">Terms and conditions</Link>
                                </label>
                                <p>
                                  Already registered?
                                  <button
                                    className="twm-backto-login"
                                    data-bs-target="#sign_up_popup2"
                                    data-bs-toggle="modal"
                                    data-bs-dismiss="modal"
                                  >
                                    Log in here
                                  </button>
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="col-md-12">
                            <button type="submit" className="site-button">
                              Sign Up
                            </button>
                          </div>
                        </div>
                      </div> */}
                </div>
              </div>

              <div className="modal-footer">
                <span className="modal-f-title">Login or Sign up with</span>
                <ul className="twm-modal-social">
                  <li>
                    <Link to="javascript.html" className="facebook-clr">
                      <i className="fab fa-facebook-f"></i>
                    </Link>
                  </li>
                  <li>
                    <Link to="javascript.html" className="twitter-clr">
                      <i className="fab fa-twitter"></i>
                    </Link>
                  </li>
                  <li>
                    <Link to="javascript.html" className="linkedin-clr">
                      <i className="fab fa-linkedin-in"></i>
                    </Link>
                  </li>
                  <li>
                    <Link to="javascript.html" className="google-clr">
                      <i className="fab fa-google"></i>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </header>
      <div
        class="modal fade"
        id="exampleModalToggle"
        aria-hidden="true"
        data-bs-backdrop="static"
        aria-labelledby="exampleModalToggleLabel"
        tabindex="-1"
      >
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalToggleLabel">
                Modal 1
              </h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              Please Complete your Employer Profile and then you can post job.
            </div>
            <div class="modal-footer">
              <button
                class="btn btn-primary"
                type="button"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                {" "}
                <Link to="/employer-profile">GO {">>>"}</Link>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
        class="modal fade"
        style={{ background: "#00000052" }}
        id="exampleModalToggle2"
        aria-hidden="true"
        data-bs-backdrop="static"
        aria-labelledby="exampleModalToggleLabel2"
        tabindex="-1"
      >
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body text-center">
              <h3>Please First Candidate Login</h3>
            </div>
            <div class="modal-footer justify-content-center">
              <button
                class="btn btn-primary"
                type="button"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                {" "}
                <Link to="/login" className="text-white">
                  GO {">>>"}
                </Link>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
        className="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        style={{ background: "#00000052" }}
        tabIndex={-1}
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog radius-xl  modal-fullscreen">
          <div className="modal-content">
            <div className="modal-header">
              <button
                type="button"
                className="btn-close "
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body">
              <form
                className=" radius-xl"
                role="search"
                id="searchform"
                action="https://thewebmax.org/search"
                //   method="get"
              >
                <input
                  className="form-control"
                  value=""
                  name="q"
                  type="search"
                  placeholder="Type to search"
                />
                <span className="input-group-append">
                  <button type="button" className="search-btn">
                    <i className="fa fa-paper-plane"></i>
                  </button>
                </span>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* <!-- HEADER END --> */}
    </div>
  );
};

export default Header;
