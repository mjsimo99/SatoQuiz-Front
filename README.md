## API Documentation

### Answers

#### Add Answer
- **URL:** `POST http://localhost:8080/answers/add`
- **Description:** Add a new answer.
- **Request Body:**
  ```json
  {
  "answerText": "answer 1"
  }

#### Get All Answers
- **URL:** `GET http://localhost:8080/answers/all`
- **Description:** Get a list of all answers.

#### Get Answer by ID
- **URL:** `GET http://localhost:8080/answers/{answerId}`
- **Description:** Get a specific answer by its ID.

#### Update Answer
- **URL:** `PUT http://localhost:8080/update/{answerId}`
- **Description:** Update a specific answer.
- **Request Body:**
  ```json
  {
    "answerText": "new_answer"
  }

#### Delete Answer
- **URL:** `DELETE http://localhost:8080/{answerId}`
- **Description:** Delete a specific answer.

______________________________________________________________


### Questions

#### Add Question
- **URL:** `POST http://localhost:8080/questions/add-with-media`
- **Description:** Add a new question.
- **Request Body:**
  ```json
  {
  "answersNumber": 4,
  "answersNumberCorrect": 1,
  "text": "What is Angular?",
  "type": "double",  
  "scorePoints": 10.0,
  "subject": {
    "subjectId": 1
  },
  "level": {
    "levelId": 1
  },

  "mediaList": [
    {
      "mediaId": 1,
      "url": "https://satoru.com/satoru.jpg",
      "type": "IMAGE"
    }
  ],
}

#### Get All Questions
- **URL:** `GET http://localhost:8080/questions/all`
- **Description:** Get a list of all question.

#### Get Question by ID
- **URL:** `GET http://localhost:8080/{id}`
- **Description:** Get a specific question by its ID.

#### Update Question
- **URL:** `PUT http://localhost:8080/update/{id}`
- **Description:** Update a specific questions.
- **Request Body:**
  ```json
    {
  "answersNumber": 4,
  "answersNumberCorrect": 1,
  "text": "What is Java?",
  "type": "double",  
  "scorePoints": 10.0,
  "subject": {
    "subjectId": 1
  },
  "level": {
    "levelId": 1
  },

  "mediaList": [
    {
      "mediaId": 1,
      "url": "https://satoru.com/satoru.jpg",
      "type": "IMAGE"
    }
  ],
}


________________________________________


### Teachers

#### Add Teacher
- **URL:** `POST http://localhost:8080/teachers/add`
- **Description:** Add a new teacher.
- **Request Body:**
  ```json
  {
  "firstName": "Mr",
  "lastName": "Hassan",
  "dateOfBirth": "1990-01-01",
  "address": "safi",
  "specialty": "Java"
  }

#### Get All Teachers
- **URL:** `GET http://localhost:8080/teachers/all`
- **Description:** Get a list of all teacher.

#### Get Teacher by ID
- **URL:** `GET http://localhost:8080/teachers/{teacherId}`
- **Description:** Get a specific teacher by its ID.

#### Update Teacher
- **URL:** `PUT http://localhost:8080/teachers/{teacherId}`
- **Description:** Update a specific teacher.
- **Request Body:**
  ```json
  {
  "firstName": "Mr",
  "lastName": "Hassan",
  "dateOfBirth": "1990-01-02",
  "address": "safi",
  "specialty": "Java"
  }

#### Delete Teacher
- **URL:** `DELETE http://localhost:8080/{teacherId}`
- **Description:** Delete a specific teacher.

#### Delete Teacher
- **URL:** `DELETE http://localhost:8080/{teacherId}`
- **Description:** Delete a specific teacher.

_________________________________________________

### Students

#### Add Student
- **URL:** `POST http://localhost:8080/students/add`
- **Description:** Add a new student.
- **Request Body:**
  ```json
  {
    "firstName": "Mhamed-Amine",
    "lastName": "Majidi",
    "dateOfBirth": "2001-06-29",
    "address": "safi",
    "registrationDate": "2022-05-11"
  }

#### Get All Students
- **URL:** `GET http://localhost:8080/students/all`
- **Description:** Get a list of all students.

#### Get Student by ID
- **URL:** `GET http://localhost:8080/students/{studentId}`
- **Description:** Get a specific student by its ID.

