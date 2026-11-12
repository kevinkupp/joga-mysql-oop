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

    async update(id, article) {
        const articleData = Object.fromEntries(
            ['name', 'slug', 'image', 'body', 'author_id']
                .filter((field) => Object.hasOwn(article, field))
                .map((field) => [field, article[field]])
        )

        if (Object.keys(articleData).length === 0) {
            throw new Error('No article data provided for update')
        }

        return super.update(id, articleData)
    }

    async delete(id) {
        return super.delete(id)
    }
}

module.exports = ArticleModel;