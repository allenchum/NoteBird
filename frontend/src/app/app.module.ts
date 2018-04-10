import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { MainFrameComponent } from './main-frame/main-frame.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RelatedContentComponent } from './related-content/related-content.component';
import { CreateBoardComponent } from './create-board/create-board.component';
import { NoteImageService } from './note-image.service';
import { NotePinService } from './note-pin.service';
import { TextEditorComponent } from './text-editor/text-editor.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    MainFrameComponent,
    RelatedContentComponent,
    CreateBoardComponent,
    TextEditorComponent,
    ProfilePageComponent,
  ],
  imports: [
    BrowserModule,
    FlexLayoutModule,
    FormsModule,
    NgbModule.forRoot()
  ],
  providers: [
    NoteImageService,
    NotePinService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
