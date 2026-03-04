import React from 'react'

const Folder = () => {
  return (
      <>
       {/* LEFT SIDE (Brand Section) */}
       
       <div className="hidden md:flex w-1/2  bg-gradient-to-br from-indigo-600 to-purple-700 text-white items-center justify-center p-10">
          <div className="max-w-md">
            <h1 className="text-4xl font-bold mb-4">
            Resume Analyzer
            </h1>
  
            <p className="text-lg opacity-90">
              Improve your resume with AI-powered ATS analysis,
              skill suggestions, and job recommendations.
            </p>
  
            <div className="mt-10 space-y-3 text-sm opacity-80">
              <p>✅ ATS Score Analysis</p>
              <p>✅ Smart Skill Suggestions</p>
              <p>✅ Resume Optimization</p>
              <p>✅ Job Matching</p>
            </div>
          </div>
        </div>
    
   
      </>


  )
}

export default Folder