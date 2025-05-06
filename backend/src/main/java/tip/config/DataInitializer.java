package tip.config;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.jdbc.core.JdbcTemplate;
import tip.model.Gender;
import tip.model.User;
import tip.repository.CountryAdjacentRepository;
import tip.repository.CountryRepository;
import tip.repository.UserRepository;
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

    private final UserRepository userRepository;
    private final CountryRepository countryRepository;
    private final CountryAdjacentRepository countryAdjacentRepository;
    private final BCryptPasswordEncoder passwordEncoder;
    private final JdbcTemplate jdbcTemplate;

    public DataInitializer(UserRepository userRepository,
                           CountryRepository countryRepository,
                           CountryAdjacentRepository countryAdjacentRepository,
                           PasswordEncoder passwordEncoder,
                           JdbcTemplate jdbcTemplate) {
        this.userRepository = userRepository;
        this.countryRepository = countryRepository;
        this.countryAdjacentRepository = countryAdjacentRepository;
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