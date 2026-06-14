# 🤖 ChatDoc AI

An AI-powered document assistant that enables users to upload PDFs, DOC files, and images and interact with them through a conversational chatbot. The application leverages Retrieval-Augmented Generation (RAG), OpenAI, Gemini, and Pinecone to provide accurate, context-aware responses grounded in uploaded documents.

---

## 🚀 Features

- 🔐 User Authentication (Google, GitHub, Email)
- 📤 Upload PDF, DOC, and Image Files
- 💬 Chat with Documents using AI
- 🧠 Retrieval-Augmented Generation (RAG)
- 🔎 Semantic Search with Vector Embeddings
- 📁 Rename/Delete Files
- 📦 Export Chats
- 🔁 Reset Conversation
- 🔊 Text-to-Speech Support
- 🌙 Light/Dark Theme Toggle
- 🤝 Real-Time Collaboration
- 📱 Fully Responsive Design

---

## 🏗️ RAG Pipeline Architecture

<p align="center">
  <img src="./public/RAG_Pipeline architectural diagram.png" alt="RAG Pipeline Architecture" width="1000"/>
</p>

### Workflow Overview

#### Document Processing

1. User uploads PDF, DOC, or Image files.
2. Text is extracted from PDFs using parsing libraries.
3. Images and scanned documents are processed using Gemini Vision OCR.
4. Content is split into smaller chunks.
5. OpenAI Embedding Models generate vector embeddings.
6. Embeddings are stored in Pinecone along with metadata.

#### Query Processing

1. User submits a question.
2. The query is converted into an embedding.
3. Pinecone performs similarity search.
4. Relevant chunks are retrieved.
5. Retrieved context is combined with the user's question.
6. GPT-4 or Gemini generates a grounded response.
7. The final answer is displayed in the chat interface.

### Benefits

- ✅ Context-aware responses
- ✅ Reduced hallucinations
- ✅ Fast semantic search
- ✅ Multi-document support
- ✅ Accurate information retrieval
- ✅ Scalable architecture

---

## 🛠️ Tech Stack

| Layer | Technology |
|---------|------------|
| Frontend | Next.js, React |
| Styling | Tailwind CSS, NextUI, Shadcn UI |
| Icons/UI | Lucide Icons, Radix UI |
| File Upload | Edgestore |
| PDF Processing | pdf-parse, react-pdf |
| OCR | Gemini Vision API |
| Embeddings | OpenAI Embeddings |
| Vector Database | Pinecone |
| LLM | GPT-4, Gemini |
| Authentication | Firebase Auth |
| State Management | Zustand |
| Backend | Next.js API Routes |
| AI Framework | LangChain |
| Deployment | Vercel |

---

## ⚙️ System Design

```text
User
 │
 ▼
Upload Document
 │
 ▼
Text Extraction
(PDF Parse / OCR)
 │
 ▼
Chunking
 │
 ▼
Embedding Generation
 │
 ▼
Pinecone Vector Database
 │
 ▼
User Question
 │
 ▼
Query Embedding
 │
 ▼
Similarity Search
 │
 ▼
Relevant Chunks
 │
 ▼
GPT-4 / Gemini
 │
 ▼
Response
```

---

## 🔍 How It Works

### 1. Upload Files

Users can upload:

- PDF Documents
- DOC Files
- Images
- Scanned Documents

---

### 2. Content Extraction

#### PDFs

- pdf-parse
- react-pdf

#### Images

- Gemini Vision API
- OCR Processing

---

### 3. Chunking

Large documents are split into smaller chunks.

Example:

```text
Document
  ↓
Chunk 1
Chunk 2
Chunk 3
Chunk 4
```

This helps improve retrieval accuracy.

---

### 4. Embedding Generation

OpenAI Embedding Models convert each chunk into vector representations.

Example:

```text
"This candidate knows React"

↓

[0.23, 0.81, 0.54, ...]
```

Embeddings capture semantic meaning rather than exact keywords.

---

### 5. Vector Storage

Embeddings are stored in Pinecone with metadata.

Example:

```json
{
  "fileName": "resume.pdf",
  "page": 4,
  "chunkId": 10
}
```

---

### 6. Semantic Retrieval

When a question is asked:

```text
What technologies are mentioned?
```

The query is embedded and Pinecone retrieves the most relevant chunks.

---

### 7. Response Generation

Retrieved context is combined with:

- User Query
- System Prompt

and sent to GPT-4 or Gemini for answer generation.

---

### 8. Final Response

Example:

```text
User:
What technologies are used?

AI:
The document mentions React, Next.js, Tailwind CSS,
Firebase, Pinecone, LangChain, and OpenAI.
```

---

## 📂 Project Structure

```bash
ChatDoc-AI
│
├── app/
├── components/
├── lib/
├── hooks/
├── public/
│   ├── image.webp
│   ├── pdf.webp
│   └── RAG_Pipeline architectural diagram.png
│
├── styles/
├── utils/
├── package.json
├── next.config.js
└── README.md
```

---

## 🔧 Installation

Clone the repository:

```bash
git clone https://github.com/Shikha-9125/ChatDoc-AI.git
```

Move into the project directory:

```bash
cd ChatDoc-AI
```

Install dependencies:

```bash
npm install
```

or

```bash
yarn install
```

---

## 🔐 Environment Variables

Create a `.env.local` file.

```env
# Firebase
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=

# OpenAI
OPENAI_API_KEY=

# Gemini
GEMINI_API_KEY=

# Pinecone
PINECONE_API_KEY=
PINECONE_INDEX_NAME=

# EdgeStore
EDGE_STORE_ACCESS_KEY=
EDGE_STORE_SECRET_KEY=
```

---

## ▶️ Running Locally

```bash
npm run dev
```

or

```bash
yarn dev
```

Open:

```text
http://localhost:3000
```

---

## 🚀 Deployment

This project is deployed using Vercel.

```bash
vercel
```

### Deployment Benefits

- Global CDN
- Automatic GitHub Deployments
- Fast Serverless Functions
- Easy Scaling

---

## 🎯 Future Enhancements

- Multi-file Chat
- Chat History Search
- Citation-Based Answers
- Voice Conversations
- Team Workspaces
- Advanced OCR Support
- Document Summarization

---

## 👩‍💻 Author

### Shikha Gupta

Final Year Electrical Engineering Student  
Dr. B.R. Ambedkar National Institute of Technology

### Skills

- Data Structures & Algorithms
- Competitive Programming
- Full Stack Development
- Generative AI
- RAG Systems
- LangChain
- Pinecone
- OpenAI APIs

### Connect With Me

GitHub:
https://github.com/Shikha-9125

LinkedIn:
https://linkedin.com/in/shikha-gupta

---

## ⭐ Support

If you found this project useful:

⭐ Star the repository

🍴 Fork the repository

📝 Contribute and open issues

---

## 📄 License

This project is licensed under the MIT License.
