import Config from '../config/config';
import NetworkManager from './NetworkManager';


/**
 * This class manages the authentication for the account. All the specifics of the actions can be
 * found at https://maicolben.gitbooks.io/devise-token-auth/content/docs/usage/ as of April 18, 2018
 */
class AuthenticationManager {

    /**
     * Below are static variables to store the tokens between calls.
     */
    static access_token = "";
    static client = "";
    static expiry = "";
    static uid = "";

    /**
     * Returns a header object for use by the Network Manager
     */
    static getHeaders() {
        var headers = new Headers();
        headers.append("access-token", AuthenticationManager.access_token);
        headers.append("client", AuthenticationManager.client);
        headers.append("expiry", AuthenticationManager.expiry);
        headers.append("uid", AuthenticationManager.uid);
        return headers;
    }

    /**
     * Updates the headers with the latest information
     * @param {*The response from a network fetch} data 
     */
    static updateHeaders(data) {
        var contentType = data.headers.get("access-token");
        console.log("Access Token: " + contentType);
        if(contentType) {
            AuthenticationManager.access_token = contentType;
        }
        contentType = data.headers.get("client");
        console.log("Client: " + contentType);
        if(contentType) {
            AuthenticationManager.client = contentType;
        }
        contentType = data.headers.get("uid");
        console.log("UID: " + contentType);
        if(contentType) {
            AuthenticationManager.uid = contentType;
        }
        contentType = data.headers.get("expiry") || AuthenticationManager.expiry;
        console.log("Expiry: " + contentType);
        if(contentType) {
            AuthenticationManager.expiry = contentType;
        }
    }

    /**
     * Creates a new account on the server (if enabled on the server)
     * @param {*} email The email account to use for the identifier
     * @param {*} password  The password of the account. Please verify this password with the user first                     
     */
    static createAccount(email, password) {
        return NetworkManager.fetchWithParameters("/auth", "POST", {
            email: email,
            password: password,
            password_confirmation: password,
            confirm_success_url: Config.ClientAddress
        });
    }

    /**
     * Delete the current account
     */
    static deleteAccount() {
        return NetworkManager.fetch("/auth", "DELETE");
    }

    /**
     * Updates the current account with the specified parameters
     * @param {*The name of the user} name 
     */
    static updateAccount(name) {
        return NetworkManager.fetchWithParameters("/auth", "PUT", {
            name: name
        });
    }

    /**
     * Signs in the user
     * @param {*} email The identity of the user
     * @param {*} password The password
     */
    static signIn(email, password) {
        return NetworkManager.fetchWithParameters("/auth/sign_in", "POST", {
            email: email,
            password: password
        });
    }

    /**
     * Sign out the current user
     */
    static signOut() {        
        return NetworkManager.fetch("/auth/sign_out", "DELETE");
    }

    /**
     * Validates tokens with the server. This can be used
     * to check if the user is signed in already
     */
    static validateTokens() {
        return NetworkManager.fetch("/auth/validate_token", "GET");
    }

    /**
     * Tells the server to send a password reset to the email account (if it exists)
     * @param {*} email The email account to send the reset email to
     */
    static resetPassword(email) {
        return NetworkManager.fetchWithParameters("/auth/password", "POST", {
            email: email,
            redirect_url: Config.ClientAddress
        });
    }

    /**
     * Change the password of the current user
     * @param {*} password The new password
     */
    static changePassword(password) {
        return NetworkManager.fetchWithParameters("/auth/password/edit", "PUT", {
            password: password,
            password_confirmation: password
        });
    }

    /**
     * Changes the password by a reset token
     * @param {*} password The new password 
     * @param {*} resetToken The reset token that was found in the email
     */
    static changePasswordByResetToken(password, resetToken) {
        return NetworkManager.fetchWithParameters("/auth/password/edit", "PUT", {
            password: password,
            password_confirmation: password,
            redirect_url: Config.ClientAddress,
            reset_password_token: resetToken
        });
    }
}

export default AuthenticationManager;