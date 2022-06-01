import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor() { }

  setupMenu(){
    const sideMenu = document.querySelector('aside');
    const menuBtn = document.querySelector('#menu-btn');
    const closeBtn = document.querySelector('#close-btn');
    const themeTogler = document.querySelector('.theme-toggler');

    if(menuBtn != null && closeBtn != null && sideMenu != null && themeTogler != null){
      menuBtn.addEventListener('click', () => {
        sideMenu.classList.toggle('displayBlock');
      })

      closeBtn.addEventListener('click', () => {
        sideMenu.classList.toggle('displayBlock');
      })

      themeTogler.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme-variables');
        themeTogler.querySelector('span:nth-child(1)')?.classList.toggle('active');
        themeTogler.querySelector('span:nth-child(2)')?.classList.toggle('active');
      })
    }
  }
}
