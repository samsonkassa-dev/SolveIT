import {Directive, OnInit, OnDestroy, ElementRef} from "@angular/core";
/**
 * Created by tsadik on 4/24/17.
 */
declare var $: any

@Directive({
    selector: '.nav'
})
export class InitializeNav implements OnInit, OnDestroy {

    constructor(private el: ElementRef) {
    }

    public ngOnInit() {
        $(this.el.nativeElement).nav();
    }

    public ngOnDestroy() {
        $(this.el.nativeElement).nav('destroy');
    }
}