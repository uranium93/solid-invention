import * as dbConfig from './db';
describe('database config', () => {
  it('should return correct config', () => {
    expect(dbConfig).toBeDefined();
  });
});
