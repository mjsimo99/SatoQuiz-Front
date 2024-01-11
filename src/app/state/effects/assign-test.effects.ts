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
  addAssignTest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AssignTestActions.addAssignTest),
      mergeMap((action) =>
        this.assignTestService.addAssignTest(action.assignTest).pipe(
          map((assignTest) => AssignTestActions.addAssignTest({ assignTest })),
          catchError(() => EMPTY)
        )
      )
    )
  );

  updateAssignTest$ = createEffect(() =>
  this.actions$.pipe(
    ofType(AssignTestActions.updateAssignTest),
    mergeMap((action) => {
      const assignTestId = action.assignTest.assignTestId;
      
      if (assignTestId !== undefined) {
        return this.assignTestService.updateAssignTest(assignTestId, action.assignTest).pipe(
          map((updatedAssignTest) => AssignTestActions.updateAssignTest({ assignTest: updatedAssignTest })),
          catchError(() => EMPTY)
        );
      } else {
        return EMPTY;
      }
    })
  )
);


deleteAssignTest$ = createEffect(() =>
  this.actions$.pipe(
    ofType(AssignTestActions.deleteAssignTest),
    mergeMap((action) =>
      this.assignTestService.deleteAssignTest(action.assignTestId).pipe(
        map(() => AssignTestActions.deleteAssignTest({ assignTestId: action.assignTestId })),
        catchError(() => EMPTY)
      )
    )
  )
);

  constructor(private actions$: Actions, private assignTestService: AssignTestService) { }
}
