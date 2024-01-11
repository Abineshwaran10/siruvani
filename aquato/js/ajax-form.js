
    document.addEventListener('DOMContentLoaded', function() {
        // Get the form.
        var form = document.querySelector('#contact-form');
        // Get the messages div.
        var formMessages = document.querySelector('.ajax-response');
        // Set up an event listener for the contact form.
        form.addEventListener('submit', function(e) {
            // Stop the browser from submitting the form.
            e.preventDefault();
            // Serialize the form data.
            var formData = new FormData(form);
            // Submit the form using AJAX.
            fetch(form.action, {
                    method: 'POST',
                    body: formData
                })
                .then(function(response) {
                    return response.text();
                })
                .then(function(response) {
                    // Make sure that the formMessages div has the 'success' class.
                    formMessages.classList.remove('error');
                    formMessages.classList.add('success');
                    // Set the message text.
                    formMessages.textContent = response;
                    // Clear the form.
                    var inputs = form.querySelectorAll('input, textarea');
                    inputs.forEach(function(input) {
                        input.value = '';
                    });
                })
                .catch(function(error) {
                    // Make sure that the formMessages div has the 'error' class.
                    formMessages.classList.remove('success');
                    formMessages.classList.add('error');
                    // Set the message text.
                    if (error.responseText !== '') {
                        formMessages.textContent = error.responseText;
                    } else {
                        formMessages.textContent = 'Oops! An error occured and your message could not be sent.';
                    }
                });
        });
    });
