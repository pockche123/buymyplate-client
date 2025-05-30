import axiosInstance from './axiosInstance.js'; 



export const loginWithKeycloak = async(username, password) => {
    const params = new URLSearchParams();
    params.append('client_id', 'buymyplate-rest-api')
    params.append('grant_type', 'password');
    params.append('username', username);
    params.append('password', password);
    params.append('client_secret', 'a1b2c3d4-5678-90ef-ghij-klmnopqrstuv')

    try{
        console.log("keycloak  found")
    const response = await fetch('http://localhost:8090/realms/BuyMyPlate/protocol/openid-connect/token', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          body: params
    });
    if (!response.ok) {
        throw new Error(`Keycloak error: ${response.status}`);
      }
      const data = await response.json(); // Parse the JSON response
      return data; 
  
}catch(error){
    console.error('Keycloak error: ', error)
    throw error
}

}
