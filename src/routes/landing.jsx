import { useState, useEffect } from 'react'

import Button from '@mui/joy/Button'
import Typography from '@mui/joy/Typography'

import ShowCard from 'src/components/landing/ShowCard'

import showsApi from 'src/api/shows'

function Landing() {
  const [shows, setShows] = useState([])

  useEffect(() => {
    showsApi.findAll().then((allShows) => {
      setShows(allShows.data)
    })
  }, [])

  const renderShows = () => {
    if (shows.length > 0) {
      return (
        <>
          <Typography level="title-lg">Pick up where you left off</Typography>
          { shows.map(show => <ShowCard data={show} />) }
        </>
      )
    } else {
      return <Typography level="h1">Create a new show</Typography>
    }
  }

  return (
    <>
      <Typography level="h1">Scheduler v0.1</Typography>
      { renderShows() }
    </>
  )
}

export default Landing
