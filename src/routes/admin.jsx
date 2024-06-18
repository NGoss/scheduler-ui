import { useState, useEffect } from 'react'

import Show from 'src/components/admin/Show.jsx'
import Button from '@mui/joy/Button'
import Typography from '@mui/joy/Typography'

import showsApi from 'src/api/shows'

function App() {
  const [name, setName] = useState('')
  const [shows, setShows] = useState([])

  const createShow = (name) => {
    showsApi.createShow(name).then((show) => {
      showsApi.findAll().then((allShows) => {
        setShows(allShows.data)
      })
    })
  }

  useEffect(() => {
    showsApi.findAll().then((allShows) => {
      setShows(allShows.data)
    })
  }, [])

  return (
    <>
      <Typography level="h1">Scheduler v0.1</Typography>
      <input default="Input a show name" onChange={(event) => setName(event.target.value)}/>
      <Button onClick={() => createShow(name)}>
        Create show '{name}'
      </Button>
      <ul style={{display: 'flex', flexDirection: 'row'}}>
        {shows.map(show => <Show key={show.id} data={show} />)}
      </ul>
    </>
  )
}

export default App
