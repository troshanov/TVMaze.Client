import { Component, ViewChild } from '@angular/core';
import { IActor } from '../../infrastructure/interfaces/actor';
import { ShowsService } from '../../infrastructure/services/shows-service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-cast-details',
  templateUrl: './cast-details.component.html',
  styleUrl: './cast-details.component.css'
})
export class CastDetailsComponent {
  isLoading = true;
  displayedColumns: string[] = ['name'];
  cast: IActor[] = [];
  dataSource = new MatTableDataSource<IActor>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  
  constructor(
    private showsService:ShowsService,
    private route: ActivatedRoute,
    private router: Router){
    }

  ngAfterViewInit() {
    this.route.queryParams.subscribe(params => {
      const showId = params['showId'];
      this.showsService.getShowCast(showId)
      .subscribe({
      next: (data) => {
        this.dataSource.data = data as IActor[];
        this.dataSource.paginator = this.paginator;
        this.isLoading = false;
      },
      error: (err) => { this.router.navigate(['/error']);}});
    });
  }
}
