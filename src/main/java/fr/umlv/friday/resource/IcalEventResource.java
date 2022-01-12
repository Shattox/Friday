package fr.umlv.friday.resource;

import fr.umlv.friday.service.IcalParser;
import net.fortuna.ical4j.data.ParserException;

import javax.inject.Inject;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.io.IOException;
import java.text.ParseException;

@Path("/")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class IcalEventResource {
    @Inject
    IcalParser icalParser;

    /**
     * POST method to get icalendar file url and member id to make the link
     * between the events and the member.
     * @param url
     * @param idMember
     * @throws ParserException
     * @throws IOException
     * @throws ParseException
     */
    @POST
    @Path("CalendarUrl/{url}&{idMember}")
    public Response loadIcsFile(@PathParam("url") String url, @PathParam("idMember") String idMember)
            throws ParserException, IOException, ParseException {
        url = url.replace('-', '/');
        var calendarComponents = icalParser.getCalendarComponentsFromUrl(url);
        icalParser.setEvent(calendarComponents, Long.valueOf(idMember));
        return Response.ok(200).build();
    }
}
