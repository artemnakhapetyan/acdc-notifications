
# Notifications component for angular (toasts)

No additional dependecies like bootsrap or material or any other ui libs required

Angular versions support - 2,4,5,6,7+

See [Demo](https://angular-mp2pcl.stackblitz.io)


## Latest updates

*12 December 2018* New functionality (toast add/delete event emitters)
<br/>
*26 November 2018* New functionality (toasts alignment, toasts create/dismiss animations)
<br/>
*24 November 2018* New functionality (dinamically update notifications config, toast method overload with simple params)
<br/>
*22 November 2018* New functionality and configs (toasts opacity, dismiss all toasts). Scroll to latest toast fix
<br/>
*12 November 2018* Toast vertical overflow fix. New configs (toast width, font configs like size and font family)
<br/>
*9 November 2018* Tested with angular 7 version. New configs (addToTop, zIndex)
<br/>


## Install

### 1. Install package with npm
```npm

npm install acdc-notifications --save

```

### 2. Import acdc notifications module in your project's root module app.module.ts:
```ts

import { 
	AcdcNotificationsModule, 
	AcdcHorizontalAlignment,
  	AcdcVerticalAlignment,
	AcdcNotifcationsDefaultConfig 
} from 'acdc-notifications';

// some code

// notifications initial configurations (if not provided default values applied)
// all the properties are optional
const notificationsConfig: AcdcNotifcationsDefaultConfig = {
  // toast configs go here (planning to add in package other notification types)
  toast:{
	// general properties applied to all toast notification level types (info, error, warn, success)

	// new toast goes on the top of existing ones or to the bottom
	addToTop: true, 
	// toasts horizontal alignment (Left, Center, Right)
	horizontalAlignment: AcdcHorizontalAlignment.Right, 
	// toasts vertical alignment (Top, Bottom)
	verticalAlignment: AcdcVerticalAlignment.Top, 
	// comma separated css animation names. Predefined or custom css animation names can be used
	// Predefined animations:
	// acdcFadeOutAnimation, acdcFadeInAnimation, acdcSlideInLeftAnimation, acdcSlideOutRightAnimation
	// acdcSlideOutLeftAnimation, acdcSlideInRightAnimation, acdcSlideInTopAnimation, acdcSlideInBottomAnimation
	// acdcSlideOutTopAnimation, acdcSlideOutBottomAnimation
	createAnimations: 'acdcFadeInAnimation, acdcSlideInTopAnimation', 
	dismissAnimations: 'acdcFadeOutAnimation, acdcSlideOutRightAnimation', 
	// toasts background opacity (decimal number from 0 to 1).
	backgroundOpacity: 1,
	// toasts minimal count to show delete all toasts button
	minCntToShowDeleteAllBtn: 2, 
	// delete all toasts button background color ( pass value 'none' if no background needed)
	deleteAllBtnBackgroundColor: 'red', 
	// delete all toasts button icon color
	deleteAllBtnIconColor: 'white', 
	// toast container z-index
	zIndex: '1000000001', 
	// toast width
	width: '500px', 
	// toast title font size
	titleFontSize: '16px', 
	// toast message font size
	messageFontSize: '10px', 
	// toast title font family
	titleFontFamily: 'Verdana', 
	// toast message font family
	messageFontFamily: 'Arial', 
	
	// toast title color
	titleColor: 'white', 
	// toast message color
	messageColor: 'white', 
	// toast background color
	backgroundColor: 'white', 
	// toast icons color
	iconsColor: 'white', 
	// properties specific to notification level (have higher priority than general properties)
    warn: {
      titleColor: 'white',
      messageColor: 'white',
      backgroundColor: 'orange',
      iconsColor: 'white'
    },
    info: {
	  titleColor: 'white',
	  messageColor: 'white',
      backgroundColor: 'steelblue',
      iconsColor: 'white'
    },
    error: {
	  titleColor: 'white',
	  messageColor: 'white',
      backgroundColor: 'firebrick',
      iconsColor: 'white'
    },
    success: {
	  titleColor: 'white',
	  messageColor: 'white',
      backgroundColor: 'seagreen',
      iconsColor: 'white'
    }
  }
};

@NgModule({
	// some code
	imports: [
		AcdcNotificationsModule.forRoot(notificationsConfig)
	]
	// some code
})

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

ngOnInit(){

	// you can subscribe to toasts add/remove events and add your custom logic
    this.acdcNotificationsService.addToastAction.subscribe( toast => {
      console.log('new toast added, message = ' + toast.message);
    });

    this.acdcNotificationsService.deleteToastAction.subscribe( toast => {
      console.log('toast was deleted, message = ' + toast.message);
	});
	
}

anyMethod(){

	const toastId = this.acdcNotificationsService.toast({
		title: 'Warn', 
		message: 'This is just example.',
		notificationLevel: 'Warn'
	});

	// simple params example
	this.acdcNotificationsService.toast('Message text...', 'Title text', 'Info', 3000);

	// json config params example
	this.acdcNotificationsService.toast({
		title: 'Info', 
		message: 'Async call started.', 
		timeout: 3000,
		notificationLevel: 'Info'
	});

	this.api.anyAsyncMethodCall().subscribe( res => {
		// some code
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
	title: 'Info title', 
	/* not null, main message text */
	message: 'Async call started.',
	/* nullable (toast won't dissapear automaticaly). If positive timeout value applied toast will dissapear automaticaly when time elapsed (milliseconds) */
	timeout: 3000, 
	/* nullable (default Info), notification level values - 'Info' (default), 'Success', 'Warn', 'Error'. Toast colors and icons are changed accordingly */
	notificationLevel: 'Info' 
}); 

// 2. toast - creates new toast (overload with simple params)
/* returns toast uniq id */
const id: string = this.acdcNotificationsService.toast(
	/* not null, main message text */
	'Async call started.',
	/* nullable, if not passed toast will appear without header */
	'Info title', 
	/* nullable (default Info), notification level values - 'Info' (default), 'Success', 'Warn', 'Error'. Toast colors and icons are changed accordingly */
	'Info',
	/* nullable (toast won't dissapear automaticaly). If positive timeout value applied toast will dissapear automaticaly when time elapsed (milliseconds) */
	3000
});

// 3. deleteToast - deletes toast by id
this.acdcNotificationsService.deleteToast(id); 

// 4. deleteAllToasts - deletes all toasts
this.acdcNotificationsService.deleteAllToasts();

// 5. updateDefaultConfig - dynamically update default config
const notificationsConfig: AcdcNotifcationsDefaultConfig = {...} as AcdcNotifcationsDefaultConfig;
this.acdcNotificationsService.updateDefaultConfig(notificationsConfig);

// 6. addToastAction - observable (EventEmitter) can be subscribed to listen add toast events
this.acdcNotificationsService.addToastAction.subscribe( toast => {
	console.log('new toast added, message = ' + toast.message);
});

// 7. deleteToastAction - observable (EventEmitter) can be subscribed to listen delete toast events
this.acdcNotificationsService.deleteToastAction.subscribe( toast => {
	console.log('toast was deleted, message = ' + toast.message);
});

```

