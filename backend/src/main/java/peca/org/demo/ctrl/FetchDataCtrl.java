package peca.org.demo.ctrl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import peca.org.demo.model.LocationStats;
import peca.org.demo.service.CoronaVirusDataService;

import java.util.Collections;
import java.util.List;

@RestController
public class FetchDataCtrl {

    @Autowired
    private LocationStats ls;

    @GetMapping(path = "/")
    public List<LocationStats> nearSerbia(){
        Collections.sort(CoronaVirusDataService.allStats);
        return CoronaVirusDataService.allStats;
    }

    @GetMapping(path = "/reverse")
    public List<LocationStats> ReverseNearSerbia(){

        Collections.reverse(CoronaVirusDataService.allStats);
        return CoronaVirusDataService.allStats;
    }

    @GetMapping(path = "/all")
    public String alltest(){
        return LocationStats.allString();
    }

}
