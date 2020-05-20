import { Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { ProjectService } from "../project.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "../../../Auth/services/auth.service";
import { SharedService } from "../../../shared/services/shared.service";
declare var $: any;
@Component({
  selector: "app-projects-list",
  templateUrl: "./projects-list.component.html",
  styleUrls: ["./projects-list.component.css"]
})
export class ProjectsListComponent implements OnInit {
  public levels = [1, 2, 3, 4, 5];
  public projects = [];
  public backUpprojects = [];
  public key = "";
  public projectForm: FormGroup;
  public editProjectForm: FormGroup;
  public page = 1;
  public competitions = [];
  public selectedProject;
  public selectedCompetition;
  constructor(
    public service: ProjectService,
    public fb: FormBuilder,
    public authService: AuthService,
    public sharedService: SharedService,
    public router: Router
  ) {}
  viewUserProfile(user) {
    this.router.navigate(["dashboard/userProfile/", user.id]);
  }

  ngOnInit() {
    this.projectForm = this.fb.group({
      project_name: ["", Validators.required],
      passing_grade: ["", Validators.required],
      level: ["", [Validators.required]],
      description: ["", Validators.required]
    });
    this.editProjectForm = this.fb.group({
      id: ["", Validators.required],
      project_name: ["", Validators.required],
      passing_grade: ["", Validators.required],
      level: ["", [Validators.required]],
      description: ["", Validators.required]
    });
    this.getCompetitions();
    this.form = this.fb.group({
      innovationInfo: this.fb.group({
        productType: ["", Validators.required],
        otherProductType: ["", Validators.required],
        sector: ["", Validators.required],
        otherSector: ["", Validators.required],
        description: ["", Validators.required],
        whatProblem: ["", Validators.required],
        howToSolve: ["", Validators.required],
        supportNeeded: [null, Validators.required]
      }),
      furtherInfo: this.fb.group({
        whyParticipate: ["", Validators.required],
        teamOrNah: ["", Validators.required],
        teamOrNahReason: ["", Validators.required],
        everBeenInCompetition: ["", Validators.required],
        competitionEverBeen: ["", Validators.required],
        mediaResource: [[], Validators.required],
        mediaName: ["", Validators.required],
        financialKnowHow: [null, Validators.required],
        financialAccess: [null, Validators.required]
      })
    });
    this.dropdownSettings = {
      singleSelection: false,
      idField: "item_id",
      textField: "item_text",
      selectAllText: "Select All",
      unSelectAllText: "UnSelect All",
      itemsShowLimit: 5,
      allowSearchFilter: true
    };
  }

  getCompetitions() {
    this.service.getCompetitions().subscribe(
      (res: any) => {
        this.competitions = res;
        this.getProjects(res[2].id);
      },
      error => {}
    );
  }
  selectProject(project) {
    this.selectedProject = project;
    this.editProjectForm.patchValue(project);
    this.form.patchValue(project.questionnaireAnswers);
    this.form.controls.furtherInfo.patchValue(
      project.questionnaireAnswers.furtherInfo
    );
    this.innovationInfo = project.questionnaireAnswers.innovationInfo;
    this.furtherInfo = project.questionnaireAnswers.furtherInfo;
  }
  onSearch($event) {
    if (this.key !== "" && this.backUpprojects.length > 0) {
      this.projects = this.backUpprojects.filter(item => {
        let filteredMembers = [];
        filteredMembers = item.members.filter(member => {
          if (!member.userAccount) {
            return false;
          }
          return (
            member.userAccount.firstName
              .toUpperCase()
              .indexOf(this.key.toUpperCase()) !== -1 ||
            member.userAccount.lastName
              .toUpperCase()
              .indexOf(this.key.toUpperCase()) !== -1 ||
            member.userAccount.middleName
              .toUpperCase()
              .indexOf(this.key.toUpperCase()) !== -1
          );
        });
        return (
          item.solveitproject.title
            .toUpperCase()
            .indexOf(this.key.toUpperCase()) !== -1 ||
          filteredMembers.length > 0
        );
      });
    } else if (this.key === "") {
      this.projects = this.backUpprojects;
    }
  }

  getProjects(competitionId) {
    this.service.getProjects(competitionId).subscribe(res => {
      console.log(res);
      this.projects = res;
      this.backUpprojects = this.projects;
    });
  }
  viewProject(project) {
    // navigate to project detail
    this.router.navigate(["/my-projects/", project.id]);
  }

  form: FormGroup;

  // multiple dropdown properties
  dropdownSettings = {};

  // Selected competition
  competition = "";

  // innovation info
  innovationInfo = {
    productType: "",
    sector: "",
    otherProductType: "",
    otherSector: "",
    description: "",
    whatProblem: "",
    howToSolve: "",
    supportNeeded: [],
    parentsOccupation: ""
  };
  productTypes = [
    "Software (for Mobile Application)",
    "Software (for Web Application)",
    "Software (Desktop Application)",
    "Software (Industrial Application)",
    "Hardware",
    "SMS based application",
    "Hybrid Product (heavy both on Software and Hardware)",
    "Other"
  ];
  sectors = [
    "Agriculture and Fishery",
    "Health",
    "Education",
    "Finance",
    "Construction Industry",
    "Metallurgical Industry",
    "Transportation Sector",
    "Food and Beverage Processing",
    "Entertainment",
    "Tourism and Culture",
    "Other"
  ];

  parentOccupationOptions = [
    "Employee (Full time)",
    "Employee (Part time)",
    "Unemployed",
    "Business Owner",
    "Student",
    "Other"
  ];

  yesNoOptions = ["Yes", "No"];

  supportOptions = [
    "Business Support",
    "Financial Support",
    "Technical Support"
  ];
  languageOptions = ["Amharic", "English"];

  // further info
  furtherInfo = {
    whyParticipate: "",
    teamOrNah: "",
    teamOrNahReason: "",
    everBeenInCompetition: "",
    competitionEverBeen: "",
    mediaResource: [],
    mediaName: "",
    financialKnowHow: null,
    financialAccess: null
  };

  infoSources = [
    { item_id: 1, item_text: "Radio Advertisment" },
    { item_id: 2, item_text: "TV Advertisment" },
    { item_id: 3, item_text: "From iCog Labs Website" },
    { item_id: 4, item_text: "From Other Websites" },
    {
      item_id: 5,
      item_text:
        "Word of Mouth (You heard about it from your friends, teachers, parents etc)"
    },
    { item_id: 7, item_text: "Newspapers" },
    { item_id: 8, item_text: "Social Media (From iCog's Facebook)" },
    { item_id: 9, item_text: "Social Media (From US Embassy's Facebook)" },
    { item_id: 10, item_text: "Other" }
  ];

  howToParticipate = [
    "As a team",
    "May be As a team",
    "As an individual",
    "May be as an individual"
  ];

  // form steps
  formSteps = ["step-1", "step-2"];
  currentForm = this.formSteps[0];
  dropDownSettings2 = {
    singleSelection: false,
    idField: "item_id",
    textField: "item_text",
    selectAllText: "Select All",
    unSelectAllText: "UnSelect All",
    itemsShowLimit: 3,
    allowSearchFilter: true
  };

  isInnovationFormValid() {
    const isProductTypeValid =
      (this.innovationInfo.productType !== "" &&
        this.innovationInfo.productType !==
          this.productTypes[this.productTypes.length - 1]) ||
      (this.innovationInfo.productType ===
        this.productTypes[this.productTypes.length - 1] &&
        this.innovationInfo.otherProductType !== "");
    const isSectorValid =
      (this.innovationInfo.sector !== "" &&
        this.innovationInfo.sector !== this.sectors[this.sectors.length - 1]) ||
      (this.innovationInfo.sector === this.sectors[this.sectors.length - 1] &&
        this.innovationInfo.otherSector !== "");
    return (
      isProductTypeValid &&
      isSectorValid &&
      this.form.controls.innovationInfo["controls"].description.valid &&
      this.form.controls.innovationInfo["controls"].whatProblem.valid &&
      this.form.controls.innovationInfo["controls"].howToSolve.valid
    );
  }

  isFurtherInfoFormValid() {
    const isCompetitionEverBeenValid =
      this.furtherInfo.everBeenInCompetition === "no" ||
      (this.furtherInfo.everBeenInCompetition === "yes" &&
        this.form.controls.furtherInfo["controls"].competitionEverBeen.valid);
    return (
      this.form.controls.furtherInfo["controls"].whyParticipate.valid &&
      this.form.controls.furtherInfo["controls"].teamOrNah.valid &&
      this.form.controls.furtherInfo["controls"].teamOrNahReason.valid &&
      this.form.controls.furtherInfo["controls"].mediaResource.valid &&
      this.form.controls.furtherInfo["controls"].mediaName.valid &&
      isCompetitionEverBeenValid
    );
  }

  onNext() {
    if (this.isInnovationFormValid()) {
      if (
        this.innovationInfo.otherProductType !== "" &&
        this.innovationInfo.productType !==
          this.productTypes[this.productTypes.length - 1]
      ) {
        this.innovationInfo.otherProductType = "";
      }
      if (
        this.innovationInfo.otherSector !== "" &&
        this.innovationInfo.sector !== this.sectors[this.sectors.length - 1]
      ) {
        this.innovationInfo.otherSector = "";
      }
      this.toggleForm(1);
    } else {
      this.markFormGroupTouched(this.form.controls.innovationInfo);
    }
  }
  reset() {
    this.form.reset();
  }

  onJoin() {
    console.log("Here");
    if (this.isFurtherInfoFormValid()) {
      if (
        this.furtherInfo.competitionEverBeen !== "" &&
        this.furtherInfo.everBeenInCompetition === "no"
      ) {
        this.furtherInfo.competitionEverBeen = "";
      }
      this.innovationInfo = {
        ...this.innovationInfo,
        ...this.form.controls.innovationInfo["controls"].value
      };

      this.furtherInfo = {
        ...this.furtherInfo,
        ...this.form.controls.furtherInfo["controls"].value
      };
      this.selectedProject = {
        ...this.selectedProject,
        questionnaireAnswers: {
          innovationInfo: this.innovationInfo,
          furtherInfo: this.furtherInfo
        }
      };
      this.service
        .updateCompetitionProject(this.selectedProject.id, this.selectedProject)
        .subscribe(res => {
          console.log(res);
          $("#myModal").modal("hide");
        });
    } else {
      this.markFormGroupTouched(this.form.controls.furtherInfo);
    }
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

  // onItemSelect(item: any) {
  //   // this.furtherInfo.mediaResource.push(item);
  // }

  toggleForm(value) {
    this.currentForm = this.formSteps[value];
  }

  mapSupportToDropDown() {
    let result = [];
    this.supportOptions.forEach(item => {
      result.push({ item_id: item, item_text: item });
    });

    return result;
  }

  onItemSelected(item) {
    if (this.innovationInfo.supportNeeded.indexOf(item.item_id) === -1) {
      this.innovationInfo.supportNeeded.push(item.item_id);
    } else {
    }
  }

  onItemDeselected(item) {
    this.innovationInfo.supportNeeded.splice(
      this.innovationInfo.supportNeeded.indexOf(item.item_id),
      1
    );
  }

  onSelectAll(items) {
    items.forEach(item => {
      this.onItemSelected(item);
    });
  }

  onDeselectAll(items) {
    this.innovationInfo.supportNeeded = [];
  }
}
