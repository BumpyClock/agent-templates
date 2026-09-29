# Microsoft Calendar

Alias `MicrosoftCalendar`, including its capitalization.
Schema discovery succeeded on 2026-09-28 with 16 tools.

## Find meetings

Use `ListCalendarView` for meetings in a time window. It expands recurring events into individual instances.
`ListEvents` returns series masters instead; do not use a master ID when modifying only one occurrence.

```bash
mcporter call MicrosoftCalendar.GetUserDateAndTimeZoneSettings --args '{}' --output json
mcporter call MicrosoftCalendar.ListCalendarView --args '{"startDateTime":"2026-10-01T00:00:00Z","endDateTime":"2026-10-02T00:00:00Z","top":20}' --output json
```

Replace the example dates with the requested window. Include UTC or an explicit offset.
`ListCalendarView` also accepts `subject`, `timeZone`, `select`, and `userIdentifier`.
Omitting dates defaults to the current user's time through 15 days later; use explicit dates for bounded requests.

## Find availability

```bash
mcporter call MicrosoftCalendar.FindMeetingTimes --args '{"attendeeEmails":["person@example.com"],"meetingDuration":"PT30M","startDateTime":"2026-10-01T09:00:00Z","endDateTime":"2026-10-01T17:00:00Z","maxCandidates":5}' --output json
```

Replace the example attendee and window with the requested values.
Always supply `meetingDuration`, although the schema's required array is empty.
Its parameter description requires an ISO 8601 duration such as `PT30M` or `PT1H`, not a bare number.
`GetRooms` takes no arguments and discovers rooms.

## Meeting records

`GetOnlineMeetingTranscripts`, `GetOnlineMeetingAiInsights`, and `GetOnlineMeetingAttendanceReports` require `joinWebUrl`, not a calendar event ID.
For a meeting identified by title or date, find it with `ListCalendarView` and use the returned `onlineMeeting.joinUrl`.
Do not ask for a URL that the calendar lookup can provide.
`organizerUserId`, when supplied, identifies the organizer, not necessarily the caller.
Transcripts default to the latest recording. Use a returned `transcriptId` when another recording is requested.

## Event changes

`CreateEvent` requires `subject`, `attendeeEmails`, `startDateTime`, and `endDateTime`.
Resolve attendee addresses first. Creating an event at a supplied time does not check for conflicts.
For all-day events, set `isAllDay:true`; online meetings are disabled for that case.
`UpdateEvent` uses `eventId` and separate `attendeesToAdd` and `attendeesToRemove` fields.
`CancelEvent` is organizer-only, notifies attendees, and removes the event. Do not call `DeleteEventById` afterward.
`CreateEvent`, responses, forwarding, cancellation, and updates can affect attendees.
Obtain the required authorization, inspect the selected tool's schema, and verify the intended occurrence before writing.
