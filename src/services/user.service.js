import AsyncStorage from "@react-native-async-storage/async-storage";

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
        const apiRequests = ids.map(id => {
            return fetch('http://localhost:3000/users/' + id, {
                headers: {
                    Authorization: 'jwt ' + this.token
                }
            })
        });
        const responses = await Promise.all(apiRequests);
        const jsonResponses = responses.map(response => response.json());
        return await Promise.all(jsonResponses);
    }
}