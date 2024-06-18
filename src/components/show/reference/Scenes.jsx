import { useState, useEffect } from 'react'

import Sheet from '@mui/joy/Sheet'
import Table from '@mui/joy/Table'
import Card from '@mui/joy/Card'
import CardContent from '@mui/joy/CardContent'
import Chip from '@mui/joy/Chip'
import ChipDelete from '@mui/joy/ChipDelete'
import Link from '@mui/joy/Link'
import Typography from '@mui/joy/Typography'
import Button from '@mui/joy/Button'
import IconButton from '@mui/joy/IconButton'
import Select from '@mui/joy/Select'
import Input from '@mui/joy/Input'
import Option from '@mui/joy/Option'
import FormControl from '@mui/joy/FormControl'
import Stack from '@mui/joy/Stack'

import { useShowDispatch, useShow } from 'src/context/showContext'

import AddBox from '@mui/icons-material/AddBox'
import Cancel from '@mui/icons-material/Cancel'
import CheckBox from '@mui/icons-material/CheckBox'
import DeleteOutline from '@mui/icons-material/DeleteOutline'

import scenesApi from 'src/api/scenes'
import showsApi from 'src/api/shows'

function Scenes() {

  const show = useShow()
  const showDispatch = useShowDispatch()

  const [adding, setAdding] = useState([])
  const [pending, setPending] = useState([])

  const [sceneAdding, setSceneAdding] = useState(false)
  const [scenePending, setScenePending] = useState(false)

  const [deletePending, setDeletePending] = useState([])

  const addCharactersToScene = async (sceneId, characterIds) => {

    const idArray = JSON.parse(characterIds)
    await scenesApi.addCharactersToScene(show.id, sceneId, idArray)

    const showResponse = await showsApi.findShow(show.id)
    showDispatch({
      type: 'load',
      show: showResponse.data
    })
  }

  const handleRemoveCharacter = async (sceneId, characterId) => {
    await scenesApi.removeCharacterFromScene(show.id, sceneId, characterId)

    const showResponse = await showsApi.findShow(show.id)
    showDispatch({
      type: 'load',
      show: showResponse.data
    })
  }

  const handleAddScene = async (event) => {
    event.preventDefault()
    setScenePending(true)
    await scenesApi.createScene(event.target[0].value, show.id)

    const showResponse = await showsApi.findShow(show.id)

    setScenePending(false)
    setSceneAdding(false)
    showDispatch({
      type: 'load',
      show: showResponse.data
    })
  }

  const handleDeleteScene = async (sceneId) => {
    setDeletePending([sceneId, ...deletePending || []])
    await scenesApi.deleteScene(show.id, sceneId)
    const showResponse = await showsApi.findShow(show.id)

    setDeletePending(deletePending.filter(d => d !== sceneId))
    showDispatch({
      type: 'load',
      show: showResponse.data
    })
  }

  return (
    <>
      <Sheet>
        <Table size="lg">
          <thead>
            <tr>
              <th style={{ width: '25%' }}>Name</th>
              <th>Characters</th>
              <th style={{ width: '5%' }}/>
            </tr>
          </thead>
          <tbody>
            {
              show.scenes.map(s =>
                (
                  <tr key={s.id}>
                    <td>{s.name}</td>
                    <td>
                      <Stack
                        justifyContent="flex-start"
                        alignItems="center"
                        direction="row"
                        sx={{ p: 1, overflow: 'scroll' }}
                        spacing={1}>
                        {adding.includes(s.id) && (
                          <form
                            onSubmit={async (event) => {
                              event.preventDefault();
                              setPending([s.id, ...pending])

                              await addCharactersToScene(s.id, event.target[1].value)

                              setAdding(adding.filter(x => x !== s.id))
                              setPending(pending.filter(y => y !== s.id))
                            }}
                          >
                            <FormControl orientation="horizontal">
                              <Select multiple sx={{minWidth: 100}}>
                                {show.characters.map(c => <Option key={c.id} value={c.id}>{c.name}</Option>)}
                              </Select>
                              <IconButton color="success" loading={pending.includes(s.id)} type="submit"><CheckBox /></IconButton>
                              <IconButton color="neutral" onClick={() => {
                                  setAdding(adding.filter(x => x !== s.id))
                                  setPending(pending.filter(y => y !== s.id))
                                }}><Cancel /></IconButton>
                            </FormControl>
                          </form>
                        )}
                        {!adding.includes(s.id) && <IconButton onClick={() => setAdding([s.id, ...adding])}><AddBox /></IconButton>}
                        {s.characters.map(c => (
                          <Chip
                            key={c.id}
                            variant="soft"
                            color="neutral"
                            endDecorator={<ChipDelete onDelete={ async () => await handleRemoveCharacter(s.id, c.id) } /> }
                          >
                            {c.name}
                          </Chip>
                        ))}
                      </Stack>
                    </td>
                    <td><IconButton loading={deletePending.includes(s.id)} onClick={() => handleDeleteScene(s.id)}><DeleteOutline /></IconButton></td>
                  </tr>
                )
              )
            }
            <tr>
              <td>
                <Stack sx={{ marginTop: 2 }}>
                  {!sceneAdding && <Button sx={{ width: 135 }} onClick={() => setSceneAdding(true)} startDecorator={<AddBox />}>Add Scene</Button>}
                  {sceneAdding && (
                    <form onSubmit={handleAddScene}>
                      <FormControl orientation="horizontal">
                        <Input placeholder="Scene Name" />
                        <IconButton color="success" loading={scenePending} type="submit"><CheckBox /></IconButton>
                        <IconButton color="neutral" onClick={() => {
                            setScenePending(false)
                            setSceneAdding(false)
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

export default Scenes
