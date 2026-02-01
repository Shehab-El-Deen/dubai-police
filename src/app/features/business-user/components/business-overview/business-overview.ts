import { Component, EventEmitter, OnInit, Output, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BusinessReviewSidebar } from '../business-review-sidebar/business-review-sidebar';
import {
  BusinessRequestTable,
  TableRequest,
} from '../business-request-table/business-request-table';
import { BusinessTabNavigation } from '../business-tab-navigation/business-tab-navigation';
import { BusinessRequestDetailsPage } from "../business-request-details-page/business-request-details-page";
import { BusinessRequestsPage } from "../business-requests-page/business-requests-page";
import { BusinessRequestDetailModal } from '../business-request-detail-modal/business-request-detail-modal';
import { CreateRequest } from "../create-request/create-request";
import { BusinessSubmitRequest } from '../business-submit-request/business-submit-request';
import { CanComponentDeactivate } from '../../../../core/guards/can-deactivate.guard';
@Component({
  selector: 'app-business-overview',
  imports: [CommonModule, FormsModule, BusinessReviewSidebar, BusinessRequestTable, BusinessTabNavigation, BusinessRequestDetailsPage, BusinessRequestsPage, BusinessRequestDetailModal, CreateRequest, BusinessSubmitRequest],
  templateUrl: './business-overview.html',
  styleUrl: './business-overview.css',
})
export class BusinessOverview implements OnInit, CanComponentDeactivate {
  currentView: string = 'overview';
  searchQuery = '';
  selectedTab = 'all-requests';
  lastRefresh = new Date();

  filteredRequests: TableRequest[] = [];
  displayedRequests: TableRequest[] = [];
  currentPage = 1;
  pageSize = 10;
  totalPages = 1;
  selectedRequest: TableRequest | null = null;
  private submitRequestHasChanges = false;
private submitRequestFormSubmitted = false;

  @Output() viewCreatePage = new EventEmitter<void>();
  @Output() viewSubmitPage = new EventEmitter<void>();
  

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

onMenuItemSelected(menuItem: string) {
  if (this.currentView === 'submit-request' && this.submitRequestHasChanges && !this.submitRequestFormSubmitted) {
    const confirmed = confirm('You have unsaved changes. Do you really want to leave?');
    if (!confirmed) {
      return;
    }
  }

  if (this.currentView === 'submit-request') {
    this.submitRequestFormSubmitted = true;
  }
  
  this.currentView = menuItem;
}

  ngOnInit() {
    this.filterAndPaginate();
    this.updateRefreshTime();    
  }

    updateRefreshTime() {
    this.lastRefresh = new Date();
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

    onModalExpand() {
    if (this.selectedRequest) {
      this.currentView = 'details';
    }
  }

   closeDetailsPage() {
    this.currentView = 'overview';
    this.selectedRequest = null;
  }

  closeCreatePage() {
    this.currentView = 'overview';
  }

  closeSubmitPage() {
  this.submitRequestFormSubmitted = true; 
  this.currentView = 'overview';
}

onSubmitRequestChanges(hasChanges: boolean) {
  this.submitRequestHasChanges = hasChanges;
}

canDeactivate(): boolean {
  if (this.currentView === 'submit-request' && this.submitRequestHasChanges && !this.submitRequestFormSubmitted) {
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

  onRowClick(request: TableRequest) {
    this.selectedRequest = request;
    this.currentView = 'details';
  }

  onViewRequest(request: TableRequest) {
    this.selectedRequest = request;
  }

  onCreateRequest() {
    this.currentView = 'create-request';
  }

   onSubmitRequest() {
    this.currentView = 'submit-request';
  }

}
