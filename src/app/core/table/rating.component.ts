import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'kendo-rating',
    template: `
        <span *ngFor="let item of stars" [ngClass]="ratingIcon(item)"></span>
    `,
    styles: [`
        .yellow {
            color: #ffa600;
        }
    `]
})
export class RatingComponent implements OnInit {
    @Input() public value: number | undefined;
    @Input() public max: number | undefined;

    public stars: number[] | undefined;

    public ngOnInit(): void {
        this.stars = new Array(this.max).fill(1).map((item, index) => item + index);
    }

    public ratingIcon(item: number): string {
        return 'k-icon k-i-star-outline';
    }
}