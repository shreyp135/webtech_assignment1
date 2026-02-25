# College Interactive Quiz

## Introduction
This project is a web-based interactive quiz application designed to test users on their knowledge of college history and academic courses. The system provides instant feedback, tracks user scores, incorporates animations for better engagement, and includes an admin panel for managing quiz content. The application was developed using HTML5, CSS3, and JavaScript.

## Design Choices
The user interface was designed to be clean, simple, and responsive. A separate landing page allows users to navigate either to the quiz or the admin panel, ensuring clear separation between user and administrative functions.
* Semantic HTML5 elements such as `<header>`, `<main>`, `<section>`, and `<footer>` were used to maintain proper structure and improve accessibility.
* CSS was used to create a responsive layout using flexbox and to apply consistent spacing through margins and padding. Smooth animations such as fade-in effects, progress bar transitions, and option highlight scaling were added to enhance user experience without affecting performance.
* JavaScript handles all quiz logic including dynamic question rendering, answer validation, timer functionality, progress tracking, randomization of questions, and final score calculation.

## Code Structure
The project follows a modular structure:
* **landing.html** – Navigation page
* **index.html** – Quiz interface
* **admin.html** – Admin panel
* **style.css** – Styling and animations
* **script.js** – Quiz logic
* **admin.js** – Admin management functionality

This separation of structure (HTML), styling (CSS), and behavior (JavaScript) improves readability, maintainability, and scalability. Questions are stored in `localStorage` and can only be modified through the admin panel. The admin can securely log in, add new questions, and delete existing ones. This ensures controlled content management without modifying the main code.

## Challenges and Solutions
* **Challenge:** Managing dynamic updates of questions without page reloads.
  * **Solution:** Resolved by implementing a reset function to clear previous selections before loading the next question.
* **Challenge:** Implementing the timer with automatic answer submission.
  * **Solution:** Required careful control of `setInterval()` and `clearInterval()` to prevent multiple triggers.
* **Challenge:** Maintaining persistent quiz data without a backend database.
  * **Solution:** Achieved using `localStorage`, allowing questions to remain stored even after page refresh.

## Conclusion
The project successfully meets all requirements, including interactive functionality, smooth animations, responsive design, instant feedback, scoring system, admin-controlled question management, and accessibility features. It demonstrates effective use of front-end technologies and structured coding practices to build a user-friendly and maintainable web application.
