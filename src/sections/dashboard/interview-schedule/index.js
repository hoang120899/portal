import { useCallback, useMemo, useRef, useState } from 'react'

// @mui
import {
  Button,
  Card,
  CardHeader,
  DialogActions,
  DialogTitle,
} from '@mui/material'

import dayGridPlugin from '@fullcalendar/daygrid'
import FullCalendar from '@fullcalendar/react'
import PropTypes from 'prop-types'

import BasicTable from '@/components/BasicTable'
import { DialogAnimate } from '@/components/animate'
import { CALANDER_DATE_FORMAT } from '@/config'
import useLocales from '@/hooks/useLocales'
import useResponsive from '@/hooks/useResponsive'
import useRole from '@/hooks/useRole'
import useToggle from '@/hooks/useToggle'
import { fDate, fEndOfMonth, fStartOfMonth } from '@/utils/formatTime'

import CalendarStyle from './CalendarStyle'
import CalendarToolbar from './CalendarToolbar'
import InterviewCollapsibleTableRow from './InterviewCollapsibleTableRow'
import InterviewTableRow from './InterviewTableRow'
import { TABLE_DESKTOP_HEAD, TABLE_MOBILE_HEAD } from './config'
import { useGetAdminCalendarInterviewQuery } from './interviewScheduleSlice'

InterviewSchedule.propTypes = {
  title: PropTypes.string,
  subheader: PropTypes.string,
}

export default function InterviewSchedule({ title, subheader, ...other }) {
  const { currentRole } = useRole()
  const { translate } = useLocales()
  const isMobileScreen = useResponsive('down', 'sm')
  const calendarRef = useRef(null)
  const { toggle: open, onOpen, onClose } = useToggle()
  const [date, setDate] = useState(new Date())
  const [selectedInterviews, setSelectedInterviews] = useState([])
  const columns = isMobileScreen ? TABLE_MOBILE_HEAD : TABLE_DESKTOP_HEAD

  const startDate = useMemo(
    () => fDate(fStartOfMonth(date || new Date()), CALANDER_DATE_FORMAT),
    [date]
  )
  const endDate = useMemo(
    () => fDate(fEndOfMonth(date || new Date()), CALANDER_DATE_FORMAT),
    [date]
  )

  const { data: calendar = {} } = useGetAdminCalendarInterviewQuery({
    start: startDate,
    end: endDate,
    currentRole,
  })

  const events = useMemo(() => {
    if (!calendar || !Object.keys(calendar).length) return []
    return Object.keys(calendar).reduce((prev, curr) => {
      const interviews = calendar[curr]?.interviews || []
      interviews.forEach((value) => {
        prev.push(value)
      })
      return prev
    }, [])
  }, [calendar])

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

  const handleSelectEvent = (arg) => {
    const selectedEventId = arg.event.id
    const { timeInterviewFormat = '' } = events.find(
      (value) => value?.id === parseInt(selectedEventId, 10)
    )

    if (!timeInterviewFormat) return
    const interviews = calendar[timeInterviewFormat]?.interviews || []
    setSelectedInterviews(interviews)
    onOpen()
  }

  const handleCloseDialog = () => {
    setSelectedInterviews([])
    onClose()
  }

  const tableRowComp = useCallback(
    (row, index) => {
      if (isMobileScreen)
        return <InterviewCollapsibleTableRow key={row?.id || index} row={row} />
      return <InterviewTableRow key={row?.id || index} row={row} />
    },
    [isMobileScreen]
  )
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
          events={events}
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
          eventClick={handleSelectEvent}
          plugins={[dayGridPlugin]}
          height='auto'
        />
      </CalendarStyle>

      <DialogAnimate open={open} onClose={handleCloseDialog} maxWidth='md'>
        <DialogTitle sx={{ mb: 1 }}>{translate('List Interviews')}</DialogTitle>

        <BasicTable
          columns={columns}
          dataSource={selectedInterviews}
          TableRowComp={tableRowComp}
        />

        <DialogActions>
          <Button
            variant='outlined'
            color='inherit'
            onClick={handleCloseDialog}
          >
            {translate('Cancel')}
          </Button>
        </DialogActions>
      </DialogAnimate>
    </Card>
  )
}
