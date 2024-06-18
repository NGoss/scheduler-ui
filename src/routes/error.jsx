import Typography from '@mui/joy/Typography'

function NotFound() {

  return (
    <>
      <Typography level="h1">Scheduler v0.1</Typography>
      <Typography level="title-lg">Page Not Found</Typography>
      <Typography level="body-lg">Not sure how you got here, try the back button?</Typography>
    </>
  )
}

import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div id="error-page">
      <Typography level="h1">Oops!</Typography>
      <Typography level="title-lg">Sorry, an unexpected error has occurred.</Typography>
      <Typography level="body-md">
        <i>{error.statusText || error.message}</i>
      </Typography>
    </div>
  );
}
