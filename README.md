# Geofencing App

## Welcome to your React Native app 👋

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
    npm start
   ```

In the output, you'll find options to open the app

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing]

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.


**Mobile App Project Structure Guide**

Welcome to your new React Native project! This guide will help you understand the recommended project structure and best
practices for organizing your codebase. Let's get started:

**Table of Contents**

-
    1. Project Structure

    - 1.1. Components Directory
    - 1.2. Zustand (stores)
    - 1.3. Navigation
    - 1.4. Features
    - 1.5. Utils and Helpers or Services
-
    2. Zustand Setup
-
    3. Styling
-
    4. Testing
-
    5. Environment Variables

**1. Project Structure**

**1.1. Components Directory**

* The `components` folder is used to store reusable UI components.
* Organize components based on their functionality (e.g., buttons, cards, forms).
* Each component should have its own folder containing the component file, styles, and tests.

**1.2. Zustand (store)**

* We are using Zustand to manage state.
* The reason for using Zustand over Redux is because Zustand although less popular, it is more efficient, with shorter codes and a more direct approach when compared to Redux
* Create a `store` folder in the feature where the state will be required, this store folder folder will carry all the different stores for that very feature folder such as userStore, adminStore, mapStore etc this store will be designated to just that directory and it's contents alone.
* For global stores, such as the theme changer and the authentication, a stiore file should be placed in the root directory
* Each store represents a piece of state (e.g., user, counter).
* Define initial state, types, and actions in each store.

**1.3. Navigation**

* We are using React Navigation.
* Navigation related files can be found in the `src/navigation` directory.
* Define your feature's navigation structure there.

**1.4. Features**

* Each feature should have its own folder (under `src/features`) containing the screen component, styles, and navigation
  configuration.

**1.5. Utils and Helpers  or Services**

* Use the `utils` folder for utility functions, API calls, and other shared logic.
* Keep your code DRY by centralizing common functionality.

**2. Zustand Setup**

* We are using Zustand, you will have to install Zustand (zustand) dependency.
* Our Zustand global store is at `src/store.ts`.
* Include all your global states in the store.

**3. Styling**

* We are using Stylesheet from React Native for styling.
* Define reusable styles and themes (colors, fonts) in a separate file.

**4. Testing**

* Place test files (unit tests, integration tests) alongside your components.
* We use Jest for testing.

**5. Environment Variables**

* Manage environment-specific configuration (e.g., API keys) using react-native-config.