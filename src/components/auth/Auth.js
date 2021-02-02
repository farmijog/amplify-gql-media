import React, { useEffect, useState } from "react";
import { Auth, Hub } from "aws-amplify";
import { TextField, Button, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    formStyle: {
        marginTop: 10,
        fontFamily: "Google Sans, Arial",
        textTransform: "none"
    }
}))

const initialFormState = {
    username: "", password: "", email: "", authCode: "", formType: "signUp"
}

function AuthComponent() {
    const classes = useStyles();
    const [formState, updateFormState] = useState(initialFormState);
    const [user, updateUser] = useState(null);

    useEffect(() => {
        checkUser();
        setAuthListener();
    }, [])

    async function setAuthListener() {
        Hub.listen('auth', (data) => {
            switch (data.payload.event) {
                case 'signOut':
                    updateFormState(() => ({ ...formState, formType: "signUp" }));
                    break;
                default:
                    break;
            }
        });
    }

    async function checkUser() {
        try {
            const user = await Auth.currentAuthenticatedUser();
            updateUser(user);
            updateFormState(() => ({ ...formState, formType: "signedIn" }));
        } catch (error) {
            
        }
    }

    function onChange(e) {
        e.persist();
        updateFormState(() => ({ ...formState, [e.target.name]: e.target.value }));
    }

    const { formType } = formState;
    async function signUp() {
        const { username, email, password } = formState;
        await Auth.signUp({ username, password, attributes: { email } });
        updateFormState(() => ({ ...formState, formType: "confirmSignUp" }));
    }

    async function confirmSignUp() {
        const { username, authCode } = formState;
        await Auth.confirmSignUp(username, authCode);
        updateFormState(() => ({ ...formState, formType: "signIn" }));
    }

    async function signIn() {
        const { username, password } = formState;
        await Auth.signIn(username, password);
        updateFormState(() => ({ ...formState, formType: "signedIn" }));
    }

    return (
        <div>
            {
                formType === "signUp" && (
                    <div className={classes.formStyle} >
                        <TextField name="username" onChange={onChange} label="username" variant="outlined" size="small" />
                        <TextField name="password" type="password" onChange={onChange} label="password" variant="outlined" size="small" />
                        <TextField name="email" onChange={onChange} label="email" variant="outlined" size="small" />
                        <Button variant="contained" color="primary" style={{ textTransform: "none" }} onClick={signUp}>Sign Up</Button>
                        <Button variant="contained" color="primary" style={{ textTransform: "none" }}
                            onClick={() => updateFormState(() => ({ ...formState, formType: "signIn" }))}
                        >Sign In</Button>

                    </div>
                )
            }
            {
                formType === "confirmSignUp" && (
                    <div className={classes.formStyle} >
                        <TextField name="authCode" onChange={onChange} label="code" variant="outlined" size="small" />
                        <Button variant="contained" color="primary" style={{ textTransform: "none" }} onClick={confirmSignUp}>Confirm Sign Up</Button>
                    </div>
                )
            }
            {
                formType === "signIn" && (
                    <div className={classes.formStyle} >
                        <TextField name="username" onChange={onChange} label="username" variant="outlined" size="small" />
                        <TextField name="password" type="password" onChange={onChange} label="password" variant="outlined" size="small" />
                        <Button variant="contained" color="primary" style={{ textTransform: "none" }} onClick={signIn}>Sign In</Button>
                    </div>
                )
            }
            {
                formType === "signedIn" && (
                    <div>
                        <h1>hey, welcome back!</h1>
                        <Button variant="contained" color="primary" style={{ textTransform: "none" }}
                            onClick={() => Auth.signOut()}
                        >
                            Sign Out
                        </Button>
                    </div>
                )
            }
        </div>
    )
}

export default AuthComponent;