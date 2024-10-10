import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

export const extractPRInfo = (prData)=> {
  return {
      title: prData.pull_request.title,
      description: prData.pull_request.body,
      
  };
}

export const fetchDiffData = async(diffUrl)=>{
  try {
    const response = await axios.get(diffUrl,{
      headers:{
        'Authorization': `Bearer ${process.env.GITHUB_TOKEN}`
      }
    });

    return formatDiffToPrompt(response.data);


    
  } catch (error) {
    console.error('Error fetching diff data:', error);
  }
}

function formatDiffToPrompt(diffData) {
  // Split the diff data into lines
  const lines = diffData.split('\n');

  // Initialize an array to hold the formatted prompt lines
  const promptLines = [];


  // Iterate through the lines to extract relevant information
  lines.forEach(line => {
    if (line.startsWith('diff --git')) {
      promptLines.push('File Changes Detected:\n');
    } else if (line.startsWith('@@')) {
      promptLines.push(`Changes Made At:`);
      promptLines.push(`- Change Details:`);
      promptLines.push(`  - From: ${line.slice(3).split(' ')[0]}`);
      promptLines.push(`  - To: ${line.slice(3).split(' ')[1]}`);
    } else if (line.startsWith('+')) {
      promptLines.push(`  - Added Line: ${line.slice(1)}`);
    } else if (line.startsWith('-')) {
      promptLines.push(`  - Removed Line: ${line.slice(1)}`);
    }
  });



  // Join the lines into a single string
  return promptLines.join('\n');
}
