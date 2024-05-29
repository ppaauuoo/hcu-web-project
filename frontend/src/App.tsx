import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import RootLayout from './components/RootLayout';
import About from './pages/About';
import Home from './pages/Home';
import { DetailTest, IndexTest, PageTest } from './pages/Test';

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout/>,
    children: [
      { index: true, element: <Home /> },
      { path: "/about", element: <About /> },
      // { path: "/services", element: <Services /> },

    ],
  },
  { path: "/test",
    children: [
      { index: true, element: <IndexTest />},
      { path: "page/:id", element: <PageTest/>},
      { path: "detail/:id", element: <DetailTest/>},
    ] },
  
]);



export default function App() {

  return (
    <>
        <RouterProvider router={router} />
    </>
  )
}

