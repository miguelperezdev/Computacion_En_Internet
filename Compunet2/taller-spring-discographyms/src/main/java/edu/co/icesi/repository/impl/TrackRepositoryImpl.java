package edu.co.icesi.repository.impl;

import edu.co.icesi.model.Track;
import edu.co.icesi.repository.TrackRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicLong;

@Repository
public class TrackRepositoryImpl implements TrackRepository {
    private final Map<Long, Track> storage = new ConcurrentHashMap<>();
    private final AtomicLong idGenerator = new AtomicLong(1);

    @Override
    public List<Track> findAll() {
        return List.copyOf(storage.values());
    }

    @Override
    public Track save(Track track) {
        if (track.getId() == null) {
            track.setId(idGenerator.getAndIncrement());
        }
        storage.put(track.getId(), track);
        return track;
    }

    @Override
    public Optional<Track> findById(Long id) {
        return Optional.ofNullable(storage.get(id));
    }

    @Override
    public void deleteById(Long id) {
        storage.remove(id);
    }
}