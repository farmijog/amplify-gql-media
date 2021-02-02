import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ThemeProvider, CssBaseline, Container } from "@material-ui/core";

import "./App.css";
import { darkTheme } from "./styles/Theme";
import { ProtectedRoute } from "./components/private/ProtectedRoute";
import SignIn from "./components/auth/SignIn";
import SignUp from "./components/auth/SignUp";
import Home from "./components/private/Home";
import Landing from "./pages/Landing";

function App() {

    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <Container maxWidth="lg" >
                <Router>
                    <Route exact path="/" component={Landing} />
                    <Route exact path="/signin" component={SignIn} />
                    <Route exact path="/signup" component={SignUp} />
                    <Switch>
                        <ProtectedRoute exact path="/home" component={Home} />
                    </Switch>
                </Router>
            </Container>
        </ThemeProvider>
    );
}

export default App;