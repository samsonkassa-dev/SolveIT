import { Component, OnInit, Input, EventEmitter, Output } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ProjectService } from "../project.service";
import { AuthService } from "../../Auth/services/auth.service";

@Component({
  selector: "app-profile-modal",
  templateUrl: "./investorProfileModal.component.html",
  styleUrls: ["./investorProfileModal.component.css"]
})
export class InvestorProfileModalComponent implements OnInit {
    
  @Input() previousProfile: any = null;
  formSteps = ["step-1", "step-2"];
  currentForm = this.formSteps[0];
  public profile: any = {underReview: true};
  public equities = ['1-10%', '11-15%', '16-20%', '21-25%', '26-30%'];
  public sectors = [
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
  public ecommerceModels = ['B2B', 'B2C', 'B2G', 'C2C', 'C2B', 'G2C'];
  public annualRevenues = ['500,000 ETB or less', ' 500,001 to 1,000,000 ETB', '1,000,001 to 2,000,000 ETB', '2,000,001 ETB or above'];
  public bussinessModels = ['Hidden revenue business model', 'One-for-one business model', 'Razor and blade revenue model', 'Cash conversion cycle or cash machine business model', 'Peer-to-peer business model', 'Multi-sided platform business model', 'Direct sales business model', 'Freemium business model', 'Affiliate marketing business model', 'Subscription business model', '(Management) consulting business model', 'Agency-based business model', 'Vertically integrated supply chain business model', 'E-commerce marketplace business model', 'The discount business model that focuses on high quality', 'Attention merchant business model', 'Privacy as an innovative business model', 'The most successful franchising business model in the world', 'On-demand subscription-based business model', 'User-generated content business model', 'The educational niche business model', 'A mix of chain and franchise business model', 'Instant news business model', 'Blockchain-based business models', 'Multi-brand business model', 'Family-owned integrated business model', 'Humanist enterprise business model', 'Direct-to-consumers business model', 'Enterprise business model built on complex sales', 'Distribution based business model']
  public preferedConsumers = ['Upper Class', 'Lower Class', 'Middle Class', 'Young', 'Old', 'Adult', 'Male', 'Female', 'Illiterate', 'Literate']
  public projectStates = ['Idea', 'Development Stage', 'Beta version', 'Market Tested'];
  public form: FormGroup;

  constructor(public fb: FormBuilder, public service: ProjectService, public authService: AuthService) {}
  
  ngOnInit() {
    this.form = this.fb.group({
        minimumCapital: ["", Validators.required],
        maximumCapital: ["", Validators.required],
        equity: ["", Validators.required],
        sector: ["", Validators.required],
        horizonSector: ["", Validators.required],
        previousExperience: ["", Validators.required],
        specificPreference: ["", Validators.required],
        ecommerceModel: ["", Validators.required],
        annualRevenue: ["", Validators.required],
        bussinessModel: ["", Validators.required],
        preferedConsumer: [[], Validators.required],
        projectState: ["", Validators.required]
    });
  }

  submitProfile() {
    this.service.patchInvestorProfile(this.previousProfile.id, this.profile).subscribe(res => {
        //console.log(res);
    })
  }

}
