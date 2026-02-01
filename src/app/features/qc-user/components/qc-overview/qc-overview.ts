import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StatsCards } from '../stats-cards/stats-cards';
import { TabNavigation } from '../tab-navigation/tab-navigation';
import { RequestTable, TableRequest } from '../request-table/request-table';
import { ReviewSidebar } from '../review-sidebar/review-sidebar';
import { RequestDetailModal } from '../request-detail-modal/request-detail-modal';
import { RequestsPage } from '../requests-page/requests-page';
import { RequestDetailsPage } from '../request-details-page/request-details-page';
import { CanComponentDeactivate } from '../../../../core/guards/can-deactivate.guard';
import { HostListener } from '@angular/core';

@Component({
  selector: 'app-qc-overview',
  imports: [
    CommonModule,
    FormsModule,
    StatsCards,
    TabNavigation,
    RequestTable,
    ReviewSidebar,
    RequestDetailModal,
    RequestsPage,
    RequestDetailsPage,
  ],
  templateUrl: './qc-overview.html',
  styleUrl: './qc-overview.css',
})
export class QcOverview implements OnInit, CanComponentDeactivate {
  searchQuery = '';
  selectedTab = 'all-requests';
  lastRefresh = new Date();
  currentView: string = 'overview';
  selectedRequest: TableRequest | null = null;
  filteredRequests: TableRequest[] = [];
  displayedRequests: TableRequest[] = [];
  currentPage = 1;
  pageSize = 10;
  totalPages = 1;
  private detailsPageHasChanges = false;
  private detailsFormSubmitted = false;

  highPriorityCount = 0;
  needReviewCount = 0;
  topPriorityCount = 0;

  requests: TableRequest[] = [
    {
      id: 'DP-QC-2024-0018',
      name: 'Traffic Accident Hotspots',
      type: 'Executive / Strategic',
      owner: 'Traffic Dept',
      date: '04/1/26',
      status: 'Validation Failed',
      priority: 'High',
    },
    {
      id: 'CP-QC-2024-0026',
      name: 'Crime Trend Analysis Q4',
      type: 'Quality',
      owner: 'Crime Analytics',
      date: '2/1/26',
      status: 'Under Review',
      priority: 'Medium',
    },
    {
      id: 'CP-QC-2024-0026',
      name: 'Crime Trend Analysis Q5',
      type: 'Quality',
      owner: 'Crime Analytics',
      date: '2/1/26',
      status: 'Need Review',
      priority: 'Medium',
    },
    {
      id: 'IT-QC-2024-0575',
      name: 'Case Processing SLA',
      type: 'Compliance',
      owner: 'Quality Office',
      date: '2/1/26',
      status: 'Rejected',
      priority: 'High',
    },
    {
      id: 'BE-QC-2024-0028',
      name: 'Predictive Patrol Model',
      type: 'AI',
      owner: 'Strategy Unit',
      date: '22/12/25',
      status: 'Rejected',
      priority: 'Medium',
    },
    {
      id: 'DP-QC-2024-0019',
      name: 'Traffic Accident Hotspots',
      type: 'Analytical',
      owner: 'Traffic Dept',
      date: '2/12/25',
      status: 'Rejected',
      priority: 'Low',
    },
    {
      id: 'DP-QC-2024-0020',
      name: 'Traffic Accident Hotspots',
      type: 'Executive / Strategic',
      owner: 'Traffic Dept',
      date: '2/12/25',
      status: 'Approved',
      priority: 'Low',
    },
    {
      id: 'DP-QC-2024-0021',
      name: 'Traffic Accident Hotspots',
      type: 'Executive / Strategic',
      owner: 'Traffic Dept',
      date: '04/11/25',
      status: 'Approved',
      priority: 'Low',
    },
  ];

  ngOnInit() {
    this.updateRefreshTime();
    this.calculateStats();
    this.filterAndPaginate();
  }

  updateRefreshTime() {
    this.lastRefresh = new Date();
  }

  onMenuItemSelected(menuItem: string) {
  // Check if we can leave the details view
  if (this.currentView === 'details' && this.detailsPageHasChanges && !this.detailsFormSubmitted) {
    const confirmed = confirm('You have unsaved changes. Do you really want to leave?');
    if (!confirmed) {
      return; // Don't change view
    }
    this.detailsFormSubmitted = true; // Mark as submitted if user confirms
  }
  
  // Reset state when changing views
  this.detailsPageHasChanges = false;
  this.detailsFormSubmitted = false;
  
  this.currentView = menuItem;
}

  onRowClick(request: TableRequest) {
  // Check if we can leave the details view
  if (this.currentView === 'details' && this.detailsPageHasChanges && !this.detailsFormSubmitted) {
    const confirmed = confirm('You have unsaved changes. Do you really want to leave?');
    if (!confirmed) {
      return; // Don't change view
    }
  }
  
  this.detailsFormSubmitted = false; // Reset for new details page
  this.selectedRequest = request;
  this.currentView = 'details';
}

  onViewRequest(request: any) {
    this.selectedRequest = request;
  }

  onModalExpand() {
    if (this.selectedRequest) {
      this.currentView = 'details';
    }
  }

  closeDetailsPage() {
    this.detailsFormSubmitted = true;
    this.currentView = 'overview';
    this.selectedRequest = null;
  }

  calculateStats() {
    this.highPriorityCount = this.requests.filter((r) => r.priority === 'High').length;
    this.needReviewCount = this.requests.filter((r) => r.status === 'Under Review').length;
    this.topPriorityCount = this.requests.filter(
      (r) => r.priority === 'High' && r.status === 'Under Review',
    ).length;
  }

  onSearch(query: string) {
    this.searchQuery = query;
    this.currentPage = 1;
    this.filterAndPaginate();
  }

  onTabChange(tab: string) {
    this.selectedTab = tab;
    this.currentPage = 1;
    this.filterAndPaginate();
  }

  filterAndPaginate() {
    let filtered = this.requests;

    // Filter by tab
    if (this.selectedTab !== 'all-requests') {
      const statusMap: { [key: string]: string } = {
        'under-review': 'Under Review',
        approved: 'Approved',
        rejected: 'Rejected',
        'need-review': 'Need Review',
        'validation-failed': 'Validation Failed',
      };
      filtered = filtered.filter((r) => r.status === statusMap[this.selectedTab]);
    }

    // Filter by search
    if (this.searchQuery) {
      filtered = filtered.filter(
        (r) =>
          r.id.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          r.name.toLowerCase().includes(this.searchQuery.toLowerCase()),
      );
    }

    this.filteredRequests = filtered;
    this.totalPages = Math.ceil(filtered.length / this.pageSize);
    this.updateDisplayedRequests();
  }

  updateDisplayedRequests() {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.displayedRequests = this.filteredRequests.slice(start, end);
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updateDisplayedRequests();
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updateDisplayedRequests();
    }
  }

  onDetailsPageChanges(hasChanges: boolean) {
    this.detailsPageHasChanges = hasChanges;
  }

  canDeactivate(): boolean {
    if (
      this.currentView === 'details' &&
      this.detailsPageHasChanges &&
      !this.detailsFormSubmitted
    ) {
      return confirm('You have unsaved changes. Do you really want to leave?');
    }
    return true;
  }

  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any): void {
    if (!this.canDeactivate()) {
      $event.returnValue = true;
    }
  }
}
