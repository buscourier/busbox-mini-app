export const environment = {
  production: process.env['NODE_ENV'] == 'production',
  adminUrl: process.env['API_URL'],
  apiUrl: `${process.env['API_URL']}`,
  dopplerConfig: process.env['DOPPLER_CONFIG'],
  name: process.env['NODE_ENV'],
  apiKey: process.env['API_KEY'],
};
