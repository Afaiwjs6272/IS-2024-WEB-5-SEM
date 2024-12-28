document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav a');

    navLinks.forEach(link => {
        link.addEventListener('mouseover', handleMouseOver);
        link.addEventListener('mouseout', handleMouseOut);
    });

    function handleMouseOver(event) {
        event.target.classList.add('active');
    }

    function handleMouseOut(event) {
        event.target.classList.remove('active');
    }

    navLinks.forEach(setActiveClass);
});

function setActiveClass(link) {
    if (link.href === window.location.pathname) {
        link.classList.add('active');
    }
}


