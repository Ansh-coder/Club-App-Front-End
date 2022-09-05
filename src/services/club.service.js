import AsyncStorage from "@react-native-async-storage/async-storage";

export class ClubService {
    token = '';

    async list() {
        this.token = await AsyncStorage.getItem('token');
        const clubsJson = await fetch('http://localhost:3000/clubs', {
            headers: {
                Authorization: 'jwt ' + this.token
            }
        })

        return clubsJson.json()
    }

    async getById(clubId) {
        this.token = await AsyncStorage.getItem('token');
        const clubsJson = await fetch(`http://localhost:3000/clubs/${clubId}`, {
            headers: {
                Authorization: 'jwt ' + this.token
            }
        })

        return clubsJson.json()
    }
}