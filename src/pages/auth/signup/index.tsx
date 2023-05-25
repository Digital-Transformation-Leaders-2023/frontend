import { AppLayout } from "@widgets";
import { Helmet } from "react-helmet-async";
import { SignUpForm } from "@features/auth/sign-up";

const SignupPage = () => {
  return (
    <>
      <Helmet>
        <title>Регистрация</title>
      </Helmet>
      <AppLayout>
        <SignUpForm />
      </AppLayout>
    </>
  );
};

export default SignupPage;
