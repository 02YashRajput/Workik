
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();
export const callHuggingFace =async(prInfo,diffData)=>{
  const HUGGING_FACE_API_URL = "https://api-inference.huggingface.co/models/gpt2"
  const inputText = `lease review the following Pull Request and provide feedback without repeating the prompt:  :\n\ntitle : ${prInfo.title} \nDescription : ${prInfo.description} \n ${diffData} Review Focus:
- Provide feedback on code quality and any potential issues.

Thank you!`

  try{
    const  response = await axios.post(HUGGING_FACE_API_URL,
      { inputs: inputText }, // Send the input text
            {
                headers: {
                    Authorization: `Bearer ${process.env.HUGGING_FACE_API_KEY}` 
                }
            }
    )
    const reviewComment = response.data[0].generated_text; // Adjust based on the response format

    return reviewComment || 'No review generated.';
  }catch(err){
    console.error("Hugging Face error:", err);
    throw new Error("Hugging Face API failed");
  }
}