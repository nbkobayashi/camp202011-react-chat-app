type signedInUser = {
  email: string;
  uid: string;
};

type RootStackParamList = {
  Chat: { user: signedInUser };
  SignIn: undefined;
  SignUp: undefined;
};
