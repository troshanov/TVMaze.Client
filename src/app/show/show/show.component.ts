import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { IShow } from '../../infrastructure/interfaces/show';
import { ShowsService } from '../../infrastructure/services/shows-service';
import { ISearchResult } from '../../infrastructure/interfaces/search-result';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrl: './show.component.css'
})
export class ShowComponent {

  isLoading: boolean = true;

  sortBy = 'id';
  sortOrder = 'asc';

  searchText: string = '';
  searchSubject: Subject<string> = new Subject<string>();

  allShows: number = 0;
  pagination: number = 1;
  itemsPerPage: number = 25;
  displayedColumns: string[] = ['id', 'name'];
  
  shows: IShow[];

  constructor(
    private showsService: ShowsService,
    private router: Router){

      this.searchSubject
      .pipe(debounceTime(1000), distinctUntilChanged())
      .subscribe({
        next: searchText => {
          if (!searchText || searchText.trim() === '') {
            this.pagination = 1;
            this.fetchData();
          }
          else{
            this.pagination = 1;
            this.search(searchText, this.pagination);
          }
        },
        error: error => { router.navigate(['/error']);}
      });
  }

  ngOnInit(): void {
    this.fetchData();
  }

  onRowClick(showId: number){
    this.router.navigateByUrl(`/cast?showId=${showId}`);
  }

  //Pagination
  renderPage(event: any) {
    this.pagination  = event;

    if(this.searchText !== ''){
      this.search(this.searchText, this.pagination)
    }
    else{
      this.fetchData();
    }
  }

  fetchData(){
    this.isLoading = true;
    this.showsService.getShows(this.itemsPerPage, this.pagination )
    .subscribe({
      next: (data) => {
        this.shows = (data as ISearchResult).shows;
        this.allShows = (data as ISearchResult).totalCount;
        this.isLoading = false;
      },
      error: error => { this.router.navigate(['/error']);}
    });
  }

  //Search
  search(searchValue: string ,page: number = 1): void {
    
    this.isLoading = true;
    this.showsService.search(this.searchText, this.itemsPerPage, page)
    .subscribe({
      next: data => {
        this.shows = (data as ISearchResult).shows;
        this.allShows =(data as ISearchResult).totalCount;
        this.isLoading = false;
      },
      error: error => { this.router.navigate(['/error']);}
    });
  }
  
  onKeyUp(event: KeyboardEvent){
    console.log(event.key);
    if(event.key !== ' '){
      this.searchSubject.next(this.searchText);
    }
  }

  //Sorting
  sortData() {
    this.shows.sort((a, b) => {
      const order = this.sortOrder === 'asc' ? 1 : -1;
      if(this.sortBy == 'id'){
        return order * (a.id - b.id);
      }
      return order * (a.name.localeCompare(b.name));
    });
  }

  onColumnHeaderClick(column: string) {
    if (this.sortBy === column) {
      this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortBy = column;
      this.sortOrder = 'asc';
    }

    this.sortData();
  }
}
