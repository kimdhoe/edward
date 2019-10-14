import ky from 'ky-universal'

export const hopper = ky.create({
  prefixUrl: 'http://localhost:3001',
})
