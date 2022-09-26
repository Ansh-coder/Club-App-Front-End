import AsyncStorage from "@react-native-async-storage/async-storage";

export class ClubService {
    token = '';

    async list() {
        this.token = await AsyncStorage.getItem('token');
        const clubsJson = await fetch('http://localhost:3000/clubs/', {
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

    async getClubsForAdvisor(advisorId) {
        this.token = await AsyncStorage.getItem('token');
        const advisorClubs = await fetch('http://localhost:3000/clubs?' + new URLSearchParams({advisorId: advisorId}), {
            headers: {
                'Authorization': 'jwt ' + this.token
            }
        })

        return advisorClubs.json()
    }
}