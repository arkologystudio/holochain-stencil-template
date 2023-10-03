import { Component, h } from '@stencil/core';

@Component({
  tag: 'loading-spinner',
  styleUrl: 'loading-spinner.css',
  shadow: true,
})
export class LoadingSpinner {
  render() {
    return (
      <ion-item>
        <ion-label>Dots</ion-label>
        <ion-spinner name="dots"></ion-spinner>
      </ion-item>
    );
  }
}
