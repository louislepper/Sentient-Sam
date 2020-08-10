const dev = {
    apiGateway: {
      URL: "localhost:3001"
    },
  };
  
  const prod = {
    apiGateway: {
        URL: "YOUR_PROD_API_GATEWAY_URL"
      },
  };
  
  const config = process.env.REACT_APP_STAGE === 'production'
    ? prod
    : dev;
  
  export default {
    // Add common config values here
    ...config
  };