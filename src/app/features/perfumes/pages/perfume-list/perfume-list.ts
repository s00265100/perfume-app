import { Component, inject, OnInit } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { PerfumeCard } from '../perfume-card/perfume-card';
import { Perfume } from '../../models/perfume.model';
import { PerfumeService } from '../../services/perfume.service';

@Component({
  selector: 'app-perfume-list',
  imports: [AsyncPipe, PerfumeCard],
  templateUrl: './perfume-list.html',
  styleUrl: './perfume-list.css'
})
export class PerfumeList implements OnInit {

  private perfumeService = inject(PerfumeService);

  perfumes$!: Observable<Perfume[]>;

  ngOnInit(): void {
    this.perfumes$ = this.perfumeService.getPerfumes();
  }
}