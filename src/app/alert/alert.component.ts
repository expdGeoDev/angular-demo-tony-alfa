import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { NgFor } from '@angular/common';

import { Alert, AlertType } from './alert.model';
import { AlertService } from './alert.service';

@Component({
	selector: 'app-alert',
	standalone: true,
	imports: [NgFor],
	templateUrl: './alert.component.html',
	styleUrl: './alert.component.css',
})
export class AlertComponent {
	@Input() id = 'default-alert';
	@Input() fade = true;

	alerts: Alert[] = [];
	alertSubscription!: Subscription;
	routeSubscription!: Subscription;

	constructor(private alertService: AlertService) {}

	ngOnInit() {
		// subscribe to new alert notifications
		this.alertSubscription = this.alertService.onAlert(this.id).subscribe((alert) => {
			// clear alerts when an empty alert is received
			if (!alert.message) {
				// filter out alerts without 'keepAfterRouteChange' flag
				this.alerts = this.alerts.filter((x) => x.keepAfterRouteChange);

				// remove 'keepAfterRouteChange' flag on the rest
				this.alerts.forEach((x) => delete x.keepAfterRouteChange);
				return;
			}

			// add alert to array
			this.alerts.push(alert);

			// auto close alert if required
			if (alert.autoClose) {
				setTimeout(() => this.removeAlert(alert), 3000);
			}
		});
	}

	ngOnDestroy() {
		// unsubscribe to avoid memory leaks
		this.alertSubscription.unsubscribe();
		this.routeSubscription.unsubscribe();
	}

	removeAlert(alert: Alert) {
		// check if already removed to prevent error on auto close
		if (!this.alerts.includes(alert)) return;

		// fade out alert if this.fade === true
		const timeout = this.fade ? 250 : 0;
		alert.fade = this.fade;

		setTimeout(() => {
			// filter alert out of array
			this.alerts = this.alerts.filter((x) => x !== alert);
		}, timeout);
	}

	cssClass(alert: Alert) {
		if (!alert) return;

		const classes = ['alert', 'alert-dismissible'];

		const alertTypeClass = {
			[AlertType.Success]: 'alert-success',
			[AlertType.Error]: 'alert-danger',
			[AlertType.Info]: 'alert-info',
			[AlertType.Warning]: 'alert-warning',
		};

		if (alert.type !== undefined) {
			classes.push(alertTypeClass[alert.type]);
		}

		if (alert.fade) {
			classes.push('fade');
		}

		return classes.join(' ');
	}
}
