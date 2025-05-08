import {Client, Account} from 'appwrite';

const client = new Client()
    .setEndpoint('http://localhost:8080')
    .setProject('65f842e724264566317e');

const account = {
  endpoint: 'http://localhost:8080',
  projectId: '65f842e724264566317e',
  databaseId: '65f842e724264566317e',
  collectionId: '65f842e724264566317e'
};

export { account, client };