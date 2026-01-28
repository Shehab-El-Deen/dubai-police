import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BusinessRequestTable, TableRequest } from '../business-request-table/business-request-table';
import { BusinessRequestDetailsPage } from "../business-request-details-page/business-request-details-page";

@Component({
  selector: 'app-business-requests-page',
  imports: [CommonModule, FormsModule, BusinessRequestTable, BusinessRequestDetailsPage],
  templateUrl: './business-requests-page.html',
  styleUrl: './business-requests-page.css',
})
export class BusinessRequestsPage implements OnInit, OnChanges {
 @Input() selectedTab: string = 'need-review';

  searchQuery = '';
  filteredRequests: TableRequest[] = [];
  displayedRequests: TableRequest[] = [];
  currentPage = 1;
  pageSize = 10;
  totalPages = 1;
  lastRefresh = new Date();
    currentView: string = 'overview';
  selectedRequest: TableRequest | null = null;

  requests: TableRequest[] = [
    {
      id: 'DP-QC-2024-0018',
      name: 'Traffic Accident Hotspots',
      type: 'Executive / Strategic',
      owner: 'Traffic Dept',
      date: '04/1/26',
      status: 'Validation Failed',
      priority: 'High'
    },
    {
      id: 'CP-QC-2024-0026',
      name: 'Crime Trend Analysis Q4',
      type: 'Quality',
      owner: 'Crime Analytics',
      date: '2/1/26',
      status: 'Under Review',
      priority: 'Medium'
    },
    {
      id: 'CP-QC-2024-0026',
      name: 'Crime Trend Analysis Q5',
      type: 'Quality',
      owner: 'Crime Analytics',
      date: '2/1/26',
      status: 'Need Review',
      priority: 'Medium'
    },
    {
      id: 'IT-QC-2024-0575',
      name: 'Case Processing SLA',
      type: 'Compliance',
      owner: 'Quality Office',
      date: '2/1/26',
      status: 'Rejected',
      priority: 'High'
    },
    {
      id: 'BE-QC-2024-0028',
      name: 'Predictive Patrol Model',
      type: 'AI',
      owner: 'Strategy Unit',
      date: '22/12/25',
      status: 'Rejected',
      priority: 'Medium'
    },
    {
      id: 'DP-QC-2024-0019',
      name: 'Traffic Accident Hotspots',
      type: 'Analytical',
      owner: 'Traffic Dept',
      date: '2/12/25',
      status: 'Rejected',
      priority: 'Low'
    },
    {
      id: 'DP-QC-2024-0020',
      name: 'Traffic Accident Hotspots',
      type: 'Executive / Strategic',
      owner: 'Traffic Dept',
      date: '2/12/25',
      status: 'Approved',
      priority: 'Low'
    },
    {
      id: 'DP-QC-2024-0021',
      name: 'Traffic Accident Hotspots',
      type: 'Executive / Strategic',
      owner: 'Traffic Dept',
      date: '04/11/25',
      status: 'Approved',
      priority: 'Low'
    }
  ];

  ngOnInit() {
    this.filterAndPaginate();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['selectedTab'] && !changes['selectedTab'].firstChange) {
      this.currentPage = 1;
      this.filterAndPaginate();
    }
  }

  getPageTitle(): string {
    const titleMap: { [key: string]: string } = {
      'need-review': 'Need Review',
      'approved': 'Approved',
      'rejected': 'Rejected',
      'validation-failed': 'Validation Failed',
      'under-review': 'Under Review'
    };
    return titleMap[this.selectedTab] || 'All Requests';
  }

  onSearch(query: string) {
    this.searchQuery = query;
    this.currentPage = 1;
    this.filterAndPaginate();
  }

  filterAndPaginate() {
    let filtered = this.requests;

    // Filter by selected tab status
    const statusMap: { [key: string]: string } = {
      'need-review': 'Need Review',
      'approved': 'Approved',
      'rejected': 'Rejected',
      'validation-failed': 'Validation Failed',
      'under-review': 'Under Review'
    };
    
    const targetStatus = statusMap[this.selectedTab];
    if (targetStatus) {
      filtered = filtered.filter(r => r.status === targetStatus);
    }

    // Filter by search
    if (this.searchQuery) {
      filtered = filtered.filter(r =>
        r.id.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        r.name.toLowerCase().includes(this.searchQuery.toLowerCase())
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

onRowClick(request: TableRequest) {
    this.selectedRequest = request;
    this.currentView = 'details';
  }
    closeDetailsPage() {
    this.currentView = 'overview';
    this.selectedRequest = null;
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
}
