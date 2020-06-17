package peca.org.demo.ctrl;

import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import peca.org.demo.model.LocationStats;
import peca.org.demo.service.CoronaVirusDataService;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@NoArgsConstructor
public class FetchDataCtrl {

    @Autowired
    CoronaVirusDataService service;


    @GetMapping(path = "/cases")
    public List<LocationStats> allByCases(){
        try {
            return service.fetchVirusData();
        } catch (IOException e) {
            e.printStackTrace();
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        return null;
    }

    @GetMapping(path = "/cases10")
    public List<LocationStats> allByCases10(){
        try {
            return service.fetchVirusData().subList(0, 15);
        } catch (IOException e) {
            e.printStackTrace();
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        return null;
    }

}
