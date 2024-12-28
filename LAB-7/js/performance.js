(function() {
    const startTime = performance.now();

    window.addEventListener('load', () => {
        const endTime = performance.now();
        const timeTaken = endTime - startTime;

        document.getElementById('loading-time').textContent = `${timeTaken.toFixed(2)}ms`;
    });
})();
