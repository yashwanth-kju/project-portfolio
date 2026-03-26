document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');
    const responseMessage = document.getElementById('responseMessage');
    const submitButton = contactForm.querySelector('button[type="submit"]');
    const spinner = document.getElementById('submitSpinner');

    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Clear previous messages
        responseMessage.className = 'response-message hidden';
        responseMessage.textContent = '';

        // Get form data
        const formData = new FormData(contactForm);
        const name = formData.get('name').trim();
        const email = formData.get('email').trim();
        const message = formData.get('message').trim();

        // Basic client-side validation
        if (!name || !email || !message) {
            showMessage('Please fill in all fields.', 'error');
            return;
        }

        // Show loading state
        submitButton.disabled = true;
        spinner.style.display = 'inline-block';

        const payload = {
            name: name,
            email: email,
            message: message
        };

        try {
            // Send request to backend (assuming localhost:5000 as per spec)
            const response = await fetch('http://localhost:5000/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            const data = await response.json();

            if (response.ok) {
                // Success
                showMessage(data.message || 'Message sent successfully!', 'success');
                contactForm.reset(); // Clear the form
            } else {
                // Backend error
                showMessage(data.error || 'Failed to send message. Please try again later.', 'error');
            }
        } catch (error) {
            // Network or server error
            console.error('Submission Error:', error);
            showMessage('Unable to connect to the server. Is the backend running?', 'error');
        } finally {
            // Reset loading state
            submitButton.disabled = false;
            spinner.style.display = 'none';
        }
    });

    function showMessage(text, type) {
        responseMessage.textContent = text;
        responseMessage.className = `response-message ${type}`;
        
        // Auto-hide the message after 5 seconds
        setTimeout(() => {
            responseMessage.classList.add('hidden');
        }, 5000);
    }
});
