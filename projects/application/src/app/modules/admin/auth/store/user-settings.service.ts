import { Injectable } from '@angular/core';
import { UserSettings } from '../models/user-settings';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })

export class SettingsService {

    private dataLanguage: string[] = ['en', 'fr', 'de'];
    private dataFontSize: string[] = ['normal_font', 'medium_font', 'large_font'];
    private dataTheme: string[] = ['orange_theme', 'red_theme', 'blue_theme'];
    private currentSettingsSubject: BehaviorSubject<UserSettings>;
    public currentSetting: Observable<UserSettings>;

    constructor() {
        this.currentSettingsSubject = new BehaviorSubject<UserSettings>(JSON.parse(localStorage.getItem('app-settings')));
        this.currentSetting = this.currentSettingsSubject.asObservable();
    }

    public get currentSettingValue(): UserSettings {
        return this.currentSettingsSubject.value;
    }

    setCurrentSetting(settings: UserSettings) {
        localStorage.setItem('app-settings', JSON.stringify(settings));
        this.currentSettingsSubject.next(settings);
        return settings;
    }

    getDataLanguage(): string[] {
        return this.dataLanguage;
    }

    getDataFontSize(): string[] {
        return this.dataFontSize;
    }

    getDataTheme(): string[] {
        return this.dataTheme;
    }

}
