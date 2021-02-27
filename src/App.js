import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Container } from "@material-ui/core";

import "./App.css";
import { ProtectedRoute } from "./components/private/ProtectedRoute";
import NavBar from "./components/navbar/Navbar";
import SignIn from "./components/auth/SignIn";
import SignUp from "./components/auth/SignUp";
import Home from "./components/private/Home";
import Landing from "./pages/Landing";
import PostDetail from "./components/post/PostDetail";

function App() {
    
    return (
        <div>
            <Router>
                <NavBar />
                <Container maxWidth="lg" >
                    <Route exact path="/" component={Landing} />
                    <Route exact path="/signin" component={SignIn} />
                    <Route exact path="/signup" component={SignUp} />
                    <Switch>
                        <ProtectedRoute exact path="/home" component={Home} />
                    </Switch>
                    <Route exact path="/post/:id" component={PostDetail} />
                </Container>
            </Router>
        </div>
        
    );
}

export default App;