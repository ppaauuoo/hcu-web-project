import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import RootLayout from './components/RootLayout';
import About from './pages/About';
import Home from './pages/Home';
import Test from './pages/Test';

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout/>,
    children: [
      { path: "/", element: <Home /> },
      { path: "/about", element: <About /> },
      // { path: "/services", element: <Services /> },
    ],
  },
  { path: "/test", element: <Test /> },
]);


function App() {

  return (
    <>
        <RouterProvider router={router} />
    </>
  )
}

export default App
