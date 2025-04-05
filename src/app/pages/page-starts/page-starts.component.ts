import { TheWeatherService } from './../../shared/services/the-weather.service';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SearchInputComponent } from "../../shared/components/serch-input/search-input.component";

@Component({
  selector: 'app-page-starts',
  standalone: true,
  templateUrl: './page-starts.component.html',
  styleUrl: './page-starts.component.scss',
  imports: [FormsModule, ReactiveFormsModule, CommonModule, SearchInputComponent],
  providers: [TheWeatherService],
})
export class PageStartsComponent {
  citieSelected = '';
  weatherData: any = null;
  loading = false;
  error = '';
  cities: any[] = [];

  constructor(private weatherService: TheWeatherService) {}

  searchWeather() {
    this.loading = true;
    this.error = '';

    this.weatherService.getCityWeather(this.citieSelected).subscribe({
      next: (data) => {
        if (data) {
          this.weatherData = data;
        } else {
          this.error = 'Ciudad no encontrada';
        }
      },
      error: () => {
        this.error = 'Error en la solicitud';
      },
      complete: () => {
        this.loading = false;
      },
    });
  }

  getWeatherIcon(code: number): string {
    const icons: { [key: number]: string } = {
      0: 'bi bi-sun',
      1: 'bi bi-cloud-sun',
      2: 'bi bi-cloud', 
      3: 'bi bi-clouds', 
      45: 'bi bi-cloud-fog', 
      51: 'bi bi-cloud-drizzle', 
      61: 'bi bi-cloud-rain', 
      71: 'bi bi-snow', 
      80: 'bi bi-cloud-lightning-rain', 
      95: 'bi bi-cloud-lightning', 
    };
    return icons[code] || 'bi bi-question-circle'; 
  }

  getWeatherDescription(code: number): string {
    const descriptions: { [key: number]: string } = {
      0: 'Cielo claro',
      1: 'Parcialmente nublado',
      2: 'Mayormente nublado',
      3: 'Nublado',
      45: 'Niebla',
      48: 'Niebla con depósito',
      51: 'Llovizna ligera',
      53: 'Llovizna moderada',
      55: 'Llovizna intensa',
      56: 'Llovizna helada ligera',
      57: 'Llovizna helada intensa',
      61: 'Lluvia ligera',
      63: 'Lluvia moderada',
      65: 'Lluvia intensa',
      66: 'Lluvia helada ligera',
      67: 'Lluvia helada intensa',
      71: 'Nieve ligera',
      73: 'Nieve moderada',
      75: 'Nieve intensa',
      77: 'Granizo',
      80: 'Chubascos ligeros',
      81: 'Chubascos moderados',
      82: 'Chubascos intensos',
      85: 'Chubascos de nieve ligeros',
      86: 'Chubascos de nieve intensos',
      95: 'Tormenta eléctrica',
      96: 'Tormenta con granizo ligero',
      99: 'Tormenta con granizo intenso'
    };

    return descriptions[code] || 'Clima desconocido';
  }

  getTemperatureColor(temp: number): string {
    if (temp == null) return '#333';

    if (temp <= 0) return '#2196F3';
    if (temp < 10) return '#00BCD4';
    if (temp < 20) return '#4CAF50';
    if (temp < 25) return '#FFEB3B';
    if (temp < 30) return '#FF9800';
    return '#FF5722';
  }

  OnCitySelected(item: any) {
    this.citieSelected = item?.name || '';
    this.searchWeather();
  
  }

onFilterChange(searchTerm: string): void {
  this.weatherService.searchCities(searchTerm).subscribe({
    next: (data) => {
      if (data?.results) {
        this.cities = data.results;
      } else {
        this.cities = [];
      }
    },
    error: () => {
      this.error = 'Error al buscar ciudades';
      this.cities = [];
    },
  });
}

getYear(): number {
  return new Date().getFullYear();
}

}