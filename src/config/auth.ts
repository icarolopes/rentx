export const authConfig = {
  jwt: {
    privateKey: process.env.JWT_PRIVATE_KEY,
    publickey: process.env.JWT_PUBLIC_KEY,
    expiresIn: '999d'
  }
}
