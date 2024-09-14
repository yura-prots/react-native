import {
  Client,
  Account,
  ID,
  Avatars,
  Databases,
  Query,
} from "react-native-appwrite";

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
const avatars = new Avatars(client);
const database = new Databases(client);

export const createUser = async (email, password, username) => {
  try {
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      username,
    );

    if (!newAccount) throw new Error();

    const avatarUrl = avatars.getInitials(username);

    await signIn(email, password);

    const newUser = await database.createDocument(
      config.databaseId,
      config.userCollectionId,
      ID.unique(),
      {
        accountId: newAccount.$id,
        email,
        username,
        avatar: avatarUrl,
      },
    );

    return newUser;
  } catch (error) {
    console.log(error);

    throw new Error(error);
  }
};

export const signIn = async (email, password) => {
  try {
    const session = await account.createEmailPasswordSession(email, password);

    return session;
  } catch (error) {
    console.log(error);

    throw new Error(error);
  }
};

export const getCurrentUser = async () => {
  try {
    const currentAccount = await account.get();
    if (!currentAccount) throw new Error();

    const currentUser = await database.listDocuments(
      config.databaseId,
      config.userCollectionId,
      [Query.equal("accountId", currentAccount.$id)],
    );

    if (!currentUser) throw new Error();

    return currentUser.documents[0];
  } catch (error) {
    console.log(error);

    throw new Error(error);
  }
};
