import { RouterDOMProvider, store, ThemeManager } from "@app/providers";
import { Provider } from "react-redux";
import { Suspense } from "react";
import { HelmetProvider } from "react-helmet-async";
import { configure, Spin, ToasterComponent, ToasterProvider } from "@gravity-ui/uikit";

import "@gravity-ui/uikit/styles/styles.css";
import "./index.scss";

configure({
  lang: "ru",
});

const App = () => {
  return (
    <HelmetProvider>
      <Provider store={store}>
        <ThemeManager>
          <Suspense fallback={(
            <div style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "100vh",
            }}>
              <Spin size={"l"} />
            </div>
          )}>
            <ToasterProvider>
              <RouterDOMProvider />
              <ToasterComponent />
            </ToasterProvider>
          </Suspense>
        </ThemeManager>
      </Provider>
    </HelmetProvider>
  );
};

export default App;
