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
    const prompt = (formData.get("prompt") as string) || "Summarize this video.";
    
    // Check if we already have a Gemini URI (from previous chat)
    let fileUri = formData.get("fileUri") as string;
    let mimeType = formData.get("mimeType") as string || "video/mp4";

    // 1. IF NO URI, WE MUST UPLOAD THE FILE
    if (!fileUri) {
        const file = formData.get("file") as File;
        if (!file) {
          return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
        }

        console.log("📂 New file detected. Starting processing...");

        // Save file temporarily
        const bytes = Buffer.from(await file.arrayBuffer());
        tempFilePath = path.join(os.tmpdir(), `upload_${Date.now()}_${file.name}`);
        await writeFile(tempFilePath, bytes);

        // Upload to Gemini
        const upload = await fileManager.uploadFile(tempFilePath, {
          mimeType: file.type,
          displayName: file.name,
        });

        fileUri = upload.file.uri;
        mimeType = upload.file.mimeType;

        // Poll until active
        let uploadedFile = await fileManager.getFile(upload.file.name);
        while (uploadedFile.state === "PROCESSING") {
          console.log("⏳ Processing video in background...");
          await new Promise((r) => setTimeout(r, 2000));
          uploadedFile = await fileManager.getFile(upload.file.name);
        }

        if (uploadedFile.state !== "ACTIVE") {
          return NextResponse.json({ error: "Google failed to process video" }, { status: 500 });
        }

        // Cleanup local file
        await unlink(tempFilePath);
    } else {
        console.log("⚡ Reuse existing video URI:", fileUri);
    }

    // 2. GENERATE CONTENT (Using the URI)
    const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });

    const result = await model.generateContent([
      {
        fileData: {
          mimeType: mimeType,
          fileUri: fileUri, // Use the new or existing URI
        },
      },
      { text: prompt },
    ]);

    const output = result.response.text();

    // 3. RETURN RESULT + URI (So frontend can reuse it)
    return NextResponse.json({ 
        result: output,
        fileUri: fileUri, // Sending this back is the key!
        mimeType: mimeType
    });

  } catch (err) {
    console.error("Analysis Error:", err);
    if (tempFilePath) {
        try { await unlink(tempFilePath); } catch {}
    }
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}