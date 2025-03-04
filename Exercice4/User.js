import Post from './Post.js';

export default class User {
    constructor(id, username, email, password) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.password = password;
        this.posts = [];
    }

    // Méthode pour créer un nouveau post
    createPost(title, content) {
        const newPost = new Post(Date.now(), title, content, this.id, this.username);
        this.posts.push(newPost);
        return newPost;
    }

    // Méthode pour récupérer tous les posts d'un utilisateur
    getPosts() {
        return this.posts;
    }

    // Authentification de l'utilisateur
    authenticate(password) {
        return this.password === password;
    }
    
    // Convertir l'instance User en objet JSON
    toJSON() {
        return {
            id: this.id,
            username: this.username,
            email: this.email,
            password: this.password,
            posts: this.posts.map(post => post.toJSON())
        };
    }
    
    // Créer une instance User à partir d'un objet JSON
    static fromJSON(json) {
        const user = new User(json.id, json.username, json.email, json.password);
        user.posts = json.posts.map(postJson => Post.fromJSON(postJson));
        return user;
    }
}
