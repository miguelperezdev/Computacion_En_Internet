package edu.co.icesi.service.impl;

import edu.co.icesi.model.Artist;
import edu.co.icesi.repository.ArtistRepository;
import edu.co.icesi.service.ArtistService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class ArtistServiceImpl implements ArtistService {
    @Autowired
    private ArtistRepository artistRepository;

    @Override
    public List<Artist> getAllArtists() {
        return artistRepository.findAll();
    }

    @Override
    public Artist createArtist(String name, String nationality) {
        Artist artist = new Artist(null, name, nationality);
        return artistRepository.save(artist);
    }

    @Override
    public Optional<Artist> getArtistWithTracks(String name) {
        return artistRepository.findByName(name);
    }

    @Override
    public boolean deleteArtist(Long id) {
        return artistRepository.findById(id).map(artist -> {
            artistRepository.deleteById(id);
            return true;
        }).orElse(false);
    }
}