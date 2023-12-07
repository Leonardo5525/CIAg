package br.org.ciag.fakestore.domain;

import static br.org.ciag.fakestore.domain.CountryTestSamples.*;
import static br.org.ciag.fakestore.domain.DepartmentTestSamples.*;
import static br.org.ciag.fakestore.domain.LocationTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import br.org.ciag.fakestore.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class LocationTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Location.class);
        Location location1 = getLocationSample1();
        Location location2 = new Location();
        assertThat(location1).isNotEqualTo(location2);

        location2.setId(location1.getId());
        assertThat(location1).isEqualTo(location2);

        location2 = getLocationSample2();
        assertThat(location1).isNotEqualTo(location2);
    }

    @Test
    void countryTest() throws Exception {
        Location location = getLocationRandomSampleGenerator();
        Country countryBack = getCountryRandomSampleGenerator();

        location.setCountry(countryBack);
        assertThat(location.getCountry()).isEqualTo(countryBack);

        location.country(null);
        assertThat(location.getCountry()).isNull();
    }

    @Test
    void departmentTest() throws Exception {
        Location location = getLocationRandomSampleGenerator();
        Department departmentBack = getDepartmentRandomSampleGenerator();

        location.setDepartment(departmentBack);
        assertThat(location.getDepartment()).isEqualTo(departmentBack);
        assertThat(departmentBack.getLocation()).isEqualTo(location);

        location.department(null);
        assertThat(location.getDepartment()).isNull();
        assertThat(departmentBack.getLocation()).isNull();
    }
}
