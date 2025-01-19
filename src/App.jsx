import { BrowserRouter, Route, Routes } from "react-router-dom";
import Body from "./body";
import Login from "./components/login";
import Feed from "./components/feed";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import Profile from "./components/profile";

function App() {
  return (
    <>
      <Provider store={appStore}>
        <BrowserRouter basename="/">
          <Routes>
            <Route path="/" element={<Body />}>
              <Route path="/" element={<Feed/>}/>
              <Route path="/login" element={<Login />} />
              <Route path="/profile" element={<Profile/>} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
