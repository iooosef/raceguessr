package tip.config;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.jdbc.core.JdbcTemplate;
import tip.model.Gender;
import tip.model.User;
import tip.repository.*;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.nio.file.Files;

/*
 * DataInitializer
 * - to initialize the database with an admin user
 */
@Component
public class DataInitializer implements CommandLineRunner {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private CountryRepository countryRepository;
    @Autowired
    private CountryAdjacentRepository countryAdjacentRepository;
    @Autowired
    private TagRepository tagRepository;
    @Autowired
    private SubjectRepository subjectRepository;
    @Autowired
    private SubjectCountryRepository subjectCountryRepository;
    private BCryptPasswordEncoder passwordEncoder;
    private JdbcTemplate jdbcTemplate;

    public DataInitializer(
                           PasswordEncoder passwordEncoder,
                           JdbcTemplate jdbcTemplate) {
        this.passwordEncoder = (BCryptPasswordEncoder) passwordEncoder;
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public void run(String... args) throws Exception {
        // Check if the user table is empty
        if (countryRepository.count() == 0) {
            Resource resource = new ClassPathResource("insert-countries.sql");
            String sql = new String(Files.readAllBytes(resource.getFile().toPath()));
            jdbcTemplate.execute(sql);
            System.out.println("Inserted countries");
        }

        if (countryAdjacentRepository.count() == 0) {
            Resource resource = new ClassPathResource("country_adjacent.sql");
            String sql = new String(Files.readAllBytes(resource.getFile().toPath()));
            jdbcTemplate.execute(sql);
            System.out.println("Inserted country adjacents");
        }

        if (tagRepository.count() == 0) {
            Resource resource = new ClassPathResource("insert-tags.sql");
            String sql = new String(Files.readAllBytes(resource.getFile().toPath()));
            jdbcTemplate.execute(sql);
            System.out.println("Inserted tags");
        }

        if (subjectRepository.count() == 0) {
            Resource resource = new ClassPathResource("insert-subjects.sql");
            String sql = new String(Files.readAllBytes(resource.getFile().toPath()));
            jdbcTemplate.execute(sql);
            System.out.println("Inserted subjects");
        }

        if (subjectCountryRepository.count() == 0) {
            Resource resource = new ClassPathResource("insert-subject-country.sql");
            String sql = new String(Files.readAllBytes(resource.getFile().toPath()));
            jdbcTemplate.execute(sql);
            System.out.println("Inserted subjects' country/ies");
        }

        if (userRepository.count() == 0) {
            // Create an admin user
            User adminUser = new User();
            adminUser.setEmail("josence22@gmail.com");
            adminUser.setDisplayName("ADMIN");
            adminUser.setPassword(passwordEncoder.encode("admin1234"));
            adminUser.setGender(Gender.OMIT.toString());
            try {
                adminUser.setCountry(countryRepository.findByName("Philippines").get());
            } catch (Exception e) {
                throw new RuntimeException("No country with Philippines yet.");
            }
            adminUser.setRole("ADMIN");

            // Save user to the database
            userRepository.save(adminUser);
            System.out.println("Admin user initialized");
        }
    }
}