import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  data;
  nextPhotoIndex;
  prevPhotoIndex;

  constructor(private http: HttpClient) {
    this.http.get("https://api.unsplash.com/photos/?client_id=4909d16f6161e76ffa153626ebe2f9ca1203ce0d61d66d28c319821ccaaa8fdd")
      .subscribe(result => {
        console.info("request sent");
        this.data = result;
      }, () => {
        console.error("bad request");
      });
  }

  openModal(index) {
    document.getElementById('lightboxModal').style.display = "block";
    this.showSlides(index);
  }

  closeModal() {
    document.getElementById('lightboxModal').style.display = "none";
  }

  slideToPrev() {
    this.showSlides(this.prevPhotoIndex);
  }

  slideToNext() {
    this.showSlides(this.nextPhotoIndex);
  }

  showSlides(n) {
    let slides = document.getElementsByClassName("lightbox-slides") as HTMLCollectionOf<HTMLElement>;
    let captionText = document.getElementById("caption");
    let captionTextAuthor = this.data[n].user.name ?  this.data[n].user.name : "Unknown";

    if (n === 0) {
      this.prevPhotoIndex = slides.length - 1;
      this.nextPhotoIndex = 1;
    } else if (n === slides.length - 1) {
      this.prevPhotoIndex = slides.length - 2;
      this.nextPhotoIndex = 0;
    } else {
      this.prevPhotoIndex = n - 1;
      this.nextPhotoIndex = n + 1;
    }

    for (let i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }

    slides[n].style.display = "block";
    captionText.innerHTML = "Photo by: " + captionTextAuthor;
  }
}
