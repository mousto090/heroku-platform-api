import React, { useEffect } from "react";
import { connect } from "react-redux";
import "./App.module.scss";
import Header from "./components/Header/Header";
import routes from "./routes";
import { userActions } from "./store/actions";


const App = ({ onCheckUserSession }) => {
  
  useEffect(() => {
    onCheckUserSession();
  }, [onCheckUserSession])

  return (
    <div className="App">
      <Header />
      {routes}
    </div>
  );
}



const mapDispatchToProps = dispatch => ({
  onCheckUserSession: () => dispatch(userActions.checkUserSession()),
})
export default connect(null, mapDispatchToProps)(App);
