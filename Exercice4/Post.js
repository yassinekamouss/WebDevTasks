export default class Post {
    constructor(id, title, content, authorId, authorName) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.authorId = authorId;
        this.authorName = authorName;
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }

    // Mise à jour d'un post
    update(title, content) {
        this.title = title;
        this.content = content;
        this.updatedAt = new Date();
    }

    // Formatage de la date pour l'affichage
    getFormattedDate() {
        return new Date(this.createdAt).toLocaleDateString();
    }
    
    // Convertir l'instance Post en objet JSON
    toJSON() {
        return {
            id: this.id,
            title: this.title,
            content: this.content,
            authorId: this.authorId,
            authorName: this.authorName,
            createdAt: this.createdAt.toISOString(),
            updatedAt: this.updatedAt.toISOString()
        };
    }
    
    // Créer une instance Post à partir d'un objet JSON
    static fromJSON(json) {
        const post = new Post(json.id, json.title, json.content, json.authorId, json.authorName);
        post.createdAt = new Date(json.createdAt);
        post.updatedAt = new Date(json.updatedAt);
        return post;
    }
}