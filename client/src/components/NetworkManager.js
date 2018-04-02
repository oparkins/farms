import Config from '../config/config';

/*
 * NetworkManager is a wrapper to call the API Endpoints
 * Current version only supports v1 of API
 */ 

class NetworkManager {
    static fetch(url, method) {
        return new Promise(function(resolve, reject) {
            let fetchData = {
                method: method,
                headers: new Headers()
            }
            console.log(method + ":  " + Config.ServerAddress + "/v1" + url);
            fetch(Config.ServerAddress + "/v1" + url, fetchData)
                .then(function(data) { //data will be companies
                    resolve(data);                    
                    return true;
                })
                .catch(function(error) {
                    reject(error);
                    return false;
                });
        });
    }

    static isServerValid() {
        return new Promise(function(resolve, reject) {
            console.log("Fetching...");
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
                console.log(error);
                reject(error);
                return false;
            });
        });
    }
}

export default NetworkManager;