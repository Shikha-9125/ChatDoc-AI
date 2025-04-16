import { Pinecone } from "@pinecone-database/pinecone";
export const getPineconeClient = async () => {
  const client = new Pinecone({
    apiKey: process.env.PINECONE_API_KEY as string,
  });

  return client;
};
