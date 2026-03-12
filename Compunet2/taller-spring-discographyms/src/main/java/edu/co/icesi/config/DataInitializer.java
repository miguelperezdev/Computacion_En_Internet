package edu.co.icesi.config;

import edu.co.icesi.model.Artist;
import edu.co.icesi.model.Track;
import edu.co.icesi.service.ArtistService;
import edu.co.icesi.service.TrackService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import jakarta.annotation.PostConstruct;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

@Component
public class DataInitializer {
    @Autowired
    private ArtistService artistService;
    @Autowired
    private TrackService trackService;

    private static final String[] FIRST_NAMES = {"The", "Los", "Die", "Les", "El", "La", "Mano", "Son"};
    private static final String[] LAST_NAMES = {"Beatles", "Stones", "Migos", "Flamingos", "Vampiros", "Lobos", "Gatos", "Abejorros"};
    private static final String[] NATIONALITIES = {"USA", "UK", "Colombia", "México", "Francia", "Alemania", "Brasil", "Argentina"};
    private static final String[] GENRES = {"Rock", "Pop", "Jazz", "Clásica", "Electrónica", "Reggaetón", "Salsa", "Metal"};
    private static final String[] ALBUM_PREFIX = {"Best of", "Greatest Hits", "The Album", "Vol. 1", "Live", "Remix"};

    @PostConstruct
    public void init() {
        // Crear 10 artistas
        List<Long> artistIds = new ArrayList<>();
        for (int i = 1; i <= 10; i++) {
            String name = FIRST_NAMES[new Random().nextInt(FIRST_NAMES.length)] + " " +
                    LAST_NAMES[new Random().nextInt(LAST_NAMES.length)];
            String nationality = NATIONALITIES[new Random().nextInt(NATIONALITIES.length)];
            Artist artist = artistService.createArtist(name, nationality);
            artistIds.add(artist.getId());
        }

        // Crear 50 tracks, asignando cada uno a 1 o 2 artistas aleatorios
        for (int i = 1; i <= 50; i++) {
            String title = "Track " + i;
            String genre = GENRES[new Random().nextInt(GENRES.length)];
            int duration = 120 + new Random().nextInt(240); // 2-6 minutos
            String album = ALBUM_PREFIX[new Random().nextInt(ALBUM_PREFIX.length)] + " " + (i % 5 + 1);
            // Seleccionar entre 1 y 3 artistas al azar
            int numArtists = 1 + new Random().nextInt(3);
            List<Long> selectedArtistIds = new ArrayList<>();
            for (int j = 0; j < numArtists; j++) {
                Long id = artistIds.get(new Random().nextInt(artistIds.size()));
                if (!selectedArtistIds.contains(id)) {
                    selectedArtistIds.add(id);
                }
            }
            trackService.createTrack(title, genre, duration, album, selectedArtistIds);
        }
    }
}