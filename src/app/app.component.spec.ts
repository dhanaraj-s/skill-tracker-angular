import { TestBed, async } from '@angular/core/testing';
import { RouterModule, Routes, Router, ActivatedRoute } from '@angular/router';
import { AppComponent } from './app.component';
import { APP_BASE_HREF } from '@angular/common';
describe('AppComponent', () => {
  let component: AppComponent;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterModule.forRoot([])],
      declarations: [
        AppComponent
      ],
      providers: [AppComponent,
        { provide: APP_BASE_HREF, useValue: '/' }
      ]
    }).compileComponents();
  }));
  beforeEach(() => {
    component = TestBed.get(AppComponent);
  });
  it('should create the app', async(() => {
    const app = component.title;
    expect(app).toBeTruthy();
  }));
});
