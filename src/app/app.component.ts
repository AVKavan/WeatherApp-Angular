import { Component, OnInit } from '@angular/core';
import { WeatherData } from './models/weather.model';
import { WeatherService } from './services/weather.service';
import { DatePipe } from '@angular/common';
import { Time } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

 constructor(private weatherservice: WeatherService){}
   
    cityName: string = 'Mysore';
    weatherData?: WeatherData;
    time?: string[];
    locationHour: number = 6;
    
    
  ngOnInit(): void {
     this.getWeather(this.cityName);
     this.cityName = '';
     
   
  }

  searchCity(){
    this.getWeather(this.cityName);
    this.cityName = '';
  }

  private getWeather(cityName: string)
  {
    this.weatherservice.getWeatherData(cityName)
    .subscribe( {
      next: (response) => {
        this.weatherData = response;
        // const unixTime = 1665817200;
        // const date = new Date(unixTime*1000);
        // console.log(date.getUTCHours());

        var date = this.weatherData.location.localtime.split(" ");
        this.time = date[1].split(":");
        this.locationHour = Number(this.time[0]);
        console.log(this.locationHour);
        
      }
  });
  }
 
}
