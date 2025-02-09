import { Component } from '@angular/core';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: false,
})
export class Tab1Page {
  items: any[] = []; // Lista de elementos
  darkMode = false; // Inicia en modo claro
  public alertButtons = [
    {
      text: 'No',
      cssClass: 'alert-button-cancel',
    },
    {
      text: 'Si',
      cssClass: 'alert-button-confirm',
    },
  ];
  constructor() {
    this.loadItems();
    this.setInitialTheme();
    
  }

  loadItems() {
    this.items = Array.from({ length: 20 }, (_, i) => `Item ${i + 1}`);
  }

  onIonInfinite(event: any) {
    setTimeout(() => {
      const newItems = Array.from({ length: 10 }, (_, i) => `Item ${this.items.length + i + 1}`);
      this.items.push(...newItems);
      event.target.complete();
    }, 1000);
  }

  setInitialTheme() {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const savedTheme = localStorage.getItem('darkMode');

    if (savedTheme !== null) {
      this.darkMode = savedTheme === 'true';
    } else {
      this.darkMode = prefersDark; // Detecta preferencia del sistema
    }

    this.applyTheme();
  }

  toggleDarkMode(event: any) {
    this.darkMode = event.detail.checked;
    localStorage.setItem('darkMode', this.darkMode.toString());
    this.applyTheme();
  }

  applyTheme() {
    if (this.darkMode) {
      document.body.classList.add('dark');
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.body.classList.remove('dark');
      document.documentElement.setAttribute('data-theme', 'light');
    }
  }
}
