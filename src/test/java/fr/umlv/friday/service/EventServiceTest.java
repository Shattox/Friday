package fr.umlv.friday.service;

import static org.junit.jupiter.api.Assertions.assertEquals;

import fr.umlv.friday.model.Event;
import io.quarkus.test.TestTransaction;
import io.quarkus.test.junit.QuarkusTest;

import org.junit.jupiter.api.Test;

import javax.inject.Inject;
import javax.persistence.EntityManager;
import java.sql.Timestamp;
import java.util.List;

@QuarkusTest
@TestTransaction
public class EventServiceTest {
    @Inject
    EventService eventService;
    @Inject
    EntityManager entityManager;

    @Test
    public void getCorrectEventsInGetMemberEvents() {
        var idMember = 101L;
        var events = eventService.getMemberEvents(idMember);
        events.forEach(event -> assertEquals(event.getIdMember(), idMember));
        assertEquals(2, events.size());
    }

    @Test
    public void eventIsCorrectlyDelete() {
        var eventsBefore = getEvents();
        assertEquals(4, eventsBefore.size());
        eventService.deleteEvent(101);
        var eventAfter = getEvents();
        assertEquals(3, eventAfter.size());
    }

    @Test
    public void eventIsCorrectlySave() {
        var eventsBefore = getEvents();
        assertEquals(4, eventsBefore.size());
        var event = new Event("event", "test", Timestamp.valueOf("2021-12-16 10:00:00"), Timestamp.valueOf("2021-12-20 14:00:00"),
                "Paris", 15L, false, "NEVER", "BLUE", "App");
        eventService.saveEvent(event);
        var eventsAfter = getEvents();
        assertEquals(5, eventsAfter.size());
    }

    @Test
    public void googleEventForAMemberIsCorrectlyDelete() {
        var eventsBefore = getEvents();
        assertEquals(4, eventsBefore.size());
        eventService.deleteGoogleEvent(15L);
        var eventAfter = getEvents();
        assertEquals(3, eventAfter.size());
    }

    private List<Event> getEvents() {
        return entityManager.createQuery("SELECT e FROM Event as e", Event.class).getResultList();
    }
}
