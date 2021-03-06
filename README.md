<h1 text-align="center">Friday Documentation</h1>
<h2 text-align="center">Steve Chen / Nicolas Van Heusden</h2>
<h3 text-align="center">December 31 2021</h3>

<div style="page-break-after: always"></div>

## Presentation

<div style="page-break-after: always"></div>

## User guide

### Setup
First of all, to launch the calendar, you must launch the following commands :
`mvn clean quarkus:dev`
Then go to : src/main/webapp launch :
`npm install` and then
`npm start`

You can also launch the jar with the following command but there will be no css as we couldn't
set tailwind to a mode production.
`mvn clean package` and then `java -jar target/quarkus-app/quarkus-run.jar -Xlint:all`


### Utilisation

First of all, to launch the calendar, you must launch the following commands :
`TODO : insert command from jar`

To start using friday calendar application, you need to create an account
and sign in.

The application is cut in 3 parts

1. In the first section you will see a timer which represents the time left
   before the next event.


2. In the second section the events of the day are displayed in chronological order,
   with their main information.


3. The third section contains the calendar and actions that you can do to manage
   the calendar and your events.

- Add event : You can add event to the calendar by clicking on a day,
  where you want to create your event or on the
  button **create event** in the left sidebar for an event of the current day.

- Add event form : As creating an event, a form will appear where you can enter your
  event information like title, location, date...


- Event display : Once the event created, different displays are possible
  in terms of **repeat** that you selected.

  - Never : A horizontal bar will appear with the event title in the calendar box
    on the day when your event starts.
  - Every day, week, month, year : A horizontal bar will appear every day, week...
    from event start date to end date.


- Update event : You create an event but missed an information ? you can
  update it by clicking on the horizontal bar which represents
  your event and change the missing or incorrect fields.


- Import event from Google calendar : You can synchronize your Google calendar
  to our application by clicking on the button **Sync Google**
  on the left sidebar. A new tab will be open please follow the
  instructions on. Then your Google calendar events will appear
  in the application calendar.
  Note : It doesn't take the passed event.


- Import event from ical format : To import events in an ical format you need
  to provide an **url** to download the **.ics** file on the left
  sidebar and submit it. Events will appear in the application
  calendar.


## What doesn't work

- When a new event is added, in the component where events of the day
  are displayed, the chronological order is not dynamically render.
  Same bug is present for the timer of the next event.
- When you want to update an event you must specify the end Date every time,
  because of some parsing error
- The intel information doesn't return correct response
- For the Google Calendar, we ask a production version to google but in the meantime,
  to test our application, you will have test with a fake account that is register as a test
  account. The login information are :
  - email : friday.calendar1@gmail.com
  - pwd : FridayCalendar2021
