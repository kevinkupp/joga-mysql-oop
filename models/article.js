const BaseSQLModel = require('./base');

class ArticleModel extends BaseSQLModel {
    constructor() {
        super('article');
    }

    async findAll() {
        const articles = await super.findAll()
        return articles
    }

    async findOne(slug) {
        const article = await super.findOne('slug', slug)
        return article
    }

    async create(article) {
        const articleData = {
            name: article.name,
            slug: article.slug,
            image: article.image,
            body: article.body,
            published: new Date()
        }
        const createdArticleId = await super.create(articleData)
        return createdArticleId
    }
}

module.exports = ArticleModel;