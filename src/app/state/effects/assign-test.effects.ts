import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { mergeMap, map, catchError } from 'rxjs/operators';
import * as AssignTestActions from '../actions/assign-test.actions';
import { AssignTestService } from 'src/app/services/assignTest/assign-test.service';

@Injectable()
export class AssignTestEffects {
  loadAssignTests$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AssignTestActions.loadAssignTests),
      mergeMap(() =>
        this.assignTestService.getAllAssignTests().pipe(
          map((assignTests) => AssignTestActions.loadAssignTestsSuccess({ assignTests })),
          catchError(() => EMPTY)
        )
      )
    )
  );

  constructor(private actions$: Actions, private assignTestService: AssignTestService) {}
}
