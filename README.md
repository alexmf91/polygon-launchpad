# Polygon Launchpad Web3 App

## Introduction

Welcome to my Polygon Launchpad Web3 App repository! This project is my solution to the Take-Home Challenge for the Web3 React Frontend Developer position at BeInCrypto. The challenge involves creating a Web3 application that simulates a token presale on the Polygon Testnet. This readme will provide an overview of the project, its objectives, requirements, and how to run the app locally.

## Project Overview

In this project, I've developed a Web3 App that allows users to participate in a token presale on the Polygon Testnet. The app interacts with two smart contracts: an ERC-20 token smart contract (TSTK) and a presale smart contract. Users can purchase tokens using Testnet MATIC, and the presale consists of multiple stages, each lasting one day.

## Project Objectives

The main objectives of this project were:

1. **Interact with Smart Contracts:** Develop a Next.js Web3 app that interacts with the presale and token smart contracts on the Polygon Testnet.
2. **User Interface:** Design an intuitive and user-friendly UI using the Mantine UI components library.
3. **Token Purchase:** Allow users to input the amount of tokens they want to purchase, calculate the price, and make a purchase.
4. **Stage Information:** Display information about the current sale stage, including purchased token amount, remaining tokens, price, and countdown timer.
5. **Multiple Stages:** Implement seamless transitions between presale stages, each with updated token amounts and prices.
6. **TypeScript and Testing:** Ensure the app is fully typed using TypeScript and write unit tests for components using Jest.
7. **Deployment:** Deploy the app on Vercel and integrate it with the provided smart contracts on the Polygon Testnet.

## Technologies Used

- **Next.js:** A powerful framework for building React applications with server-side rendering and static site generation.
- **React:** The core library for building the user interface, utilizing concepts like hooks and components.
- **Mantine UI:** A components library used for designing the UI of the app.
- **TypeScript:** Used for adding static typing to the application and enhancing code quality.
- **Jest:** A testing framework for writing and running unit tests on components.
- **Wagmi and ConnectKit:** Tools for facilitating blockchain-related operations in the application.
- **GitHub:** Version control and code collaboration platform.
- **Vercel:** Platform for deploying and hosting the app.
- **Polygon Testnet:** Utilized for testing the smart contracts and app integration.

## Getting Started

To run the app locally, follow these steps:

1. Clone this repository:

   ```bash
   git clone https://github.com/alexmf91/polygon-launchpad.git
   ```

2. Navigate to the project directory:

   ```bash
   cd polygon-launchpad
   ```

3. Install dependencies:

   ```bash
   yarn install
   ```

4. Create a .env file in the root of the project and fill in the environment variables based on the provided .env.example file.

5. Run the app:
   ```bash
   yarn dev
   ```
6. Access the app in your browser: `http://localhost:3000`

## Deployment

The app is deployed on Vercel and can be accessed at [https://polygon-launchpad.vercel.app](https://polygon-launchpad.vercel.app).

## Project Structure

```
|-- components/
|   |-- ContractResultDisplay/
|   |   |-- ContractResultDisplay.styles.ts
|   |   |-- ContractResultDisplay.test.tsx
|   |   |-- ContractResultDisplay.tsx
|   |-- ...
|-- config/
|   |-- wagmi.ts
|-- contracts/
|   |-- abis/
|   |   |-- presaleABI.ts
|   |   |-- tokenABI.ts
|-- hooks/
|   |-- useCountdown.tsx
|   |-- ...
|-- pages/
|   |-- index.tsx
|   |-- buy-tokens.tsx
|   |-- ...
|-- utils/
|   |-- routes.ts
|   |-- ...
|-- README.md
|-- package.json
|-- ...
```

## Conclusion

I thoroughly enjoyed working on this project as part of the BeInCrypto recruitment process. It provided an excellent opportunity to showcase my skills in React development, Web3 integration, and UI design but also led me to explore new libraries such as Wagmi, ConnectKit and Mantine. The app meets all the specified requirements and provides a seamless experience for users participating in the token presale on the Polygon Testnet.

Thank you for considering my application, and I look forward to the opportunity to achieve great things together!

🚀 Cheers
