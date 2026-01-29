import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminReviewSidebar } from '../admin-review-sidebar/admin-review-sidebar';
import { AdminTeams } from '../admin-teams/admin-teams';
import { AdminAddTeam } from '../admin-add-team/admin-add-team';

export interface Team {
  id: string;
  name: string;
  directory: string;
  createdBy: string;
  creationDate: string;
  status: boolean;
}

@Component({
  selector: 'app-admin-overview',
  imports: [CommonModule, AdminReviewSidebar, AdminTeams, AdminAddTeam],
  templateUrl: './admin-overview.html',
  styleUrl: './admin-overview.css',
})
export class AdminOverview implements OnInit {
  currentView: string = 'overview';
  teams: Team[] = [
    {
      id: '#1234',
      name: 'Sales',
      directory: 'Dash / C',
      createdBy: 'Hassan',
      creationDate: '04/1/26',
      status: true,
    },
    {
      id: '#1235',
      name: 'IT',
      directory: 'Boards.sales /D',
      createdBy: 'Khaled.d',
      creationDate: '2/1/26',
      status: true,
    },
    {
      id: '#1236',
      name: 'Analysis',
      directory: 'Dash / C',
      createdBy: 'Ali',
      creationDate: '2/1/26',
      status: false,
    },
    {
      id: '#1237',
      name: 'analytics',
      directory: 'Dash / C',
      createdBy: 'Ali',
      creationDate: '2/1/26',
      status: false,
    },
    {
      id: '#1238',
      name: 'IT',
      directory: 'Boards.sales /D',
      createdBy: 'Khaled.d',
      creationDate: '2/1/26',
      status: true,
    },
    {
      id: '#1239',
      name: 'IT',
      directory: 'Boards.sales /D',
      createdBy: 'Khaled.d',
      creationDate: '3/1/26',
      status: true,
    },
  ];

  ngOnInit() {
    // Initialize admin dashboard
  }

  onMenuItemSelected(menuItem: string) {
    this.currentView = menuItem;
  }

  onAddTeam() {
    this.currentView = 'add-team';
  }

  onCloseAddTeam() {
    this.currentView = 'overview';
  }

  onTeamAdded(newTeam: any) {
    const team: Team = {
      id: '#' + (Math.max(...this.teams.map(t => parseInt(t.id.substring(1)))) + 1),
      name: newTeam.teamName,
      directory: newTeam.directory,
      createdBy: 'Current User',
      creationDate: new Date().toLocaleDateString('en-GB').replace(/\//g, '/'),
      status: newTeam.teamStatus,
    };
    this.teams.push(team);
    this.currentView = 'overview';
  }

  onTeamStatusChanged(team: Team) {
    team.status = !team.status;
  }

  onTeamDeleted(teamId: string) {
    const index = this.teams.findIndex(t => t.id === teamId);
    if (index > -1) {
      this.teams.splice(index, 1);
    }
  }
}
