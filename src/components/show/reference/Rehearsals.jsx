import { useState, useEffect } from 'react'

import Sheet from '@mui/joy/Sheet'
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog'
import DialogTitle from '@mui/joy/DialogTitle'
import DialogContent from '@mui/joy/DialogContent'
import Stack from '@mui/joy/Stack'
import FormControl from '@mui/joy/FormControl'
import FormLabel from '@mui/joy/FormLabel'
import Select from '@mui/joy/Select'
import Option from '@mui/joy/Option'
import Input from '@mui/joy/Input'
import Typography from '@mui/joy/Typography'
import Card from '@mui/joy/Card'

import Calendar from 'src/components/show/calendar/Calendar'

import { useShowDispatch, useShow } from 'src/context/showContext'
import { useTab } from 'src/context/tabContext'

import rehearsalsApi from 'src/api/rehearsals'

function Characters() {

  const show = useShow()
  const showDispatch = useShowDispatch()

  const tab = useTab()

  const [adding, setAdding] = useState(false)
  const [pending, setPending] = useState(false)
  const [selectedDate, setSelectedDate] = useState('')
  const [modalSelectedScenes, setModalSelectedScenes] = useState([])

  const handleSceneSelectionChange = (event, newValue) => {
    setModalSelectedScenes(newValue)
  }

  return (
    <>
      <Modal open={adding} onClose={() => setAdding(false)}>
        <ModalDialog sx={{width: 500}}>
            <DialogTitle>Create new rehearsal</DialogTitle>
            <DialogContent>Just a few details needed...</DialogContent>
            <form
              onSubmit={(event) => {
                console.log(event)
              }}>
                <Stack spacing={2}>
                    <FormControl>
                        <FormLabel>Type</FormLabel>
                        <Select required>
                            <Option value="blocking">Blocking</Option>
                            <Option value="music">Music</Option>
                            <Option value="dance">Dance</Option>
                        </Select>
                    </FormControl>
                    <FormControl>
                        <FormLabel>Date</FormLabel>
                        <Input required type="date" defaultValue={selectedDate}/>
                    </FormControl>
                    <FormControl>
                      <FormLabel>Start Time</FormLabel>
                      <Input required type="time" />
                    </FormControl>
                    <FormControl>
                      <FormLabel>End Time</FormLabel>
                      <Input required type="time" />
                    </FormControl>
                    <FormControl>
                      <FormLabel>Location</FormLabel>
                      <Select required>
                        <Option value="troiano">Troiano</Option>
                        <Option value="stage">Gym Stage</Option>
                      </Select>
                    </FormControl>
                    <FormControl>
                      <FormLabel>Scene(s)</FormLabel>
                      <Select
                        defaultValue={['']}
                        multiple
                        onChange={handleSceneSelectionChange}
                        sx={{
                          minWidth: '13rem',
                        }}
                        slotProps={{
                          listbox: {
                            sx: {
                              width: '100%',
                            },
                          },
                        }}
                      >
                        {
                          show.scenes.map((s) => <Option value={s.id}>{s.name}</Option>)
                        }
                      </Select>
                    </FormControl>
                    <Stack direction="row" spacing={1}>
                      {
                      show.scenes.filter((s) => modalSelectedScenes.includes(s.id)).map((s) => 
                        <Card>
                          {s.name}
                          <Stack direction="column" >
                            {
                              s.characters.map((c) => <Typography>{c.actor.name}</Typography>)
                            }
                          </Stack>
                        </Card>
                        )
                      }
                    </Stack>
                </Stack>
            </form>
        </ModalDialog>
      </Modal>
      <Sheet sx={{width: '75.5vw', height: '80vh', overflow: 'scroll'}}>
        <Calendar view="dayGridMonth" addRehearsal={() => setAdding(true)} selectDate={setSelectedDate}/>
      </Sheet>
    </>
  )
}

export default Characters
