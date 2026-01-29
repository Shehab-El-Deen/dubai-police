import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface Team {
  id: string;
  name: string;
  directory: string;
  createdBy: string;
  creationDate: string;
  status: boolean;
}

@Component({
  selector: 'app-admin-teams',
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-teams.html',
  styleUrl: './admin-teams.css',
})
export class AdminTeams implements OnInit {
  @Input() teams: Team[] = [];
  @Output() addTeamClick = new EventEmitter<void>();
  @Output() statusChanged = new EventEmitter<Team>();
  @Output() teamDeleted = new EventEmitter<string>();

  searchQuery = '';

  displayedTeams: Team[] = [];
  currentPage = 1;
  pageSize = 10;
  totalPages = 1;

  ngOnInit() {
    this.filterAndPaginate();
  }

  onSearch(query: string) {
    this.searchQuery = query;
    this.currentPage = 1;
    this.filterAndPaginate();
  }

  filterAndPaginate() {
    let filtered = this.teams;

    if (this.searchQuery) {
      filtered = filtered.filter(
        (t) =>
          t.id.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          t.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }

    this.totalPages = Math.ceil(filtered.length / this.pageSize);
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.displayedTeams = filtered.slice(start, end);
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.filterAndPaginate();
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.filterAndPaginate();
    }
  }

  toggleStatus(team: Team) {
    this.statusChanged.emit(team);
  }

  editTeam(team: Team) {
    console.log('Edit team:', team);
  }

  deleteTeam(team: Team) {
    this.teamDeleted.emit(team.id);
  }

  onAddTeam() {
    this.addTeamClick.emit();
  }
}
