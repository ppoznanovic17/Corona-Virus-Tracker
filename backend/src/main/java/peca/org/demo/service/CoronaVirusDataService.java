package peca.org.demo.service;

import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVRecord;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import peca.org.demo.ctrl.FetchDataCtrl;
import peca.org.demo.model.LocationStats;

import javax.print.Doc;
import java.io.IOException;
import java.io.StringReader;
import java.net.URI;
import java.net.http.HttpClient ;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.ArrayList;
import java.util.List;

@Service
public class CoronaVirusDataService {


    private static String liveUrl = "https://www.worldometers.info/coronavirus/";
    @Scheduled(fixedDelay = 60000, initialDelay = 0)
    public List<LocationStats> fetchVirusData() throws IOException, InterruptedException {

        List<LocationStats> locationStatsList = new ArrayList<>();

        Document doc = Jsoup.connect(liveUrl).get();


        Elements container = doc.getElementsByClass("container");

        Document containerDoc = Jsoup.parse(container.html());

        Elements rows = containerDoc.getElementsByClass("row");

        Document rowDoc = Jsoup.parse(rows.get(2).html());

        Elements row2 = rowDoc.getElementsByTag("div");

        Document row2Doc = Jsoup.parse(row2.get(0).html());


        Elements tabContent = row2Doc.getElementsByClass("tab-content");

        Document tabContentDoc = Jsoup.parse(tabContent.html());

        Elements tabPane = tabContentDoc.getElementsByClass("tab-pane");

        Document tabPaneDoc = Jsoup.parse(tabPane.get(0).html());

        Elements tableDiv = tabPaneDoc.getElementsByTag("div");

        Document tableDivDoc = Jsoup.parse(tableDiv.html());

        Elements table = tableDivDoc.getElementsByTag("table");
        Elements tableRows = table.select("tr");

        for(int i=0; i<tableRows.size(); i++){
            Elements col = tableRows.get(i).select("td");
            if(i >= 9 && i<=222){
                String position = emptyToString(col.get(0).text());
                String country = emptyToString(col.get(1).text());
                String totalCases = emptyToString(col.get(2).text());
                String newCases = emptyToString(col.get(3).text());
                String totalDeaths = emptyToString(col.get(4).text());
                String newDeaths = emptyToString(col.get(5).text());
                String totalRecovered = emptyToString(col.get(6).text());
                String activeCases = emptyToString(col.get(8).text());
                String seriousCritical = emptyToString(col.get(9).text());
                String casesPerMillion = emptyToString(col.get(10).text());
                String deathsPerMillion = emptyToString(col.get(11).text());
                String totalTests = emptyToString(col.get(12).text());
                String testsPerMillion  = emptyToString(col.get(13).text());
                String population  = emptyToString(col.get(14).text());

                LocationStats ls = new LocationStats(position, country,
                        totalCases, newCases, totalDeaths, newDeaths,
                        totalRecovered,activeCases, seriousCritical, casesPerMillion, deathsPerMillion,
                        totalTests, testsPerMillion, population);
                //System.out.println(i + " " +ls);
                locationStatsList.add(ls);

                //System.out.println("---------------------------------------------------------------------------------------------------");
            }
        }

        //System.out.println(locationStatsList.size());

        return locationStatsList;
    }


    private static String emptyToString(String str){
        if(str.equals("") || str.equals("N/A")){
            return "/";
        }
        return str;
    }


}
