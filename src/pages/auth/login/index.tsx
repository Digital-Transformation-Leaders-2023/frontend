import { AppLayout } from "@widgets";
import { SignInForm } from "@features/auth/sign-in";
import { Helmet } from "react-helmet-async";

const LoginPage = () => {
  return (
    <>
      <Helmet>
        <title>Вход в личный кабинет</title>
      </Helmet>

      <AppLayout>
        <SignInForm />
      </AppLayout>
    </>
  );
};

export default LoginPage;
