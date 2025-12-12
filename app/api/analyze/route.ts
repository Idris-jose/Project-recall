import { GoogleGenerativeAI } from "@google/generative-ai";
import { GoogleAIFileManager } from "@google/generative-ai/server";
import { NextResponse } from "next/server";
import { writeFile, unlink } from "fs/promises";
import path from "path";
import os from "os";

const apiKey = process.env.GEMINI_API_KEY!;
const genAI = new GoogleGenerativeAI(apiKey);
const fileManager = new GoogleAIFileManager(apiKey);

export async function POST(request: Request) {
  let tempFilePath = "";

  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;
    const prompt = (formData.get("prompt") as string) || "Summarize this video.";

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // Save file temporarily (required for uploadFile)
    const bytes = Buffer.from(await file.arrayBuffer());
    tempFilePath = path.join(os.tmpdir(), `upload_${Date.now()}_${file.name}`);
    await writeFile(tempFilePath, bytes);

    console.log("File saved locally → uploading…");

    // Upload to Gemini File API
    const upload = await fileManager.uploadFile(tempFilePath, {
      mimeType: file.type,
      displayName: file.name,
    });

    console.log("Uploaded:", upload.file.uri);

    // Poll until file is ready
    let uploadedFile = await fileManager.getFile(upload.file.name);
    while (uploadedFile.state === "PROCESSING") {
      console.log("Processing video...");
      await new Promise((r) => setTimeout(r, 2000));
      uploadedFile = await fileManager.getFile(upload.file.name);
    }

    if (uploadedFile.state !== "ACTIVE") {
      return NextResponse.json({ error: "Google failed to process video" }, { status: 500 });
    }

    console.log("Video ready → generating content…");

   // "gemini-flash-latest" points to the stable version with a working Free Tier
const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });

    const result = await model.generateContent([
      {
        fileData: {
          mimeType: upload.file.mimeType,
          fileUri: upload.file.uri, // ← MUST USE THIS
        },
      },
      { text: prompt },
    ]);

    const output = result.response.text();

    // Cleanup
    await unlink(tempFilePath);

    return NextResponse.json({ result: output });
  } catch (err) {
    console.error("Analysis Error:", err);

    if (tempFilePath) {
      try {
        await unlink(tempFilePath);
      } catch {}
    }

    return NextResponse.json({ error: "Server error analyzing video" }, { status: 500 });
  }
}
 