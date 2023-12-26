import { Component, Input } from '@angular/core';
import { AssignTest } from 'src/app/models/AssignTest/assign-test';

@Component({
  selector: 'app-assignment-test-details',
  templateUrl: './assignment-test-details.component.html',
  styleUrls: ['./assignment-test-details.component.css']
})
export class AssignmentTestDetailsComponent {
  @Input() assignTest: AssignTest | null = null;
  visible: boolean = false;

    showDialog() {
        this.visible = true;
    }
}