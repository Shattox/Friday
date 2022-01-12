package fr.umlv.friday.service;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;

import fr.umlv.friday.model.Repeat;
import net.fortuna.ical4j.model.component.CalendarComponent;
import net.fortuna.ical4j.data.CalendarBuilder;
import net.fortuna.ical4j.data.ParserException;
import net.fortuna.ical4j.model.ComponentList;

import java.net.URL;
import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.text.ParseException;

import java.io.IOException;
import java.util.Date;

@ApplicationScoped
public class IcalParser {
    @Inject
    EventService eventService;

    /**
     * Get icalendar format components from it's url.
     * @param url ics url
     * @return calendar components
     * @throws ParserException parsing error
     * @throws IOException exception
     */
    public ComponentList<CalendarComponent> getCalendarComponentsFromUrl(String url) throws ParserException, IOException {
        var inputStream = new URL(url).openStream();
        var builder = new CalendarBuilder();
        return builder.build(inputStream).getComponents();
    }

    /**
     * Parse icalendar date format to java.sql.timestamp.
     * @param date date to parse
     * @return sql timestamp
     */
    public Timestamp parseDateFormat(String date) {
        if (date.length() <= 8) {
            date = date + "T010000";
        }
        var simpleDateFormat = new SimpleDateFormat( "yyyyMMdd'T'HHmmss");
        try {
            return new Timestamp(simpleDateFormat.parse(date).getTime());
        } catch (ParseException e) {
            throw new IllegalStateException(date + " cannot be parsed");
        }
    }

    /**
     * Get rrule from ical rrule format.
     * @param rrule ical format rrule.
     * @return return new rrule.
     */
    public String parseRrule(String rrule) {
        return rrule.split(";")[0].split("=")[1];
    }

    /**
     * Check if a event from ical format is all day event.
     * @param component the event contains the event in ical format.
     * @return true if is all day else false.
     */
    public boolean isAllDayEvent(CalendarComponent component) {
        if (component.getProperty("DTSTART") == null) {
            return false;
        }
        return (component.getProperty("DTEND").getValue() == null) &&
                (component.getProperty("DTSTART").getValue().length() == 8);
    }

    /**
     * Set in database the events of the calendarComponents.
     * @param calendarComponents ical components
     * @param idMember id of the member
     * @throws ParseException parsing error
     */
    public void setEvent(ComponentList<CalendarComponent> calendarComponents, Long idMember) throws ParseException {
        for (var component: calendarComponents) {
            var title = component.getProperty("SUMMARY") != null ?
                    component.getProperty("SUMMARY").getValue() : "UnNamed";
            var location = component.getProperty("LOCATION") != null ?
                    component.getProperty("LOCATION").getValue() : "";
            var description = component.getProperty("DESCRIPTION") != null ?
                    component.getProperty("DESCRIPTION").getValue() : "";
            var startDate = component.getProperty("DTSTART") != null ?
                    parseDateFormat(component.getProperty("DTSTART").getValue()) : new Timestamp(new Date().getTime());
            var endDate = component.getProperty("DTEND") != null ?
                    parseDateFormat(component.getProperty("DTEND").getValue()) : startDate;
            var repeat = component.getProperty("RRULE") != null ?
                    EventService.stringToRepeat(parseRrule(component.getProperty("RRULE").getValue())) : Repeat.NEVER;
            var allDay = isAllDayEvent(component);
            eventService.registerEvent(title, description, startDate, endDate, location,
                    idMember, allDay, repeat, "green", "Ical");
        }
    }
}
