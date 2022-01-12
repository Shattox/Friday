package fr.umlv.friday.service;

import fr.umlv.friday.model.Event;
import fr.umlv.friday.model.Repeat;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.transaction.Transactional;

import java.io.IOException;
import java.security.GeneralSecurityException;
import java.sql.Timestamp;
import java.util.List;

@ApplicationScoped
public class EventService {
    @Inject
    EntityManager entityManager;

    /**
     * Get events for one specific member.
     * @param id id of the member
     * @return return list of Event of the member.
     */
    public List<Event> getMemberEvents(long id) {
        return entityManager.createQuery("SELECT e FROM Event e WHERE e.idMember =?1 ORDER BY e.startDate", Event.class)
                .setParameter(1, id)
                .getResultList();
    }

    /**
     * delete a specific event.
     * @param id event id.
     */
    @Transactional
    public void deleteEvent(long id) {
        var query = "DELETE FROM Event e WHERE e.id =?1";
        entityManager.createQuery(query)
                .setParameter(1, id)
                .executeUpdate();
    }

    /**
     * Save a event in the database.
     * @param event the event to save.
     */
    @Transactional
    public void saveEvent(Event event) {
        var query = "INSERT INTO event (id, title, description, startDate, endDate, location, idMember, allDay, repeat, label, origin) VALUES" +
                "(NEXT VALUE FOR seq_event, ?, ?, ?, ?, ?, ?, ? ,?, ?, ?)";
        entityManager.createNativeQuery(query)
                .setParameter(1, event.getTitle())
                .setParameter(2, event.getDescription())
                .setParameter(3, event.getStartDate())
                .setParameter(4, event.getEndDate())
                .setParameter(5, event.getLocation())
                .setParameter(6, event.getIdMember())
                .setParameter(7, event.getAllDay())
                .setParameter(8, event.getRepeat())
                .setParameter(9, event.getLabel())
                .setParameter(10, event.getOrigin())
                .executeUpdate();
    }

    /**
     * Update an event with its new information.
     */
    @Transactional
    public void updateEventSQL(long id, String title, String description, Timestamp startDate, Timestamp endDate, String location,
                               long idMember, boolean allDay, Repeat repeat, String label, String origin) {
        var query = "UPDATE event " +
                "SET title=?1, " +
                "description=?2, " +
                "startDate=?3, " +
                "endDate=?4 ," +
                "location=?5, " +
                "idMember=?6, " +
                "allDay=?7, " +
                "repeat=?8, " +
                "label=?9, " +
                "origin=?10 " +
                "WHERE id=?11";
        entityManager.createNativeQuery(query)
                .setParameter(1, title)
                .setParameter(2, description)
                .setParameter(3, startDate)
                .setParameter(4, endDate)
                .setParameter(5, location)
                .setParameter(6, idMember)
                .setParameter(7, allDay)
                .setParameter(8, repeatToString(repeat))
                .setParameter(9, label)
                .setParameter(10, origin)
                .setParameter(11, id)
                .executeUpdate();
    }

    /**
     * Save a new event.
     */
    @Transactional
    public void registerEvent(String title, String description, Timestamp startDate, Timestamp endDate, String location,
                              long idMember, boolean allDay, Repeat repeat, String label, String origin) {
        var event = new Event(title, description, startDate, endDate, location, idMember, allDay,
                repeatToString(repeat), label, origin);
        saveEvent(event);
    }

    /**
     * Save event from Google calendar.
     * @param idMember
     * @throws GeneralSecurityException
     * @throws IOException
     */
    @Transactional
    public void registerGoogleEvent(long idMember) throws GeneralSecurityException, IOException {
        deleteGoogleEvent(idMember);
        var events = GoogleCalendar.fetchGoogleEvents();
        events.forEach(evt -> {
            var event = GoogleCalendar.convertGoogleEventToEvent(evt, idMember);
            saveEvent(event);
        });
    }

    /**
     * Delete Google event.
     * @param idMember
     */
    @Transactional
    public void deleteGoogleEvent(long idMember) {
        var query = "DELETE FROM Event e WHERE e.origin = 'Google' AND e.idMember =?1";
        entityManager.createQuery(query)
                .setParameter(1, idMember)
                .executeUpdate();
    }

    public static Repeat stringToRepeat(String repeat) {
        return switch (repeat) {
            case "DAILY" -> Repeat.DAILY;
            case "WEEKLY" -> Repeat.WEEKLY;
            case "MONTHLY" -> Repeat.MONTHLY;
            case "YEARLY" -> Repeat.YEARLY;
            default -> Repeat.NEVER;
        };
    }

    public static String repeatToString(Repeat repeat) {
        return switch (repeat) {
            case DAILY -> "DAILY";
            case WEEKLY -> "WEEKLY";
            case MONTHLY -> "MONTHLY";
            case YEARLY -> "YEARLY";
            default -> "NEVER";
        };
    }
}
