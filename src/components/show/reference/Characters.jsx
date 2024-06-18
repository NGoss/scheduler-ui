import { useState, useEffect } from 'react'
import dayjs from 'dayjs'

import Sheet from '@mui/joy/Sheet'
import Table from '@mui/joy/Table'
import Typography from '@mui/joy/Typography'
import IconButton from '@mui/joy/IconButton'
import Input from '@mui/joy/Input'
import Stack from '@mui/joy/Stack'
import FormControl from '@mui/joy/FormControl'
import FormLabel from '@mui/joy/FormLabel'
import Chip from '@mui/joy/Chip'
import ChipDelete from '@mui/joy/ChipDelete'
import Select from '@mui/joy/Select'
import Option from '@mui/joy/Option'
import Button from '@mui/joy/Button'

import DeleteOutline from '@mui/icons-material/DeleteOutline'
import AddBox from '@mui/icons-material/AddBox'
import CheckBox from '@mui/icons-material/CheckBox'
import Cancel from '@mui/icons-material/Cancel'
import PriorityHigh from '@mui/icons-material/PriorityHigh'

import showsApi from 'src/api/shows'
import charactersApi from 'src/api/characters'

import { useShowDispatch, useShow } from 'src/context/showContext'
import { useTab } from 'src/context/tabContext'

function Characters() {

  const show = useShow()
  const showDispatch = useShowDispatch()

  const tab = useTab()

  const [adding, setAdding] = useState([])
  const [pending, setPending] = useState([])
  const [characterAdding, setCharacterAdding] = useState(false)
  const [characterPending, setCharacterPending] = useState(false)
  const [deletePending, setDeletePending] = useState([])

  const handleUpdateActor = async (characterId, actorId) => {
    if (actorId === 'select') {
      await charactersApi.uncastCharacter(show.id, characterId, actorId)
    } else {
      await charactersApi.castActorAsCharacter(show.id, characterId, actorId)
    }

    const showResponse = await showsApi.findShow(show.id)
    showDispatch({
      type: 'load',
      show: showResponse.data
    })
  }

  const handleDeleteCharacter = async (characterId) => {
    setDeletePending([characterId, ...deletePending])
    charactersApi.deleteCharacter(show.id, characterId)
    const showResponse = await showsApi.findShow(show.id)
    setDeletePending(deletePending.filter(x => x !== characterId))
    showDispatch({
      type: 'load',
      show: showResponse.data
    })
  }

  const handleAddCharacter = async (event) => {
    event.preventDefault()
    setCharacterPending(true)
    await charactersApi.createCharacter(show.id, event.target[0].value)

    const showResponse = await showsApi.findShow(show.id)
    setCharacterAdding(false)
    setCharacterPending(false)
    showDispatch({
      type: 'load',
      show: showResponse.data
    })
  }

  return (
    <>
      <Sheet>
        <Table size="lg" >
          <thead>
            <tr>
              <th style={{ width: '25%' }}>Name</th>
              <th style={{ width: '25%' }}>Actor</th>
              <th style={{ width: '45%' }}>Scenes</th>
              <th style={{ width: '5%' }}></th>
            </tr>
          </thead>
          <tbody>
            {
              show.characters.map(c =>
              (
                <tr key={c.id}>
                  <td>{c.name}</td>
                  <td>
                    <Select
                      startDecorator={tab.highlight === 'cast' && c.actor === null && <PriorityHigh color="danger" />}
                      color={tab.highlight === 'cast' && c.actor === null ? 'danger': 'neutral'}
                      onChange={(event, newValue) => handleUpdateActor(c.id, newValue)}
                      defaultValue={c.actor?.id || 'select'}>
                      <Option value="select">Select</Option>
                      {show.actors.map(a => <Option value={a.id} key={a.id}>{a.name}</Option>)}
                    </Select>
                  </td>
                  <td>
                    <Stack
                      direction="row"
                      justifyContent="flex-start"
                      alignItems="center"
                      spacing={2}
                      sx={{ p: 2 }}
                    >
                      {show.scenes.filter(s => s.characters.map(x => x.id).includes(c.id)).map(y => y.name).join(', ')}
                    </Stack>
                  </td>
                  <td><IconButton loading={deletePending.includes(c.id)} onClick={() => handleDeleteCharacter(c.id)}><DeleteOutline /></IconButton></td>
                </tr>
              ))
            }
            <tr>
              <td>
                <Stack sx={{ marginTop: 2 }}>
                  {!characterAdding && <Button sx={{ width: 160 }} onClick={() => setCharacterAdding(true)} startDecorator={<AddBox />}>Add Character</Button>}
                  {characterAdding && (
                    <form onSubmit={handleAddCharacter}>
                      <FormControl orientation="horizontal">
                        <Input placeholder="Character Name" />
                        <IconButton color="success" loading={characterPending} type="submit"><CheckBox /></IconButton>
                        <IconButton color="neutral" onClick={() => {
                            setCharacterPending(false)
                            setCharacterAdding(false)
                          }}><Cancel /></IconButton>
                      </FormControl>
                    </form>
                  )}
                </Stack>
              </td>
            </tr>
          </tbody>
        </Table>
      </Sheet>
    </>
  )
}

export default Characters
