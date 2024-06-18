import { useState, useEffect } from 'react'
import './Show.css'

import scenesApi from 'src/api/scenes'
import showsApi from 'src/api/shows'
import charactersApi from 'src/api/characters'

import Button from '@mui/joy/Button'
import Sheet from '@mui/joy/Sheet'
import Typography from '@mui/joy/Typography'
import Input from '@mui/joy/Input'
import Stack from '@mui/joy/Stack'
import Select from '@mui/joy/Select'
import Option from '@mui/joy/Option'

import AddItem from 'src/components/admin/AddItem'

function Show({data}) {
  const [show, setShow] = useState(data)

  const createNewScene = async (scene) => {
    await scenesApi.createScene(scene, show.id)
    const showResponse = await showsApi.findShow(show.id)
    setShow(showResponse.data)
  }

  const addNewStaff = async (inputString) => {
    const inputs = inputString.split(',')
    await showsApi.addStaff(show.id, inputs[0].trim(), inputs[1].trim())
    const showResponse = await showsApi.findShow(show.id)
    setShow(showResponse.data)
  }

  const addActor = async (name) => {
    await showsApi.addActor(show.id, name)
    const showResponse = await showsApi.findShow(show.id)
    setShow(showResponse.data)
  }

  const createNewCharacter = async (name) => {
    await charactersApi.createCharacter(show.id, name)
    const showResponse = await showsApi.findShow(show.id)
    setShow(showResponse.data)
  }

  const castCharacter = async (characterId, actorId) => {
    await charactersApi.castActorAsCharacter(show.id, characterId, actorId)
    const showResponse = await showsApi.findShow(show.id)
    setShow(showResponse.data)
  }

  return (
    <>
      <Sheet sx={{
          width: 300,
          mx: 'auto', // margin left & right
          my: 4, // margin top & bottom
          py: 3, // padding top & bottom
          px: 2, // padding left & right
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          borderRadius: 'sm',
          boxShadow: 'md',
        }}>
        <Typography level="title-lg" variant="soft">{show.name}</Typography>
        <Stack>
          <Typography level="body-lg">Scenes:</Typography>
          <Typography level="body-sm">{show.scenes?.map(s => s.name).join(', ')}</Typography>
          <AddItem placeholder="Scene name" callback={(input) => createNewScene(input)} />
        </Stack>
        <Stack>
          <Typography level="body-lg">Characters:</Typography>
          {show.characters?.map(c =>
            (
              <Stack direction="row" key={c.id} spacing={2}>
                <Typography level="body-sm">{c.name}</Typography>
                <Select size="sm" placeholder="Choose actor" defaultValue={c.actor?.id} onChange={(event, newValue) => castCharacter(c.id, newValue)}>
                  {show.actors?.map(a => <Option key={a.id} value={a.id}>{a.name}</Option>)}
                </Select>
              </Stack>
            ))
          }
          <Typography level="body-sm">{show.characters?.map(s => s.name).join(', ')}</Typography>
          <AddItem placeholder="Scene name" callback={(input) => createNewCharacter(input)} />
        </Stack>
        <Stack>
          <Typography level="body-lg">Actors:</Typography>
          <Typography level="body-sm">{show.actors?.map(a => a.name).join(', ')}</Typography>
          <AddItem placeholder="Name" callback={(input) => addActor(input)} />
        </Stack>
        <Stack>
          <Typography level="body-lg">Staff:</Typography>
          {show.staff?.map(s => <Typography key={s.id} level="body-sm">{`${s.name}, ${s.type}`}</Typography>)}
          <AddItem placeholder="Name,Role" callback={(input) => addNewStaff(input)} />
        </Stack>
      </Sheet>
    </>
  )
}

export default Show
