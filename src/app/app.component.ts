import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, Observable } from 'rxjs';
import { takeUntil, map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  private unsubscribe$ = new Subject<void>();

  countries = [
    {
      name: 'India',
      cities: ['Delhi', 'Mumbai', 'Bengaluru', 'Donimalai', 'Bellary'],
    },
    {
      name: 'United Kingdom',
      cities: ['London', 'Warwick', 'Birmingham', 'manchester'],
    },
    {
      name: 'United States',
      cities: ['New York', 'Chicago', 'Washington'],
    },
    {
      name: 'Australia',
      cities: ['Sydney', 'Adelaide', 'Melbourne'],
    },
  ];

  countryControl: FormControl;
  cityControl: FormControl;

  cities$: Observable<string>;

  constructor(private router: Router) {}

  ngOnInit() {
    this.cityControl = new FormControl('');
    this.cityControl.valueChanges
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((value) => {
        this.router.navigate([value]);
      });

    this.countryControl = new FormControl('');

    this.cities$ = this.countryControl.valueChanges.pipe(
      map((country) => country.cities)
    );
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
