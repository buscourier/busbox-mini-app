export const environment = {
  production: process.env['NODE_ENV'] == 'production',
  adminUrl: process.env['STRAPI_URL'],
  apiUrl: `${process.env['STRAPI_URL']}/api`,
  dopplerConfig: process.env['DOPPLER_CONFIG'],
  name: process.env['NODE_ENV'],
};
