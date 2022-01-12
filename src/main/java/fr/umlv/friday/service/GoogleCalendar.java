package fr.umlv.friday.service;

import com.google.api.client.auth.oauth2.Credential;
import com.google.api.client.extensions.java6.auth.oauth2.AuthorizationCodeInstalledApp;
import com.google.api.client.extensions.jetty.auth.oauth2.LocalServerReceiver;
import com.google.api.client.googleapis.auth.oauth2.GoogleAuthorizationCodeFlow;
import com.google.api.client.googleapis.auth.oauth2.GoogleClientSecrets;
import com.google.api.client.googleapis.javanet.GoogleNetHttpTransport;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.JsonFactory;
import com.google.api.client.json.gson.GsonFactory;
import com.google.api.client.util.DateTime;
import com.google.api.client.util.store.FileDataStoreFactory;
import com.google.api.services.calendar.Calendar;
import com.google.api.services.calendar.CalendarScopes;
import com.google.api.services.calendar.model.Event;
import com.google.api.services.calendar.model.Events;

import java.io.*;
import java.security.GeneralSecurityException;
import java.sql.Timestamp;
import java.util.Collections;
import java.util.List;

public class GoogleCalendar {
    private static final String APPLICATION_NAME = "Google Calendar API Java Quickstart";
    private static final JsonFactory JSON_FACTORY = GsonFactory.getDefaultInstance();
    private static final String TOKENS_DIRECTORY_PATH = "tokens";

    /**
     * Global instance of the scopes required by this quickstart.
     * If modifying these scopes, delete your previously saved tokens/ folder.
     */
    private static final List<String> SCOPES = Collections.singletonList(CalendarScopes.CALENDAR_READONLY);
    private static final String CREDENTIALS_FILE_PATH = "../src/main/resources/credentials.json";

    /**
     * Creates an authorized Credential object.
     *
     * @param HTTP_TRANSPORT The network HTTP Transport.
     * @return An authorized Credential object.
     * @throws IOException If the credentials.json file cannot be found.
     */
    private static Credential getCredentials(final NetHttpTransport HTTP_TRANSPORT) throws IOException {
        // Load client secrets.
        InputStream in = new FileInputStream(CREDENTIALS_FILE_PATH);
        if (in == null) {
            throw new FileNotFoundException("Resource not found: " + CREDENTIALS_FILE_PATH);
        }
        GoogleClientSecrets clientSecrets = GoogleClientSecrets.load(JSON_FACTORY, new InputStreamReader(in));

        // Build flow and trigger user authorization request.
        GoogleAuthorizationCodeFlow flow = new GoogleAuthorizationCodeFlow.Builder(
                HTTP_TRANSPORT, JSON_FACTORY, clientSecrets, SCOPES)
                .setDataStoreFactory(new FileDataStoreFactory(new java.io.File(TOKENS_DIRECTORY_PATH)))
                .setAccessType("offline")
                .build();
        LocalServerReceiver receiver = new LocalServerReceiver.Builder().setPort(8888).build();
        return new AuthorizationCodeInstalledApp(flow, receiver).authorize("user");
    }

        public static List<Event> fetchGoogleEvents() throws IOException, GeneralSecurityException {
            // Build a new authorized API client service.
            final NetHttpTransport HTTP_TRANSPORT = GoogleNetHttpTransport.newTrustedTransport();
            Calendar service = new Calendar.Builder(HTTP_TRANSPORT, JSON_FACTORY, getCredentials(HTTP_TRANSPORT))
                    .setApplicationName(APPLICATION_NAME)
                    .build();

            DateTime now = new DateTime(System.currentTimeMillis());
            Events events = service.events().list("primary")
                    .setTimeMin(now)
                    .setOrderBy("startTime")
                    .setSingleEvents(true)
                    .execute();
            return events.getItems();
        }

    public static fr.umlv.friday.model.Event convertGoogleEventToEvent(Event event, long idMember) {
        var start = event.getStart().getDateTime() == null ? event.getStart().getDate() : event.getStart().getDateTime();
        var end = event.getEnd().getDateTime() == null ? event.getEnd().getDate() : event.getEnd().getDateTime();
        var desc = event.getDescription() == null ? " " : event.getDescription();
        var title = event.getSummary() == null ? " " : event.getSummary();
        var location = event.getLocation() == null ? " " : event.getLocation();
        var repeat = event.getRecurringEventId() == null ? "NEVER" : EventService.repeatToString(EventService.stringToRepeat(event.getRecurringEventId()));
        var colorId = event.getColorId() == null ? "indigo" : event.getColorId();
        return new fr.umlv.friday.model.Event(
                title,
                desc,
                new Timestamp(start.getValue()),
                new Timestamp(end.getValue()),
                location,
                idMember,
                start.toString().contains("T"),
                repeat,
                colorId,
                "Google"
        );
    }
}


