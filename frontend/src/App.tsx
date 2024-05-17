import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import RootLayout from './components/RootLayout';
import About from './pages/About';
import Home from './pages/Home';
import { ImgTest, PageTest } from './pages/Test';

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
  { path: "/test/img", element: <ImgTest /> },
  { path: "/test/page", element: <PageTest /> },
]);


function App() {

  return (
    <>
        <RouterProvider router={router} />
    </>
  )
}

export default App
