import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { mergeMap, map, catchError, switchMap } from 'rxjs/operators';
import * as StudentActions from '../actions/student.actions';
import { StudentService } from 'src/app/services/student/student.service';

@Injectable()
export class StudentEffects {
    loadStudents$ = createEffect(() =>
        this.actions$.pipe(
        ofType(StudentActions.loadStudents),
        mergeMap(() =>
            this.studentService.getStudents().pipe(
            map((students) => StudentActions.loadStudentsSuccess({ students })),
            catchError(() => EMPTY)
            )
        )
        )
    );  

    constructor(private actions$: Actions, private studentService: StudentService) {}

}