import { GoogleGenerativeAI } from "@google/generative-ai";
import { query } from "firebase/firestore";


const fetchInfo = async (capturedImage) => {
  const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const image = {
    inlineData: {
      data: capturedImage.split(',')[1],
      mimeType: "image/jpeg"
    },
  };

  const query = 'Scan the receipt and give informations of the items and its details in the format below\
      {\
      "items":[{\
        "name": value,\
        "price": value,\
        "quantity": value,\
      }],\
      "paymentType": quantity,\
      "cardUsed": value,\
      "subtotal": value,\
      "tax": value,\
      "total": value,\
      "transactionDate": value\
      } \
      return json object without mentioning json and without any whitespces';

  try {
    const result = await model.generateContent([query, image]);
    const res = JSON.parse(result.response.text());
    return res;
  } catch (error) {
    console.error('Error sending image to Gemini API:', error);
  }
};

export default fetchInfo;