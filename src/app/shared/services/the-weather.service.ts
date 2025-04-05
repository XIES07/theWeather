import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, of, switchMap } from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class TheWeatherService {
  private geocodingUrl = 'https://geocoding-api.open-meteo.com/v1/search';
  private weatherUrl = 'https://api.open-meteo.com/v1/forecast';

  constructor(private http: HttpClient) {}

  private getCoordinates(city: string): Observable<any> {
    return this.http.get(`${this.geocodingUrl}?name=${city}`).pipe(
      catchError(() => of(null))
    );
  }

 private getWeather(lat: number, lon: number): Observable<any> {
    return this.http
      .get(`${this.weatherUrl}?latitude=${lat}&longitude=${lon}&current_weather=true`)
      .pipe(
        catchError(() => of(null))
      );
  }

  public getCityWeather(city: string): Observable<any> {
    return this.getCoordinates(city).pipe(
      switchMap((coords) => {
        if (coords?.results?.length > 0) {
          const { latitude, longitude } = coords.results[0];
          return this.getWeather(latitude, longitude);
        }
        return of(null);
      })
    );
  }

  public searchCities(query: string): Observable<any> {
    return this.http.get(this.geocodingUrl, {
      params: {
        name: query,
        count: '10',
        language: 'es',
        format: 'json',
      },
    });
  }

}