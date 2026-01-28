import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tab-navigation',
  imports: [CommonModule],
  templateUrl: './tab-navigation.html',
  styleUrl: './tab-navigation.css',
})
export class TabNavigation {
  @Input() tabs: string[] = [];
  @Output() tabChanged = new EventEmitter<string>();

  activeTab = 'all-requests';

  getTabId(tab: string): string {
    return tab.toLowerCase().replace(/\s+/g, '-');
  }

  selectTab(tab: string) {
    this.activeTab = this.getTabId(tab);
    this.tabChanged.emit(this.activeTab);
  }
}
