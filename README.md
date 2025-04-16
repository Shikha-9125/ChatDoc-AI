AI-Powered PDF & Image Chatbot
Overview
This is a full-stack web application where users can upload PDFs or images and interact with them through intelligent chat powered by OpenAI's GPT and Google's Gemini models. The AI understands the uploaded content and provides human-like responses to user queries.

For example:

Upload a textbook PDF and ask: “What is circular composition?”

Upload a resume and ask: “What are the candidate’s key skills?”

The AI interprets the file and responds instantly with accurate, human-like answers.

Features
PDF & Image Upload – Upload your documents (PDFs or images) directly to the app.

AI Chat – Interact with the content of your uploaded files through an intuitive chat interface.

Resume Chat – Upload resumes and ask personalized questions like “What are the candidate’s strengths?”

Real-time Interactions – Receive responses from AI models GPT-4 or Gemini in real time.

Semantic Search – Fast, efficient, and scalable search of large documents using Pinecone (vector database).

Optimized Performance – Utilizes LangChain to optimize AI queries and reduce API costs.

Tech Stack
Layer | Technology | Purpose
Frontend | Next.js, React | Build the UI and structure of the website
Styling | Tailwind CSS, NextUI, Shadcn UI | Creates a modern, responsive design and UI components
Icons/UI | Lucide Icons, Radix UI | Adds beautiful, customizable icons and UI elements
File Upload | Edgestore | Handles uploading and storing PDF/image files
PDF Handling | pdf-parse, react-pdf | Extracts text from PDFs
Image Parsing | Gemini Vision API | Understands content from images (e.g., scanned text, graphs)
LLMs | OpenAI (GPT-4), Gemini | Understands file content and generates smart answers
Vector DB | Pinecone | Stores and retrieves semantic vector data efficiently
Embeddings | OpenAI Embedding Models | Converts text into vector format for semantic search
State Management | Zustand, useState | Manages UI states like uploaded file, chat flow
Authentication | Firebase Auth | Allows user login/logout securely
Backend | Next.js API Routes, LangChain | Handles AI integration and server logic
Deployment | Vercel | Hosts the full app live and fast

How It Works
User Uploads a File
Upload a PDF or image (such as a resume or document) to the platform.

File Processing

Stored in Edgestore

Text extracted from PDFs using pdf-parse or react-pdf

Image content parsed using Gemini Vision API

Embedding and Semantic Search

Extracted content converted into embeddings via OpenAI

Stored in Pinecone for fast semantic search

User Queries

User question converted to embedding

Pinecone retrieves relevant text chunks

Passed to GPT or Gemini for response

Real-time Chat Interface

AI-generated response shown in chat interface

Deployment
This project is deployed on Vercel for fast, scalable hosting of serverless web apps.

Getting Started
Prerequisites
Node.js (LTS version)

npm or yarn

Installation
bash
Copy
Edit
git clone https://github.com/Shikha-9125/ChatDoc-AI.git
cd ai-pdf-image-chatbot
npm install
Environment Variables
Create a .env.local file in the root and add:

env
Copy
Edit
NEXT_PUBLIC_FIREBASE_API_KEY=your-firebase-api-key
NEXT_PUBLIC_OPENAI_API_KEY=your-openai-api-key
NEXT_PUBLIC_PINECONE_API_KEY=your-pinecone-api-key
Run the app locally
bash
Copy
Edit
npm run dev
Visit: http://localhost:3000

Contributing
Feel free to fork, raise issues, or submit pull requests. Contributions are welcome!
