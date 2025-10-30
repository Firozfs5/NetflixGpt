import { Provider } from "react-redux";
import "./index.css";
import appStore from "./store/appStore";
import { RouterProvider } from "react-router-dom";
import appRouter from "./routes/appRouter";
function App() {
  return (
    <div className="text-xl">
      <Provider store={appStore}>
        <RouterProvider router={appRouter} />
      </Provider>
    </div>
  );
}

export default App;
