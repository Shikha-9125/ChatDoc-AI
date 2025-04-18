# AI-Powered PDF & Image Chatbot

##ChatPDF is a full-stack AI-powered web app that allows users to upload PDF, DOC, or image files and interact with them using a chatbot interface. It uses OpenAI’s API to answer questions based on the uploaded content, with features like real-time collaboration, file management, and theme switching.

---

## 🚀 Features

- 🔐 User Authentication (Google, GitHub, Email)
- 📤 Upload PDF/DOC/Image files
- 💬 Chat with your document (powered by OpenAI)
- 🔄 Real-time collaboration
- 📁 Rename/Delete files
- 📦 Chat Export (Download, Copy)
- 🔁 Reset chat
- 🔊 Text-to-Audio conversion
- 🌙 Light/Dark theme toggle


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

## Deployment
This project is deployed using **Vercel**, which hosts the app with fast and reliable performance. Vercel makes it easy to deploy and scale serverless applications.

## Getting Started

### Prerequisites
- Node.js (LTS version)
- npm or yarn

### Installation
Clone the repository:
```bash
git clone https://github.com/Shikha-9125/ChatDoc-AI.git
cd ai-pdf-image-chatbot
```
Install dependencies:
```bash
npm install
```
Set up environment variables:
- Create a `.env.local` file at the root of the project.
- Add your Firebase and OpenAI API keys:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your-firebase-api-key
NEXT_PUBLIC_OPENAI_API_KEY=your-openai-api-key
```
Run the app locally:
```bash
yarn run dev
```
The app will be running at `http://localhost:3000`.

## Contributing
Feel free to fork this repository, submit issues, or create pull requests. Contributions are always welcome!


