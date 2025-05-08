import { Client } from 'appwrite';

const client = new Client();

export const appwriteConfig = {
  endpoint: process.env.APPWRITE_ENDPOINT || 'https://fra.cloud.appwrite.io/v1',
  projectId: process.env.APPWRITE_PROJECT_ID || '681c28250019e84af0cf',
  databaseId: process.env.APPWRITE_DATABASE_ID || '681c295b0012f5857b54',
  collectionId: process.env.APPWRITE_COLLECTION_ID || '681c29620021b7a8a9c3'
};

client
  .setEndpoint(appwriteConfig.endpoint)
  .setProject(appwriteConfig.projectId);
