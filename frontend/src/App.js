import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import BusinessesContainer from "./components/BusinessesContainer/BusinessesContainer.js";
import SplashPage from "./components/SplashPage/SplashPage.js";
import CreateBusiness from "./components/CreateBusiness/CreateBusiness.js";
import BusinessPage from "./components/BusinessPage/BusinessPage.js";


function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route exact path='/businesses'>
            <BusinessesContainer/>
          </Route>
          <Route exact path='/businesses/:id'>
            <BusinessPage/>
          </Route>
          <Route exact path='/'>
            <SplashPage/>
          </Route>
          <Route path='/create'>
            <CreateBusiness/>
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
