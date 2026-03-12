package edu.co.icesi.service.impl;

import edu.co.icesi.model.Artist;
import edu.co.icesi.model.Track;
import edu.co.icesi.repository.ArtistRepository;
import edu.co.icesi.repository.TrackRepository;
import edu.co.icesi.service.TrackService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class TrackServiceImpl implements TrackService {
    @Autowired
    private TrackRepository trackRepository;
    @Autowired
    private ArtistRepository artistRepository;

    @Override
    public List<Track> getAllTracks() {
        return trackRepository.findAll();
    }

    @Override
    public Track createTrack(String title, String genre, int duration, String albumTitle, List<Long> artistIds) {
        Track track = new Track(null, title, genre, duration, albumTitle);
        // Asignar artistas
        List<Artist> artists = artistIds.stream()
                .map(artistRepository::findById)
                .filter(Optional::isPresent)
                .map(Optional::get)
                .toList();
        track.setArtists(artists);
        // Actualizar la relación inversa (cada artista agrega este track)
        artists.forEach(artist -> artist.getTracks().add(track));
        return trackRepository.save(track);
    }

    @Override
    public boolean deleteTrack(Long id) {
        return trackRepository.findById(id).map(track -> {
            // Eliminar de la lista de cada artista
            track.getArtists().forEach(artist -> artist.getTracks().remove(track));
            trackRepository.deleteById(id);
            return true;
        }).orElse(false);
    }
}