import { TestBed, async, inject } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      imports: [
        HttpClientTestingModule
      ]
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
  it('data should contain data from get request ',
    inject([HttpTestingController],
      (httpMock: HttpTestingController) => {

        const dummyPhotos = [
          {
            urls: {
              thumb: "dummyThumb",
              regular: "dummyRegular"
            },
            user: {
              name: "dummyName"
            }
          }
        ];

        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.debugElement.componentInstance;
        const request = httpMock.expectOne(`https://api.unsplash.com/photos/?client_id=4909d16f6161e76ffa153626ebe2f9ca1203ce0d61d66d28c319821ccaaa8fdd`);
        request.flush(dummyPhotos);

        expect(request.request.method).toBe("GET");
        expect(app.data).toEqual(dummyPhotos);
      })
  );

  //TODO: Add more unit tests
});
