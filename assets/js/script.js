var timeoutId1; // Variable to hold the first timeout ID
var timeoutId2; // Variable to hold the second timeout ID

// Function to open the form popup
function openFormPopup() {
    document.getElementById("formPopup").style.display = "block";
}

// Function to close the form popup
function closeFormPopup() {
    document.getElementById("formPopup").style.display = "none";
}

// Function to open pages twice with a delay
function openPagesTwice() {
    openFormPopup(); // Open the form popup
    timeoutId2 = setTimeout(openFormPopup, 30000); // Open the form popup again after 20 seconds
}

// Start the timeouts to open pages twice
timeoutId1 = setTimeout(openPagesTwice, 30000); // Open pages twice after 20 seconds

$(document).ready(function () {

    $('#contact-form').submit(function (e) {
        e.preventDefault(); // Prevent default form submission

        // Perform form validation
        if (validateForm()) {
            // Submit form via AJAX
            $.ajax({
                url: 'contactform.php',
                type: 'POST',
                data: $(this).serialize(),
                dataType: 'json',
                success: function (response) {
                    if (response.success) {
                        // Show SweetAlert message if form submitted successfully
                        Swal.fire({
                            title: "Query Sent!",
                            text: "Your message has been successfully sent through the contact form.",
                            icon: "success"
                        });
                        closeFormPopup();
                    } else {
                        // Show error message if form submission failed
                        Swal.fire({
                            title: "Oops...",
                            text: "Something went wrong! Please try again later.",
                            icon: "error"
                        });
                    }
                },
                error: function () {
                    // Show error message if AJAX request fails
                    Swal.fire({
                        title: "Request Fail...",
                        text: "Something went wrong! Please try again later.",
                        icon: "error"
                    });
                }
            });
        }
    });

    function validateForm() {
        var isValid = true;

        // Validate name field
        var name = $('#form_name').val();
        if (name.trim() === '') {
            showError($('#form_name'), 'Name is required.');
            isValid = false;
        } else {
            hideError($('#form_name'));
        }

        // Validate phone number field
        var phone = $('#form_phone').val();
        var phoneRegex = /^\d{10}$/; // Regex pattern for 10-digit phone number
        if (phone.trim() === '' || !phoneRegex.test(phone)) {
            showError($('#form_phone'), 'Valid phone number is required (e.g., 1234567890).');
            isValid = false;
        } else {
            hideError($('#form_phone'));
        }

        // Validate message field
        // Add validation for message field if needed

        return isValid;
    }

    // Function to show error message for a field
    function showError(element, message) {
        element.addClass('is-invalid');
        element.parent().next('.help-block').text(message);
    }

    // Function to hide error message for a field
    function hideError(element) {
        element.removeClass('is-invalid');
        element.parent().next('.help-block').text('');
    }
});
