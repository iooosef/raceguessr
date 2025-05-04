package tip.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import tip.repository.CountryRepository;

@RestController
@RequestMapping("/reference-data")
public class ReferenceData {
    @Autowired
    private CountryRepository countryRepository;

    @RequestMapping(value = "/countries", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getCountries() {
        return ResponseEntity.ok(countryRepository.findAll());
    }
}
