package edu.co.icesi.repository;

import edu.co.icesi.model.Track;
import java.util.List;
import java.util.Optional;

public interface TrackRepository {
    List<Track> findAll();
    Track save(Track track);
    Optional<Track> findById(Long id);
    void deleteById(Long id);
}