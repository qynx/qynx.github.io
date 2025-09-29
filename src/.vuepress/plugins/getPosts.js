export const getPostsPlugin = (options) => {
  return {
    name: 'vuepress-plugin-get-posts',
    onInitialized: (app) => {
        console.log('getPostsPlugin initialized')
        console.log(app.pages[0])
      // 过滤文章页面
      const posts = app.pages.filter(page => 
        page.filePathRelative?.startsWith('posts/') && 
        !page.frontmatter.hide
      )
      
      // 按日期排序
      posts.sort((a, b) => 
        new Date(b.frontmatter.date) - new Date(a.frontmatter.date)
      )
      
      // 添加到 siteData
      app.siteData.posts = posts
    }
  }
}