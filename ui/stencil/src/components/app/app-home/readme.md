# app-home



<!-- Auto Generated Below -->


## Properties

| Property         | Attribute | Description | Type              | Default     |
| ---------------- | --------- | ----------- | ----------------- | ----------- |
| `contents`       | --        |             | `Content[]`       | `undefined` |
| `featuredImages` | --        |             | `FeaturedImage[]` | `undefined` |
| `organisation`   | --        |             | `Organisation`    | `undefined` |
| `spaces`         | --        |             | `Space[]`         | `undefined` |
| `user`           | --        |             | `User`            | `undefined` |


## Dependencies

### Used by

 - [app-root](../app-root)

### Depends on

- chl-document-card
- [app-topbar](../app-topbar)
- confirmation-dialog
- [error-modal](../../molecules/error-modal)
- [chl-button](../../atoms/button)
- ion-searchbar

### Graph
```mermaid
graph TD;
  app-home --> chl-document-card
  app-home --> app-topbar
  app-home --> confirmation-dialog
  app-home --> error-modal
  app-home --> chl-button
  app-home --> ion-searchbar
  chl-document-card --> chl-tag
  chl-document-card --> card-pop-over
  chl-document-card --> publish-tag
  app-topbar --> account-drop-down
  confirmation-dialog --> form-input
  ion-searchbar --> ion-icon
  app-root --> app-home
  style app-home fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Made with 💛💙💜 and 😢*
