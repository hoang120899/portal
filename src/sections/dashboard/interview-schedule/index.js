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
import InterviewDetail from './InterviewDetail'
import InterviewTableRow from './InterviewTableRow'
import {
  CALENDAR_CONFIG,
  TABLE_DESKTOP_HEAD,
  TABLE_MOBILE_HEAD,
} from './config'
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
  const {
    toggle: openDetail,
    onOpen: onOpenDetail,
    onClose: onCloseDetail,
  } = useToggle()
  const [date, setDate] = useState(CALENDAR_CONFIG.initialDate)
  const [selectedInterviews, setSelectedInterviews] = useState([])
  const [interviewDetail, setInterviewDetail] = useState({})

  const columns = useMemo(() => {
    if (isMobileScreen) return TABLE_MOBILE_HEAD({ translate })
    return TABLE_DESKTOP_HEAD({ translate })
  }, [isMobileScreen, translate])

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

  const handleOpenInterviewDetail = useCallback(
    (detail) => {
      onClose()
      setInterviewDetail(detail)
      onOpenDetail()
    },
    [setInterviewDetail, onOpenDetail, onClose]
  )

  const handleCloseInterviewDetail = () => {
    setInterviewDetail({})
    onCloseDetail()
    onOpen()
  }

  const tableRowComp = useCallback(
    (row, index) => {
      if (isMobileScreen)
        return (
          <InterviewCollapsibleTableRow
            key={row?.id || index}
            row={row}
            onOpenInterviewDetail={handleOpenInterviewDetail}
          />
        )
      return (
        <InterviewTableRow
          key={row?.id || index}
          row={row}
          onOpenInterviewDetail={handleOpenInterviewDetail}
        />
      )
    },
    [isMobileScreen, handleOpenInterviewDetail]
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
          rerenderDelay={CALENDAR_CONFIG.rerenderDelay}
          initialDate={date}
          initialView={CALENDAR_CONFIG.initialView}
          dayMaxEventRows={CALENDAR_CONFIG.dayMaxEventRows}
          headerToolbar={CALENDAR_CONFIG.headerToolbar}
          allDayMaintainDuration={CALENDAR_CONFIG.allDayMaintainDuration}
          eventResizableFromStart={CALENDAR_CONFIG.eventResizableFromStart}
          eventDisplay='block'
          select={handleSelectRange}
          eventClick={handleSelectEvent}
          plugins={[dayGridPlugin]}
        />
      </CalendarStyle>

      <DialogAnimate
        open={open}
        onClose={handleCloseDialog}
        maxWidth='md'
        sx={{
          '& > div': {
            overflowY: 'auto',
          },
        }}
      >
        <DialogTitle sx={{ mb: 1 }}>
          {translate('pages.dashboard.interviewSchedule.listInterviews')}
        </DialogTitle>

        <BasicTable
          tableStyle={{ padding: '24px 16px' }}
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
            {translate('pages.dashboard.interviewSchedule.cancel')}
          </Button>
        </DialogActions>
      </DialogAnimate>

      <DialogAnimate
        open={openDetail}
        onClose={handleCloseInterviewDetail}
        maxWidth='md'
      >
        <DialogTitle sx={{ mb: 1 }}>
          {translate('pages.dashboard.interviewSchedule.interviewDetail')}
        </DialogTitle>

        <InterviewDetail interviewDetail={interviewDetail} />

        <DialogActions>
          <Button
            variant='outlined'
            color='inherit'
            onClick={handleCloseInterviewDetail}
          >
            {translate('pages.dashboard.interviewSchedule.cancel')}
          </Button>
        </DialogActions>
      </DialogAnimate>
    </Card>
  )
}
