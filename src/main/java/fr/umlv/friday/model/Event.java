package fr.umlv.friday.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.sql.Timestamp;

@Entity
@Table(name = "event")
public class Event {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "seq_event")
    @SequenceGenerator(name = "seq_event", allocationSize = 1)
    private Long id;
    private String title;
    private String description;
    private Timestamp startDate;
    private Timestamp endDate;
    private String location;
    private Long idMember;
    private Boolean allDay;
    private String repeat;
    private String label;
    @JsonIgnore
    private String origin;

    public Event(String title, String description, Timestamp startDate, Timestamp endDate, String location,
                 Long idMember, Boolean allDay, String repeat, String label, String origin) {
        this.title = title;
        this.description = description;
        this.startDate = startDate;
        this.endDate = endDate;
        this.location = location;
        this.idMember = idMember;
        this.allDay = allDay;
        this.repeat = repeat;
        this.label = label;
        this.origin = origin;
    }

    public Event() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Timestamp getStartDate() {
        return startDate;
    }

    public void setStartDate(Timestamp startDate) {
        this.startDate = startDate;
    }

    public Timestamp getEndDate() {
        return endDate;
    }

    public void setEndDate(Timestamp endDate) {
        this.endDate = endDate;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public Long getIdMember() {
        return idMember;
    }

    public void setIdMember(Long idMember) {
        this.idMember = idMember;
    }

    public Boolean getAllDay() {
        return allDay;
    }

    public void setAllDay(Boolean allDay) {
        this.allDay = allDay;
    }

    public String getRepeat() {
        return repeat;
    }

    public void setRepeat(String repeat) {
        this.repeat = repeat;
    }

    public String getLabel() {
        return label;
    }

    public void setLabel(String label) {
        this.label = label;
    }

    public String getOrigin() {
        return origin;
    }

    public void setOrigin(String origin) {
        this.origin = origin;
    }
}
