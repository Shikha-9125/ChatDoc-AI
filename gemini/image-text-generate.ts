const { GoogleGenerativeAI } = require("@google/generative-ai");

// Access your API key (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(process.env.API_KEY);
import axios from "axios";
async function imageUrlToBase64(imageUrl: string) {
  try {
    const response = await axios.get(imageUrl, {
      responseType: "arraybuffer",
      headers: {
        "Access-Control-Allow-Origin": "*", // Replace '*' with your allowed origin(s)
        "Access-Control-Allow-Methods":
          "GET, POST, OPTIONS, PUT, PATCH, DELETE",
        "Access-Control-Allow-Headers":
          "Origin, X-Requested-With, Content-Type, Accept",
      },
    });

    if (response.status === 200) {
      const base64Data = Buffer.from(response.data, "binary").toString(
        "base64"
      );
      return base64Data;
    } else {
      throw new Error(
        `Failed to fetch image (${response.status} ${response.statusText})`
      );
    }
  } catch (error: any) {
    console.log("Error:", error.message);
    return null;
  }
}

// Example usage:
const imageUrl =
  "https://firebasestorage.googleapis.com/v0/b/chat-with-pdf-d0b2f.appspot.com/o/files%2Fimages%2F1706374979805%2BScreenshot%20from%202024-01-23%2019-01-27.png?alt=media&token=78c114b2-7609-497e-b8a9-d4b9af35181b";

// console.Console(base64data);
function fileToGenerativePart(base64: any, mimeType: any) {
  return {
    inlineData: {
      data: base64,
      mimeType,
    },
  };
}
function imageUrlToBlob(imageUrl: string) {
  return new Promise(async (resolve, reject) => {
    try {
      // Fetch the image as an array buffer
      const response = await axios.get(imageUrl, {
        responseType: "arraybuffer",
        headers: {
          "Access-Control-Allow-Origin": "*", // Replace '*' with your allowed origin(s)
          "Access-Control-Allow-Methods":
            "GET, POST, OPTIONS, PUT, PATCH, DELETE",
          "Access-Control-Allow-Headers":
            "Origin, X-Requested-With, Content-Type, Accept",
        },
      });

      if (!response || !response.data) {
        throw new Error("Failed to fetch image");
      }

      // Convert the array buffer to a Blob
      const blob = new Blob([response.data], { type: "image/jpeg" }); // Change 'image/jpeg' to the appropriate MIME type if needed
      resolve(blob);
    } catch (error) {
      reject(error);
    }
  });
}
async function imageToTextGenerate(imageUrl: string) {
  let base64 = await imageUrlToBase64(imageUrl);
  // const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });
  // console.log(blob.type);
  // console.log(base64);
  return base64;
  
  // const imageParts = [fileToGenerativePart(base64, blob.type)];
  // const result = await model.generateContent([prompt, ...imageParts]);
  // const response = await result.response;
  // const text = response.text();
  // console.log(text);
  // return text;
}

export default imageToTextGenerate;
