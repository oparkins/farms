import Config from '../config/config';
import AuthenticationManager from './AuthenticationManager';

/*
 * NetworkManager is a wrapper to call the API Endpoints
 * Current version only supports v1 of API
 */ 
class NetworkManager {

    /**
     * This is a wrapper around the standard fetch call. Use this to connect to other addresses
     * @param {*} url The URL to connect to
     * @param {*} method The HTTP method to use (GET, POST, DELETE, PUT, etc...)
     */
    static fetch(url, method) {
        return new Promise(function(resolve, reject) {
            let fetchData = {
                method: method || "GET",
                headers: AuthenticationManager.getHeaders()
            }

            console.log(method + ":  " + Config.ServerAddress + "/v1" + url);
            fetch(Config.ServerAddress + "/v1" + url, fetchData)
                .then(function(data) { //data will be companies
                    AuthenticationManager.updateHeaders(data);
                    resolve(data);                    
                    return true;
                })
                .catch(function(error) {
                    reject(error);
                    return false;
                });
        });
    }

    /**
     * Allows for parameters to be added to the URL
     * @param {*} url The URL to connect to
     * @param {*} method The HTTP method to use (GET, POST, DELETE, PUT, etc...)
     * @param {*} data The data, in JSON object, to parameterize onto the URL.
     */
    static fetchWithParameters(url, method, data) {
        var params = [];
        for(var k in data) params.push(k);
        var query = params.map(k => `${k}=${data[k]}`)
            .join('&');
        return NetworkManager.fetch(encodeURI(url + "?" + query), "POST");
    }

    /**
     * Checks if the server found in the config file (../config/config.js) is valid. 
     * This method does not return true/false. Instead, if the server is valid, it will
     * run the resolve method of the promise. Otherwise, it will run the reject method
     */
    static isServerValid() {
        return new Promise(function(resolve, reject) {
            NetworkManager.fetch("/companies", 'GET').then(function(data) {
                var contentType = data.headers.get("FARMS-Server");
                console.log(contentType);
                console.log(data);
                for(var p of data.headers) {
                    console.log(p);
                }
                if(contentType && contentType == "yes-sir" !== -1) {
                    contentType = data.headers.get("FARMS-API");
                    if(contentType && contentType.indexOf("v1") !== -1) {
                        resolve(data);
                        return;
                    }
                }
                reject(data);
                
            }).catch(function(error) {
                console.log("NetworkManager::isServerValid Error");
                console.log(error);
                reject(error);
                return false;
            });
        });
    }
}

export default NetworkManager;