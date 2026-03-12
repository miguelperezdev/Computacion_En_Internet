package edu.co.icesi.service;

import edu.co.icesi.model.Artist;
import java.util.List;
import java.util.Optional;

public interface ArtistService {
    List<Artist> getAllArtists();
    Artist createArtist(String name, String nationality);
    Optional<Artist> getArtistWithTracks(String name);
    boolean deleteArtist(Long id);
}