import { Client, Account, ID } from "react-native-appwrite";

export const config = {
  endpoint: "https://cloud.appwrite.io/v1",
  projectId: "66e53ae4002b1d69ea51",
  platform: "com.test.aora",
  databaseId: "66e53fa9003d4596c6a6",
  userCollectionId: "66e53ffa0008c7cd723b",
  videoCollectionId: "66e5403800044e14afc4",
  storageId: "66e542dd00075e251553",
};

const client = new Client();
client
  .setEndpoint(config.endpoint)
  .setProject(config.projectId)
  .setPlatform(config.platform);

const account = new Account(client);

export const createUser = () => {
  account.create(ID.unique(), "me@example.com", "password", "Jane Doe").then(
    function (response) {
      console.log(response);
    },
    function (error) {
      console.log(error);
    },
  );
};
