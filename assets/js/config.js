export const stedsServer =
  process.env.NODE_ENV === 'production' ?
  'http://server.stedwardsfellwalkers.co.uk' :
  'http://steds-server.test';
