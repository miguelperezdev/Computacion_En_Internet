package edu.co.icesi.service;

import edu.co.icesi.model.Track;
import java.util.List;
import java.util.Optional;

public interface TrackService {
    List<Track> getAllTracks();
    Track createTrack(String title, String genre, int duration, String albumTitle, List<Long> artistIds);
    boolean deleteTrack(Long id);
}