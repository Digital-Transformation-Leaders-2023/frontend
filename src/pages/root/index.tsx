import { Button } from "@gravity-ui/uikit";
import { Helmet } from "react-helmet-async";

const RootPage = () => {
  return (
    <>
      <Helmet>
        <title>Главная страница</title>
      </Helmet>
      <Button view={"action"}>Привет мир</Button>
    </>
  );
};

export default RootPage;
