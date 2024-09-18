# Vite + React + Tailwind CSS + FiveM Template

This project is a template for developing user interfaces for FiveM using **Vite**, **React**, and **Tailwind CSS**.

## Features

- 🔥 **Vite** for fast build and development.
- ⚛️ **React** for modern and dynamic user interfaces.
- 🎨 **Tailwind CSS** for custom styling and responsive design.
- 🚓 **FiveM** to integrate everything with your roleplay server.

## Requirements

- **Node.js** version `14.x` or higher.
- **Yarn** or **npm** to manage dependencies.
- **FiveM Server** to integrate the frontend with your server backend.

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/biyeicito/biyei_vite_react_tailwind_template.git
cd biyei_vite_react_tailwind_template
```

### 2. Install dependencies 

```bash
# Using Yarn
yarn install

# Using npm
npm install
```


## Examples

### 1. Example of Using `fetchNui`

The `fetchNui` utility is used to send data from your **React** frontend to the **FiveM** backend. This function helps you interact with **FiveM**'s client-side code (written in Lua or JS) via the NUI (NUI Callbacks).

Here's an example of using `fetchNui` to request the player's coordinates from the backend:

```tsx
fetchNui<Coords>('getCoordinates') // We request the coordinates using fetchNui
  .then((data) => {
    setCoords(data); // We update the coordinates with the response received.
  })
  .catch((err) => {
    console.error('Error fetching coordinates:', err);
  });
```


### 2. Explanation of the `handleMessage` Inside `useEffect`

The `handleMessage` function listens for messages sent from the **FiveM** backend, and it updates the state to show or hide the modal accordingly. It is placed inside a `useEffect` hook to ensure that the event listener for these messages is properly set up when the component mounts and cleaned up when the component unmounts.

```tsx
useEffect(() => {
  const handleMessage = (event: MessageEvent) => {
    if (event.data.action === 'show') {
      setIsOpen(event.data.status); // Changes the modal state based on the backend message
    }
  };

  window.addEventListener('message', handleMessage);

  return () => {
    window.removeEventListener('message', handleMessage); // Clean up listener on component unmount
  };
}, []);
```