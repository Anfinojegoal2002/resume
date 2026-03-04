import React, { useRef, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

const UploadPage = () => {
  const inputRef = useRef(null);

  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [feedback, setFeedback] = useState(null);

  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState("");

  const resetAll = () => {
    setFile(null);
    setMessage("");
    setFeedback(null);
    setProgress(0);
    setError("");
    setDragActive(false);
    if (inputRef.current) inputRef.current.value = "";
  };

  const handleFile = (f) => {
    setError("");
    setMessage("");
    setFeedback(null);

    if (!f) return;

    // Validate type + size
    const allowed = ["application/pdf", "image/png", "image/jpeg"];
    if (!allowed.includes(f.type)) {
      setError("Only PDF, PNG, JPG files are allowed.");
      return;
    }
    if (f.size > 10 * 1024 * 1024) {
      setError("File too large. Max 10MB allowed.");
      return;
    }

    setFile(f);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      setError("Please select a file first.");
      return;
    }

    setUploading(true);
    setProgress(0);
    setError("");
    setMessage("");

    try {
      const formData = new FormData();
      formData.append("resume", file); // must match upload.single("resume")

      const response = await axios.post("https://resumeded.onrender.com/resume", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (evt) => {
          if (!evt.total) return;
          const pct = Math.round((evt.loaded * 100) / evt.total);
          setProgress(pct);
        },
      });

      setFeedback(response.data.feedback || null);
      setMessage(response.data.message || "Upload successful!");
      // If you want to clear file after upload, uncomment:
      // setFile(null); if (inputRef.current) inputRef.current.value = "";
    } catch (err) {
      console.error("Upload error:", err);
      setError("Upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const cardAnim = {
    hidden: { opacity: 0, y: 16 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className=" bg-gradient-to-br from-blue-50 via-indigo-50 to-violet-50">
      <div className="mx-auto max-w-6xl px-6 py-12">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-red-600 via-indigo-600 to-violet-600 bg-clip-text text-transparent">
            Resume Analyzer
          </h1>
          <p className="mt-2 text-slate-600">
            Upload your resume and receive ATS-friendly feedback with actionable improvements.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-10 items-start">
          {/* Upload Card */}
          <motion.div variants={cardAnim} initial="hidden" animate="show" className="rounded-3xl bg-white/80 backdrop-blur-xl shadow-xl border border-white/40 overflow-hidden">
            <div className="p-7">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-slate-900">Upload Resume</h2>
                <button
                  type="button"
                  onClick={resetAll}
                  className="text-sm font-semibold text-slate-500 hover:text-slate-900 transition"
                >
                  Reset
                </button>
              </div>

              <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
                {/* Dropzone */}
                <div
                  onDragEnter={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setDragActive(true);
                  }}
                  onDragOver={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setDragActive(true);
                  }}
                  onDragLeave={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setDragActive(false);
                  }}
                  onDrop={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setDragActive(false);
                    const dropped = e.dataTransfer.files?.[0];
                    handleFile(dropped);
                  }}
                  className={[
                    "relative rounded-2xl border-2 border-dashed p-6 transition",
                    dragActive
                      ? "border-blue-500 bg-blue-50/70"
                      : "border-blue-300 bg-gradient-to-br from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100",
                  ].join(" ")}
                >
                  <input
                    ref={inputRef}
                    id="file-upload"
                    type="file"
                    name="resume"
                    className="hidden"
                    accept=".pdf,.png,.jpg,.jpeg"
                    onChange={(e) => handleFile(e.target.files?.[0])}
                  />

                  <motion.div
                    animate={dragActive ? { scale: 1.02 } : { scale: 1 }}
                    transition={{ type: "spring", stiffness: 260, damping: 18 }}
                    className="flex flex-col items-center text-center"
                  >
                    <div className="h-12 w-12 rounded-2xl bg-white shadow-sm border border-slate-100 flex items-center justify-center">
                      <svg
                        viewBox="0 0 24 24"
                        className="h-6 w-6 text-slate-700"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 16V4m0 0l-4 4m4-4l4 4M4 16v3a1 1 0 001 1h14a1 1 0 001-1v-3"
                        />
                      </svg>
                    </div>

                    <p className="mt-4 text-sm text-slate-700">
                      <span className="font-semibold text-slate-900">Click to upload</span> or drag and drop
                    </p>
                    <p className="mt-1 text-xs text-slate-500">PDF / PNG / JPG • up to 10MB</p>

                    <button
                      type="button"
                      onClick={() => inputRef.current?.click()}
                      className="mt-4 inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-red-600 via-indigo-600 to-violet-600 px-4 py-2 text-sm font-semibold text-white hover:from-blue-700 hover:via-indigo-700 hover:to-violet-700 shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      Choose File
                    </button>
                  </motion.div>

                  {/* Soft glow */}
                  <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 hover:opacity-100 transition">
                    <div className="absolute -inset-2 bg-gradient-to-r from-blue-200/30 via-purple-200/20 to-pink-200/20 blur-2xl" />
                  </div>
                </div>

                {/* Selected File */}
                <AnimatePresence>
                  {file && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      className="rounded-2xl border border-slate-200 bg-white p-4"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-sm font-semibold text-slate-900">Selected file</p>
                          <p className="text-sm text-slate-600 break-all">{file.name}</p>
                          <p className="text-xs text-slate-400 mt-1">
                            {(file.size / (1024 * 1024)).toFixed(2)} MB
                          </p>
                        </div>

                        <button
                          type="button"
                          onClick={() => {
                            setFile(null);
                            if (inputRef.current) inputRef.current.value = "";
                          }}
                          className="rounded-xl px-3 py-2 text-sm font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition"
                        >
                          Remove
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Upload progress */}
                <AnimatePresence>
                  {uploading && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      className="rounded-2xl border border-indigo-200 bg-white p-4"
                    >
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-semibold text-slate-900">Uploading…</p>
                        <p className="text-sm text-slate-600">{progress}%</p>
                      </div>
                      <div className="mt-3 h-2 rounded-full bg-slate-100 overflow-hidden">
                        <motion.div
                          className="h-full bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600"
                          initial={{ width: "0%" }}
                          animate={{ width: `${progress}%` }}
                          transition={{ ease: "easeOut", duration: 0.25 }}
                        />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Error / Success */}
                <AnimatePresence>
                  {(error || message) && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      className={[
                        "rounded-xl border p-4 text-sm",
                        error
                          ? "border-red-200 bg-red-50 text-red-700"
                          : "border-emerald-200 bg-emerald-50 text-emerald-800",
                      ].join(" ")}
                    >
                      {error || message}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={uploading}
                  className={[
                    "w-full rounded-2xl px-5 py-3 text-sm font-semibold text-white shadow-lg transition-all duration-300",
                    uploading
                      ? "bg-slate-400 cursor-not-allowed"
                      : "bg-gradient-to-r from-red-600 via-indigo-200 to-violet-600 hover:red-700 hover:via-indigo-700 hover:to-violet-700 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-400",
                  ].join(" ")}
                >
                  {uploading ? "Uploading…" : "Upload & Analyze"}
                </button>
              </form>
            </div>

            <div className="px-7 py-4 bg-slate-50 border-t border-slate-100">
              <p className="text-xs text-slate-500">Tip: Upload a clean PDF for best ATS parsing results.</p>
            </div>
          </motion.div>

          {/* Feedback Panel */}
          <motion.div
            variants={cardAnim}
            initial="hidden"
            animate="show"
            transition={{ delay: 0.1 }}
            className="rounded-3xl bg-white shadow-xl border border-indigo-100 overflow-hidden"
          >
            <div className="p-7">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-slate-900">Analysis</h2>
                {feedback?.atsScore !== undefined && (
                  <span className="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold text-white bg-gradient-to-r from-indigo-600 to-violet-600">
                    ATS Score: {feedback.atsScore}
                  </span>
                )}
              </div>

              {!feedback ? (
                <div className="mt-6 rounded-2xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 p-6">
                  <p className="text-sm text-slate-600">
                    Upload a resume to see strengths, weaknesses, missing keywords, and suggestions.
                  </p>
                  <div className="mt-4 space-y-2">
                    <div className="h-3 w-2/3 rounded bg-slate-200 animate-pulse" />
                    <div className="h-3 w-1/2 rounded bg-slate-200 animate-pulse" />
                    <div className="h-3 w-3/4 rounded bg-slate-200 animate-pulse" />
                  </div>
                </div>
              ) : (
                <div className="mt-6 space-y-5">
                  <Section title="Summary" text={feedback.summary} />
                  <ListSection title="Strengths" items={feedback.strengths} />
                  <ListSection title="Weaknesses" items={feedback.weaknesses} />
                  <ListSection title="Missing Keywords" items={feedback.missingKeywords} />
                  <ListSection title="Improvement Suggestions" items={feedback.improvementSuggestions} />
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

const Section = ({ title, text }) => (
  <motion.div
    initial={{ opacity: 0, y: 8 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.35 }}
    className="rounded-2xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 p-5 shadow-sm"
  >
    <h3 className="text-sm font-semibold text-slate-900">{title}</h3>
    <p className="mt-2 text-sm text-slate-600 leading-relaxed">{text || "—"}</p>
  </motion.div>
);

const ListSection = ({ title, items }) => {
  const list = Array.isArray(items)
    ? items
    : typeof items === "string" && items.trim()
      ? items.split(",").map((s) => s.trim())
      : [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="rounded-2xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 p-5 shadow-sm"
    >
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-slate-900">{title}</h3>
        <span className="text-xs text-slate-400">{list.length}</span>
      </div>

      {list.length === 0 ? (
        <p className="mt-2 text-sm text-slate-600">—</p>
      ) : (
        <ul className="mt-3 space-y-2">
          {list.map((item, idx) => (
            <li key={idx} className="flex gap-2 text-sm text-slate-700">
              <span className="mt-[7px] h-2 w-2 rounded-full bg-gradient-to-r from-blue-500 to-violet-500 shrink-0" />
              <span className="leading-relaxed">{item}</span>
            </li>
          ))}
        </ul>
      )}
    </motion.div>
  );
};

export default UploadPage;
