const axios = require("axios");
const {
  JUDGE0_URL,
  JUDGE0_KEY,
  JUDGE0_HOST,
} = require("../config/env.config");

async function runCode(code, languageId, testCases) {
  const results = [];
  let passedCount = 0;

  for (const tc of testCases) {
    // Submit code
    const submission = await axios.post(
      `${JUDGE0_URL}/submissions`,
      {
        source_code: code,
        language_id: languageId,
        stdin: tc.input,
      },
      {
        headers: {
          "X-RapidAPI-Key": JUDGE0_KEY,
          "X-RapidAPI-Host": JUDGE0_HOST,
          "Content-Type": "application/json",
        },
      }
    );

    const token = submission.data.token;

    // Poll result
    let result;
    do {
      const response = await axios.get(
        `${JUDGE0_URL}/submissions/${token}`,
        {
          headers: {
            "X-RapidAPI-Key": JUDGE0_KEY,
            "X-RapidAPI-Host": JUDGE0_HOST,
          },
        }
      );
      result = response.data;
    } while (result.status.id < 3);

    const actual = (result.stdout || "").trim();
    const expected = tc.output.trim();
    const passed = actual === expected;

    if (passed) passedCount++;

    results.push({
      input: tc.input,
      expectedOutput: expected,
      actualOutput: actual,
      passed,
    });
  }

  return {
    results,
    passedCount,
    total: testCases.length,
  };
}

module.exports = { runCode };
