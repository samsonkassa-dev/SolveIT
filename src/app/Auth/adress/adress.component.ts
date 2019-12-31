import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {PhoneNumberValidation} from '../validator/phoneNumberValidation';
import { CommonService } from '../../shared/services/common.service';


@Component({
  selector: 'app-adress',
  templateUrl: './adress.component.html',
  styleUrls: ['./adress.component.css']
})
export class AdressComponent implements OnInit, OnChanges {

  @Output() next = new EventEmitter<any>();
  @Output() back = new EventEmitter();

  public addressForm: FormGroup;
  public regions = [];
  public cities = [];
  public citiesBackup = [];
  public blockedRegions = [];
  public blockedCities = [];

  parentOccupationOptions = [
    "Employee (Full time)",
    "Employee (Part time)",
    "Unemployed",
    "Business Owner",
    "Student",
    "Other"
  ]

  yesNoOptions = [
    "Yes",
    "No"
  ]

  supportOptions = [
    "Business Support",
    "Financial Support",
    "Technical Support"
  ]
  languageOptions = [
    "Amharic",
    "English"
  ]

  oneToFive = [
    "1",
    "2",
    "3",
    "4",
    "5"
  ]


  dropdownSettings = {
    singleSelection: false,
    idField: "item_id",
    textField: "item_text",
    selectAllText: "Select All",
    unSelectAllText: "UnSelect All",
    itemsShowLimit: 3,
    allowSearchFilter: true
  };
  support = {supportNeeded : []}
  @Input() address;
  @Input() isLoading = false;

  constructor(public formBuilder: FormBuilder, public userService: CommonService) { }

  ngOnInit() {
    this.parentOccupationOptions = this.format(this.parentOccupationOptions)
    this.yesNoOptions = this.format(this.yesNoOptions)
    this.languageOptions = this.format(this.languageOptions)
    this.userService.getAllRegions()
      .subscribe(res => {
        this.regions = res;
      });

    this.userService.getAllCities()
      .subscribe(res => {

        const filtteredCities = res.filter(item => {
          return this.blockedCities.indexOf(item.name.toLowerCase()) == -1;
        });

        this.cities = filtteredCities;
        this.citiesBackup = filtteredCities;
      });

    this.addressForm = this.formBuilder.group({
      region: [null, Validators.required],
      city: [null, Validators.required],
      wereda: ['', Validators.required],
      houseNo: [''],
      fullName: ['', Validators.required],
      phoneNumber: ['', Validators.required],

      // parentsOccupation : [null, Validators.required],
      // languageOption:[null, Validators.required],
      educationalInstitute: ['', Validators.required],
      englishReading : [null, Validators.required],
      englishWriting : [null, Validators.required],
      englishSpeaking : [null, Validators.required],
    });
  }

  onRegionChange() {
    if (this.address.regionId !== '') {
      this.cities = this.citiesBackup.filter(item => {
        return item.regionId === this.address.regionId;
      });
    } else {
      this.cities = this.citiesBackup;
    }
  }

  getRegionFromCity(cityId): any {
    let city = null;
    this.citiesBackup.forEach(item => {
      if (item.id === cityId) {
        city = item;
      }
    });
    return city;
  }

  onCityChange() {
    if (this.address.regionId === '') {
      const city = this.getRegionFromCity(this.address.cityId);
      this.address.regionId = city.regionId;
    }
  }

  onDone() {
    //console.log(this.addressForm.valid)
    if (this.addressForm.valid) {
      this.next.emit(this.addressForm.value);
    } else {
      this.markFormGroupTouched(this.addressForm);
    }
  }

  onBack() {
    this.back.emit();
  }
  /**
   * Marks all controls in a form group as touched
   * @param formGroup - The form group to touch
   */
  public markFormGroupTouched(formGroup: any) {
    (<any>Object).values(formGroup.controls).forEach(control => {
      control.markAsTouched();

      if (control.controls) {
        this.markFormGroupTouched(control);
      }
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.isLoading = changes.isLoading.currentValue;
  }


  format(arrayOfStrings){
    let result = []
    arrayOfStrings.forEach(element => {
      result.push({label:element, value:element})
    });
    return result
  }

  mapSupportToDropDown() {
    let result = [];
    this.supportOptions.forEach(item => {
      result.push({ item_id: item, item_text: item });
    });

    return result;
  }

  onItemSelected(item) {
    if (this.support.supportNeeded.indexOf(item.item_id) === -1) {
      this.support.supportNeeded.push(item.item_id);
    }
  }

  onItemDeselected(item) {
    this.support.supportNeeded.splice(
      this.support.supportNeeded.indexOf(item.item_id),
      1
    );
  }

  onSelectAll(items) {
    items.forEach(item => {
      this.onItemSelected(item);
    });
  }

  onDeselectAll(items) {
    this.support.supportNeeded = [];
  }

}
