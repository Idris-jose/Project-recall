const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config({ path: '.env.local' }); // Load your API key

async function main() {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

  try {
    console.log("Checking available models...");
    // This is a hack to force the error message to list available models
    // or just prove connection works.
    const result = await model.generateContent("Hello");
    console.log("Success! gemini-1.5-pro works.");
    console.log(result.response.text());
  } catch (error) {
    console.error("Error details:", error.message);
  }
}

main();