import './App.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import HomePage from "./pages/HomePage.tsx";

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/dash',
    element: <div>Dash</div>,
  },
  {
    path: '/stack',
    element: <div>Stack</div>,
  },
  {
    path: '/dashboard',
    element: <div>Dashboard</div>,
  },
  {
    path: '/products',
    element: <div>Products</div>,
  },
  {
    path: '/favorites',
    element: <div>Favorites</div>,
  },
  {
    path: '/inbox',
    element: <div>Inbox</div>,
  },
  {
    path: '/order-lists',
    element: <div>Order Lists</div>,
  },
  {
    path: '/stock',
    element: <div>Stock</div>,
  },
  {
    path: '/pages',
    element: <div>PAGES</div>,
  },
  {
    path: '/pricing',
    element: <div>Pricing</div>,
  },
  {
    path: '/calendar',
    element: <div>Calendar</div>,
  },
  {
    path: '/to-do',
    element: <div>To-Do</div>,
  },
  {
    path: '/contact',
    element: <div>Contact</div>,
  },
  {
    path: '/invoice',
    element: <div>Invoice</div>,
  },
  {
    path: '/ui-elements',
    element: <div>UI Elements</div>,
  },
  {
    path: '/team',
    element: <div>Team</div>,
  },
  {
    path: '/table',
    element: <div>Table</div>,
  },
  {
    path: 'settings',
    element: <div>Settings</div>,
  },
  {
    path: '/logout',
    element: <div>Logout</div>,
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
