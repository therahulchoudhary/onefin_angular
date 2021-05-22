import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';

interface MovieData {
  title: string,
  genres: string,
  description: string,
  uuid: string
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  userData: any;
  moviesData: MovieData[];
  filteredData: any;
  modalVisible: boolean;
  currentItem: MovieData;
  page: number;
  constructor(private router: Router, private ds: DataService) {
    this.userData = localStorage.getItem('userData');
    this.page = 1;
    this.moviesData = [];
    this.modalVisible = false;
    this.currentItem = {
      title: '',
      genres: '',
      description: '',
      uuid: ''
    }
  }

  ngOnInit(): void {
    if (!this.userData) {
      this.router.navigate(['']);
    }
    this.ds.getMovies('/maya/movies/').subscribe(data => {
      this.moviesData = data.results;
      this.filteredData = this.moviesData;
    }, error => {
      console.log(error);
    })
  }

  refresh() {
    this.ds.getMovies('/maya/movies/').subscribe(data => {
      this.moviesData = data.results;
      this.filteredData = this.moviesData;
    }, error => {
      console.log(error);
    })
  }

  searchMovie(event: any) {
    if (event.target.value) {
      this.filteredData = this.moviesData.filter((element: MovieData) => {
        if (element.title.toLowerCase().includes(event.target.value.toLowerCase())) {
          return true;
        }
        return false;
      });
    }
    else {
      this.filteredData = this.moviesData;
    }

  }

  loadMore() {
    this.page = this.page + 1;
    this.ds.getMovies(`/maya/movies/?page=${this.page}`).subscribe(data => {
      this.moviesData = this.moviesData.concat(data.results);
      this.filteredData = this.moviesData;
    }, error => {
      console.log(error);
    })
  }

  showModal(item: MovieData) {
    this.modalVisible = this.modalVisible ? false : true;
    this.currentItem = item;
  }
}
