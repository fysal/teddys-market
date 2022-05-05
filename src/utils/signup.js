import { createUserWithPassword } from 'firebase';
import { useContext } from 'react';

const signup = async ({email, password}) => {

    await createUserWithPassword(email, password);


}

export default signup;