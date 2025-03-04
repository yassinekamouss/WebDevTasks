import BlogManager from './BlogManager.js';

export default class BlogUI {
    constructor(blogManager) {
        this.blogManager = blogManager;
        this.initEventListeners();
    }

    initEventListeners() {
        // Bouton d'ouverture du formulaire de post
        document.getElementById('addPostBtn').addEventListener('click', () => {
            this.showPostForm();
        });

        // Bouton de fermeture du formulaire
        document.getElementById('closePostForm').addEventListener('click', () => {
            this.hidePostForm();
        });

        // Soumission du formulaire de post
        document.getElementById('postForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.submitPost();
        });

        // Login button
        document.getElementById('loginBtn').addEventListener('click', () => {
            this.showLoginForm();
        });

        // Signup button
        document.getElementById('signupBtn').addEventListener('click', () => {
            this.showSignupForm();
        });

        // My Blogs button
        document.getElementById('myBlogsBtn').addEventListener('click', () => {
            this.showUserPosts();
        });
        
        // Bouton Home (tous les posts)
        document.getElementById('homeBtn').addEventListener('click', () => {
            this.showAllPosts();
        });
    }

    // Affiche le formulaire d'ajout de post
    showPostForm(post = null) {
        if (!this.blogManager.currentUser) {
            alert("Veuillez vous connecter pour ajouter un post");
            return;
        }
        
        const formTitle = document.getElementById('formTitle');
        const postTitle = document.getElementById('postTitle');
        const postContent = document.getElementById('postContent');
        const submitBtn = document.getElementById('submitPostBtn');
        
        // Si un post est fourni, il s'agit d'une édition
        if (post) {
            formTitle.textContent = "Modifier votre post";
            postTitle.value = post.title;
            postContent.value = post.content;
            submitBtn.textContent = "Mettre à jour";
            // Stocker l'ID du post à éditer
            document.getElementById('postForm').dataset.postId = post.id;
        } else {
            formTitle.textContent = "Votre Post";
            postTitle.value = "";
            postContent.value = "";
            submitBtn.textContent = "POST";
            // Supprimer l'ID du post en cas d'édition précédente
            delete document.getElementById('postForm').dataset.postId;
        }
        
        document.getElementById('postFormContainer').style.display = 'block';
    }

    // Cache le formulaire
    hidePostForm() {
        document.getElementById('postFormContainer').style.display = 'none';
        document.getElementById('postForm').reset();
    }

    // Soumet un nouveau post ou met à jour un post existant
    submitPost() {
        const title = document.getElementById('postTitle').value.trim();
        const content = document.getElementById('postContent').value.trim();
        const form = document.getElementById('postForm');
        
        if (!title || !content) {
            alert("Veuillez remplir tous les champs");
            return;
        }
        
        try {
            // Vérifier s'il s'agit d'une édition ou d'un nouveau post
            if (form.dataset.postId) {
                // Édition d'un post existant
                this.blogManager.updatePost(parseInt(form.dataset.postId), title, content);
                alert("Post mis à jour avec succès!");
            } else {
                // Création d'un nouveau post
                this.blogManager.createPost(title, content);
                alert("Post créé avec succès!");
            }
            
            this.hidePostForm();
            this.renderPosts();
        } catch (error) {
            alert(error.message);
        }
    }

    // Affiche le formulaire de connexion
    showLoginForm() {
        document.getElementById('loginModal').style.display = 'block';
        
        // Gérer la soumission du formulaire
        document.getElementById('loginForm').addEventListener('submit', (e) => {
            e.preventDefault();
            
            const email = document.getElementById('loginEmail').value;
            const password = document.getElementById('loginPassword').value;
            
            if (this.blogManager.login(email, password)) {
                alert("Connexion réussie!");
                document.getElementById('loginModal').style.display = 'none';
                this.updateUI();
                this.renderPosts();
            } else {
                alert("Email ou mot de passe incorrect");
            }
        });
        
        // Gérer la fermeture du modal
        document.getElementById('closeLoginForm').addEventListener('click', () => {
            document.getElementById('loginModal').style.display = 'none';
        });
    }

    // Affiche le formulaire d'inscription
    showSignupForm() {
        document.getElementById('signupModal').style.display = 'block';
        
        // Gérer la soumission du formulaire
        document.getElementById('signupForm').addEventListener('submit', (e) => {
            e.preventDefault();
            
            const username = document.getElementById('signupUsername').value;
            const email = document.getElementById('signupEmail').value;
            const password = document.getElementById('signupPassword').value;
            
            try {
                this.blogManager.registerUser(username, email, password);
                alert("Inscription réussie! Vous pouvez maintenant vous connecter.");
                document.getElementById('signupModal').style.display = 'none';
                // Afficher le formulaire de connexion
                this.showLoginForm();
            } catch (error) {
                alert(error.message);
            }
        });
        
        // Gérer la fermeture du modal
        document.getElementById('closeSignupForm').addEventListener('click', () => {
            document.getElementById('signupModal').style.display = 'none';
        });
    }

    // Affiche les posts de l'utilisateur
    showUserPosts() {
        if (!this.blogManager.currentUser) {
            alert("Veuillez vous connecter pour voir vos posts");
            return;
        }
        
        const posts = this.blogManager.getCurrentUserPosts();
        document.getElementById('postsTitle').textContent = "Mes Posts";
        this.renderPostsList(posts, true);
    }

    // Affiche tous les posts
    showAllPosts() {
        const posts = this.blogManager.getAllPosts();
        document.getElementById('postsTitle').textContent = "Tous les Posts";
        this.renderPostsList(posts, false);
    }

    // Affiche la liste des posts
    renderPostsList(posts, isUserPosts) {
        const container = document.getElementById('postsContainer');
        container.innerHTML = '';
        
        if (posts.length === 0) {
            container.innerHTML = '<p class="no-posts">Aucun post à afficher</p>';
            return;
        }
        
        posts.forEach(post => {
            const postElement = document.createElement('div');
            postElement.className = 'post';
            postElement.innerHTML = `
                <h3>${post.title}</h3>
                <p class="post-meta">Par ${post.authorName} le ${post.getFormattedDate()}</p>
                <p class="post-content">${post.content}</p>
            `;
            
            // Ajouter des boutons d'édition si c'est l'utilisateur qui consulte ses propres posts
            if (isUserPosts) {
                const actionsDiv = document.createElement('div');
                actionsDiv.className = 'post-actions';
                
                const editButton = document.createElement('button');
                editButton.textContent = 'Modifier';
                editButton.addEventListener('click', () => this.editPost(post));
                
                const deleteButton = document.createElement('button');
                deleteButton.textContent = 'Supprimer';
                deleteButton.className = 'delete-btn';
                deleteButton.addEventListener('click', () => this.deletePost(post));
                
                actionsDiv.appendChild(editButton);
                actionsDiv.appendChild(deleteButton);
                postElement.appendChild(actionsDiv);
            }
            
            container.appendChild(postElement);
        });
    }

    // Éditer un post
    editPost(post) {
        this.showPostForm(post);
    }

    // Supprimer un post
    deletePost(post) {
        if (confirm("Êtes-vous sûr de vouloir supprimer ce post?")) {
            try {
                this.blogManager.deletePost(post.id);
                this.renderPosts();
            } catch (error) {
                alert(error.message);
            }
        }
    }

    // Mettre à jour l'interface utilisateur
    updateUI() {
        // Mettre à jour l'interface en fonction de l'état de connexion
        const loggedIn = !!this.blogManager.currentUser;
        
        document.getElementById('loginBtn').style.display = loggedIn ? 'none' : 'inline-block';
        document.getElementById('signupBtn').style.display = loggedIn ? 'none' : 'inline-block';
        document.getElementById('myBlogsBtn').style.display = loggedIn ? 'inline-block' : 'none';
        document.getElementById('addPostBtn').style.display = loggedIn ? 'inline-block' : 'none';
        
        // Afficher le nom d'utilisateur si connecté
        const userInfoElement = document.getElementById('userInfo');
        if (loggedIn) {
            if (!userInfoElement) {
                const newUserInfoElement = document.createElement('span');
                newUserInfoElement.id = 'userInfo';
                newUserInfoElement.textContent = `Connecté en tant que: ${this.blogManager.currentUser.username}`;
                
                const navButtons = document.querySelector('.nav-buttons');
                navButtons.insertBefore(newUserInfoElement, navButtons.firstChild);
            } else {
                userInfoElement.textContent = `Connecté en tant que: ${this.blogManager.currentUser.username}`;
            }
            
            // Ajouter un bouton de déconnexion s'il n'existe pas déjà
            if (!document.getElementById('logoutBtn')) {
                const logoutBtn = document.createElement('button');
                logoutBtn.id = 'logoutBtn';
                logoutBtn.textContent = 'Déconnexion';
                logoutBtn.addEventListener('click', () => {
                    this.blogManager.logout();
                    this.updateUI();
                    this.showAllPosts();
                });
                document.querySelector('.nav-buttons').appendChild(logoutBtn);
            }
        } else {
            // Supprimer les éléments de l'utilisateur connecté
            if (userInfoElement) {
                userInfoElement.remove();
            }
            
            const logoutBtn = document.getElementById('logoutBtn');
            if (logoutBtn) {
                logoutBtn.remove();
            }
        }
    }

    // Rendu des posts (soit tous les posts, soit les posts de l'utilisateur)
    renderPosts() {
        if (this.blogManager.currentUser && document.getElementById('postsTitle').textContent === "Mes Posts") {
            this.showUserPosts();
        } else {
            this.showAllPosts();
        }
    }

    // Initialisation de l'interface
    init() {
        this.updateUI();
        this.showAllPosts();
    }
}