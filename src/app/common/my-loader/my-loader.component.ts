import { Component, OnInit } from '@angular/core';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-my-loader',
  templateUrl: './my-loader.component.html',
  styleUrls: ['./my-loader.component.css']
})
export class MyLoaderComponent implements OnInit {
  loading: boolean;
  constructor(private loaderService: LoaderService) {
    this.loading = false;
    this.loaderService.isLoading.subscribe((v) => {
      this.loading = v;
    });
  }

  ngOnInit(): void {
  }

}
