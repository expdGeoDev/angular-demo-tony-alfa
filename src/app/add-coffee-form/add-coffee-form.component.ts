import { Component } from '@angular/core';
import {
	FormBuilder,
	FormGroup,
	FormsModule,
	ReactiveFormsModule,
	Validators,
} from '@angular/forms';
import { NgIf } from '@angular/common';
@Component({
	selector: 'app-add-coffee-form',
	standalone: true,
	imports: [FormsModule, ReactiveFormsModule, NgIf],
	templateUrl: './add-coffee-form.component.html',
	styleUrl: './add-coffee-form.component.css',
})
export class AddCoffeeFormComponent {
	toastLiveExample = document.getElementById('liveToast');
	loading: boolean = false;

	constructor(private formBuilder: FormBuilder) {}

	coffeeForm: FormGroup = this.formBuilder.group({
		brand: ['', Validators.required],
		coffeeType: ['', Validators.required],
		roastType: ['', Validators.required],
		flavorNotes: [''],
		grind: ['0'],
	});

	get brand() {
		return this.coffeeForm.get('brand');
	}

	get coffeeType() {
		return this.coffeeForm.get('coffeeType');
	}

	get roastType() {
		return this.coffeeForm.get('roastType');
	}

	async onSubmit() {
		this.loading = true;
		await new Promise((f) => setTimeout(f, 1000));
		this.loading = false;
		console.log(this.coffeeForm.value);
		this.coffeeForm.reset();
	}
}
