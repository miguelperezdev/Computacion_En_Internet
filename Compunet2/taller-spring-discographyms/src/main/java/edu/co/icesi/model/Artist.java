package edu.co.icesi.model;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

public class Artist {
    private Long id;
    private String name;
    private String nationality;
    private List<edu.co.icesi.model.Track> tracks = new ArrayList<>();

    // Constructores
    public Artist() {}
    public Artist(Long id, String name, String nationality) {
        this.id = id;
        this.name = name;
        this.nationality = nationality;
    }

    // Getters y Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getNationality() { return nationality; }
    public void setNationality(String nationality) { this.nationality = nationality; }
    public List<edu.co.icesi.model.Track> getTracks() { return tracks; }
    public void setTracks(List<edu.co.icesi.model.Track> tracks) { this.tracks = tracks; }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Artist artist = (Artist) o;
        return Objects.equals(id, artist.id);
    }
    @Override
    public int hashCode() { return Objects.hash(id); }
}