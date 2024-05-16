<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST["name"];
    $email = $_POST["email"];
    $phone = $_POST["phone"]; // Add phone number variable
    $message = $_POST["message"];
    
    // Set up email parameters
    $to = "smartelevatorsandchairlifts@gmail.com";
    $subject = "Contact Form Submission";
    $body = "Name: $name\nEmail: $email\nPhone: $phone\n\n$message"; // Include phone number in the email body
    
    // Send email
    if (mail($to, $subject, $body)) {
        // Email sent successfully
        echo json_encode(array('success' => true));
    } else {
        // Email sending failed
        echo json_encode(array('success' => false));
    }
} else {
    // If it's not a POST request, redirect back to the form
    header("Location: contact.html");
}
?>
