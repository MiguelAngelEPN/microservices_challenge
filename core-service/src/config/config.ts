export default () => ({
  server: {
    port: process.env.PORT || 3000,
  },
  database: {
    connectionString: process.env.BD_CONNECTION_MONGO,
  },
});
