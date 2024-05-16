<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST["name"];
    $phone = $_POST["phone"];
    
    // Set up email parameters
    $to = "smartelevatorsandchairlifts@gmail.com";
    $subject = "Contact Form Submission";
    $body = "Name: $name\nPhone Number: $phone\n";
    
    // Send email
    if (mail($to, $subject, $body)) {
        // Email sent successfully
        echo json_encode(array('success' => true));
        // Add JavaScript code to handle success (e.g., show a success message)
    } else {
        // Email sending failed
        echo json_encode(array('success' => false));
        // Add JavaScript code to handle failure (e.g., show an error message)
    }
} else {
    // If it's not a POST request, redirect back to the form
    header("Location: contact.html");
}
?>
