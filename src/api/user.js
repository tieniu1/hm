import require from '../utils/require'//引入封装好的axios模块
// import store from '../store/'//引入容器

/**
 * 登录/注册
 */
export const login = data => {
  return require({
    method: 'POST',
    url: '/app/v1_0/authorizations',
    data
  })
}
/**
 * 获取登录用户信息
 */
export const getCurrentUser = () => {
  return require({
    method: 'GET',
    url: '/app/v1_0/user',
    // headers: {
    //   Authorization: `Bearer ${store.state.user.token}`
    // }
  })
}
/*获取用户频道列表*/
export const getChannels = () => {
  return require({
    method: 'GET',
    url: '/app/v1_0/user/channels'
  })
}
