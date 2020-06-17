package peca.org.demo.model;

import lombok.*;
import org.springframework.stereotype.Component;

import java.util.Comparator;


@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
@Component
public class LocationStats{

    private String position;
    private String country;

    private String totalCases;
    private String newCases;
    private String totalDeaths;
    private String newDeaths;

    private String totalRecovered;
    private String activeCases;
    private String seriousCritical;

    private String casesPerMillion;
    private String deathsPerMillion;

    private String totalTests;
    private String testsPerMillion;

    private String population;


}
