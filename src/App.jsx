import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom"
import Admin from 'src/routes/admin'
import Landing from 'src/routes/landing'
import ErrorPage from 'src/routes/error'
import Show, { loader as showLoader } from 'src/routes/show'
import { CssVarsProvider } from '@mui/joy/styles'
import CssBaseline from '@mui/joy/CssBaseline'

function App() {

  const router = createBrowserRouter([
    {
      path: "/admin",
      element: <Admin />,
      errorElement: <ErrorPage />
    },
    {
      path: "/",
      element: <Landing />,
      errorElement: <ErrorPage />
    },
    {
      path: "/show/:showId",
      element: <Show />,
      loader: showLoader
    }
  ]);

  return (
    <>
      <CssVarsProvider>
        <CssBaseline/>
        <RouterProvider router={router} />
      </CssVarsProvider>
    </>
  )
}

export default App
