package fr.umlv.friday.service;

import static org.junit.jupiter.api.Assertions.assertEquals;

import fr.umlv.friday.model.Event;
import io.quarkus.test.TestTransaction;
import io.quarkus.test.junit.QuarkusTest;
import net.fortuna.ical4j.data.ParserException;
import org.junit.jupiter.api.Test;

import javax.inject.Inject;
import javax.persistence.EntityManager;
import java.io.IOException;
import java.text.ParseException;
import java.util.List;

@QuarkusTest
@TestTransaction
public class IcalParserTest {
    @Inject
    IcalParser icalParser;
    @Inject
    EntityManager entityManager;

    // This is a test url from ics file which contains only 2 events.
    private String URL = "https://calendar.google.com/calendar/ical/14nntja29b3gp5rhmblodvh8nk%40group.calendar.google.com/public/basic.ics";

    @Test
    public void getCorrectNumberOfCalendarComponentFromIcalUrl() throws ParserException, IOException {
        var calendarComponents = icalParser.getCalendarComponentsFromUrl(URL);
        assertEquals(3, calendarComponents.size());
    }

    @Test
    public void eventFromIcalIsCorrectlySave() throws ParserException, IOException, ParseException {
        var eventBefore = getEvents();
        assertEquals(4, eventBefore.size());
        var calendarComponents = icalParser.getCalendarComponentsFromUrl(URL);
        icalParser.setEvent(calendarComponents, 15L);
        var eventAfter = getEvents();
        assertEquals(7, eventAfter.size());
    }

    private List<Event> getEvents() {
        return entityManager.createQuery("SELECT e FROM Event as e", Event.class).getResultList();
    }
}
