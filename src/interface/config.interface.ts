export interface IJwtConfig {
  secret: string;
  algorithms: string[]
}
export interface IDb {
  host: string;
  dialect: 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql',
  dbName: string;
  pwd: string;
}
// const jwtConfig: IJwtConfig = {
//   secret: 'piersjwtsecret',
//   algorithms: ['HS256']
// };
// const dbConfig: IDb = {
//   host: 'localhost',
//   dialect: 'postgres',
//   dbName: 'piersdb',
//   pwd: '123123'
// };
// export {
//   dbConfig,
//   jwtConfig
// };
