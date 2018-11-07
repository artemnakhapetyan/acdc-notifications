
# Notifications component for angular 6 (toasts)

No additional dependecies like bootsrap or material or any other ui libs required

See [Demo](https://angular-mp2pcl.stackblitz.io)


## Latest updates

*7 November 2018* Initial version
<br/>


## Install

### 1. Install package with npm
```npm

npm install acdc-notifications --save

```

### 2. Import acdc notifications module in your project's root module app.module.ts:
```ts

import { AcdcNotificationsModule } from 'acdc-notifications';

imports: [
    AcdcNotificationsModule.forRoot()
]

```


## Usage

### 1. Place notifications tag in root component html markup app.component.html:
```html

<acdc-notifications></acdc-notifications>

```

### 2. Import and use notifications service in any component or service from where you need to show notifications:
```ts

import { AcdcNotificationsService } from 'acdc-notifications';

constructor( private acdcNotificationsService: AcdcNotificationsService ) {}

anyMethod(){

	this.acdcNotificationsService.toastWarn('Warn', 'This is just example.');

	this.acdcNotificationsService.toastInfo('Info', 'Async call started.', 3000);

	this.api.anyAsyncMethodCall().subscribe( res => {
		// some actions
		this.acdcNotificationsService.toastSuccess('Info', 'Async call ended.', 5000);
	});

}

```