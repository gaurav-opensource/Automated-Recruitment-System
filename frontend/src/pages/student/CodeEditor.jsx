import { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import axios from "axios";
import Editor from "@monaco-editor/react";
import API from "../../apiConfig";

// Judge0
const JUDGE0_URL = "https://judge0-ce.p.rapidapi.com";
const JUDGE0_KEY = "1b7e563300msh3a6a8fa89c5812bp17fcd1jsn302890a8dc8a";
const JUDGE0_HOST = "judge0-ce.p.rapidapi.com";

const languages = [
  { name: "JavaScript", id: 63, editorLanguage: "javascript", starter: "// JS\n" },
  { name: "Python 3", id: 71, editorLanguage: "python", starter: "# Python\n" },
];

const CodeEditor = () => {
  const { jobId, userId } = useParams();
  const { state } = useLocation();
  const endTime = state?.endTime;

  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [language, setLanguage] = useState(languages[0]);
  const [results, setResults] = useState([]);
  const [timeLeft, setTimeLeft] = useState(null);
  const [loading, setLoading] = useState(true);

  // ⏱ Timer
  useEffect(() => {
    if (!endTime) return;
    const timer = setInterval(() => {
      const diff = Math.floor((new Date(endTime) - new Date()) / 1000);
      if (diff <= 0) {
        clearInterval(timer);
        handleSubmit(true);
      }
      setTimeLeft(diff);
    }, 1000);
    return () => clearInterval(timer);
  }, [endTime]);

  // Fetch questions
  useEffect(() => {
    const fetchQuestions = async () => {
      const res = await axios.get(`${API}/questions/${jobId}`);
      const formatted = res.data.map((q) => ({
        ...q,
        testCases: q.testCases || q.testcases || [],
      }));
      setQuestions(formatted);
      setLoading(false);
    };
    fetchQuestions();
  }, [jobId]);

  const currentQ = questions[currentIndex];

  const runCode = async () => {
    setResults([]);
    const code = answers[currentQ._id] || language.starter;

    const output = [];

    for (const tc of currentQ.testCases) {
      const res = await axios.post(
        `${JUDGE0_URL}/submissions?wait=true`,
        {
          source_code: code,
          language_id: language.id,
          stdin: tc.input,
        },
        {
          headers: {
            "x-rapidapi-key": JUDGE0_KEY,
            "x-rapidapi-host": JUDGE0_HOST,
          },
        }
      );

      const actual =
        res.data.stdout?.trim() ||
        res.data.stderr ||
        res.data.compile_output ||
        "";

      output.push({
        input: tc.input,
        expected: tc.output,
        actual,
        passed: actual === tc.output,
      });
    }

    setResults(output);
  };

const handleSubmit = async (auto = false) => {
  const payload = {
    userId,
    jobId,
    questionId: currentQ._id,
    code: answers[currentQ._id] || language.starter,
    languageId: language.id,
  };

  await axios.post(`${API}/questions/submit`, payload);
  // 
  await axios.post(`${API}/students/`, { userId, jobId });

  if (!auto) alert("Test submitted!");
};


  if (loading) return <p className="p-6">Loading...</p>;
  if (!currentQ) return <p>No questions</p>;

  return (
    <div className="flex h-screen">
      {/* LEFT */}
      <div className="w-1/2 p-6 overflow-y-auto bg-gray-50">
        <h2 className="text-2xl font-bold">{currentQ.title}</h2>
        <p className="mt-4">{currentQ.description}</p>

        <h3 className="mt-6 font-semibold">Test Cases</h3>
        {currentQ.testCases.map((tc, i) => (
          <div key={i} className="bg-gray-100 p-2 mt-2 text-sm">
            <p><b>Input:</b> {tc.input}</p>
            <p><b>Output:</b> {tc.output}</p>
          </div>
        ))}
      </div>

      {/* RIGHT */}
      <div className="w-1/2 flex flex-col">
        {/* Top */}
        <div className="p-3 bg-gray-100 flex justify-between">
          <select
            value={language.name}
            onChange={(e) =>
              setLanguage(languages.find(l => l.name === e.target.value))
            }
          >
            {languages.map(l => <option key={l.id}>{l.name}</option>)}
          </select>

          <span className="text-red-600 font-bold">
            ⏱ {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, "0")}
          </span>
        </div>

        {/* Editor */}
        <div className="h-[55%]">
          <Editor
            theme="vs-dark"
            language={language.editorLanguage}
            value={answers[currentQ._id] || language.starter}
            onChange={(v) =>
              setAnswers({ ...answers, [currentQ._id]: v })
            }
          />
        </div>

        {/* Output */}
        <div className="h-[25%] bg-black text-white p-3 overflow-auto">
          <h4 className="font-semibold mb-2">Output</h4>
          {results.length === 0 ? (
            <p className="text-gray-400">Run code to see output</p>
          ) : (
            results.map((r, i) => (
              <div key={i} className={r.passed ? "text-green-400" : "text-red-400"}>
                Test {i + 1}: {r.passed ? "Passed" : "Failed"}
                <br />
                Expected: {r.expected}
                <br />
                Actual: {r.actual}
              </div>
            ))
          )}
        </div>

        {/* Actions */}
        <div className="p-3 flex justify-between bg-gray-100">
          <button onClick={runCode} className="bg-yellow-500 px-4 py-2 text-white">
            Run Code
          </button>
          <button onClick={() => handleSubmit(false)} className="bg-green-600 px-4 py-2 text-white">
            Submit Test
          </button>
        </div>
      </div>
    </div>
  );
};

export default CodeEditor;