#### Update Student
- **URL:** `PUT http://localhost:8080/students/update/{studentId}`
- **Description:** Update a specific student.
- **Request Body:**
  ```json
   {
    "firstName": "Mhamed-Amine",
    "lastName": "Majidi",
    "dateOfBirth": "2001-06-29",
    "address": "safi",
    "registrationDate": "2022-05-12"
  }

#### Delete Student
- **URL:** `DELETE http://localhost:8080/students/delete/{studentId}`
- **Description:** Delete a specific student.


___________________________________________________________


### Levels


#### Add Level
- **URL:** `POST http://localhost:8080/levels/add`
- **Description:** Add a new level.
- **Request Body:**
  ```json
  {
    "description": "Intermediate",
    "maxPoints": 100.0,
    "minPoints": 50.0
  }


#### Get All Levels
- **URL:** `GET http://localhost:8080/levels/all`
- **Description:** Get a list of all levels.

#### Get Level by ID
- **URL:** `GET http://localhost:8080/levels/{id}`
- **Description:** Get a specific level by its ID.

#### Update Level
- **URL:** `PUT http://localhost:8080/levels/update/{id}`
- **Description:** Update a specific level.
- **Request Body:**
  ```json
  {
    "description": "Advanced",
    "maxPoints": 150.0,
    "minPoints": 75.0
  }

#### Delete Level
- **URL:** `DELETE http://localhost:8080/levels/delete/{id}`
- **Description:** Delete a specific level.


_____________________________________________________________


### Assignements



#### Add Assign Test
- **URL:** `POST http://localhost:8080/assign-tests/add`
- **Description:** Add a new assign test.
- **Request Body:**
  ```json
  {
    "startDate": "2023-01-01T12:00:00",
    "endDate": "2023-01-10T12:00:00",
    "raison": "Assignment for Java Test",
    "attemptNumber": 3,
    "finalResult": 85.5,
    "student": {
      "studentId": 1
    },
    "test": {
      "testId": 1
    }
  }

#### Get All Assign Tests
- **URL:** `GET http://localhost:8080/assign-tests/all`
- **Description:** Get a list of all assign tests.

#### Get Assign Test by ID
- **URL:** `GET http://localhost:8080/assign-tests/{assignTestId}`
- **Description:** Get a specific assign test by its ID.

#### Update Assign Test
- **URL:** `PUT http://localhost:8080/assign-tests/update/{assignTestId}`
- **Description:** Update a specific assign test.
- **Request Body:**
  ```json
  {
    "startDate": "2023-01-05T12:00:00",
    "endDate": "2023-01-15T12:00:00",
    "raison": "Updated Assignment",
    "attemptNumber": 4,
    "finalResult": 90.0,
    "student": {
      "studentId": 1
    },
    "test": {
      "testId": 1
    }
  }

#### Delete Assign Test
- **URL:** `DELETE http://localhost:8080/assign-tests/{assignTestId}`
- **Description:** Delete a specific assign test.


___________________________________________________________________


### Reponses

#### Add Reponse
- **URL:** `POST http://localhost:8080/reponses/add`
- **Description:** Add a new reponse.
- **Request Body:**
  ```json
  {
    "questionResult": 8.5,
    "assignTest": {
      "assignTestId": 1
    },
    "validation": {
      "answer": {
        "answerId": 3
      },
      "question": {
        "questionId": 33
      }
  }

#### Delete All Responses by Assign Test ID
- **URL:** `DELETE http://localhost:8080/reponses/delete-all/{assignTestId}`
- **Description:** Delete all responses associated with a specific assign test.

#### Delete Reponse
- **URL:** `DELETE http://localhost:8080/reponses/{reponseId}`
- **Description:** Delete a specific reponse.
  

#### Get All Reponses
- **URL:** `GET http://localhost:8080/reponses/all`
- **Description:** Get a list of all reponses.

#### Get Reponse by ID
- **URL:** `GET http://localhost:8080/reponses/{reponseId}`
- **Description:** Get a specific reponse by its ID.

#### Update Reponse
- **URL:** `PUT http://localhost:8080/reponses/update/{reponseId}`
- **Description:** Update a specific reponse.
- **Request Body:**
  ```json
  {
    "questionResult": 9.0,
    "assignTest": {
      "assignTestId": 1
    },
  "validation": {
    "answer": {
      "answerId": 3
    },
    "question": {
      "questionId": 33
    }
  }

#### Delete Reponse
- **URL:** `DELETE http://localhost:8080/reponses/{reponseId}`
- **Description:** Delete a specific reponse.


