package edu.co.icesi.repository;

import edu.co.icesi.model.Artist;
import java.util.List;
import java.util.Optional;

public interface ArtistRepository {
    List<Artist> findAll();
    Artist save(Artist artist);
    Optional<Artist> findById(Long id);
    Optional<Artist> findByName(String name);
    void deleteById(Long id);
}