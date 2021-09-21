import { environment as env } from '../../../environments/environment';

export interface Technology {
  name: string;
  description: string;
}

export const technologies: Technology[] = [
  {
    name: 'Angular',
    description: 'technology.angular',
  },
  {
    name: 'Angular Cli',
    description: 'technology.angular-cli',
  },
  {
    name: 'I18n',
    description: 'technology.ngxtranslate',
  },
  {
    name: 'NgRx',
    description: 'technology.ngrx',
  },
  {
    name: 'RxJS',
    description: 'technology.rxjs',
  },
  {
    name: 'Typescript',
    description: 'technology.typescript',
  },
  {
    name: 'Bootstrap',
    description: 'technology.bootstrap',
  },
  {
    name: 'technology.themes.title',
    description: 'technology.themes.description'
  },
  {
    name: 'Font Awesome 5',
    description: 'technology.fontawesome',
  }
];
