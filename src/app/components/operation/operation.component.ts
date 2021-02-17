import { Component, OnInit } from '@angular/core';
import { Operation } from 'src/app/Models/Operation';

import { AuthenticationService } from 'src/app/services/authentication.service';
import { OperationService } from 'src/app/services/operation.service';

@Component({
  selector: 'app-operation',
  templateUrl: './operation.component.html',
  styleUrls: ['./operation.component.css']
})
export class OperationComponent implements OnInit {
  public userOperations = new Array<Operation>();
  private i = 0;

  constructor(
    private authenticationService: AuthenticationService,
    private operationService: OperationService
  ) { }

  // --- Getting user operations in the ngOnInit method --- //
  ngOnInit(): void {
    this.operationService.getUserOperations(this.authenticationService.getUser().id)
    .subscribe(
      result => {
        this.i = 0;
        for(let index of Object.keys(result['data']['userOperations'])) {
          this.userOperations[this.i] = new Operation();
          this.userOperations[this.i].idOp = result['data']['userOperations'][index]['id'];
          this.userOperations[this.i].dateOp = result['data']['userOperations'][index]['dateCr'];
          this.userOperations[this.i].textOp = result['data']['userOperations'][index]['text'];
          this.userOperations[this.i].resultOp = result['data']['userOperations'][index]['result'];
          this.userOperations[this.i].operationType = result['data']['userOperations'][index]['operationType']['nameOp'];
          this.i = this.i + 1;
        }
      },
      error => {
        console.log(error);
      }
    );
  }

}