_________________________________________________________________


#### Add Subject
- **URL:** `POST http://localhost:8080/subjects/add`
- **Description:** Add a new subject.
- **Request Body:**
  ```json
  {
    "intitule": "Parent Subject"
  }

#### Get All Subjects
- **URL:** `GET http://localhost:8080/subjects/all`
- **Description:** Get a list of all subjects.

#### Get Subject by ID
- **URL:** `GET http://localhost:8080/subjects/{subjectId}`
- **Description:** Get a specific subject by its ID.

#### Update Subject
- **URL:** `PUT http://localhost:8080/subjects/{subjectId}`
- **Description:** Update a specific subject.
- **Request Body:**
  ```json
  {
    "intitule": "Updated Subject"
  }

#### Add Child Subject
- **URL:** `POST http://localhost:8080/subjects/add`
- **Description:** Add a child subject.
- **Request Body:**
  ```json
  {
    "intitule": "Child Subject",
    "parent": {
      "id": 1
    }
  }

#### Delete Subject
- **URL:** `DELETE http://localhost:8080/subjects/{subjectId}`
- **Description:** Delete a specific subject.


____________________________________________________________

### Tests(Quizzes)


#### Add Test
- **URL:** `POST http://localhost:8080/tests/add`
- **Description:** Add a new test.
- **Request Body:**
  ```json
  {
    "successScore": "80%",
    "viewAnswer": true,
    "viewResult": true,
    "maxAttempt": 3,
    "remark": "Test remark",
    "instructions": "Test instructions",
    "teacher": {
      "teacherId": 1
    }
  }

#### Get All Tests
- **URL:** `GET http://localhost:8080/tests/all`
- **Description:** Get a list of all tests.

#### Get Test by ID
- **URL:** `GET http://localhost:8080/tests/{testId}`
- **Description:** Get a specific test by its ID.

#### Update Test
- **URL:** `PUT http://localhost:8080/tests/update/{testId}`
- **Description:** Update a specific test.
- **Request Body:**
  ```json
  {
    "successScore": "90%",
    "viewAnswer": false,
    "viewResult": false,
    "maxAttempt": 2,
    "remark": "Updated test remark",
    "instructions": "Updated test instructions",
    "teacher": {
      "teacherId": 1
    }
  }

#### Delete Test
- **URL:** `DELETE http://localhost:8080/tests/{testId}`
- **Description:** Delete a specific test.


___________________________________________________________

### TestQuestions


#### Get Test Questions by Test ID
- **URL:** `GET http://localhost:8080/testquestions/by-test/{testId}`
- **Description:** Get a list of test questions by test ID.

#### Add Test Question
- **URL:** `POST http://localhost:8080/testquestions/add`
- **Description:** Add a new test question.
- **Request Body:**
  ```json
  {
    "test": {
      "testId": 1
    },
    "question": {
      "questionId": 1
    },
    "temporize": 60
  }

#### Get All Test Questions
- **URL:** `GET http://localhost:8080/testquestions/all`
- **Description:** Get a list of all test questions.

#### Get Test Question by Test and Question ID
- **URL:** `GET http://localhost:8080/testquestions/{testId}/{questionId}`
- **Description:** Get a specific test question by test and question ID.





________________________________________________________________________


### Validations


#### Add Validation
- **URL:** `POST http://localhost:8080/validations/add`
- **Description:** Add a new validation.
- **Request Body:**
  ```json
  {
    "answer": {
      "answerId": 1
    },
    "question": {
      "questionId": 1
    },
    "points": 5.0
  }

#### Get All Validations
- **URL:** `GET http://localhost:8080/validations/all`
- **Description:** Get a list of all validations.

#### Get Validation by Question and Answer ID
- **URL:** `GET http://localhost:8080/validations/{questionId}/{answerId}`
- **Description:** Get a specific validation by question and answer ID.

#### Delete Validation
- **URL:** `DELETE http://localhost:8080/validations/{questionId}/{answerId}`
- **Description:** Delete a specific validation.

#### Update Validation
- **URL:** `PUT http://localhost:8080/validations/update/{questionId}/{answerId}`
- **Description:** Update a specific validation.
- **Request Body:**
  ```json
  {
    "answer": {
      "answerId": 1
    },
    "question": {
      "questionId": 1
    },
    "points": 8.0
  }
