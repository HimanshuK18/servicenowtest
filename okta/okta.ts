import okta from '@okta/okta-sdk-nodejs';
const client = new okta.Client({
  orgUrl: 'https://your-okta-domain.okta.com',
  token: 'your-okta-api-token'
});
