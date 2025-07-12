export const config = {
  port: process.env.PORT || 3001,
  mongodbUrl: process.env.DATABASE_URL,
  jwtSecret: process.env.JWT_SECRET,
};
