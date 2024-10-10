import axios from "axios";
import dotenv from "dotenv";
dotenv.config();
export const setupWebhook = async(owner, repo, token)=> {

  const url = `https://api.github.com/repos/${owner}/${repo}/hooks`;

  const data = {
      config: {
          url: `${process.env.SSH_URL}/api/webhook`, 
          content_type: 'json',
      },
      events: ['pull_request'],
      active: true,
  };

  try {
      const response = await axios.post(url, data, {
          headers: {
              'Authorization': `Bearer ${token}`,
              'Accept': 'application/vnd.github.v3+json',
          },
      });

      return response.data.id;
  } catch (error) {
      console.error('Error setting up webhook:', error.response.data);
  }
}


export const removeWebhook = async (owner, repo, token, webhookId) => {
  const url = `https://api.github.com/repos/${owner}/${repo}/hooks/${webhookId}`;

  try {
    const response = await axios.delete(url, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/vnd.github.v3+json',
      },
    });
    
  } catch (error) {
    if (error.response) {
      console.error('Error removing webhook:', error.response.data);
    } else {
      console.error('Error removing webhook:', error.message);
    }
  }
};