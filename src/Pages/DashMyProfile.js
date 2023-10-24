import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const DashMyProfile = () => {
  const navigate = useNavigate();
  const [load, setLoad] = useState(false);
  const accountType = localStorage.getItem("accountType");
  console.log(accountType);
  useEffect(() => {
    if (accountType === "admin") {
      setLoad(false);
    } else {
      setLoad(true);
    }
  }, []);

  const initialValues = {
    websiteUrl: "",
    qualification: "",
    language: "",
    jobCategory: "",
    experience: "",
    currentSalary: "",
    expectedSalary: "",
    age: "",
    country: "",
    city: "",
    pincode: "",
    address: "",
    description: "",
    facebook: "",
    linkedin: "",
    twitter: "",
  };

  //   const navigate = useNavigate();

  const [User, setUser] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [message, setMessage] = useState();
  const [data, setData] = useState();

  // const [error, setError] = useState()

  const [state, setState] = useState([]);
  const [candidates, setCandidates] = useState([]);

  const [userName, setUserName] = useState("");
  const [phone, setPhone] = useState("");
  const [Email, setEmail] = useState("");
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [qualification, setQualification] = useState("");
  const [language, setLanguage] = useState("");
  const [jobCategory, setJobCategory] = useState("");
  const [experience, setExperience] = useState("");
  const [currentSalary, setCurrentSalary] = useState("");

  const [expectedSalary, setEexpectedSalary] = useState("");
  const [age, setAge] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [pincode, setPincode] = useState("");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  const [facebook, setFacebook] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [twitter, setTwitter] = useState("");

  const [userInfo, setuserInfo] = useState({
    file: [],
    filepreview: null,
  });

  const handleInputChange = (event) => {
    setuserInfo({
      ...userInfo,
      file: event.target.files[0],
      filepreview: URL.createObjectURL(event.target.files[0]),
    });
  };
  console.log("userInfo.filepreview", userInfo?.filepreview);
  // const [isSucces, setSuccess] = useState(null);

  // const handleChange = (e)=>  {
  //   let name = e.target.name;
  //   let value = e.target.value;
  //   let User = { ...User };
  //   setUser({ ...User, [name]: value });
  //   console.log(User);
  //   // const { name, value } = e.target;
  //   // setUser({ ...User, [name]: value });
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // setFormErrors(validate(User));

    // add entity - POST
    // e.preventDefault();
    // creates entity

    // const regex1 = /^[^@]+@(yahoo|gmail|mail)\.(com)$/i;
    // /^[^@]+@(yahoo|gmail|mail|rocketmail)\.(com|in|co\.uk)$/i;
    // const regex1 = /^[^@]+@(yahoo|gmail|mail)\.(com)$/i;
    // if (
    //   websiteUrl.trim() === "" ||
    //   qualification.trim() === "" ||
    //   language.trim() === "" ||
    //   jobCategory.trim() === "" ||
    //   experience.trim() === "" ||
    //   currentSalary.trim() === "" ||
    //   expectedSalary.trim() === "" ||
    //   age.trim() === "" ||
    //   country.trim() === "" ||
    //   city.trim() === "" ||
    //   pincode.trim() === "" ||
    //   address.trim() === "" ||
    //   description.trim() === "" ||
    //   facebook.trim() === "" ||
    //   linkedin.trim() === "" ||
    //   twitter.trim() === ""
    // ) {
    //   return;
    // } else {

    const uploadImg = userInfo?.filepreview;
    console.log(uploadImg);
    const tokenID = localStorage.getItem("token");
    await fetch("http://localhost:5000/canditateDetails", {
      method: "POST",
      mode: "cors",
      body: JSON.stringify({
        uploadImg,
        websiteUrl,
        qualification,
        language,
        jobCategory,
        experience,
        currentSalary,
        expectedSalary,
        age,
        country,
        city,
        pincode,
        address,
        description,
        facebook,
        linkedin,
        twitter,
      }),
      headers: {
        "Content-type": "application/json",
        Authorization: `${tokenID}`,
      },
    })
      .then((response) => response.json(console.log(response)))

      .then((json) => {
        setData({
          User: json,
        });
        if (json.message === "successfuly created user details") {
          document.getElementById("openPopup").click();
        }

        // if (res.data.success === 1) {
        //   setSuccess("Image upload successfully");
        // }
        //   if (json.message === "successfully register") {
        //     navigate("/login");
        //   }

        // setMessage(json.message)
        console.log(json);
      })
      .catch((err) => {
        console.log(err);
      });
    // setState(valid(json.message));

    setIsSubmit(true);
  };

  // useEffect(() => {
  // 	const res = data?.User?.error;
  // 	setError(res);

  // }, [])

  useEffect(() => {
    const res = data?.User?.message;
    setMessage(res);
  }, [data]);

  // useEffect(() => {
  //   console.log(formErrors);
  //   if (Object.keys(formErrors).length === 0 && isSubmit) {
  //     console.log(User);
  //     // fetchData()
  //   }
  // }, []);

  // const validate = (values) => {
  //   const errors = {};

  //   const regex = /^[^@]+@(yahoo|gmail|mail)\.(com)$/i;
  //   if (!values.websiteUrl) {
  //     errors.websiteUrl = "!'Please Enter Your websiteUrl'";
  //   }
  //   if (!values.qualification) {
  //     errors.qualification = "!'Please Enter Your qualification '";
  //   }
  //   if (!values.language) {
  //     errors.language = "!'Please Enter Your language '";
  //   }
  //   if (!values.jobCategory) {
  //     errors.jobCategory = "!'Please Enter Your JobCategory'";
  //   }
  //   if (!values.experience) {
  //     errors.experience = "!'Please Enter Your experience'";
  //   }
  //   if (!values.currentSalary) {
  //     errors.currentSalary = "!'Please Enter Your currentSalary'";
  //   }
  //   if (!values.expectedSalary) {
  //     errors.expectedSalary = "!'Please Enter Your expectedSalary'";
  //   }
  //   if (!values.age) {
  //     errors.age = "!'Please Enter Your age'";
  //   }

  //   if (!values.country) {
  //     errors.country = "!'Please Enter country'";
  //   }
  //   if (!values.city) {
  //     errors.city = "!'Please Enter city'";
  //   }
  //   if (!values.pincode) {
  //     errors.pincode = "!'Please Enter pincode'";
  //   }
  //   if (!values.address) {
  //     errors.address = "!'Please Enter address'";
  //   }
  //   if (!values.description) {
  //     errors.description = "!'Please Enter description'";
  //   }
  //   if (!values.facebook) {
  //     errors.facebook = "!'Please Enter facebook'";
  //   }
  //   if (!values.linkedin) {
  //     errors.linkedin = "!'Please Enter linkedin'";
  //   }
  //   if (!values.twitter) {
  //     errors.twitter = "!'Please Enter twitter'";
  //   }
  //   return errors;
  // };

  useEffect(() => {
    const tokenID = localStorage.getItem("token");
    fetch("http://localhost:5000/canditateDetails", {
      method: "GET",

      // body: JSON.stringify(object),
      headers: {
        "Content-type": "application/json",
        Authorization: `${tokenID}`,
      },
    })
      .then((response) => response.json(console.log(response)))

      .then((json) => {
        if (json.message.accountType === "candidate") {
          setCandidates(json.message);
          setUserName(json.message.username);
          setPhone(json.message.phoneNumber);
          setEmail(json.message.email);
          setWebsiteUrl(json.message.websiteUrl);

          setQualification(json.message.qualification);
          setLanguage(json.message.language);

          setJobCategory(json.message.jobCategory);
          setExperience(json.message.experience);
          setCurrentSalary(json.message.currentSalary);

          setEexpectedSalary(json.message.expectedSalary);
          setAge(json.message.age);

          setCountry(json.message.country);
          setCity(json.message.city);
          setPincode(json.message.pincode);
          setAddress(json.message.address);
          setDescription(json.message.description);
          setFacebook(json.message.facebook);
          setLinkedin(json.message.linkedin);
          setTwitter(json.message.twitter);
          setLoad(false);

          console.log(json.message);
        }

        // const filterData = json.message?.filter(
        //   (item, index) => item.accountType === "candidate"
        // );
        // setState(filterData[0]);
        // console.log(candidates[0]);
        //   if (json.message === "successfully register") {
        //     navigate("/login");
        //   }

        // if (json?.message?.accountType == "candidate") {
        //   setLoad(true);
        // }
        // console.log(load);

        // setMessage(json.message);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div>
      {load === false ? (
        <div>
          <div
            className="page-wraper position-relative"
            style={{ zIndex: "1000" }}
          >
            <header id="header-admin-wrap" className="header-admin-fixed">
              <div id="header-admin">
                <div className="container">
                  <div className="header-left">
                    <div className="nav-btn-wrap">
                      <Link className="nav-btn-admin" id="sidebarCollapse">
                        <span className="fa fa-angle-left"></span>
                      </Link>
                    </div>
                  </div>

                  <div className="header-right">
                    <ul className="header-widget-wrap">
                      <li className="header-widget dashboard-message-dropdown">
                        <div className="dropdown">
                          <Link
                            to=""
                            className="dropdown-toggle jobzilla-admin-messange"
                            id="ID-MSG_dropdown"
                            data-bs-toggle="dropdown"
                          >
                            <i className="far fa-envelope"></i>
                            <span className="notification-animate">4</span>
                          </Link>
                          <div
                            className="dropdown-menu"
                            aria-labelledby="ID-MSG_dropdown"
                          >
                            <div className="message-list dashboard-widget-scroll">
                              <ul>
                                <li className="clearfix">
                                  <span className="msg-avtar">
                                    <img
                                      src="jobzilla/images/user-avtar/pic1.jpg"
                                      alt=""
                                    />
                                  </span>

                                  <div className="msg-texting">
                                    <strong>Alexa Johnson</strong>
                                    <small className="msg-time">
                                      <span className="far fa-clock p-r-5"></span>
                                      12 mins ago
                                    </small>
                                    <p>
                                      Lorem ipsum dolor sit amet, consectetur...
                                    </p>
                                  </div>
                                </li>
                                <li className="clearfix">
                                  <span className="msg-avtar">
                                    <img
                                      src="jobzilla/images/user-avtar/pic2.jpg"
                                      alt=""
                                    />
                                  </span>

                                  <div className="msg-texting">
                                    <strong>Johan Smith</strong>
                                    <small className="msg-time">
                                      <span className="far fa-clock p-r-5"></span>
                                      2 hours ago
                                    </small>
                                    <p>
                                      Lorem ipsum dolor sit amet, consectetur...
                                    </p>
                                  </div>
                                </li>
                                <li className="clearfix">
                                  <span className="msg-avtar">
                                    <img
                                      src="jobzilla/images/user-avtar/pic3.jpg"
                                      alt=""
                                    />
                                  </span>

                                  <div className="msg-texting">
                                    <strong>Bobby Brown</strong>
                                    <small className="msg-time">
                                      <span className="far fa-clock p-r-5"></span>
                                      3 hours ago
                                    </small>
                                    <p>
                                      Lorem ipsum dolor sit amet, consectetur...
                                    </p>
                                  </div>
                                </li>
                                <li className="clearfix">
                                  <span className="msg-avtar">
                                    <img
                                      src="jobzilla/images/user-avtar/pic4.jpg"
                                      alt=""
                                    />
                                  </span>

                                  <div className="msg-texting">
                                    <strong>David Deo</strong>
                                    <small className="msg-time">
                                      <span className="far fa-clock p-r-5"></span>
                                      4 hours ago
                                    </small>
                                    <p>
                                      Lorem ipsum dolor sit amet, consectetur...
                                    </p>
                                  </div>
                                </li>
                              </ul>
                              <div className="message-view-all">
                                <Link to="">View All</Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      </li>

                      <li className="header-widget dashboard-noti-dropdown">
                        <div className="dropdown">
                          <Link
                            to=""
                            className="dropdown-toggle jobzilla-admin-notification"
                            id="ID-NOTI_dropdown"
                            data-bs-toggle="dropdown"
                          >
                            <i className="far fa-bell"></i>
                            <span className="notification-animate">8</span>
                          </Link>
                          <div
                            className="dropdown-menu"
                            aria-labelledby="ID-NOTI_dropdown"
                          >
                            <div className="dashboard-widgets-header">
                              You have 7 notifications
                            </div>
                            <div className="noti-list dashboard-widget-scroll">
                              <ul>
                                <li>
                                  <Link to="#">
                                    <span className="noti-icon">
                                      <i className="far fa-bell"></i>
                                    </span>
                                    <span className="noti-texting">
                                      Devid applied for <b>Webdesigner.</b>{" "}
                                    </span>
                                  </Link>
                                </li>
                                <li>
                                  <Link to="#">
                                    <span className="noti-icon">
                                      <i className="far fa-bell"></i>
                                    </span>
                                    <span className="noti-texting">
                                      Nikol sent you a message.{" "}
                                    </span>
                                  </Link>
                                </li>
                                <li>
                                  <Link to="#">
                                    <span className="noti-icon">
                                      <i className="far fa-bell"></i>
                                    </span>
                                    <span className="noti-texting">
                                      lucy bookmarked your <b>SEO Expert</b>{" "}
                                      Job!{" "}
                                    </span>
                                  </Link>
                                </li>
                                <li>
                                  <Link to="#">
                                    <span className="noti-icon">
                                      <i className="far fa-bell"></i>
                                    </span>
                                    <span className="noti-texting">
                                      Your job for <b>teacher</b> has been
                                      approved!{" "}
                                    </span>
                                  </Link>
                                </li>
                                <li>
                                  <Link to="#">
                                    <span className="noti-icon">
                                      <i className="far fa-bell"></i>
                                    </span>
                                    <span className="noti-texting">
                                      Thor applied for <b>Team Leader</b>.{" "}
                                    </span>
                                  </Link>
                                </li>
                              </ul>

                              <div className="noti-view-all">
                                <Link to="">View All</Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      </li>

                      <li className="header-widget">
                        <div className="dashboard-user-section">
                          <div className="listing-user">
                            <div className="dropdown">
                              <Link
                                to="/"
                                className="dropdown-toggle"
                                id="ID-ACCOUNT_dropdown"
                                data-bs-toggle="dropdown"
                              >
                                <div className="user-name text-black">
                                  <span>
                                    <img
                                      src="jobzilla/images/user-avtar/pic4.jpg"
                                      alt=""
                                    />
                                  </span>
                                  Nikola Tesla
                                </div>
                              </Link>
                              <div
                                className="dropdown-menu"
                                aria-labelledby="ID-ACCOUNT_dropdown"
                              >
                                <ul>
                                  <li>
                                    <Link to="/dashboard">
                                      <i className="fa fa-home"></i>Dashboard
                                    </Link>
                                  </li>
                                  <li>
                                    <Link to="dash-messages">
                                      <i className="fa fa-envelope"></i>{" "}
                                      Messages
                                    </Link>
                                  </li>
                                  <li>
                                    <Link to="employer-profile">
                                      <i className="fa fa-user"></i> Profile
                                    </Link>
                                  </li>
                                  <li>
                                    <Link to="index">
                                      <i className="fa fa-share-square"></i>{" "}
                                      Logout
                                    </Link>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </header>

            <nav id="sidebar-admin-wraper">
              <div className="page-logo">
                <Link to="/">
                  <img src="jobzilla/images/logo-dark.png" alt="" />
                </Link>
              </div>

              <div className="admin-nav scrollbar-macosx">
                <ul>
                  <li>
                    <Link to="/employer-dashboard">
                      <i className="fa fa-home"></i>
                      <span className="admin-nav-text">Dashboard</span>
                    </Link>
                  </li>

                  <li>
                    <Link to="/dash-company-profile">
                      <i className="fa fa-user-tie"></i>
                      <span className="admin-nav-text">Company Profile</span>
                    </Link>
                  </li>

                  <li className="">
                    <Link to="">
                      <i className="fa fa-suitcase"></i>
                      <span className="admin-nav-text">Jobs</span>
                    </Link>
                    <ul className="sub-menu">
                      <li>
                        {" "}
                        <Link to="/dash-post-job">
                          <span className="admin-nav-text">
                            Post a New Jobs
                          </span>
                        </Link>
                      </li>
                      <li>
                        {" "}
                        <Link to="/employer-manage-job">
                          <span className="admin-nav-text">Manage Jobs</span>
                        </Link>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <Link to="dashboard-candidates">
                      <i className="fa fa-user-friends"></i>
                      <span className="admin-nav-text">Candidates</span>
                    </Link>
                  </li>

                  <li className="active">
                    <Link to="/dash-my-profile">
                      <i className="fa fa-user"></i>
                      <span className="admin-nav-text">My Profile</span>
                    </Link>
                  </li>

                  <li>
                    <Link to="dash-change-password">
                      <i className="fa fa-fingerprint"></i>
                      <span className="admin-nav-text">Change Password</span>
                    </Link>
                  </li>

                  <li>
                    <Link
                      to=""
                      data-bs-toggle="modal"
                      data-bs-target="#logout-dash-profile"
                    >
                      <i className="fa fa-share-square"></i>
                      <span className="admin-nav-text">Logout</span>
                    </Link>
                  </li>
                </ul>
              </div>
            </nav>

            <div id="content">
              <div className="content-admin-main">
                <div className="wt-admin-right-page-header clearfix">
                  <h2>Post a Job</h2>
                  <div className="breadcrumbs">
                    <Link to="#">Home</Link>
                    <Link to="#">Dasboard</Link>
                    <span>Job Submission Form</span>
                  </div>
                </div>
                <form onSubmit={handleSubmit}>
                  <div className="panel panel-default">
                    <div className="panel-heading wt-panel-heading p-a20">
                      <h4 className="panel-tittle m-a0">
                        Logo and Cover image
                      </h4>
                    </div>
                    <div className="panel-body wt-panel-body p-a20 p-b0 m-b30 ">
                      <div className="row">
                        <div className="col-lg-12 col-md-6">
                          <div className="form-group">
                            <div className="dashboard-profile-pic">
                              <div className="dashboard-profile-photo">
                                <img src="jobzilla/images/user-avtar/pic4.jpg" />
                                <div className="upload-btn-wrapper">
                                  <div id="upload-image-grid">
                                    {userInfo.filepreview !== null ? (
                                      <img
                                        src={userInfo.filepreview}
                                        alt="UploadImage"
                                      />
                                    ) : null}
                                  </div>
                                  <button className="site-button button-sm">
                                    Upload Photo
                                  </button>
                                  <input
                                    type="file"
                                    name="myfile"
                                    onChange={handleInputChange}
                                    id="file-uploader"
                                    accept=".jpg, .jpeg, .png"
                                  />
                                </div>
                              </div>

                              <p>
                                <b>Company Logo :- </b> Max file size is 1MB,
                                Minimum dimension: 136 x 136 And Suitable files
                                are .jpg & .png
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="col-lg-12 col-md-6">
                          <div className="dashboard-cover-pic">
                            <form
                              action="upload.php"
                              className="dropzone"
                            ></form>
                            <p>
                              <b>Background Banner Image :- </b> Max file size
                              is 1MB, Minimum dimension: 770 x 310 And Suitable
                              files are .jpg & .png
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="panel panel-default">
                    <div className="panel-body wt-panel-body p-a20 m-b30 ">
                      <div className="panel panel-default">
                        <div className="panel-heading wt-panel-heading p-a20">
                          <h4 className="panel-tittle m-a0">
                            Basic Informations
                          </h4>
                        </div>
                        <div className="panel-body wt-panel-body p-a20 m-b30 ">
                          <div className="row">
                            <div className="col-xl-6 col-lg-6 col-md-12">
                              <div className="form-group">
                                <label>Your Name</label>
                                <div className="ls-inputicon-box">
                                  <input
                                    className="form-control"
                                    name="username"
                                    type="text"
                                    onChange={(e) =>
                                      setUserName(e.target.value)
                                    }
                                    value={userName}
                                    placeholder="Devid Smith"
                                  />
                                  <i className="fs-input-icon fa fa-user "></i>
                                </div>
                              </div>
                            </div>

                            <div className="col-xl-6 col-lg-6 col-md-12">
                              <div className="form-group">
                                <label>Phone</label>
                                <div className="ls-inputicon-box">
                                  <input
                                    className="form-control"
                                    name="phone"
                                    type="number"
                                    onChange={(e) => setPhone(e.target.value)}
                                    value={phone}
                                    placeholder="(251) 1234-456-7890"
                                  />
                                  <i className="fs-input-icon fa fa-phone-alt"></i>
                                </div>
                              </div>
                            </div>

                            <div className="col-xl-6 col-lg-6 col-md-12">
                              <div className="form-group">
                                <label>Email Address</label>
                                <div className="ls-inputicon-box">
                                  <input
                                    className="form-control"
                                    name="company_Email"
                                    type="email"
                                    onChange={(e) => setEmail(e.target.value)}
                                    value={Email}
                                    placeholder="Devid@example.com"
                                  />
                                  <i className="fs-input-icon fas fa-at"></i>
                                </div>
                              </div>
                            </div>

                            <div className="col-xl-6 col-lg-6 col-md-12">
                              <div className="form-group">
                                <label>Website</label>
                                <div className="ls-inputicon-box">
                                  <input
                                    // onChange={handleChange}
                                    onChange={(e) =>
                                      setWebsiteUrl(e.target.value)
                                    }
                                    className="form-control"
                                    name="websiteUrl"
                                    type="url"
                                    value={websiteUrl}
                                    placeholder="https://devsmith.net/"
                                    required
                                  />
                                  <i className="fs-input-icon fa fa-globe-americas"></i>
                                </div>
                                <p style={{ color: "red" }}>
                                  {formErrors.websiteUrl}
                                </p>
                              </div>
                            </div>

                            <div className="col-xl-6 col-lg-6 col-md-12">
                              <div className="form-group">
                                <label>Qualification</label>
                                <div className="ls-inputicon-box">
                                  <input
                                    // onChange={handleChange}
                                    onChange={(e) =>
                                      setQualification(e.target.value)
                                    }
                                    className="form-control"
                                    name="qualification"
                                    type="text"
                                    value={qualification}
                                    placeholder="BTech"
                                    required
                                  />
                                  <i className="fs-input-icon fa fa-user-graduate"></i>
                                </div>
                                <p style={{ color: "red" }}>
                                  {formErrors.qualification}
                                </p>
                              </div>
                            </div>

                            <div className="col-xl-6 col-lg-6 col-md-12">
                              <div className="form-group">
                                <label>Language</label>
                                <div className="ls-inputicon-box">
                                  <input
                                    // onChange={handleChange}
                                    onChange={(e) =>
                                      setLanguage(e.target.value)
                                    }
                                    className="form-control"
                                    name="language"
                                    type="text"
                                    value={language}
                                    placeholder="e.x English, Spanish"
                                    required
                                  />
                                  <i className="fs-input-icon fa fa-language"></i>
                                </div>
                                <p style={{ color: "red" }}>
                                  {formErrors.language}
                                </p>
                              </div>
                            </div>

                            <div className="col-xl-6 col-lg-6 col-md-12">
                              <div className="form-group city-outer-bx has-feedback">
                                <label>Job Category</label>
                                <div className="ls-inputicon-box">
                                  <input
                                    // onChange={handleChange}
                                    onChange={(e) =>
                                      setJobCategory(e.target.value)
                                    }
                                    className="form-control"
                                    name="jobCategory"
                                    value={jobCategory}
                                    type="text"
                                    placeholder="IT & Software"
                                  />
                                  <i className="fs-input-icon fa fa-border-all"></i>
                                </div>
                                <p style={{ color: "red" }}>
                                  {formErrors.jobCategory}
                                </p>
                              </div>
                            </div>

                            <div className="col-xl-6 col-lg-6 col-md-12">
                              <div className="form-group city-outer-bx has-feedback">
                                <label>Experience</label>
                                <div className="ls-inputicon-box">
                                  <input
                                    // onChange={handleChange}
                                    onChange={(e) =>
                                      setExperience(e.target.value)
                                    }
                                    className="form-control"
                                    name="experience"
                                    value={experience}
                                    type="number"
                                    placeholder="05 Years"
                                    required
                                  />
                                  <i className="fs-input-icon fa fa-user-edit"></i>
                                </div>
                                <p style={{ color: "red" }}>
                                  {formErrors.experience}
                                </p>
                              </div>
                            </div>

                            <div className="col-xl-4 col-lg-6 col-md-12">
                              <div className="form-group city-outer-bx has-feedback">
                                <label>Current Salary</label>
                                <div className="ls-inputicon-box">
                                  <input
                                    // onChange={handleChange}
                                    onChange={(e) =>
                                      setCurrentSalary(e.target.value)
                                    }
                                    className="form-control"
                                    name="currentSalary"
                                    value={currentSalary}
                                    type="number"
                                    placeholder="65K"
                                    required
                                  />
                                  <i className="fs-input-icon fa fa-dollar-sign"></i>
                                </div>
                                <p style={{ color: "red" }}>
                                  {formErrors.currentSalary}
                                </p>
                              </div>
                            </div>

                            <div className="col-xl-4 col-lg-6 col-md-12">
                              <div className="form-group city-outer-bx has-feedback">
                                <label>Expected Salary</label>
                                <div className="ls-inputicon-box">
                                  <input
                                    // onChange={handleChange}
                                    onChange={(e) =>
                                      setEexpectedSalary(e.target.value)
                                    }
                                    className="form-control"
                                    name="expectedSalary"
                                    value={expectedSalary}
                                    type="number"
                                    placeholder="75K"
                                    required
                                  />
                                  <i className="fs-input-icon fa fa-dollar-sign"></i>
                                </div>
                                <p style={{ color: "red" }}>
                                  {formErrors.expectedSalary}
                                </p>
                              </div>
                            </div>

                            <div className="col-xl-4 col-lg-12 col-md-12">
                              <div className="form-group city-outer-bx has-feedback">
                                <label>Age</label>
                                <div className="ls-inputicon-box">
                                  <input
                                    // onChange={handleChange}
                                    onChange={(e) => setAge(e.target.value)}
                                    className="form-control"
                                    name="age"
                                    value={age}
                                    type="number"
                                    placeholder="35 Years"
                                    required
                                  />
                                  <i className="fs-input-icon fa fa-child"></i>
                                </div>
                                <p style={{ color: "red" }}>{formErrors.age}</p>
                              </div>
                            </div>

                            <div className="col-xl-4 col-lg-6 col-md-12">
                              <div className="form-group city-outer-bx has-feedback">
                                <label>Country</label>
                                <div className="ls-inputicon-box">
                                  <input
                                    // onChange={handleChange}
                                    onChange={(e) => setCountry(e.target.value)}
                                    className="form-control"
                                    name="country"
                                    value={country}
                                    type="text"
                                    placeholder="USA"
                                    required
                                  />
                                  <i className="fs-input-icon fa fa-globe-americas"></i>
                                </div>
                                <p style={{ color: "red" }}>
                                  {formErrors.country}
                                </p>
                              </div>
                            </div>

                            <div className="col-xl-4 col-lg-6 col-md-12">
                              <div className="form-group city-outer-bx has-feedback">
                                <label>City</label>
                                <div className="ls-inputicon-box">
                                  <input
                                    // onChange={handleChange}
                                    onChange={(e) => setCity(e.target.value)}
                                    className="form-control"
                                    name="city"
                                    value={city}
                                    type="text"
                                    placeholder="Texas"
                                    required
                                  />
                                  <i className="fs-input-icon fa fa-globe-americas"></i>
                                </div>
                                <p style={{ color: "red" }}>
                                  {formErrors.city}
                                </p>
                              </div>
                            </div>

                            <div className="col-xl-4 col-lg-12 col-md-12">
                              <div className="form-group city-outer-bx has-feedback">
                                <label>Postcode</label>
                                <div className="ls-inputicon-box">
                                  <input
                                    // onChange={handleChange}
                                    onChange={(e) => setPincode(e.target.value)}
                                    className="form-control"
                                    name="pincode"
                                    value={pincode}
                                    type="number"
                                    placeholder="75462"
                                    required
                                  />
                                  <i className="fs-input-icon fas fa-map-pin"></i>
                                </div>
                                <p style={{ color: "red" }}>
                                  {formErrors.pincode}
                                </p>
                              </div>
                            </div>

                            <div className="col-xl-12 col-lg-12 col-md-12">
                              <div className="form-group city-outer-bx has-feedback">
                                <label>Full Address</label>
                                <div className="ls-inputicon-box">
                                  <input
                                    // onChange={handleChange}
                                    onChange={(e) => setAddress(e.target.value)}
                                    className="form-control"
                                    name="address"
                                    value={address}
                                    type="text"
                                    placeholder="1363-1385 Sunset Blvd Angeles, CA 90026 ,USA"
                                    required
                                  />
                                  <i className="fs-input-icon fas fa-map-marker-alt"></i>
                                </div>
                                <p style={{ color: "red" }}>
                                  {formErrors.address}
                                </p>
                              </div>
                            </div>

                            <div className="col-md-12">
                              <div className="form-group">
                                <label>Description</label>
                                <textarea
                                  className="form-control"
                                  name="description"
                                  value={description}
                                  // onChange={handleChange}
                                  onChange={(e) =>
                                    setDescription(e.target.value)
                                  }
                                  rows="3"
                                  required
                                ></textarea>
                                <p style={{ color: "red" }}>
                                  {formErrors.description}
                                </p>
                              </div>
                            </div>

                            {/* <!--Social Network--> */}
                            <div className="panel panel-default">
                              <div className="panel-heading wt-panel-heading p-a20">
                                <h4 className="panel-tittle m-a0">
                                  Social Network
                                </h4>
                              </div>
                              <div className="panel-body wt-panel-body p-a20 m-b30 ">
                                <div className="row">
                                  <div className="col-xl-4 col-lg-6 col-md-12">
                                    <div className="form-group">
                                      <label>Facebook</label>
                                      <div className="ls-inputicon-box">
                                        <input
                                          // onChange={handleChange}
                                          onChange={(e) =>
                                            setFacebook(e.target.value)
                                          }
                                          className="form-control wt-form-control"
                                          name="facebook"
                                          value={facebook}
                                          type="url"
                                          placeholder="https://www.facebook.com/"
                                          required
                                        />
                                        <i className="fs-input-icon fab fa-facebook-f"></i>
                                      </div>
                                      <p style={{ color: "red" }}>
                                        {formErrors.facebook}
                                      </p>
                                    </div>
                                  </div>

                                  <div className="col-xl-4 col-lg-6 col-md-12">
                                    <div className="form-group">
                                      <label>Twitter</label>
                                      <div className="ls-inputicon-box">
                                        <input
                                          // onChange={handleChange}
                                          onChange={(e) =>
                                            setTwitter(e.target.value)
                                          }
                                          className="form-control wt-form-control"
                                          name="twitter"
                                          value={twitter}
                                          type="url"
                                          placeholder="https://twitter.com/"
                                          required
                                        />
                                        <i className="fs-input-icon fab fa-twitter"></i>
                                      </div>
                                      <p style={{ color: "red" }}>
                                        {formErrors.twitter}
                                      </p>
                                    </div>
                                  </div>

                                  <div className="col-xl-4 col-lg-6 col-md-12">
                                    <div className="form-group">
                                      <label>linkedin</label>
                                      <div className="ls-inputicon-box">
                                        <input
                                          // onChange={handleChange}
                                          onChange={(e) =>
                                            setLinkedin(e.target.value)
                                          }
                                          className="form-control wt-form-control"
                                          name="linkedin"
                                          value={linkedin}
                                          type="url"
                                          placeholder="https://in.linkedin.com/"
                                          required
                                        />
                                        <i className="fs-input-icon fab fa-linkedin-in"></i>
                                      </div>
                                      <p style={{ color: "red" }}>
                                        {formErrors.linkedin}
                                      </p>
                                    </div>
                                  </div>

                                  <div className="col-lg-12 col-md-12">
                                    <div className="text-left">
                                      <button
                                        type="submit"
                                        className="site-button"
                                      >
                                        Submit
                                      </button>
                                      <button
                                        type="button"
                                        data-bs-toggle="modal"
                                        data-bs-target="#completeprofile"
                                        className="site-button "
                                        style={{ visibility: "hidden" }}
                                        data-toggle="modal"
                                        id="openPopup"
                                      >
                                        Submit
                                      </button>

                                      <div
                                        class="modal fade"
                                        id="completeprofile"
                                        data-bs-backdrop="static"
                                        data-bs-keyboard="false"
                                        tabindex="-1"
                                        aria-labelledby="staticBackdropLabel"
                                        aria-hidden="true"
                                        style={{ background: "#00000059" }}
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
                                              <img
                                                src="/jobzilla/images/423-4236284_png-images-success-icon-png-transparent-png-download.png"
                                                className="w-25 "
                                              />
                                              <h4>{message}</h4>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>

          <div
            className="modal fade twm-model-popup"
            id="delete-dash-profile"
            data-bs-backdrop="static"
            data-bs-keyboard="false"
            tabindex="-1"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <h4 className="modal-title">
                    Do you want to delete your profile?
                  </h4>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="site-button"
                    data-bs-dismiss="modal"
                  >
                    No
                  </button>
                  <button type="button" className="site-button outline-primary">
                    Yes
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* <!--Logout Profile Popup--> */}
          <div
            className="modal fade twm-model-popup"
            id="logout-dash-profile"
            data-bs-backdrop="static"
            data-bs-keyboard="false"
            tabindex="-1"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <h4 className="modal-title">
                    Do you want to Logout your profile?
                  </h4>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="site-button"
                    data-bs-dismiss="modal"
                  >
                    No
                  </button>
                  <button type="button" className="site-button outline-primary">
                    Yes
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        navigate("/")
      )}
    </div>
  );
};

export default DashMyProfile;
