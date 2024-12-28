document.addEventListener('DOMContentLoaded', () => {
    const preloader = document.getElementById('preloader');
    const commentsContainer = document.getElementById('comments-container');
    const errorMessage = document.getElementById('error-message');

    async function fetchComments() {
        try {
            const randomId = Math.random() > 0.5 ? 100 : 200;
            const url = `https://jsonplaceholder.typicode.com/comments?_start=${randomId}&_limit=2`;
            preloader.style.display = 'block';

            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Ошибка сети');
            }

            const data = await response.json();
            renderComments(data);
        } catch (error) {
            errorMessage.style.display = 'block';
            console.error('Ошибка:', error);
        } finally {
            preloader.style.display = 'none';
        }
    }

    function renderComments(comments) {
        commentsContainer.innerHTML = '';

        comments.forEach(comment => {
            const commentElement = document.createElement('div');
            commentElement.classList.add('comment');
            commentElement.innerHTML = `
                <h3>${comment.name}</h3>
                <p><strong>Email:</strong> ${comment.email}</p>
                <p>${comment.body}</p>
            `;
            commentsContainer.appendChild(commentElement);
        });
    }
    fetchComments();
});
