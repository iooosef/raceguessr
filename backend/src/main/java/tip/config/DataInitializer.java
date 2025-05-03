package tip.config;
import tip.model.Gender;
import tip.model.User;
import tip.repository.CountryRepository;
import tip.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

/*
 * DataInitializer
 * - to initialize the database with an admin user
 */
@Component
public class DataInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final CountryRepository countryRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    public DataInitializer(UserRepository userRepository, CountryRepository countryRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.countryRepository = countryRepository;
        this.passwordEncoder = (BCryptPasswordEncoder) passwordEncoder;
    }

    @Override
    public void run(String... args) throws Exception {
        // Check if the user table is empty


        if (userRepository.count() == 0) {
            // Create an admin user
            User adminUser = new User();
            adminUser.setEmail("josence22@gmail.com");
            adminUser.setDisplayName("ADMIN");
            adminUser.setPassword(passwordEncoder.encode("admin1234"));
            adminUser.setGender(Gender.OTHERS.toString());
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