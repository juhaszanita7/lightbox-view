import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Photo } from '../models/photo';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  data: Photo[];
  nextPhotoIndex: number;
  prevPhotoIndex: number;

  constructor(private http: HttpClient) {
    this.http.get("https://api.unsplash.com/photos/?client_id=4909d16f6161e76ffa153626ebe2f9ca1203ce0d61d66d28c319821ccaaa8fdd")
      .subscribe((result: Photo[]) => {
        this.data = result;
      }, (error) => {
        alert("Oops, something went wrong.. \n" + "Error: " + error.name + "\n" + "Status: " + error.status);
      });
  }

  openModal(photoIndex: number) {
    document.getElementById('lightboxModal').style.display = "block";
    this.showPhoto(photoIndex);
  }

  closeModal() {
    document.getElementById('lightboxModal').style.display = "none";
  }

  slideToPrev() {
    this.showPhoto(this.prevPhotoIndex);
  }

  slideToNext() {
    this.showPhoto(this.nextPhotoIndex);
  }

  showPhoto(photoIndex: number) {
    let slides = document.getElementsByClassName("lightbox-slides") as HTMLCollectionOf<HTMLElement>;
    let captionText = document.getElementById("caption");
    let captionTextAuthor = this.data[photoIndex].user.name ? this.data[photoIndex].user.name : "Unknown";

    const length = this.data.length;

    this.nextPhotoIndex = (photoIndex + 1) % length;
    this.prevPhotoIndex = (photoIndex + length - 1) % length;

    for (let i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }

    slides[photoIndex].style.display = "block";
    captionText.innerHTML = "Photo by: " + captionTextAuthor;
  }
}
