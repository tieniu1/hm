import require from '../utils/require'

export const login = data => {
  return require({
    method: 'POST',
    url: '/app/v1_0/authorizations',
    data
  })
}
