import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { App } from "./components/app/app";
import store from "./store/store";

const container = document.getElementById("app");

const root = createRoot(container);
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

if (module.hot) {
  module.hot.accept("./components/app/app", () => {
    root.render(
      <Provider store={store}>
        <App />
      </Provider>
    );
  });
}
