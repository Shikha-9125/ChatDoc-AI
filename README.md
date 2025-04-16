# AI-Powered PDF & Image Chatbot

## Overview
This is a full-stack web application where users can upload PDFs or images and interact with them through intelligent chat powered by OpenAI's GPT and Google's Gemini models. The AI understands the uploaded content and provides human-like responses to user queries.

**For example:**

- Upload a textbook PDF and ask: “What is circular composition?”
- Upload a resume and ask: “What are the candidate’s key skills?”

The AI interprets the file and responds instantly with accurate, human-like answers.

## Features
- **PDF & Image Upload:** Upload your documents (PDFs or images) directly to the app.
- **AI Chat:** Interact with the content of your uploaded files through an intuitive chat interface.
- **Resume Chat:** Upload resumes and ask personalized questions like, “What are the candidate’s strengths?”
- **Real-time Interactions:** Receive responses from AI models GPT-4 or Gemini in real time.
- **Semantic Search:** Fast, efficient, and scalable search of large documents using Pinecone (vector database).
- **Optimized Performance:** Utilizes LangChain to optimize AI queries and reduce API costs.

## Tech Stack
| Layer            | Technology                           | What it does                                           |
|------------------|---------------------------------------|--------------------------------------------------------|
| Frontend         | Next.js, React                        | Build the UI and structure of the website              |
| Styling          | Tailwind CSS, NextUI, Shadcn UI       | Creates a modern, responsive design and UI components  |
| Icons/UI         | Lucide Icons, Radix UI                | Add beautiful, customizable icons and UI elements      |
| File Upload      | Edgestore                             | Handles uploading and storing PDF/image files          |
| PDF Handling     | pdf-parse, react-pdf                  | Extracts text from PDFs                                |
| Image Parsing    | Gemini Vision API                     | Understands content from images                        |
| LLMs             | OpenAI (GPT-4), Gemini                | Understands file content and generates smart answers   |
| Vector DB        | Pinecone                              | Stores and retrieves semantic vector data efficiently  |
| Embeddings       | OpenAI Embedding Models               | Converts text into vector format for semantic search   |
| State Management | Zustand, useState                     | Manages UI states like uploaded file, chat flow        |
| Authentication   | Firebase Auth                         | Allows user login/logout securely                      |
| Backend          | Next.js API Routes, Langchain         | Handles AI integration and server logic                |
| Deployment       | Vercel                                | Hosts the full app live and fast                       |

## How It Works

### 1. User Uploads a File
- Upload a PDF or image (such as a resume or document) to the platform.

### 2. File Processing
- The file is stored in Edgestore.
- Text is extracted from PDFs using `pdf-parse` or `react-pdf`.
- Content from images (e.g., scanned documents) is parsed using Gemini Vision API (OCR).

### 3. Embedding and Semantic Search
- The extracted content is converted into embeddings using OpenAI’s embedding models.
- These embeddings are stored in Pinecone for fast, efficient semantic search.

### 4. User Queries
- When the user asks a question, the query is converted into an embedding.
- The app performs a semantic search through Pinecone to retrieve the most relevant content from the document.
- The relevant text chunks are passed to ChatGPT or Gemini to generate a response.

### 5. Real-time Chat Interface
- The AI-generated response is displayed in a chat interface.

## Features in Detail

### PDF & Image Upload
Upload a wide variety of file types (PDF, JPEG, PNG). The app supports various formats and handles complex documents, including multi-column PDFs and scanned images.

### AI-Powered Chat
Ask questions directly related to the content of the uploaded file, and the AI will respond with detailed, accurate information.

### Pinecone Vector Database
Pinecone enables the app to quickly search and retrieve relevant content from large documents by comparing the query's embedding with stored document embeddings. This allows for fast, scalable retrieval of information, even with large files.

### Resume Chat
Specifically designed for resumes, this feature allows users to upload resumes and ask questions like, “What are the candidate’s strengths?” or “What skills are mentioned?”

## Deployment
This project is deployed using **Vercel**, which hosts the app with fast and reliable performance. Vercel makes it easy to deploy and scale serverless applications.

## Getting Started

### Prerequisites
- Node.js (LTS version)
- npm or yarn

### Installation
Clone the repository:
```bash
git clone https://github.com/your-username/ai-pdf-image-chatbot.git
cd ai-pdf-image-chatbot
```
Install dependencies:
```bash
npm install
```
Set up environment variables:
- Create a `.env.local` file at the root of the project.
- Add your Firebase and OpenAI API keys as well as Pinecone credentials:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your-firebase-api-key
NEXT_PUBLIC_OPENAI_API_KEY=your-openai-api-key
NEXT_PUBLIC_PINECONE_API_KEY=your-pinecone-api-key
```
Run the app locally:
```bash
npm run dev
```
The app will be running at `http://localhost:3000`.

## Contributing
Feel free to fork this repository, submit issues, or create pull requests. Contributions are always welcome!


