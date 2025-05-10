export const refreshAuthToken = async () => {
    try {
      const refreshToken = localStorage.getItem("refreshToken");
      
      if (!refreshToken) {
        throw new Error("No refresh token available");
      }
  
      const params = new URLSearchParams();
      params.append('client_id', 'buymyplate-rest-api');
      params.append('grant_type', 'refresh_token');
      params.append('refresh_token', refreshToken);
  
      const response = await fetch('http://localhost:8090/realms/BuyMyPlate/protocol/openid-connect/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: params
      });
  
      if (!response.ok) {
        throw new Error('Token refresh failed');
      }
  
      const data = await response.json();
      
      // Update stored tokens
      localStorage.setItem("accessToken", data.access_token);
      localStorage.setItem("refreshToken", data.refresh_token);
      localStorage.setItem("tokenExpiry", Date.now() + data.expires_in * 1000);
      
      return data.access_token;
      
    } catch (error) {
      console.error('Refresh token error:', error);
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("tokenExpiry");
      throw error;
    }
  };