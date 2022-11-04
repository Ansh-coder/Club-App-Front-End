import AsyncStorage from "@react-native-async-storage/async-storage";

export class MembershipService {
    token = '';

    /*async response = await fetch('http://localhost:3000/users/' + userId, {headers: {
        'Authorization': 'jwt ' + token
    }})
    
    const userData = await response.json()
    const userType = userData.map(typeofUser => typeofUser.data)

    console.log(userType)*/

    async getUserMemberships (userId) {
        this.token = await AsyncStorage.getItem('token');
        const response = await fetch('http://localhost:3000/memberships?' + new URLSearchParams({userId: userId}), {headers: {
        'Authorization': 'jwt ' + this.token
        }})

        return response.json()
        }

        async getClubMembershipRequests (clubId) {
            this.token = await AsyncStorage.getItem('token');
            const response = await fetch('http://localhost:3000/memberships?' + new URLSearchParams({clubId: clubId}), {headers: {
            'Authorization': 'jwt ' + this.token
            }})
    
            return response.json()
        }
    }
    
