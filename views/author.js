function escapeHtml(value) {
    return String(value ?? '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;')
}

function renderAuthor(author, articles) {
    const name = author.name
        || author.full_name
        || [author.first_name, author.last_name].filter(Boolean).join(' ')
        || `Author ${author.id}`
    const articleList = articles.length
        ? articles.map((article) => {
            const title = article.title || article.slug || `Article ${article.id}`
            const link = article.slug
                ? `<a href="/article/${encodeURIComponent(article.slug)}">${escapeHtml(title)}</a>`
                : escapeHtml(title)
            return `<li>${link}</li>`
        }).join('\n')
        : '<li>No articles found.</li>'

    return `<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>${escapeHtml(name)}</title>
</head>
<body>
    <main>
        <h1>${escapeHtml(name)}</h1>
        <h2>Articles</h2>
        <ul>${articleList}</ul>
    </main>
</body>
</html>`
}

module.exports = renderAuthor
