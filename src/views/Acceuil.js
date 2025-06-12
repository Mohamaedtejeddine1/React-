import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

import Navbar from "components/Navbars/AuthNavbar.js";
import Footer from "components/Footers/Footer.js";

export default function Acceuil() {
  // Image slider state
  const images = [
    "https://images.unsplash.com/photo-1497366811353-6870744d04b2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1949&q=80",
    "https://img.freepik.com/free-photo/group-business-talking-meeting_53876-26417.jpg?ga=GA1.1.1703333803.1742102788&semt=ais_hybrid&w=740",
      "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aHVtYW4lMjByZXNvdXJjZXN8ZW58MHx8MHx8fDA%3D",

    "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?fit=crop&w=600",
  ];
  const [index, setIndex] = useState(0);

  // Contact form state
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  // Image slider effect
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch('http://localhost:5000/contact/sendMessage', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)

      });

      const data = await response.json();

      if (response.ok) {


        setSubmitStatus({
          success: true,
          message: data.msg || 'Message sent successfully!',

        });
        setFormData({ fullName: '', email: '', message: '' });
      } else {
        setSubmitStatus({
          success: false,
          message: data.msg || 'Failed to send message'
        });
      }
    } catch (error) {
      setSubmitStatus({
        success: false,
        message: 'Network error. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };






  return (
    <>
      <Navbar />
      <main>
        <div className="relative  flex content-center items-center justify-center min-h-screen-75  max-h-screen-100">
          <div
            className="absolute top-0 left-0 right-0 bottom-0 w-full h-full bg-center bg-cover transition-all duration-1000"
            style={{
              backgroundImage: `url(${images[index]})`,
            }}
          >
            <span className="w-full h-full absolute opacity-50 bg-black"></span>
          </div>
          <div className="container relative mx-auto">
            <div className="items-center flex flex-wrap">
              <div className="w-full lg:w-6/12 px-4  text-left">
                <div className="pr-12 text-left">
                  <h1 className="text-white font-semibold   text-5xl">
                    Smart HR Platform
                  </h1>
                  <p className="mt-4    text-lg text-blueGray-200">
                    Our Human Resources platform simplifies recruitment, talent management,
                    and HR process optimization.
                    Automate CV screening, track applications in real-time,
                    and deliver a smooth experience for both recruiters and candidates.
                  </p>
                <Link
  to="/auth/register"
className="text-white text-xl font-bold bg-lightBlue-600 border border-lightBlue-600 rounded-lg px-6 py-2 mt-4 inline-block hover:bg-red-200 hover:text-lightBlue-600 transition"
>
  Get Started
</Link>

                </div>

              </div>
            </div>
          </div>

        </div>

        <section className="pb-20 bg-blueGray-200 -mt-24">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap">
              <div className="lg:pt-12 pt-6 w-full md:w-4/12 px-4  text-left">
                <div className="relative flex flex-col min-w-2 break-words bg-white w-full mb-8 shadow-lg rounded-lg">



                </div>



              </div>


            </div>





            <div className="flex flex-wrap items-center mt-32">
              <div className="w-full md:w-5/12 px-4 mr-auto ml-auto">
                <div className="text-blueGray-500 p-3 text-center inline-flex items-center justify-center w-16 h-16 mb-6 shadow-lg rounded-full bg-white">
                  <i className="fas fa-user-friends text-xl"></i>
                </div>
                <h3 className="text-3xl mb-2 font-semibold leading-normal">
                  Join the Future of Recruitment
                </h3>
                <p className="text-lg font-light leading-relaxed mt-4 mb-4 text-blueGray-600">
                  Our HR platform makes recruitment easier for both recruiters and candidates. We automate CV screening, enhance application tracking, and streamline your hiring process.
                </p>
                <p className="text-lg font-light leading-relaxed mt-0 mb-4 text-blueGray-600">
                  For candidates, apply for your dream job with ease, and for recruiters, find the best talent without the hassle of manual screening.
                </p>
                <Link to="/" className="font-bold text-blueGray-700 mt-8">
                  Learn More About Our Platform
                </Link>
              </div>

              <div className="w-full md:w-4/12 px-4 mr-auto ml-auto">
                <div className="relative flex flex-col min-w-0 break-words  w-full mb-8 shadow-lg rounded-lg bg-lightBlue-500">
                  <img
                    alt="HR Platform"
                    src="https://images.unsplash.com/photo-1542744095-fcf48d80b0fd?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fFJofGVufDB8fDB8fHww"

                    className="w-full align-middle rounded-t-lg"
                  />

                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="relative py-20">
          <div
            className="bottom-auto top-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden -mt-20 h-20"
            style={{ transform: "translateZ(0)" }}
          >
            <svg
              className="absolute bottom-0 overflow-hidden"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              version="1.1"
              viewBox="0 0 2560 100"
              x="0"
              y="0"
            >
              <polygon
                className="text-white fill-current"
                points="2560 0 2560 100 0 100"
              ></polygon>
            </svg>
          </div>

          <div className="container mx-auto px-4">
            <div className="items-center flex flex-wrap">
              <div className="w-full md:w-4/12 ml-auto mr-auto px-4">
                <img
                  alt="HR Collaboration"
                  src="https://images.rawpixel.com/image_800/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvay05LWJiLTA5MjFiLW9sajEyMTMuanBn.jpg"
                  className="w-full align-middle rounded-t-lg"
                />
              </div>
              <div className="w-full md:w-5/12 ml-auto mr-auto px-4">
                <div className="md:pr-12">
                  <div className="text-lightBlue-600 p-3 text-center inline-flex items-center justify-center w-16 h-16 mb-6 shadow-lg rounded-full bg-lightBlue-300">
                    <i className="fas fa-rocket text-xl"></i>
                  </div>
                  <h3 className="text-3xl font-semibold">Building a Successful Career in Recruitment</h3>
                  <p className="mt-4 text-lg leading-relaxed text-blueGray-500">
                    Our platform helps candidates find roles that align with their career goals while assisting recruiters in discovering top talent.
                    We streamline the recruitment process, making hiring more efficient and impactful.
                    Together, we build successful careers and thriving teams.
                  </p>

                  {/* <ul className="list-none mt-6">
                    <li className="py-2">
                      <div className="flex items-center">
                        <div>
                          <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-lightBlue-600 bg-lightBlue-200 mr-3">
                            <i className="fas fa-fingerprint"></i>
                          </span>
                        </div>
                        <div>
                          <h4 className="text-blueGray-500">
                            Carefully crafted components
                          </h4>
                        </div>
                      </div>
                    </li>
                    <li className="py-2">
                      <div className="flex items-center">
                        <div>
                          <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-lightBlue-600 bg-lightBlue-200 mr-3">
                            <i className="fab fa-html5"></i>
                          </span>
                        </div>
                        <div>
                          <h4 className="text-blueGray-500">
                            Amazing page examples
                          </h4>
                        </div>
                      </div>
                    </li>
                    <li className="py-2">
                      <div className="flex items-center">
                        <div>
                          <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-lightBlue-600 bg-lightBlue-200 mr-3">
                            <i className="far fa-paper-plane"></i>
                          </span>
                        </div>
                        <div>
                          <h4 className="text-blueGray-500">
                            Dynamic components
                          </h4>
                        </div>
                      </div>
                    </li>
                  </ul> */}
                </div>
              </div>
            </div>
          </div>
        </section>
<section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-800 mb-4">
                Why Choose Our Platform?
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Discover the features that make recruitment effortless and effective
              </p>
            </div>

            <div className="flex flex-wrap -mx-4">
              <div className="w-full md:w-4/12 px-4 mb-8">
                <div className="bg-white p-8 rounded-lg shadow-lg border card-hover">
                  <div className="text-lightBlue-600 mb-4">
                    <i className="fas fa-robot text-4xl"></i>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">
                  AI CV Analysis
                  </h3>
                  <p className="text-gray-600">
                  Analyze candidate CVs using Google's Gemini API to extract key skills 
        and evaluate compatibility
                  </p>
                </div>
              </div>

              <div className="w-full md:w-4/12 px-4 mb-8">
                <div className="bg-white p-8 rounded-lg shadow-lg border card-hover">
                  <div className="text-lightBlue-600 mb-4">
                    <i className="fas fa-chart-line text-4xl"></i>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">
                    Real-time Analytics
                  </h3>
                  <p className="text-gray-600">
                    Track recruitment metrics, monitor application progress, 
                    and make data-driven decisions.
                  </p>
                </div>
              </div>

              <div className="w-full md:w-4/12 px-4 mb-8">
                <div className="bg-white p-8 rounded-lg shadow-lg border card-hover">
                  <div className="text-lightBlue-600 mb-4">
                    <i className="fas fa-users text-4xl"></i>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">
                    Easy Collaboration
                  </h3>
                  <p className="text-gray-600">
                    Enable smooth collaboration between HR teams, hiring managers, 
                    and candidates throughout the process.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="pt-20 pb-48">
          {/* <div className="container mx-auto px-4">
            <div className="flex flex-wrap justify-center text-center mb-24">
              <div className="w-full lg:w-6/12 px-4"> */}
          {/* <h2 className="text-4xl font-semibold">Here are our heroes</h2>
                <p className="text-lg leading-relaxed m-4 text-blueGray-500">
                  According to the National Oceanic and Atmospheric
                  Administration, Ted, Scambos, NSIDClead scentist, puts the
                  potentially record maximum.
                </p> */}
          {/* </div>
            </div> */}
          <div className="flex flex-wrap">
            {/* <div className="w-full md:w-6/12 lg:w-3/12 lg:mb-0 mb-12 px-4"> */}
            {/* <div className="px-6">
                  <img
                    alt="..."
                    src={require("assets/img/team-1-800x800.jpg").default}
                    className="shadow-lg rounded-full mx-auto max-w-120-px"
                  />
                  <div className="pt-6 text-center">
                    <h5 className="text-xl font-bold">Ryan Tompson</h5>
                    <p className="mt-1 text-sm text-blueGray-400 uppercase font-semibold">
                      Web Developer
                    </p>
                    <div className="mt-6">
                      <button
                        className="bg-lightBlue-400 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                        type="button"
                      >
                        <i className="fab fa-twitter"></i>
                      </button>
                      <button
                        className="bg-lightBlue-600 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                        type="button"
                      >
                        <i className="fab fa-facebook-f"></i>
                      </button>
                      <button
                        className="bg-pink-500 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                        type="button"
                      >
                        <i className="fab fa-dribbble"></i>
                      </button>
                    </div>
                  </div>
                </div> */}
            {/* </div> */}
            {/* <div className="w-full md:w-6/12 lg:w-3/12 lg:mb-0 mb-12 px-4"> */}
            {/* <div className="px-6">
                  <img
                    alt="..."
                    src={require("assets/img/team-2-800x800.jpg").default}
                    className="shadow-lg rounded-full mx-auto max-w-120-px"
                  />
                  <div className="pt-6 text-center">
                    <h5 className="text-xl font-bold">Romina Hadid</h5>
                    <p className="mt-1 text-sm text-blueGray-400 uppercase font-semibold">
                      Marketing Specialist
                    </p>
                    <div className="mt-6">
                      <button
                        className="bg-red-600 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                        type="button"
                      >
                        <i className="fab fa-google"></i>
                      </button>
                      <button
                        className="bg-lightBlue-600 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                        type="button"
                      >
                        <i className="fab fa-facebook-f"></i>
                      </button>
                    </div>
                  </div>
                </div> */}
            {/* </div> */}
            {/* <div className="w-full md:w-6/12 lg:w-3/12 lg:mb-0 mb-12 px-4"> */}
            {/* <div className="px-6">
                  <img
                    alt="..."
                    src={require("assets/img/team-3-800x800.jpg").default}
                    className="shadow-lg rounded-full mx-auto max-w-120-px"
                  />
                  <div className="pt-6 text-center">
                    <h5 className="text-xl font-bold">Alexa Smith</h5>
                    <p className="mt-1 text-sm text-blueGray-400 uppercase font-semibold">
                      UI/UX Designer
                    </p>
                    <div className="mt-6">
                      <button
                        className="bg-red-600 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                        type="button"
                      >
                        <i className="fab fa-google"></i>
                      </button>
                      <button
                        className="bg-lightBlue-400 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                        type="button"
                      >
                        <i className="fab fa-twitter"></i>
                      </button>
                      <button
                        className="bg-blueGray-700 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                        type="button"
                      >
                        <i className="fab fa-instagram"></i>
                      </button>
                    </div>
                  </div>
                </div> */}
            {/* </div> */}
            <div className="w-full md:w-6/12 lg:w-3/12 lg:mb-0 mb-12 px-4">
              <div className="px-6">
                {/* <img
                    alt="..."
                    src={require("assets/img/team-4-470x470.png").default}
                    className="shadow-lg rounded-full mx-auto max-w-120-px"
                  /> */}
                {/* <div className="pt-6 text-center">
                    <h5 className="text-xl font-bold">Jenna Kardi</h5>
                    <p className="mt-1 text-sm text-blueGray-400 uppercase font-semibold">
                      Founder and CEO
                    </p>
                    <div className="mt-6">
                      <button
                        className="bg-pink-500 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                        type="button"
                      >
                        <i className="fab fa-dribbble"></i>
                      </button>
                      <button
                        className="bg-red-600 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                        type="button"
                      >
                        <i className="fab fa-google"></i>
                      </button>
                      <button
                        className="bg-lightBlue-400 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                        type="button"
                      >
                        <i className="fab fa-twitter"></i>
                      </button>
                      <button
                        className="bg-blueGray-700 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                        type="button"
                      >
                        <i className="fab fa-instagram"></i>
                      </button>
                    </div>
                  </div> */}
              </div>
            </div>
          </div>
          {/* </div> */}
        </section>
        <section className="pb-20 relative block ">
          {/* <div
            className="bottom-auto top-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden -mt-20 h-20"
            style={{ transform: "translateZ(0)" }}
          >
            <svg
              className="absolute bottom-0 overflow-hidden"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              version="1.1"
              viewBox="0 0 2560 100"
              x="0"
              y="0"
            >
              <polygon
                className="text-blueGray-800 fill-current"
                points="2560 0 2560 100 0 100"
              ></polygon>
            </svg> */}
          {/* </div> */}

          {/* <div className="container mx-auto px-4 lg:pt-24 lg:pb-64"> */}
          {/* <div className="flex flex-wrap text-center justify-center"> */}
          {/* <div className="w-full lg:w-6/12 px-4">
                <h2 className="text-4xl font-semibold text-white">
                  Build something
                </h2>
                <p className="text-lg leading-relaxed mt-4 mb-4 text-blueGray-400">
                  Put the potentially record low maximum sea ice extent tihs
                  year down to low ice. According to the National Oceanic and
                  Atmospheric Administration, Ted, Scambos.
                </p>
              </div> */}
          {/* </div> */}
          {/* <div className="flex flex-wrap mt-12 justify-center"> */}
          {/* <div className="w-full lg:w-3/12 px-4 text-center">
                <div className="text-blueGray-800 p-3 w-12 h-12 shadow-lg rounded-full bg-white inline-flex items-center justify-center">
                  <i className="fas fa-medal text-xl"></i>
                </div>
                <h6 className="text-xl mt-5 font-semibold text-white">
                  Excelent Services
                </h6>
                <p className="mt-2 mb-4 text-blueGray-400">
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </p>
              </div> */}
          {/* <div className="w-full lg:w-3/12 px-4 text-center">
                <div className="text-blueGray-800 p-3 w-12 h-12 shadow-lg rounded-full bg-white inline-flex items-center justify-center">
                  <i className="fas fa-poll text-xl"></i>
                </div>
                <h5 className="text-xl mt-5 font-semibold text-white">
                  Grow your market
                </h5>
                <p className="mt-2 mb-4 text-blueGray-400">
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </p>
              </div> */}
          {/* <div className="w-full lg:w-3/12 px-4 text-center">
                <div className="text-blueGray-800 p-3 w-12 h-12 shadow-lg rounded-full bg-white inline-flex items-center justify-center">
                  <i className="fas fa-lightbulb text-xl"></i>
                </div>
                <h5 className="text-xl mt-5 font-semibold text-white">
                  Launch time
                </h5>
                <p className="mt-2 mb-4 text-blueGray-400">
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </p>
              </div> */}
          {/* </div> */}
          {/* </div> */}
        </section>
        {/* Contact Section */}
        <section className="relative block py-24 lg:pt-0">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap justify-center lg:-mt-64 -mt-48">
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200">
                  <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-white">
                    <div className="flex-auto p-5 lg:p-10">
                      <h4 className="text-2xl font-semibold text-lightBlue-600">
                        Contact Us
                      </h4>
                      <p className="leading-relaxed mt-1 mb-4 text-blueGray-500">
                        Complete this form and we will get back to you in 24 hours.
                      </p>
                      {submitStatus && (
                     <div className={`mb-4 p-3 rounded ${submitStatus.success ? 'bg-green-100-custom text-green-100-custom' : 'bg-red-custom text-red-custom'}`}>
                     {submitStatus.message}
                   </div>
                   
                      )}




                      <form onSubmit={handleSubmit}>
                        <div className="relative w-full mb-3 mt-8">
                          <label
                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                            htmlFor="full-name"
                          >
                            Full Name
                          </label>
                          <input
                            type="text"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleInputChange}
                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            placeholder="Full Name"
                            required
                          />
                        </div>

                        <div className="relative w-full mb-3">
                          <label
                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                            htmlFor="email"
                          >
                            Email
                          </label>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            placeholder="Email"
                            required
                          />
                        </div>

                        <div className="relative w-full mb-3">
                          <label
                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                            htmlFor="message"
                          >
                            Message
                          </label>
                          <textarea
                            rows="4"
                            cols="80"
                            name="message"
                            value={formData.message}
                            onChange={handleInputChange}
                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                            placeholder="Type a message..."
                            required
                          />
                        </div>

                        <div className="text-center mt-6">
                          <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`bg-lightBlue-600 text-white text-sm font-bold uppercase px-6 py-3 rounded shadow focus:outline-none focus:ring-2 focus:ring-lightBlue-500 ease-linear transition-all duration-150 ${isSubmitting
                                ? 'opacity-50 cursor-not-allowed'
                                : 'hover:bg-lightBlue-700 active:bg-lightBlue-500'
                              }`}
                          >
                            {isSubmitting ? (
                              <>
                                <i className="fas fa-spinner fa-spin mr-2"></i>
                                Sending...
                              </>
                            ) : (
                              'Send Message'
                            )}
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
