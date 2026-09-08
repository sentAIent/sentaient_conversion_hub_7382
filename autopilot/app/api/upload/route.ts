import { NextResponse } from 'next/server';
import { Client } from 'minio';
import fs from 'fs/promises';
import path from 'path';

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;
    const saveToKB = formData.get('saveToKB') === 'true';

    if (!file) {
      return NextResponse.json({ success: false, message: 'No file uploaded' }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const uniqueFilename = `${Date.now()}_${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
    let fileUrl = '';

    // If MinIO is configured and requested, attempt to save to MinIO
    if (saveToKB && process.env.MINIO_ROOT_USER && process.env.MINIO_ROOT_PASSWORD) {
      try {
        console.log("Saving to MinIO Knowledge Base...");
        const minioClient = new Client({
          endPoint: 'sentaient_minio', // Global container name on the docker network
          port: 9000,
          useSSL: false,
          accessKey: process.env.MINIO_ROOT_USER,
          secretKey: process.env.MINIO_ROOT_PASSWORD
        });

        const bucketName = 'knowledge-base';
        
        // Ensure bucket exists
        const exists = await minioClient.bucketExists(bucketName);
        if (!exists) {
          await minioClient.makeBucket(bucketName, 'us-east-1');
        }

        await minioClient.putObject(bucketName, uniqueFilename, buffer, file.size, {
          'Content-Type': file.type
        });
        
        fileUrl = `minio://${bucketName}/${uniqueFilename}`;
        console.log(`Saved to MinIO: ${fileUrl}`);
      } catch (minioErr) {
        console.error("MinIO Error:", minioErr);
        // Fallback to local
        fileUrl = await saveLocal(buffer, uniqueFilename);
      }
    } else if (saveToKB) {
      // Local knowledge base fallback
      fileUrl = await saveLocal(buffer, uniqueFilename);
    } else {
      // Temporary local storage if NOT saving to KB
      fileUrl = await saveLocal(buffer, uniqueFilename, 'temp');
    }

    // Convert to base64 for immediate inlineData transmission to Gemini without needing signed URLs
    const base64Data = buffer.toString('base64');
    
    return NextResponse.json({ 
      success: true, 
      url: fileUrl,
      base64: base64Data,
      mimeType: file.type,
      filename: uniqueFilename
    });

  } catch (error: any) {
    console.error("Upload Error:", error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

async function saveLocal(buffer: Buffer, filename: string, subfolder: string = 'library') {
  const publicDir = path.join(process.cwd(), 'public', subfolder);
  await fs.mkdir(publicDir, { recursive: true });
  const filePath = path.join(publicDir, filename);
  await fs.writeFile(filePath, buffer);
  return `/${subfolder}/${filename}`;
}
