package com.cognizant.springlearnapp.service;

import com.cognizant.springlearnapp.model.Country;
import jakarta.annotation.PostConstruct;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class CountryService {

    private List<Country> countryList;

    @PostConstruct
    public void init() {

        countryList = new ArrayList<>();

        Country c1 = new Country();
        c1.setCode("IN");
        c1.setName("India");

        Country c2 = new Country();
        c2.setCode("US");
        c2.setName("United States");

        Country c3 = new Country();
        c3.setCode("DE");
        c3.setName("Germany");

        Country c4 = new Country();
        c4.setCode("JP");
        c4.setName("Japan");

        countryList.add(c1);
        countryList.add(c2);
        countryList.add(c3);
        countryList.add(c4);
    }

    public Country getCountry(String code) {

        return countryList.stream()
                .filter(country -> country.getCode().equalsIgnoreCase(code))
                .findFirst()
                .orElse(null);
    }

}