import { Component } from '@angular/core';
import {
	FormBuilder,
	FormGroup,
	FormsModule,
	ReactiveFormsModule,
	Validators,
} from '@angular/forms';
import { NgIf } from '@angular/common';
import { AlertService } from '../alert';
import { CoffeeHttpService } from '../coffee-http.service';
import { Coffee } from '../../data/coffee-data';
@Component({
	selector: 'app-add-coffee-form',
	standalone: true,
	imports: [FormsModule, ReactiveFormsModule, NgIf],
	templateUrl: './add-coffee-form.component.html',
	styleUrl: './add-coffee-form.component.css',
})
export class AddCoffeeFormComponent {
	loading: boolean = false;
	options = {
		autoClose: true,
		keepAfterRouteChange: false,
	};

	constructor(
		private formBuilder: FormBuilder,
		public alertSvc: AlertService,
		private coffeeSvc: CoffeeHttpService
	) {}

	coffeeForm: FormGroup = this.formBuilder.group({
		brand: ['', Validators.required],
		roast: ['', Validators.required],
		groundOrBeans: ['', Validators.required],
		grind: [0],
		singleOrigin: [false],
		flavorNotes: [''],
	});

	get brand() {
		return this.coffeeForm.get('brand');
	}

	get groundOrBeans() {
		return this.coffeeForm.get('groundOrBeans');
	}

	get roast() {
		return this.coffeeForm.get('roast');
	}

	async onSubmit(coffee: Coffee) {
		this.loading = true;
		await new Promise((f) => setTimeout(f, 1000));
		this.loading = false;
		console.log(coffee);
		this.coffeeSvc.saveCoffee(coffee);
		this.coffeeForm.reset();
		this.alertSvc.success('Coffee saved!', this.options);
	}
}
