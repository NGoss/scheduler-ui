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
import Button from '@mui/joy/Button'
import Typography from '@mui/joy/Typography'
import ModalClose from '@mui/joy/ModalClose'

import Calendar from 'src/components/show/calendar/Calendar'

import { useShowDispatch, useShow } from 'src/context/showContext'
import { useTab } from 'src/context/tabContext'

import moment from 'moment'

import rehearsalsApi from 'src/api/rehearsals'

function RehearsalModal({open, exitCallback, defaultDate}) {

  const show = useShow()
  const showDispatch = useShowDispatch()

  const [pending, setPending] = useState(false)
  const [selectedDate, setSelectedDate] = useState(defaultDate)
  useEffect(() => { defaultDate && setSelectedDate(defaultDate)}, [defaultDate] )
  const [startTime, setStartTime] = useState('')
  const [endTime, setEndTime] = useState('')
  const [modalCalledActors, setModalCalledActors] = useState([])

  const handleSceneSelectionChange = (event, newValue) => {
    let actorsList = []

    newValue.forEach((x) => {
      const scene = show.scenes.filter((s) => s.id === x).at(0)
      actorsList = [...actorsList, ...scene.characters.flatMap((c) => c.actor)]
    })
    setModalCalledActors(actorsList)
  }

  const createRehearsal = async (event) => {
    event.preventDefault()
    //showId, type, date, startTime, endTime, location, sceneIds
    await rehearsalsApi.createRehearsal(show.id, event.target[1].value, event.target[2].value, event.target[3].value, event.target[4].value, event.target[6].value, JSON.parse(event.target[8].value))
    
    exitCallback()
  }

  return (
    <>
      <Modal open={open} onClose={exitCallback}>
        <ModalDialog sx={{width: 500}}>
            <ModalClose />
            <DialogTitle>Create new rehearsal</DialogTitle>
            <DialogContent>Just a few details needed...</DialogContent>
            <form
              onSubmit={createRehearsal}>
                <Stack spacing={2}>
                    <FormControl>
                        <FormLabel>Type</FormLabel>
                        <Select required>
                            <Option value="SCENE">Scene</Option>
                            <Option value="MUSIC">Music</Option>
                            <Option value="DANCE">Dance</Option>
                            <Option value="READ_THROUGH">Read Through</Option>
                        </Select>
                    </FormControl>
                    <FormControl>
                        <FormLabel>Date</FormLabel>
                        <Input required type="date" defaultValue={selectedDate}/>
                    </FormControl>
                    <FormControl>
                      <FormLabel>Start Time</FormLabel>
                      <Input required onChange={(event) => setStartTime(event.target.value)} type="time" />
                    </FormControl>
                    <FormControl>
                      <FormLabel>End Time</FormLabel>
                      <Input required onChange={(event) => setEndTime(event.target.value)} type="time" />
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
                        modalCalledActors.flatMap((a) => {
                          const rehearsStart = moment(`${selectedDate}T${startTime}`)
                          const rehearsEnd = moment(`${selectedDate}T${endTime}`)

                          return a.conflicts?.map((c) => {
                            const conflictStart = moment(c.start)
                            const conflictEnd = moment(c.end)

                            console.log("comparing conflict start/end " + conflictStart.format() + " " + conflictEnd.format() + "   to rehearsal start/end " + rehearsStart.format() + " " + rehearsEnd)
                            if (conflictStart.isBetween(rehearsStart, rehearsEnd) || conflictEnd.isBetween(rehearsStart, rehearsEnd)) {
                              return <Typography color="danger">{a.name} has a conflict: {conflictStart.format('h:mm a')} - {conflictEnd.format('h:mm a')}</Typography>
                            }
                          })
                        })
                      }
                    </Stack>
                    <Button type="submit">Submit</Button>
                </Stack>
            </form>
        </ModalDialog>
      </Modal>
    </>
  )
}

export default RehearsalModal
