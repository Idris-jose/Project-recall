const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config({ path: '.env.local' });

async function main() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error("❌ No API KEY found. Check .env.local");
    return;
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  
  try {
    // This fetches the list directly from Google
    const modelList = await genAI.getGenerativeModel({ model: "gemini-pro" }).apiKey; 
    // Wait, the SDK doesn't have a direct 'listModels' helper easily accessible in the simplified wrapper.
    // Let's use the raw fetch to be 100% sure.
    
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`);
    const data = await response.json();

    console.log("✅ YOUR AVAILABLE MODELS:");
    console.log("-------------------------");
    data.models.forEach(m => {
      // We only care about models that can "generateContent"
      if (m.supportedGenerationMethods.includes("generateContent")) {
        console.log(`Model Name: "${m.name.replace('models/', '')}"`);
      }
    });
    console.log("-------------------------");
    console.log("👉 Pick one of the strings above and paste it into your route.ts");

  } catch (error) {
    console.error("Error fetching models:", error);
  }
}

main();