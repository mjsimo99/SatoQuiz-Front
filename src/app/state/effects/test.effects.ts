import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { mergeMap, map, catchError, switchMap } from 'rxjs/operators';
import * as TestActions from '../actions/test.actions';
import { TestService } from 'src/app/services/test/test.service';

@Injectable()
export class TestEffects {
    loadTests$ = createEffect(() =>
        this.actions$.pipe(
        ofType(TestActions.loadTests),
        mergeMap(() =>
            this.testService.getAllTests().pipe(
            map((tests) => TestActions.loadTestsSuccess({ tests })),
            catchError(() => EMPTY)
            )
        )
        )
    );  

    constructor(private actions$: Actions, private testService: TestService) {}

}