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
import CircularProgress from '@mui/joy/CircularProgress'
import Button from '@mui/joy/Button'

import DeleteOutline from '@mui/icons-material/DeleteOutline'
import AddBox from '@mui/icons-material/AddBox'
import CheckBox from '@mui/icons-material/CheckBox'
import Cancel from '@mui/icons-material/Cancel'

import showsApi from 'src/api/shows'
import charactersApi from 'src/api/characters'

import { useShowDispatch, useShow } from 'src/context/showContext'

function Actors() {

  const show = useShow()
  const showDispatch = useShowDispatch()

  const [adding, setAdding] = useState([])
  const [pending, setPending] = useState([])
  const [cPending, setCPending] = useState([])
  const [deletePending, setDeletePending] = useState([])
  const [actorAdding, setActorAdding] = useState(false)
  const [actorPending, setActorPending] = useState(false)

  const handleCreateActor = async (event) => {
    event.preventDefault()
    setActorPending(true)
    await showsApi.addActor(show.id, event.target[0].value)
    const showResponse = await showsApi.findShow(show.id)
    setActorAdding(false)
    setActorPending(false)
    showDispatch({
      type: 'load',
      show: showResponse.data
    })
  }

  const handleDeleteActor = async (actorId) => {
    setDeletePending([actorId, ...deletePending])
    await showsApi.deleteActor(show.id, actorId)
    const showResponse = await showsApi.findShow(show.id)
    setDeletePending(deletePending.filter(x => x !== actorId))
    showDispatch({
      type: 'load',
      show: showResponse.data
    })
  }

  const handleUpdateActor = async (actor, formData) => {
    const { name, conflicts } = formData
    await showsApi.updateActor(show.id, {
      ...actor,
      ...name && {name},
      ...conflicts && {conflicts}
    })
    const showResponse = await showsApi.findShow(show.id)
    showDispatch({
      type: 'load',
      show: showResponse.data
    })
  }

  const handleActorChange = async (actorId, newCastedCharacters) => {
    setCPending([actorId, ...cPending])
    const currentCastedCharacters = show.characters.filter(c => c.actor?.id === actorId).map(c => c.id)
    const removedCharacters = currentCastedCharacters.filter(x => !newCastedCharacters.includes(x))
    const addedCharacters = newCastedCharacters.filter(y => !currentCastedCharacters.includes(y))

    const removedPromises = removedCharacters.map(c => charactersApi.uncastCharacter(show.id, c))
    const addedPromises = addedCharacters.map(c => charactersApi.castActorAsCharacter(show.id, c, actorId))

    await Promise.all([...removedPromises, ...addedPromises])
    const showResponse = await showsApi.findShow(show.id)
    setCPending(cPending.filter(y => y !== actorId))
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
              <th style={{ width: '25%' }}>Role</th>
              <th style={{ width: '45%' }}>Conflict Dates</th>
              <th style={{ width: '5%' }}></th>
            </tr>
          </thead>
          <tbody>
            {
              show.actors.map(a =>
              (
                <tr key={a.id}>
                  <td>{a.name}</td>
                  <td>
                    <Select
                      startDecorator={cPending.includes(a.id) && <CircularProgress size="sm" />}
                      onChange={(event, newValue) => handleActorChange(a.id, newValue)}
                      multiple
                      value={show.characters.filter(c => c.actor?.id === a.id)?.map(c => c.id)}
                      renderValue={(selected) => (
                        <Stack direction="row" sx={{ display: 'flex', gap: '0.25rem', overflow: 'scroll' }}>
                          {selected.map((selectedOption) => (
                            <Chip color="primary">
                              {selectedOption.label}
                            </Chip>
                          ))}
                        </Stack>
                      )}
                      sx={{
                        minWidth: '15rem',
                      }}
                      slotProps={{
                        listbox: {
                          sx: {
                            width: '100%',
                          },
                        },
                      }}
                    >
                      {show.characters.map(c => (
                          <Option value={c.id} id={c.id}>{c.name}</Option>
                      ))}
                    </Select>
                  </td>
                  <td>
                    <Stack
                      direction="row"
                      justifyContent="flex-start"
                      alignItems="center"
                      spacing={2}
                      sx={{p: 1}}
                    >
                      {
                        adding.includes(a.id)
                        && (
                          <form
                            onSubmit={async (event) => {
                              event.preventDefault();
                              setPending([a.id, ...pending])
                              const [hour, minute] = event.target[1].value.split(':')
                              await handleUpdateActor(a,
                                { conflicts: [
                                  { start: event.target[0].value,
                                    end: dayjs(event.target[0].value).hour(hour).minute(minute).format('YYYY-MM-DDTHH:mm')
                                  }, ...(a.conflicts || [])] })
                              setAdding(adding.filter(x => x !== a.id))
                              setPending(pending.filter(y => y !== a.id))
                            }}
                          >
                            <FormControl orientation="horizontal">
                              <Input startDecorator={<Typography level="body-sm">Start</Typography>} sx={{ width: 300 }} autoFocus required type="datetime-local"/>
                              <Input startDecorator={<Typography level="body-sm">End</Typography>} sx={{ width: 150 }} required type="time"/>
                              <IconButton color="success" loading={pending.includes(a.id)} type="submit"><CheckBox /></IconButton>
                              <IconButton color="neutral" onClick={() => {
                                  setAdding(adding.filter(x => x !== a.id))
                                  setPending(pending.filter(y => y !== a.id))
                                }}><Cancel /></IconButton>
                            </FormControl>
                          </form>
                        )
                      }
                      <Stack
                        direction="row"
                        sx={{overflow: 'scroll', gap: 1}}>
                        {!adding.includes(a.id) && <IconButton onClick={() => setAdding([a.id, ...adding])}><AddBox /></IconButton>}
                        {a.conflicts?.map(c => (
                          <Chip
                            id={c.id}
                            variant="soft"
                            color="neutral"
                            endDecorator={(
                              <ChipDelete onDelete={async () => {
                                await handleUpdateActor(a, {
                                  conflicts: a.conflicts.filter(x => x.id !== c.id)
                                })
                              }} />
                            )}
                          >
                            {dayjs(c.start).format('ddd MMM DD h:mm A') + ' - ' + dayjs(c.end).format('h:mm A')}
                          </Chip>
                        ))
                        }
                      </Stack>

                    </Stack>
                  </td>
                  <td><IconButton loading={deletePending.includes(a.id)} onClick={() => handleDeleteActor(a.id)}><DeleteOutline /></IconButton></td>
                </tr>
              ))
            }
            <tr>
              <td>
                <Stack sx={{ marginTop: 2 }}>
                  {!actorAdding && <Button sx={{ width: 160 }} onClick={() => setActorAdding(true)} startDecorator={<AddBox />}>Add Actor</Button>}
                  {actorAdding && (
                    <form onSubmit={handleCreateActor}>
                      <FormControl orientation="horizontal">
                        <Input placeholder="Character Name" />
                        <IconButton color="success" loading={actorPending} type="submit"><CheckBox /></IconButton>
                        <IconButton color="neutral" onClick={() => {
                            setActorPending(false)
                            setActorAdding(false)
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

export default Actors
