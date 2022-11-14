import AsyncStorage from "@react-native-async-storage/async-storage";

async function postData(url = '', data = {}) {
    // Default options are marked with *
    const token = await AsyncStorage.getItem('token');
    const response = await fetch(url, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      headers: {
        'Content-Type': 'application/json',
        // 'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'jwt ' + token
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript
}

export class UserService {
    token = '';

    async list() {
        this.token = await AsyncStorage.getItem('token');
        const clubsJson = await fetch('http://localhost:3000/users', {
            headers: {
                Authorization: 'jwt ' + this.token
            }
        })
        return clubsJson.json()
    }

    async getUsersFromIds(ids) {
        this.token = await AsyncStorage.getItem('token');
        const apiRequests = postData('http://localhost:3000/users/ids', {ids})
        return await apiRequests
    }

    /*async response = await fetch('http://localhost:3000/users/' + userId, {headers: {
        'Authorization': 'jwt ' + token
    }})
    
    const userData = await response.json()
    const userType = userData.map(typeofUser => typeofUser.data)

    console.log(userType)*/

    async getUserData (userId) {
        this.token = await AsyncStorage.getItem('token');
        const response = await fetch('http://localhost:3000/users/' + userId, {headers: {
        'Authorization': 'jwt ' + this.token
        }})

        return response.json()
    }
}