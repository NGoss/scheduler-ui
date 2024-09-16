import { useState, useEffect } from 'react'

import Sheet from '@mui/joy/Sheet'

import Calendar from 'src/components/show/calendar/Calendar'

import { useShowDispatch, useShow } from 'src/context/showContext'
import { useTab } from 'src/context/tabContext'

import RehearsalModal from './RehearsalModal'

import moment from 'moment'

function Rehearsals() {

  const show = useShow()
  const [adding, setAdding] = useState(false)
  const [selectedDate, setSelectedDate] = useState('')

  const mapRehearsalToCalendarEvent = (rehearsal) => {
    return {
      title: rehearsal.type + " " +
        rehearsal.scenes.reduce((accumulator, currentValue) => accumulator + " " + currentValue.name, "").trim(),
      date: moment(rehearsal.start).format('YYYY-MM-DD')
    }
  }

  const events = show.rehearsals.map(mapRehearsalToCalendarEvent)
  return (
    <>
      <RehearsalModal defaultDate={selectedDate} open={adding} exitCallback={() => setAdding(false)}/>
      <Sheet sx={{overflow: 'scroll'}}>
        <Calendar view="dayGridMonth" addRehearsal={() => setAdding(true)} selectDate={setSelectedDate} events={events}/>
      </Sheet>
    </>
  )
}

export default Rehearsals
