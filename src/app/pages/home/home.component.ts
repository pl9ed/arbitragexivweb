import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ComparisonService } from 'src/app/services/comparison.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  testString = "My test string!"

  constructor(
    private router: Router,
    private comparison: ComparisonService
    ) { }

  ngOnInit(): void {
  }

}
