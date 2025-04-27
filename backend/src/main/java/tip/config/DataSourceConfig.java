package tip.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.jdbc.datasource.DriverManagerDataSource;

import javax.sql.DataSource;
import java.nio.file.Paths;

@Configuration
public class DataSourceConfig {

    @Value("${spring.datasource.driver-class-name}")
    private String driverClassName;

    @Bean
    public DataSource dataSource() {
        // Get the directory of the current working directory (where the app is run from)
        String currentDir = System.getProperty("user.dir");

        // Set the path to the SQLite database file inside the current directory
        String dbPath = Paths.get(currentDir, "raceguessr.db").toString();

        // Construct the SQLite JDBC URL with the database path
        String jdbcUrl = "jdbc:sqlite:" + dbPath;

        // Configure the DataSource with the custom JDBC URL
        DriverManagerDataSource dataSource = new DriverManagerDataSource();
        dataSource.setDriverClassName(driverClassName);
        dataSource.setUrl(jdbcUrl);  // Use dynamically set path

        return dataSource;
    }
}
