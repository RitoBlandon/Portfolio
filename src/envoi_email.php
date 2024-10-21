<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = htmlspecialchars(trim($_POST['name']));
    $email = htmlspecialchars(trim($_POST['email']));
    $message = htmlspecialchars(trim($_POST['message']));
 
    // Vérifiez si l'email est valide
    if (filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $to = 'blandonpinzon@gmail.com'; // Remplacez par votre adresse e-mail
        $subject = "Nouveau message de $name";
        $body = "Nom: $name\nEmail: $email\n\nMessage:\n$message";
        $headers = "From: $email";
 
        // Envoyer l'e-mail
        if (mail($to, $subject, $body, $headers)) {
            echo "Message envoyé avec succès!";
        } else {
            echo "Échec de l'envoi du message.";
        }
    } else {
        echo "Adresse e-mail invalide.";
    }
} else {
    echo "Méthode de requête non valide.";
}
?>