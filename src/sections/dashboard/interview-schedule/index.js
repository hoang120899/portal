import { useRef, useState } from 'react'

// @mui
import { Card, CardHeader } from '@mui/material'

import dayGridPlugin from '@fullcalendar/daygrid'
import FullCalendar from '@fullcalendar/react'
import PropTypes from 'prop-types'

import CalendarStyle from './CalendarStyle'
import CalendarToolbar from './CalendarToolbar'

InterviewSchedule.propTypes = {
  title: PropTypes.string,
  subheader: PropTypes.string,
}

export default function InterviewSchedule({ title, subheader, ...other }) {
  const calendarRef = useRef(null)
  const [date, setDate] = useState(new Date())

  const handleClickToday = () => {
    const calendarEl = calendarRef.current
    if (calendarEl) {
      const calendarApi = calendarEl.getApi()
      calendarApi.today()
      setDate(calendarApi.getDate())
    }
  }

  const handleClickDatePrev = () => {
    const calendarEl = calendarRef.current
    if (calendarEl) {
      const calendarApi = calendarEl.getApi()
      calendarApi.prev()
      setDate(calendarApi.getDate())
    }
  }

  const handleClickDateNext = () => {
    const calendarEl = calendarRef.current
    if (calendarEl) {
      const calendarApi = calendarEl.getApi()
      calendarApi.next()
      setDate(calendarApi.getDate())
    }
  }

  const handleSelectRange = () => {
    const calendarEl = calendarRef.current
    if (calendarEl) {
      const calendarApi = calendarEl.getApi()
      calendarApi.unselect()
    }
  }
  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} />
      <CalendarStyle>
        <CalendarToolbar
          date={date}
          onNextDate={handleClickDateNext}
          onPrevDate={handleClickDatePrev}
          onToday={handleClickToday}
        />

        <FullCalendar
          weekends
          editable
          droppable
          selectable
          ref={calendarRef}
          rerenderDelay={10}
          initialDate={date}
          initialView={'dayGridMonth'}
          dayMaxEventRows={3}
          eventDisplay='block'
          headerToolbar={false}
          allDayMaintainDuration
          eventResizableFromStart
          select={handleSelectRange}
          plugins={[dayGridPlugin]}
          height='auto'
        />
      </CalendarStyle>
    </Card>
  )
}
