import { Auth } from "aws-amplify";

export const CheckIfUserExists = () => {
    const user = localStorage.getItem("amplify-signin-with-hostedUI");
    console.log(user);
    return user
}