import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HuraceDataApiService } from '../shared/hurace-data-api.service';
import { Skier } from '../shared/skier';
import { NgForm } from '@angular/forms';
import { SkierEditErrorMessages } from './skier-edit-error-messages';
import { Country } from '../shared/country';

declare var $: any;

@Component({
  selector: 'app-skier-edit',
  templateUrl: './skier-edit.component.html',
  styleUrls: ['./skier-edit.component.css']
})
export class SkierEditComponent implements OnInit {

    @ViewChild('skierForm', {static: true}) skierForm: NgForm;
    errors: { [key: string]: string } = {};

    skier: Skier = new Skier();
    sexOptions: any = ['male', 'female'];
    countryOptions: Country[];

    constructor(private router: Router,
                private route: ActivatedRoute,
                private hs: HuraceDataApiService) { }

    ngOnInit() {
        this.hs.getAllCountries().subscribe(res => {
            this.countryOptions = res;
            //refresh selectpicker
            setTimeout(() => {
                console.log("refresh selectpicker countries loaded!");
                console.log("skier.country: " + this.skier.country);
                $('.selectpicker').selectpicker('refresh');
            }, 500);
        } );
        this.skierForm.statusChanges.subscribe(() => this.updateErrorMessages());

        this.route.params.subscribe(params => {
            if (params['id'] != 0) {
                this.hs.getSkierById(params['id'])
                    .subscribe(res => {
                        this.skier = res;
                        //refresh selectpicker
                        //console.log("refresh selectpicker skier laoded");
                        //$('.selectpicker').selectpicker('refresh');
                    } );
            } else {
                this.skier.id = 0;
            }
        });
    }

    ngAfterViewInit() {
        setTimeout(() => {
            console.log("refresh selectpicker ngAfterViewInit!");
            console.log("skier.country: " + this.skier.country);
            $('.selectpicker').selectpicker('refresh');
        }, 1000);
    }

    storeSkier() {
        //check if new skier or existing skier
        if (this.skier.id != 0) {
            this.hs.updateSkier(this.skier).subscribe(res => {
                this.skier = new Skier();
                this.skierForm.reset(this.skier);
            });
        } else {
            this.hs.addSkier(this.skier).subscribe(res => {
                this.skier = new Skier();
                this.skierForm.reset(this.skier);
            })
        }
    }

    updateErrorMessages() {
        this.errors = {};
        for (const message of SkierEditErrorMessages) {
            const control = this.skierForm.form.get(message.forControl);
            if (control &&
                control.dirty &&
                control.invalid &&
                control.errors[message.forValidator] &&
                !this.errors[message.forControl]) {
              this.errors[message.forControl] = message.text;
            }
          }
    }
}
