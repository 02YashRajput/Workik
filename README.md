# Automatic GitHub PR Review System

The **Automatic GitHub PR Review System** is an innovative, AI-driven tool designed to automate the process of reviewing pull requests (PRs) on GitHub. By leveraging the Hugging Face GPT-2 model, this system analyzes code changes for quality, adherence to coding standards, and potential bugs, significantly enhancing the code review process.

## Getting Started

To contribute to the project, please **fork the repository** to your GitHub account.

## User Workflow

### Steps to Use the Automatic GitHub PR Review System

1. **Login to GitHub**: Click the login button to authenticate your GitHub account.
2. **Select a Repository**: After logging in, navigate to the repository selection page.
3. **Connect Webhook**: Automatically set up a webhook to listen for new pull requests.
4. **Automatic Review**: Once a PR is raised, the system will fetch the PR data and use an AI model to generate a review.
5. **Post Review Comment**: The AI-generated review will be posted as a comment on the PR.

## 1. Installation

1.  **Fork the Repository**:

  

- Go to the repository URL and click on the **Fork** button to create a copy under your GitHub account.

  

2.  **Clone the Forked Repository**:

  

- In your terminal, clone the repository to your local machine:

```bash

git clone <your-forked-repository-url>

```

3.  **Navigate to the Project Directory**:

  

- Change into the project directory:

  ```bash

  cd <WorkikAssignment>

  ```

## 2. Set Up the Client (React)

1.  **Navigate to the Client Directory**:

    ```bash

    cd client

    ```

  

2.  **Install Dependencies**:

    ``` bash

    npm install

    ```

3.  **Start the Client**:

- Run the following command to start the React development server:

    ```bash

    npm start

    ```

- The client will typically be available at `http://localhost:3000`


## 3. Set Up the Server (Express)
1.  **Navigate to the Server Directory**:

    ```bash

    cd server

    ```

2.  **Install Dependencies**:

    ``` bash

    npm install

    ```
3. **Set up your environment variables**:Create a .env file in the backend directory and add the following variables:

    ```env

    PORT=5001
    GITHUB_CLIENT_ID=your_github_client_id
    GITHUB_CLIENT_SECRET=your_github_client_secret
    SESSION_SECRET=your_session_secret
    CLIENT_URL=http://localhost:3000
    MONGODB_URL=your_mongodb_url
    COOKIE_PARSER_SECRET=your_cookie_parser_secret
    SSH_URL=your_ssh_url
    HUGGING_FACE_API_KEY=your_hugging_face_api_key
    GITHUB_TOKEN=your_github_token
    ```
4.  **Start the Client**:

- Run the following command to start the React development server:

  ```bash

  npm start

  ```

## Features
  - AI-Powered Code Review: Uses the Hugging Face GPT-2 model to analyze code for quality and adherence to coding standards.
  - Seamless Integration: Automatically listens for new PRs and posts reviews as comments.
  - User-Friendly Interface: Built with React for an intuitive user experience.
