# SportsSphere: A Sports Equipment Store

SportsSphere is a fully responsive sports accessories e-commerce platform where customers can browse, purchase, and review various sports accessories. It caters to different sports disciplines with features such as user authentication, product management, and a sleek, user-friendly design.

## Live Website

[SportsSphere Live Website](https://sports-sphere-xi.vercel.app/)

## Features

- **Responsive Design**: Fully responsive across mobile, tablet, and desktop devices.
- **User Authentication**:
  - Supports email/password authentication and social login (Google).
  - Conditional rendering of login/logout functionality based on user state.
- **Dynamic Equipment Management**:
  - View, add, update, and delete equipment.
  - Only logged-in users can manage their equipment.
- **Dark/Light Theme Toggle**: Toggle between light and dark modes for better user experience.
- **Sorting Functionality**: Sort equipment by price (ascending/descending) for easier browsing.
- **Interactive UI**:
  - Includes Lottie animations and React Awesome Reveal for dynamic content display.
  - Toast notifications for success and error messages.

## Pages Overview

### Home Page

- A banner with a slider showcasing featured products.
- Product section displaying at least six items with a "View Details" button.
- Sports categories section and additional meaningful sections for enhanced engagement.

### Login and Register Pages

- **Login**: Email/password and Google login options with toast notifications for errors.
- **Register**: User can sign up with name, email, photo URL, and password. Password validation includes uppercase, lowercase, and a minimum length of 6 characters.

### Equipment Pages

- **Add Equipment** (Private Route): Form to add equipment with fields such as image, name, category, price, rating, and customization options.
- **All Sports Equipment**: Displays all equipment in a table format with options to sort and view details.
- **View Details** (Private Route): Displays detailed information about a selected item in an elegant design.
- **My Equipment List** (Private Route): Displays all items added by the logged-in user, with options to update or delete.
- **Update Page** (Private Route): Allows users to modify equipment details with form validation.

### Additional Page Features

- **404 Page**: Custom page for non-existing routes.
- **Loading Spinner**: Displayed while fetching data.

## Technology Stack

- **Frontend**: React, React Router DOM, Tailwind CSS, DaisyUI
- **Backend**: Express.js, MongoDB
- **Authentication**: Firebase
- **Deployment**:
  - Frontend: Netlify
  - Backend: Vercel

## Environment Variables

- Firebase configuration keys and MongoDB credentials are securely stored in environment variables.

## Connected GitHub Repositories

- **Backend Repository**: [Backend GitHub Repo](https://github.com/devkowsir/sports-sphere-server)

## Deployment Details

- Hosted both client-side and server-side on Vercel.
- Reloading routes or refreshing pages works seamlessly without errors.

## Contact

For any questions or suggestions, please feel free to contact us at [devkowsir@gmail.com](mailto:devkowsir@gmail.com).
