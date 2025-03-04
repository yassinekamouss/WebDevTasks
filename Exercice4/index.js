import BlogManager from './BlogManager.js';
import BlogUI from './BlogUI.js';

document.addEventListener('DOMContentLoaded', () => {
    const blogManager = new BlogManager();
    const ui = new BlogUI(blogManager);
    
    ui.init();
});