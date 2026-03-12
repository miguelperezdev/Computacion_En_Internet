package edu.co.icesi.repository.impl;

import edu.co.icesi.model.Artist;
import edu.co.icesi.repository.ArtistRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicLong;
import java.util.stream.Collectors;

@Repository
public class ArtistRepositoryImpl implements ArtistRepository {
    private final Map<Long, Artist> storage = new ConcurrentHashMap<>();
    private final AtomicLong idGenerator = new AtomicLong(1);

    @Override
    public List<Artist> findAll() {
        return List.copyOf(storage.values());
    }

    @Override
    public Artist save(Artist artist) {
        if (artist.getId() == null) {
            artist.setId(idGenerator.getAndIncrement());
        }
        storage.put(artist.getId(), artist);
        return artist;
    }

    @Override
    public Optional<Artist> findById(Long id) {
        return Optional.ofNullable(storage.get(id));
    }

    @Override
    public Optional<Artist> findByName(String name) {
        return storage.values().stream()
                .filter(a -> a.getName().equalsIgnoreCase(name))
                .findFirst();
    }

    @Override
    public void deleteById(Long id) {
        storage.remove(id);
    }
}