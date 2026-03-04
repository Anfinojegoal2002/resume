import React from 'react'
import { motion, AnimatePresence } from "framer-motion";

const Resumescannercheck = () => {
  return (
    <div className='bg-gray-200 py-10'>
      
      <div className='max-w-6xl mx-auto text-center'>
        <h1 className='text-2xl font-bold mb-4 text-gray-600 text-3xl '>What Our Resume Checks</h1>  
        <p>
          ResumeGen MyPerfectResume’s ATS Resume Checker analyzes key areas and offers 
          suggestions to optimize your resume for ATS and hiring managers.
        </p>
      </div> 

      <div className='max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 mt-10'>
        
        {/* Card 1 */}
        <div className='border shadow-md bg-white p-5 rounded-2xl'>
          <h3 className='font-semibold text-lg mb-2 text-center  text-gray-600'>Professional Summary</h3>
          <p>
            A professional summary at the top of your resume grabs the hiring 
            manager’s attention with a brief snapshot of your top skills and qualifications.
          </p>
        </div>

        {/* Card 2 */}
        <div className='border shadow-md bg-white p-5 rounded rounded-2xl'>
          <h3 className='font-semibold text-lg mb-2 text-center text-gray-600'>Weaknesses</h3>
          <p>
            The resume lacks measurable achievements, strong action verbs, and 
            role-specific keywords. Improving quantifiable results, formatting 
            consistency, and keyword alignment will enhance ATS performance.
          </p>
        </div>

        {/* Card 3 */}
        <div className='border shadow-md bg-white p-5 rounded rounded-2xl shadow-2xl  '>
          <h3 className='font-semibold text-lg mb-2 text-center text-gray-600 '>Formatting</h3>
          <p>
            Our resume scanner verifies if your resume format is optimized 
            for ATS parsing by extracting and organizing key details from each section.
          </p>
        </div>
        {/* card-4 */}
        <div className='border shadow-md bg-white p-5 rounded rounded-2xl shadow-2xl  '>
          <h3 className='font-semibold text-lg mb-2 text-center text-gray-600 '>Missing Keywords</h3>
          <p>
          Our Resume Scanner automatically detects spelling and grammar errors to ensure your resume looks polished, professional, and recruiter-ready.
          </p>
        </div>
       {/* card-5 */}
        <div className='border shadow-md bg-white p-5 rounded rounded-2xl'>
          <h3 className='font-semibold text-lg mb-2 text-center text-gray-600'>Improvement Suggestions</h3>
          <p>
          Our Resume Scanner provides smart improvement suggestions to help you strengthen your resume and increase your chances of landing interviews.
          </p>
        </div>

      </div>
    </div>
  )
}

export default Resumescannercheck