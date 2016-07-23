import {provideRouter, RouterConfig} from '@angular/router';
import {Home} from "./home/home";

const routes:RouterConfig = <RouterConfig>[
    {path: '', component: Home}
];

export const appRouterProviders = [
    provideRouter(routes)
];
