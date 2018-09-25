import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import {ToastyService, ToastyConfig, ToastOptions, ToastData} from 'ng2-toasty';

@Injectable()

export class SharedService {

	constructor(private apiService: ApiService, private toastyService: ToastyService, private toastyConfig: ToastyConfig) { }


	addToast(title, msg, type) {
		let toastOptions: ToastOptions = {
			title: title,
			msg: msg,
			showClose: true,
			timeout: 7000,
			theme: 'default',
			onAdd: (toast: ToastData) => {
				console.log('Toast ' + toast.id + ' has been added!');
			},
			onRemove: function(toast: ToastData) {
				console.log('Toast ' + toast.id + ' has been removed!');
			}
		};

		if (type == 'success') {
			this.toastyService.success(toastOptions);
		} else if (type == 'error') {
			this.toastyService.error(toastOptions);
		}
	}

}
