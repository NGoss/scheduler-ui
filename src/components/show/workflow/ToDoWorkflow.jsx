import { useState, useEffect } from 'react'

import Table from '@mui/joy/Table'
import Button from '@mui/joy/Button'
import Sheet from '@mui/joy/Sheet'
import Stack from '@mui/joy/Stack'
import Card from '@mui/joy/Card'
import CardContent from '@mui/joy/CardContent'
import CardActions from '@mui/joy/CardActions'
import Chip from '@mui/joy/Chip'
import Link from '@mui/joy/Link'
import Typography from '@mui/joy/Typography'

import { useShow } from 'src/context/showContext'
import { useTab, useTabDispatch } from 'src/context/tabContext'

function ToDoWorkflow() {
  const show = useShow()
  const tab = useTab()
  const tabDispatch = useTabDispatch()

  if (!show) {
    return null
  }

  return (
    <>
      <Sheet variant="outlined" sx={{ background: 'none', borderRadius: 5, p: 3}}>
        <Typography
          sx={ theme => ({
            position: 'absolute',
            top: '-12px',
            left: '40px',
            zIndex: 999,
            background: theme.vars.palette.background.body
          })}
          level="title-lg">To-Do</Typography>
        <Stack
          direction="column"
          spacing={2}>
          <Card sx={{ width: 300}}>
            <CardContent>
              {show.characters.length > 0
                ? (
                  <>
                    <Typography level="title-lg">Characters</Typography>
                    <Typography level="body-xs" nowrap="true">{show.characters.map(c => c.name).join(', ')}</Typography>
                  </>
                )
                : <Typography level="h2">Add a characters list</Typography>
              }
              {show.characters.filter(c => c.actor === null).length > 0
              ? (
                <>
                  <Typography level="title-lg" color="danger">Unassigned characters</Typography>
                  <Typography level="body-xs" color="danger">{show.characters.filter(c => c.actor === null).map(c => c.name).join(', ')}</Typography>
                </>
              )
              : null}
            </CardContent>
            <CardActions>
              <Button onClick={() => {
                  if (show.characters.filter(c => c.actor === null).length > 0) {
                    tabDispatch({
                      type: 'highlight',
                      active: 2,
                      highlight: 'cast'
                    })
                  } else {
                    tabDispatch({
                      type: 'open',
                      active: 2
                    })
                  }
                }}>Add/Update Characters</Button>
            </CardActions>
          </Card>
          <Card sx={{ width: 300}}>
            <CardContent>
              {show.actors.length > 0
                ? (
                  <>
                    <Typography level="title-lg">Actors</Typography>
                    <Typography level="body-xs" nowrap="true">{show.actors.map(a => a.name).join(', ')}</Typography>
                  </>
                )
                : <Typography level="h2">Add an actors list</Typography>
              }
            </CardContent>
            <CardActions>
              <CardActions>
                <Button onClick={() => {
                    tabDispatch({
                      type: 'open',
                      active: 3,
                    })
                  }}>Add/Update Actors</Button>
              </CardActions>
            </CardActions>
          </Card>
          <Card sx={{ width: 300 }}>
            <CardContent>
              {show.scenes.length > 0
                ? (
                  <>
                    <Typography level="title-lg">Scenes</Typography>
                    <Typography level="body-xs" nowrap="true">{show.scenes.map(s => s.name).join(', ')}</Typography>
                  </>
                )
                : <Typography level="h2">Add a scene list</Typography>
              }
            </CardContent>
            <CardActions>
              <Button size="md">{show.actors.length > 0 ? 'Add' : 'Start'}</Button>
            </CardActions>
          </Card>
        </Stack>
      </Sheet>
    </>
  )
}

export default ToDoWorkflow
