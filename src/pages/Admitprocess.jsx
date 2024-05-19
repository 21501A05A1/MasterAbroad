import React, { useRef, useEffect } from 'react';
import { Card } from 'react-bootstrap';
import './Admitprocess.css'; // Import CSS file for animations
import { Link } from 'react-router-dom';


function Admitprocess() {
  const stepsRef = useRef([]);

  // Function to add bounce animations alternately
  const handleScroll = () => {
    stepsRef.current.forEach((step, index) => {
      const stepPosition = step.getBoundingClientRect().top;
      const viewportHeight = window.innerHeight;
      if (stepPosition < viewportHeight) {
        if (index % 2 === 0) {
          step.classList.add('step-left');
        } else {
          step.classList.add('step-right');
        }
      }
    });
  };

  useEffect(() => {
    handleScroll(); // Initially apply animations
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []); // Empty dependency array ensures it runs only once

  return (
    <div className="gradient-background" style={{ marginTop: '-20px' }}> {/* Adjust margin-top as needed */}
      <section id="about">
        <div className="container my-4">
          <h2 className="text-center">Admission Process</h2>
          <div className="row mt-5">
            <div className="col-md-8">
              {/* Wrap each step in a div */}
              <div className="step" ref={(el) => (stepsRef.current[0] = el)}>
                <h3><b>STEP 1: Get your Passport</b></h3>
                <p>Assuming that you are just beginning with your documentation process, your first task is to get a passport. It is the prime identification you will have when you travel abroad as an Indian Citizen. It is essential that you have an Indian passport before starting your application process for MS in US. Refer to the link to apply for passport. Please note that this step is not optional.</p>
                <Link to="https://portal2.passportindia.gov.in/AppOnlineProject/docAdvisor/attachmentAdvFreshInp">
                  <button className='but'>passport</button>
                </Link>
              </div>
              {/* Second step */}
              <div className="step" ref={(el) => (stepsRef.current[1] = el)}>
                <h3><b>STEP 2: Take an English Proficiency Test</b></h3>
                <p>As an Indian, English is not your first language. You may need to prove your English language proficiency in order to apply for a master’s program. Taking an English language test (IELTS/TOEFL) is the solution. The IELTS is a popular and considerably easier option that is widely accepted by the American universities. The below  link will navigate to another website that  help you with everything you need to know about the TOEFL and IELTS tests.</p>
                <Link to="https://www.ets.org/toefl.html">
                  <button className='but'>TOEFL TEST</button>
                </Link>
              </div>
              {/* Repeat the above structure for additional steps */}
              <div className="step" ref={(el) => (stepsRef.current[2] = el)}>
                <h3><b>STEP 3: Take the GRE Test</b></h3>
                <p>The GRE Exam is considered to be an important admission criterion for prospective students aspiring to pursue a master’s degree in the US. The GRE test stands for Graduate Record Examinations and requires more time for preparation as compared to the IELTS/TOEFL language test. The below link will brief you more on the GRE Exam.</p>
                <Link to="https://www.ets.org/gre/test-takers/general-test/schedule.html">
                  <button className='but'>GRE TEST</button>
                </Link>
              </div>
              <div className="step" ref={(el) => (stepsRef.current[3] = el)}>
                <h3><b>STEP 4: Get your Bachelor's Transcript and Educational Certificates</b></h3>
                <p>Universities get thousands of applications per semester every year which need to be assessed and a decision has to be made whether to accept/reject them. University admission committees use transcripts from your bachelor’s degree, which is a compiled statement of all your semester grades, to decide. Your bachelor’s transcripts are a mandatory requirement before you start your application process for MS in US. Along with the transcripts, your education certificates are also necessary.
                </p>
              </div>
              <div className="step" ref={(el) => (stepsRef.current[4] = el)}>
                <h3><b>STEP 5:Prepare your CV and a SOP </b></h3>
                <p>It is necessary that you create your CV based on the university and program that you are applying for , and update it with your most recent study/work experience.The Statement of Purpose mainly portrays the purpose with which you are applying to the University.
                You need to prepare this document from scratch. A good SOP often takes more effort and time than you may expect it to .</p>
              </div>
              <div className="step" ref={(el) => (stepsRef.current[5] = el)}>
                <h3><b>STEP 6: Collect your Letters of Recommendation (LORs)</b></h3>
                <p>A Letter of Recommendation is a positive personal assessment given by your supervisor/ professor/employer. LORs play an important role in getting you admission into the course and university you want as it expresses your strengths from a third person’s point of view. You may need to collect about 2-3 LORs from your past/current supervisors, managers or professors .</p>
              </div>
              <div className="step" ref={(el) => (stepsRef.current[6] = el)}>
                <h3><b>STEP 7: Prepare a list of Target Universities to apply</b></h3>
                <p>Once all your documents are ready, you can begin the next stage of your application process for MS in US. It is now time to start shortlisting universities based on your profile and preferences. It might take some time to go through all the universities and analyze their program modules, curriculum and other details. Make sure you have multiple program options that match your profile and career goals.</p>
              </div>
              <div className="step" ref={(el) => (stepsRef.current[7] = el)}>
                <h3><b>STEP 8: Send Applications to University</b></h3>
                <p>You have your documents ready and universities shortlisted. It is now time to start the application process for MS in US. Most universities require you to first apply on their online admission portal and then send out the hard copies of the documents if selected . Visit your target university’s website and check details on the application procedure, they may vary from one university to another.</p>
              </div>
              <div className="step" ref={(el) => (stepsRef.current[8] = el)}>
                <h3><b>STEP 9: Apply for Education Loan</b></h3>
                <p>You may have to apply for an education/student loan to support yourself during your stay in the USA, i.e. for your tuition fee, travel and living expenses. Once you receive an offer letter from the university, you need to get the i20. To get the i20, you need to present your bank statements, loan letter, or scholarship letter.</p>
              </div>
              <div className="step" ref={(el) => (stepsRef.current[9] = el)}>
                <h3><b>STEP 10: Apply for the US Student VISA</b></h3>
                <p>This is the last step of the application process for MS in US. You need to decide the type of visa you will need for your Master’s.</p>
                <Link to="https://indianvisaonline.gov.in/">
                  <button className='but'>VISA</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Admitprocess;