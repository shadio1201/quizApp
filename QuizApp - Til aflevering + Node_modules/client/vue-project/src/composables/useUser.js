import { ref } from "vue";
import Authentication from '../services/Authentication'
const user = ref(null);
const refreshToken = ref(localStorage.getItem("refreshToken") || null);
const accessToken = ref(localStorage.getItem("accessToken") || null);

const useUser = () => {

    const signin = async (email, password) => {
        
        let error
        
        const response = await Authentication.login({
            email: email.value,
            password: password.value
        })
    
        if(response.data.error) {

            if(Array.isArray(response.data.error)) {
               error = response.data.error[0].msg
            } 
            else {
              error = response.data.error
            }    
        
        } else {

            user.value = response.data.profile;
            refreshToken.value = response.data.refreshToken;
            accessToken.value = response.data.accessToken;

            localStorage.setItem("accessToken", response.data.accessToken);
            localStorage.setItem("refreshToken", response.data.refreshToken);
            localStorage.setItem("user", response.data.profile.uuid);
      
        }

        return {response, error}
    }

    const register = async (username, email, password) => {
        
        let error
        
        const response = await Authentication.register({
            username: username.value,
            email: email.value,
            password: password.value
        })
    
        if(response.data.error) {
            if(Array.isArray(response.data.error)) {
               error = response.data.error[0].msg
            } 
            else {
              error = response.data.error
            }    
        
        } 

        return {response, error}
    }

    const signout = async () => {
        if (!refreshToken.value) {
          return;
        }
    
        const response = await Authentication.signout({
            token: refreshToken.value
        })
    
        // Guard statement
        if(response.data.error) {
            if(Array.isArray(response.data.error)) {
               error = response.data.error[0].msg
            } 
            else {
              error = response.data.error
            }    
        
        } 
    
        // Reset values
        user.value = null;
        refreshToken.value = null;
        accessToken.value = null;
    
        // Clear localStorage
        localStorage.clear();
        
    
    
        // Return response
        return response
      };

      const refresh = async () => {
        
        let error = null

        if (!refreshToken.value) {
          return;
        }
    
        const response = await Authentication.refresh({
            token: refreshToken.value
        })
    
        // Guard statement
        if(response.data.error) {
            if(Array.isArray(response.data.error)) {
               error = response.data.error[0].msg
            } 
            else {
              error = response.data.error
            }    
        
        } 
    
        // Guard statement
        if (error) {
          // Reset local storage
          localStorage.clear();
    
          // Reset data store
          user.value = null;
          refreshToken.value = null;
          accessToken.value = null;
          return error;
        }
    
        // Update local data store
        user.value = response.user;
        refreshToken.value = response.refreshToken;
        accessToken.value = response.accessToken;
    
        // Set localStorage
        localStorage.setItem("user", JSON.stringify(response.user));
        localStorage.setItem("refreshToken", response.refreshToken);
        localStorage.setItem("accessToken", response.accessToken);
    
        // Return initial response object
        return response;
      };


    
    return { signin, register, signout, refresh, user, refreshToken, accessToken }
}

export default useUser
