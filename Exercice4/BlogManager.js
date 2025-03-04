import User from './User.js';
import Post from './Post.js';


export default class BlogManager {
    constructor() {
        this.users = [];
        this.currentUser = null;
        this.posts = [];
        this.lastUserId = 0;
        this.loadFromLocalStorage();
    }

    // Charger les données depuis localStorage
    loadFromLocalStorage() {
        // Charger les utilisateurs
        const usersJson = localStorage.getItem('blog_users');
        if (usersJson) {
            const usersData = JSON.parse(usersJson);
            this.users = usersData.map(userData => User.fromJSON(userData));
            
            // Trouver l'ID maximum pour éviter les doublons
            this.lastUserId = this.users.reduce((maxId, user) => Math.max(maxId, user.id), 0);
        }
        
        // Charger les posts
        const postsJson = localStorage.getItem('blog_posts');
        if (postsJson) {
            const postsData = JSON.parse(postsJson);
            this.posts = postsData.map(postData => Post.fromJSON(postData));
        }

        // Charger l'utilisateur actuel
        const currentUserJson = localStorage.getItem('blog_current_user');
        if (currentUserJson) {
            const currentUserData = JSON.parse(currentUserJson);
            // Retrouver l'utilisateur correspondant dans la liste des utilisateurs
            this.currentUser = this.users.find(user => user.id === currentUserData.id);
        }
    }

    // Sauvegarder les données dans localStorage
    saveToLocalStorage() {
        // Sauvegarder les utilisateurs
        const usersJson = JSON.stringify(this.users.map(user => user.toJSON()));
        localStorage.setItem('blog_users', usersJson);
        
        // Sauvegarder les posts
        const postsJson = JSON.stringify(this.posts.map(post => post.toJSON()));
        localStorage.setItem('blog_posts', postsJson);
        
        // Sauvegarder l'utilisateur actuel
        if (this.currentUser) {
            const currentUserJson = JSON.stringify(this.currentUser.toJSON());
            localStorage.setItem('blog_current_user', currentUserJson);
        } else {
            localStorage.removeItem('blog_current_user');
        }
    }

    // Création d'un nouvel utilisateur
    registerUser(username, email, password) {
        if (this.users.some(user => user.email === email)) {
            throw new Error("Cet email est déjà utilisé");
        }
        
        const newUser = new User(++this.lastUserId, username, email, password);
        this.users.push(newUser);
        this.saveToLocalStorage();
        return newUser;
    }

    // Connexion d'un utilisateur
    login(email, password) {
        const user = this.users.find(user => user.email === email);
        if (user && user.authenticate(password)) {
            this.currentUser = user;
            this.saveToLocalStorage();
            return true;
        }
        return false;
    }

    // Déconnexion
    logout() {
        this.currentUser = null;
        localStorage.removeItem('blog_current_user');
        this.saveToLocalStorage();
    }

    // Création d'un nouveau post
    createPost(title, content) {
        if (!this.currentUser) {
            throw new Error("Vous devez être connecté pour créer un post");
        }
        
        const newPost = this.currentUser.createPost(title, content);
        this.posts.push(newPost);
        this.saveToLocalStorage();
        return newPost;
    }

    // Mise à jour d'un post
    updatePost(postId, title, content) {
        if (!this.currentUser) {
            throw new Error("Vous devez être connecté pour modifier un post");
        }
        
        // Trouver le post dans la liste des posts globale
        const post = this.posts.find(p => p.id === postId);
        
        // Vérifier que le post existe et appartient à l'utilisateur
        if (!post || post.authorId !== this.currentUser.id) {
            throw new Error("Post introuvable ou vous n'êtes pas autorisé à le modifier");
        }

        post.update(title, content);
        
        // Mettre à jour également dans la liste des posts de l'utilisateur
        const userPost = this.currentUser.posts.find(p => p.id === postId);
        if (userPost) {
            userPost.update(title, content);
        }
        
        this.saveToLocalStorage();
        return post;
    }

    // Supprimer un post
    deletePost(postId) {
        if (!this.currentUser) {
            throw new Error("Vous devez être connecté pour supprimer un post");
        }
        
        // Vérifier que le post existe et appartient à l'utilisateur
        const postIndex = this.posts.findIndex(p => p.id === postId);
        if (postIndex === -1 || this.posts[postIndex].authorId !== this.currentUser.id) {
            throw new Error("Post introuvable ou vous n'êtes pas autorisé à le supprimer");
        }
        
        // Supprimer le post de la liste globale
        this.posts.splice(postIndex, 1);
        
        // Supprimer également de la liste des posts de l'utilisateur
        const userPostIndex = this.currentUser.posts.findIndex(p => p.id === postId);
        if (userPostIndex !== -1) {
            this.currentUser.posts.splice(userPostIndex, 1);
        }
        
        this.saveToLocalStorage();
        return true;
    }

    // Récupération de tous les posts
    getAllPosts() {
        return this.posts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    // Récupération des posts de l'utilisateur actuel
    getCurrentUserPosts() {
        if (!this.currentUser) {
            return [];
        }
        return this.currentUser.posts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }
}