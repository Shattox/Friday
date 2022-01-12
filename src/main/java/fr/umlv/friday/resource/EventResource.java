package fr.umlv.friday.resource;

import fr.umlv.friday.model.Event;
import fr.umlv.friday.service.EventService;

import javax.inject.Inject;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.io.IOException;
import java.security.GeneralSecurityException;
import java.sql.Timestamp;
import java.text.ParseException;
import java.util.List;


@Path("/")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class EventResource {
    @Inject
    EventService eventService;

    @POST
    @Path("DeleteEvent/{id}")
    public Response deleteEvent(@PathParam("id") long id) {
        eventService.deleteEvent(id);
        return Response.ok(200).build();
    }

    @POST
    @Path("SyncGoogle/{idMember}")
    public Response syncGoogleEvent(@PathParam("idMember") long idMember) throws GeneralSecurityException, IOException {
        eventService.registerGoogleEvent(idMember);
        return Response.ok(200).build();
    }

    @POST
    @Path("SaveEvent/{title}&{description}&{startDate}&{endDate}&{location}&{idMember}&{allDay}&{repeat}&{label}")
    public Response registerEvent(@PathParam("title") String title, @PathParam("description") String description,
                                  @PathParam("startDate") String startDate, @PathParam("endDate") String endDate,
                                  @PathParam("location") String location, @PathParam("idMember") Long idMember,
                                  @PathParam("allDay") Boolean allDay, @PathParam("repeat") String repeat,
                                  @PathParam("label") String label
                                   ) throws ParseException {
        eventService.registerEvent(
                title,
                description,
                Timestamp.valueOf(startDate),
                Timestamp.valueOf(endDate),
                location,
                idMember,
                allDay,
                EventService.stringToRepeat(repeat),
                label,
                "App");
        return Response.ok(200).build();
    }

    @POST
    @Path("UpdateEvent/{id}&{title}&{description}&{startDate}&{endDate}&{location}&{idMember}&{allDay}&{repeat}&{label}")
    public Response registerEvent(@PathParam("id") long id, @PathParam("title") String title, @PathParam("description") String description,
                                  @PathParam("startDate") String startDate, @PathParam("endDate") String endDate,
                                  @PathParam("location") String location, @PathParam("idMember") Long idMember,
                                  @PathParam("allDay") Boolean allDay, @PathParam("repeat") String repeat,
                                  @PathParam("label") String label
    ) throws ParseException {
        eventService.updateEventSQL(
                id,
                title,
                description,
                Timestamp.valueOf(startDate),
                Timestamp.valueOf(endDate),
                location,
                idMember,
                allDay,
                EventService.stringToRepeat(repeat),
                label,
                "App");
        return Response.ok(200).build();
    }


    @GET
    @Path("Events/{id}")
    public List<Event> getMemberEvents(@PathParam("id") long id) {
        return eventService.getMemberEvents(id);
    }
}
