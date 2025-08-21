# SmartChat AI

![SmartChat AI Screenshot](/public/banner.png)

## Overview

SmartChat AI is a modern, responsive web application that provides an interactive chat experience powered by the Google Gemini AI model. It serves as a functional AI clone, demonstrating the integration and utilization of the Gemini API for conversational AI.

![Screenshot](/public/chat.png)

## Features

*   **Interactive Chat Interface:** Engage in dynamic conversations with the Gemini AI.
* **Contextual Chat Understanding:** Uses current chat history to maintain context and generate coherent responses within a session.

*   **Markdown Rendering:** AI responses are beautifully formatted with markdown support, including headings, lists, and more.
*   **Syntax Highlighting:** Code blocks within AI responses are automatically highlighted for improved readability.
*   **Copy to Clipboard:** Conveniently copy AI-generated text and code snippets.
*   **Real-time Loading Indicators:** Visual feedback (thinking animation and loading bar) during AI response generation.
*   **Dark Mode Toggle:** Switch between light and dark themes for a personalized viewing experience.
*   **New Chat Functionality:** Start fresh conversations with a single click.
*   **Responsive Design:** Optimized for seamless use across various devices, from desktops to mobile phones.

## Technologies Used

*   **Frontend:**
    *   [React](https://vite.dev/) (Vite) - A JavaScript library for building user interfaces.
    *   [React Context API](https://react.dev/learn/passing-props-with-context) - For efficient state management across components.
    *   [CSS](https://developer.mozilla.org/en-US/docs/Web/CSS) - For styling and responsive design, utilizing CSS variables for theming.
*   **AI Integration:**
    *   [@google/genai](https://www.npmjs.com/package/@google/genai) - Official Google Gemini API client library.
*   **UI/Utility Libraries:**
    *   [React Icons](https://react-icons.github.io/react-icons/) - For a wide range of customizable icons.
    *   [React Markdown](https://github.com/remarkjs/react-markdown) - A React component to render Markdown.
    *   [Remark GFM](https://github.com/remarkjs/remark-gfm) - A Remark plugin to support GitHub Flavored Markdown.
    *   [React Syntax Highlighter](https://github.com/react-syntax-highlighter/react-syntax-highlighter) - For syntax highlighting code blocks.

## Setup and Installation

Follow these steps to get the project up and running on your local machine.

### Prerequisites

*   [Node.js](https://nodejs.org/en/) (LTS version recommended)
*   [npm](https://www.npmjs.com/) (comes with Node.js) 

### 1. Clone the Repository

```bash
git clone https://github.com/saksham2882/smartchat-ai.git
cd smartchat-ai
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Variables

Create a `.env` file in the root of the project and add your Google Gemini API key:

```
VITE_GEMINI_API_KEY=YOUR_GEMINI_API_KEY
```

You can obtain a Gemini API key from the [Google AI Studio](https://aistudio.google.com/app/apikey).

### 4. Run the Application

```bash
npm run dev
```

The application will typically open in your browser at `http://localhost:5173` (or another available port).

## Contributing

Contributions are welcome! If you have suggestions for improvements or new features, please open an issue or submit a pull request.