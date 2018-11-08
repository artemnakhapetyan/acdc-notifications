
# Notifications component for angular 6 (toasts)

No additional dependecies like bootsrap or material or any other ui libs required

See [Demo](https://angular-mp2pcl.stackblitz.io)


## Latest updates

*7 November 2018* Initial version
*8 November 2018* Toasts container horizontal scroll fix
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

	const toastId = this.acdcNotificationsService.toast({
		title: 'Warn', 
		message: 'This is just example.',
		notificationLevel: 'Warn'
	});

	this.acdcNotificationsService.toast({
		title: 'Info', 
		message: 'Async call started.', 
		timeout: 3000,
		notificationLevel: 'Info'
	});

	this.api.anyAsyncMethodCall().subscribe( res => {
		// some actions
		this.acdcNotificationsService.toast({
			title: 'Info', 
			message: 'Async call ended.', 
			timeout: 5000
		});
	});

	setTimeout( () => {
		this.acdcNotificationsService.deleteAllToasts();
	}, 10000);

}

```

### 3. Toast methods
```ts

// 1. toast - creates new toast
/* returns toast uniq id */
const id: string = this.acdcNotificationsService.toast({
	/* nullable, if not passed toast will appear without header */
	title: 'Info', 
	/* not null, main message text */
	message: 'Async call started.',
	/* nullable (toast won't dissapear automaticaly). If positive timeout value applied toast will dissapear automaticaly when time elapsed (milliseconds) */
	timeout: 3000, 
	/* nullable (default Info), notification level values - 'Info' (default), 'Success', 'Warn', 'Error'. Toast colors and icons are changed accordingly */
	notificationLevel: 'Info' 
}); 

// 2. deleteToast - deletes toast by id
this.acdcNotificationsService.deleteToast(id); 

// 3. deleteAllToasts - deletes all toasts
this.acdcNotificationsService.deleteAllToasts();

```

