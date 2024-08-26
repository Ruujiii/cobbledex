// REACT ROUTER AND ROUTES
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HOME_ROUTE, TEST_ROUTE } from "./lib/routes";

// VIEWS
import { MenuPage } from "./views/menu-page";
import { TestPage } from "./views/test-page";

// OTHER IMPORTS
import { useDispatch } from "react-redux";    // Dispatching actions to the Redux store
import { useAppSelector } from "./app/hooks"; // Reading from the Redux store
import { RootState } from "@reduxjs/toolkit/query";

// APP

function App() {
  const dispatch = useDispatch();
  const user = useAppSelector((state) => state.reducer.user);
  console.log(user);
  
  return (
    <>
      <Router>
        <Routes>
          <Route path = {HOME_ROUTE} element = {<MenuPage />} />
          <Route path = {TEST_ROUTE} element = {<TestPage />} />
          <Route path = "*" element = {<h1>Not Found</h1>} />
        </Routes>
      </Router>
    </>
  );
};

export default App
