import React, { useState, useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import { Auth } from "aws-amplify";

export function ProtectedRoute({ component: Component, ...rest }) {
    const [signedIn, setSignedIn] = useState(true);

    useEffect(() => {
        (async () => {
            let user = null;
            try {
                user = await Auth.currentAuthenticatedUser()
                if (user) {
                    setSignedIn(true);
                } else {
                    setSignedIn(false);
                }
            } catch (error) {
                setSignedIn(false);
            }
        })();
    }, [])

    return (
        <Route 
            {...rest}
            render={props => signedIn ? <Component {...props} /> : <Redirect to="/signin" />}
        />
    )
}