import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'

export default function Calendar({ view, addRehearsal, selectDate, events}) {
    return (
        <FullCalendar
            plugins={[dayGridPlugin, interactionPlugin]}
            initialView={view}
            editable="true"
            selectable="true"
            handleWindowResize="true"
            showNonCurrentDates={false}
            headerToolbar={{
                start: 'today prev,next',
                center: 'title',
                end: 'addEventButton dayGridWeek,dayGridMonth'
            }}
            customButtons={{
                addEventButton: {
                    text: 'Add Rehearsal',
                    click: addRehearsal
                }
            }}
            dateClick={(info) => {
                selectDate(info.dateStr)
            }}
            unselect={() => selectDate('')}
            unselectCancel="button"
            events={events}
        />
    )
}