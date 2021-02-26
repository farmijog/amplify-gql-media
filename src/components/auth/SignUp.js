import React, { useContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Auth } from "aws-amplify";
import { Button, Card, Link, TextField, Typography, CircularProgress } from "@material-ui/core";
import { Alert, AlertTitle } from "@material-ui/lab";

import { AppContext } from "../../context/AppProvider";

const initialState = {
    username: "", password: "", email: "", authCode: "", formType: "signUp"
}

function SignUp() {
    const { setUserContext } = useContext(AppContext);
    const history = useHistory();
    const [user, setUser] = useState(null);
    const [formState, setFormState] = useState(initialState);
    const [errors, setErrors] = useState(null);
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
                history.push("/home")
            }
        } catch (error) {
            
        }
    }

    const onChange = (e) => {
        setFormState(() => ({ ...formState, [e.target.name]: e.target.value }));
    }

    const { formType } = formState;

    const signUpButton = async () => {
        const { username, email, password } = formState;
        if (username.trim() === "" || password.trim() === "" || email.trim() === "") return
        if (username === "" || password === "" || email === "") return
        try {
            setLoading(true);
            await Auth.signUp({ username, password, attributes: { email } });
            setErrors(null)
            setLoading(false);
            setFormState(() => ({ ...formState, formType: "confirmSignUp" }));
        } catch (error) {
            console.log("Error while signup: ", error)
            setErrors(error.message)
            setLoading(false);
        }
    }

    const confirmSignUpButton = async () => {
        const { username, authCode } = formState;
        if (username.trim() === "" || authCode.trim() === "") return
        if (username === "" || authCode === "") return
        setErrors(null)
        try {
            setLoading(true);
            await Auth.confirmSignUp(username, authCode);
            setErrors(null)
            setLoading(false);
            setFormState(() => ({ ...formState, username: "", password: "", email: "", authCode: "", formType: "signUp" }))
            history.push("/signin")
        } catch (error) {
            console.log("Error while confirm signup: ", error)
            setErrors(error.message);
            setLoading(false);
        }
    }
    return (
        <div>
            {
                formType === "signUp" && (
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
                                Sign Up
                            </Typography>
                            <TextField 
                                onChange={onChange}
                                name="username"
                                label="Username"
                                variant="outlined"
                                size="small"
                                style={{ width: "100%", maxWidth: 450, marginBottom: 15 }}
                            />
                            <TextField 
                                onChange={onChange}
                                type="password"
                                name="password"
                                label="Password"
                                variant="outlined"
                                size="small"
                                style={{ width: "100%", maxWidth: 450, marginBottom: 15 }}
                            />
                            <TextField 
                                onChange={onChange}
                                name="email"
                                label="Email"
                                variant="outlined"
                                size="small"
                                style={{ width: "100%", maxWidth: 450, marginBottom: 15 }}
                            />
                            <div style={{ display: "flex", flexDirection: "row" }}>
                                <Typography variant="body2" style={{ marginBottom: 15 }}>
                                    Already have an account?
                                </Typography>
                                &nbsp;
                                <Link href="/signin">Sign in</Link>
                            </div>
                            {loading ? (
                                <CircularProgress />
                            ) : (
                                <Button 
                                    style={{ width: 300, textTransform: "none", borderRadius: 50, marginBottom: 10 }} 
                                    onClick={signUpButton}
                                    variant="contained"
                                    color="primary"
                                >
                                    Sign Up
                                </Button>
                            )}    
                        </Card>
                        
                        {errors && (
                            <div style={{ width: "100%", maxWidth: 600, paddingTop: 20 }}>
                                <Alert severity="error">
                                    <AlertTitle> {errors} </AlertTitle>
                                </Alert>
                            </div>
                        )}
                    </div>
                )
            }
            {
                formType === "confirmSignUp" && (
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
                        <Typography variant="body2" style={{ marginBottom: 15 }}>
                            We've sent a verification code to your email
                        </Typography>
                        <TextField 
                            onChange={onChange}
                            name="authCode"
                            label="Verification code"
                            variant="outlined"
                            size="small"
                            style={{ width: "100%", maxWidth: 450, marginBottom: 15 }}
                        />
                        {loading ? (
                            <CircularProgress />
                        ) : (
                            <Button
                                style={{ width: 300, textTransform: "none", borderRadius: 50, marginBottom: 10 }} 
                                onClick={confirmSignUpButton}
                                variant="contained"
                                color="primary"
                            >
                                Confirm Sign Up
                            </Button>
                        )}
                        </Card>
                        {errors && (
                            <div style={{ width: "100%", maxWidth: 600, paddingTop: 20 }}>
                                <Alert severity="error">
                                    <AlertTitle> {errors} </AlertTitle>
                                </Alert>
                            </div>
                        )}
                    </div>
                )
            }
        </div>
    )
}

export default SignUp;


