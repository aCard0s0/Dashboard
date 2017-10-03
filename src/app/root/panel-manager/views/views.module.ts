import { NgModule, CUSTOM_ELEMENTS_SCHEMA }         from '@angular/core';
import { BrowserModule }    from '@angular/platform-browser';
import { RouterModule }     from '@angular/router';

// Modules
import { ServerModule } 	from './servers/server.module';
import { DBModule } 		from './db/db.module';
import { ProcessesModule } 	from './processes/processes.module';
import { TestesModule } 	from './testes/testes.module';
import { WebModule } 		from './web/web.module';


/* 
import { UsersModule } 		from './users/users.module'; 
*/

@NgModule({
	imports: [
	],
	declarations: [
	],
	exports: [
		ServerModule,
		DBModule,
		ProcessesModule,
		TestesModule,
		WebModule
	],
	//schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
})
export class ViewsModule {}