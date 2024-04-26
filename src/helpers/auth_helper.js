import { httpCall } from '../helpers/HttpCall'
import { v4 as uuidv4 } from 'uuid';

async function getAnonymousToken() {
    try {
        const newUUID = uuidv4();
        let response = await httpCall(
            {
                http: `${process.env.REACT_APP_API_HOST}/auth/anonymous-signin`,
                method: "POST",
                body: {"session_id": newUUID}
            }
        );
        if (response.error) {
            console.log(response.error)
        }
        else {
            return response.access_token;
        }
    } catch (error) {
        console.error('Error getting anonymous token:', error);
        return null;
    }
};

export default getAnonymousToken;