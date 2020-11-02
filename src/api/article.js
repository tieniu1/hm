/*文章请求相关*/
import require from '../utils/require'

/*频道新闻推荐_V1.1*/
export const getArticles = params => {
  return require({
    method: 'GET',
    url: '/app/v1_1/articles',
    params
  })
}
