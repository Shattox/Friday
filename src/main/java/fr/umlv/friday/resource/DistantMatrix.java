package fr.umlv.friday.resource;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.io.IOException;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;

@Path("/")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class DistantMatrix {

    static final String APIKEY = "AIzaSyDj2VthHzbq24_h9n5NPJ3SFNNLP0g2TOI";

    @POST
    @Path("fetchData/{latitude}&{longitude}&{destination}&{mode}")
    public Object fetchData(@PathParam("latitude") double latitude, @PathParam("longitude") double longitude, @PathParam("destination") String destination, @PathParam("mode") String mode) throws IOException {
        URL url = new URL("https://maps.googleapis.com/maps/api/distancematrix/json?destinations="
        + destination
                +"&language=fr-FR&mode="+mode+"&origins=Paris"
                +"&key=" +APIKEY);
        HttpURLConnection con = (HttpURLConnection) url.openConnection();
        con.setRequestMethod("GET");
        return con.getContent();
    }

}
