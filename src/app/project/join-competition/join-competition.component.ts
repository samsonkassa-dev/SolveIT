import {Component, OnInit, Input, EventEmitter, Output} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-join-competition',
  templateUrl: './join-competition.component.html',
  styleUrls: ['./join-competition.component.css']
})
export class JoinCompetitionComponent implements OnInit {

  @Input() activeCompetitions = [];
  @Input() isJoinCompetitionSuccessful = null;
  @Output() checkIfEnrolled = new EventEmitter();
  @Output() join = new EventEmitter();
  form: FormGroup;
  dropdownList = [];
  selectedItems = [];
  dropdownSettings = {};

  // Selected competition
  competition = '';

  // innovation info
  innovationInfo = {
    'productType':  '',
    'sector': '',
    'otherProductType': '',
    'otherSector': '',
    'description': '',
    'whatProblem': '',
    'howToSolve': ''
  };
  productTypes = [
    'Software (for Mobile Application)',
    'Software (for Web Application)',
    'Software (Desktop Application)',
    'Software (Industrial Application)',
    'Hardware',
    'SMS based application',
    'Hybrid Product (heavy both on Software and Hardware)',
    'Other'
  ];
  sectors = [
    'Agriculture and Fishery',
    'Health',
    'Education',
    'Finance',
    'Construction Industry',
    'Metallurgical Industry',
    'Transportation Sector',
    'Food and Beverage Processing',
    'Entertainment',
    'Tourism and Culture',
    'Other'
  ];

  // further info
  furtherInfo = {
    whyParticipate: '',
    teamOrNah: '',
    teamOrNahReason: '',
    everBeenInCompetition: '',
    competitionEverBeen: '',
    mediaResource: [],
    mediaName: ''
  };

  infoSources = [
    { item_id: 1, item_text: 'Radio Advertisment' },
    { item_id: 2, item_text: 'TV Advertisment' },
    { item_id: 3, item_text: 'From iCog Labs Website' },
    { item_id: 4, item_text: 'From Other Websites' },
    { item_id: 5, item_text: 'Word of Mouth (You heard about it from your friends, teachers, parents etc)' },
    { item_id: 6, item_text: 'Newspapers' },
    { item_id: 7, item_text: 'Social Media (From iCog\'s Facebook)' },
    { item_id: 8, item_text: 'Social Media (From US Embassy\'s Facebook)' },
    { item_id: 9, item_text: 'Other' }
  ];

  howToParticipate = [
    'As a team',
    'May be As a team',
    'As an individual',
    'May be as an individual'
  ];

  // form steps
  formSteps = [
    'step-1',
    'step-2',
  ];
  currentForm = this.formSteps[0];


  constructor(public fb: FormBuilder) { }

  ngOnInit() {
    this.form = this.fb.group({
      competition: ['', Validators.required],
      innovationInfo: this.fb.group({
        productType: ['', Validators.required],
        otherProductType: ['', Validators.required],
        sector: ['', Validators.required],
        otherSector: ['', Validators.required],
        description: ['', Validators.required],
        whatProblem: ['', Validators.required],
        howToSolve: ['', Validators.required]
      }),
      furtherInfo: this.fb.group({
        whyParticipate: ['', Validators.required],
        teamOrNah: ['', Validators.required],
        teamOrNahReason: ['', Validators.required],
        everBeenInCompetition: ['', Validators.required],
        competitionEverBeen: ['', Validators.required],
        mediaResource: [[], Validators.required],
        mediaName: ['', Validators.required]
      })
    });

    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };

  }

  onItemSelect(item: any) {
    // console.log(item);
  }
  onSelectAll(items: any) {
    // console.log(items);
  }

  toggleForm(value) {
    this.currentForm = this.formSteps[value];
  }

  isInnovationInfoFormValid() {
    const isProductTypeValid = (this.innovationInfo.productType !== '' &&
                                this.innovationInfo.productType !== this.productTypes[this.productTypes.length - 1]) ||
                                (this.innovationInfo.productType === this.productTypes[this.productTypes.length - 1] &&
                                this.innovationInfo.otherProductType !== '');
    const isSectorValid = (this.innovationInfo.sector !== '' &&
      this.innovationInfo.sector !== this.sectors[this.sectors.length - 1]) ||
      (this.innovationInfo.sector === this.sectors[this.sectors.length - 1] &&
        this.innovationInfo.otherSector !== '');

    return (
      this.form.controls.competition.valid &&
      this.form.controls.innovationInfo['controls'].description.valid &&
      this.form.controls.innovationInfo['controls'].whatProblem.valid &&
      this.form.controls.innovationInfo['controls'].howToSolve.valid &&
      isProductTypeValid && isSectorValid
    );
  }

  isFurtherInfoFormValid() {
    const isEverBeenInCompetitionValid = (
      (this.furtherInfo.everBeenInCompetition === 'yes' &&
        this.furtherInfo.competitionEverBeen !== '') ||
        this.furtherInfo.everBeenInCompetition === 'no'
    );
    return (
      this.form.controls.furtherInfo['controls'].whyParticipate.valid &&
      this.form.controls.furtherInfo['controls'].teamOrNah.valid &&
      this.form.controls.furtherInfo['controls'].teamOrNahReason.valid &&
      this.form.controls.furtherInfo['controls'].mediaResource.valid &&
      this.form.controls.furtherInfo['controls'].mediaName.valid &&
      isEverBeenInCompetitionValid
    );
  }

  onNext() {
    if (this.isInnovationInfoFormValid()) {
      if (this.innovationInfo.productType !== '' &&
        this.innovationInfo.productType !== this.productTypes[this.productTypes.length - 1] &&
        this.innovationInfo.otherProductType !== '') {
        this.innovationInfo.otherProductType = '';
      }
      if (this.innovationInfo.sector !== '' &&
        this.innovationInfo.sector !== this.sectors[this.sectors.length - 1] &&
        this.innovationInfo.otherSector !== '') {
        this.innovationInfo.otherSector = '';
      }
     this.toggleForm(1);
    } else {
      this.markFormGroupTouched(this.form.controls.innovationInfo);
      this.form.controls.competition.markAsTouched();
    }
  }

  onJoin() {
    if (this.isFurtherInfoFormValid()) {
      if (this.furtherInfo.everBeenInCompetition === 'no' &&
          this.furtherInfo.competitionEverBeen !== '') {
        this.furtherInfo.competitionEverBeen = '';
      }
      this.join.emit({data: {
          competitionId: this.competition,
          innovationInfo: this.innovationInfo,
          furtherInfo: this.furtherInfo
        }});
    } else {
      this.markFormGroupTouched(this.form.controls.furtherInfo);
    }
  }

  /**
   * Marks all controls in a form group as touched
   * @param formGroup - The form group to touch
   */
  private markFormGroupTouched(formGroup: any) {
    (<any>Object).values(formGroup.controls).forEach(control => {
      control.markAsTouched();

      if (control.controls) {
        this.markFormGroupTouched(control);
      }
    });
  }

  reset() {
    this.form.reset();
    this.checkIfEnrolled.emit();
  }

}
