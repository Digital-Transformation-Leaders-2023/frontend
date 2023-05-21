import { RouterDOMProvider, store } from "@app/providers";
import { Provider } from "react-redux";
import { Suspense } from "react";
import { HelmetProvider } from "react-helmet-async";
import { configure, Loader, ThemeProvider } from "@gravity-ui/uikit";

import "@gravity-ui/uikit/styles/styles.css";
import "./index.scss";

configure({
  lang: "ru",
});

const App = () => {
  return (
    <HelmetProvider>
      <Provider store={store}>
        <ThemeProvider theme={"light"}>
          <Suspense fallback={<Loader size={"m"} />}>
            <RouterDOMProvider />
          </Suspense>
        </ThemeProvider>
      </Provider>
    </HelmetProvider>
  );
};

export default App;
