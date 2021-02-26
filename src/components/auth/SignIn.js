import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Auth } from "aws-amplify";
import { Button, Card, CircularProgress, Link, TextField, Typography } from "@material-ui/core";
import { Alert, AlertTitle } from "@material-ui/lab";

import { AppContext } from "../../context/AppProvider";

const initialState = { username: "", password: "" };

function SignIn() {
    const { setUserContext } = useContext(AppContext);
    const history = useHistory();
    const [input, setInput] = useState(initialState);
    const [user, setUser] = useState(null);
    const [errors, setErrors] = useState();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        checkIfUserExists();
    }, [])

    const checkIfUserExists = async () => {
        try {
            const user = await Auth.currentAuthenticatedUser();
            setUser(user);
            setUserContext(user);
            if (user) {
                history.push("/home");
            }
        } catch (error) {
            
        }
    }

    const onChange = (e) => {
        setInput(() => ({ ...input, [e.target.name]: e.target.value }));
    }

    const signIn = async () => {
        const { username, password } = input;
        if (username.trim() === "" || password.trim() === "") return;
        if (username === "" || password === "") return;
        try {
            setLoading(true);
            const userLoggedIn = await Auth.signIn(username, password);
            setUserContext(userLoggedIn);
            setInput(() => ({ ...input, username: "", password: "" }));
            setLoading(false);
            history.push("/home");
        } catch (error) {
            console.log("Error while signin: ", error);
            setErrors(error.message);
            setLoading(false);
        }
        
    }

    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: 20 }} >
            <Card
                elevation={3}
                style={{
                    width: "100%",
                    maxWidth: 600,
                    padding: 15,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center"
                    
                }}
            >
                <Typography style={{ marginBottom: 10 }}>
                    Sign In
                </Typography>
                <TextField 
                    size="small"
                    variant="outlined"
                    label="username"
                    name="username"
                    onChange={onChange}
                    style={{ width: "100%", maxWidth: 450, marginBottom: 15 }}
                />
                <TextField 
                    type="password"
                    size="small"
                    variant="outlined"
                    label="password"
                    name="password"
                    onChange={onChange}
                    style={{ width: "100%", maxWidth: 450, marginBottom: 15 }}
                />
                <div style={{ display: "flex", flexDirection: "row" }}>
                                <Typography variant="body2" style={{ marginBottom: 15 }}>
                                    Don't have an account?
                                </Typography>
                                &nbsp;
                                <Link href="/signup">Sign up</Link>
                            </div>
                {loading ? (
                    <CircularProgress />
                ) : (
                    <Button
                        style={{ width: 300, textTransform: "none", borderRadius: 50, marginBottom: 10 }}
                        variant="contained"
                        color="primary"
                        onClick={signIn}
                    >
                        Sign In
                    </Button>
                )}
            </Card>
            
            {
                errors && (
                    <div style={{ width: "100%", maxWidth: 600, paddingTop: 20 }}>
                        <Alert severity="error">
                            <AlertTitle> {errors} </AlertTitle>
                        </Alert>
                    </div>
                )
            }
        </div>
    );
}

export default SignIn;