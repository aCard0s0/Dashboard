import { NgModule, ModuleWithProviders }from '@angular/core';
import { RouterModule, Routes }         from '@angular/router';

// Components
import { RootComponent }        from './root/root.component';

//dev
/* import { GaugeExemploComponent }       from './root/panel-manager/views/shared/charts/gauge/gauge-exemplo.component';
import { LineChartComponent }   from './root/panel-manager/views/shared/charts/line/line.component';
import { TableComponent }   from './root/panel-manager/views/shared/table/table.component'; */

export const routes: Routes = [
	{ path: '',         redirectTo: 'main',     pathMatch: 'full'},
    { path: 'main',     component: RootComponent }
];

export const Router: ModuleWithProviders = RouterModule.forRoot(routes);

//Pull the routes into a variable. You might export it in future and it clarifies the Routing Module pattern.
//Add RouterModule.forRoot(routes) to imports.
//Add RouterModule to exports so that the components in the companion module have access to Router declarables such as RouterLink and RouterOutlet.
//No declarations! Declarations are the responsibility of the companion module.
//Add module providers for guard services if you have them; there are none in this example.