import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Auth } from "aws-amplify";
import { Button } from "@material-ui/core";

function Home() {
    const history = useHistory();
    const [user, setUser] = useState(null);

    useEffect(() => {
        checkIfUserExists();
    }, [])

    const checkIfUserExists = async () => {
        try {
            const user = await Auth.currentAuthenticatedUser();
            setUser(user);
            console.log(user);
        } catch (error) {
            
        }
    }

    const signOutButton = async () => {
        try {
            await Auth.signOut();
            history.push("/signin");
        } catch (error) {
            console.log(error);
        }
    }

    return (
        user && (
            <>
                <h1>Welcome back, {user.username}! </h1>
                <Button 
                    variant="contained" 
                    color="primary" 
                    onClick={signOutButton} 
                    style={{
                        borderRadius: 50,
                        textTransform: "none"
                    }}
                >Sign Out</Button>
            </>
        )
    );

}

export default Home;