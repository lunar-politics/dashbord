window.addEventListener("DOMContentLoaded", function () {

  let students = [];
  let sortedStudents = [];
  let filtredSortedStudents = [];

  // function getStudents() {
  //   let localStudents = localStorage.getItem('table');
  //   if (localStudents !==null) {
  //     sortedStudents = JSON.parse(localStudents);
  //   }
  // }

  function hasSomething(value) {
    return !!value;
  }

  function byField(field) {
    return (a, b) => a[field] > b[field] ? 1 : -1;
  }

  // getStudents();
  studentsToTable(sortedStudents);

  document.querySelector('.adding-btn').addEventListener('click', function(event) {
    event.preventDefault();

    let emptyFields = [];
    let wrongDate = [];
    let student = {};
    let sortedStudent = {};

    let today = new Date();
    const firstBDay = new Date(1900, 0, 01);
    const firstEnterDay = new Date(2000, 0, 01);

    document.querySelector('.wrong-date').classList.remove('shown-mark');
    document.querySelector('.empty-field').classList.remove('shown-mark');

    student.surname = (document.querySelector('.surname').value).trim();
    if (hasSomething(student.surname) !== true) {
      let fieldName = document.querySelector('.surname').closest('label').textContent;
      emptyFields.push(fieldName);
    }
    sortedStudent.surname = student.surname;


    student.name = (document.querySelector('.name').value).trim();
    if (hasSomething(student.name) !== true) {
      let fieldName = document.querySelector('.name').closest('label').textContent;
      emptyFields.push(fieldName);
    }
    sortedStudent.name = student.name;

    student.patronymic = (document.querySelector('.patronymic').value).trim();
    if (hasSomething(student.patronymic) !== true) {
      let fieldName = document.querySelector('.patronymic').closest('label').textContent;
      emptyFields.push(fieldName);
    }
    sortedStudent.patronymic = student.patronymic;

    student.birthdate = document.querySelector('.birthdate').valueAsDate;
    let birthdate = document.querySelector('.birthdate').valueAsDate;
    if (hasSomething(student.birthdate) !== true) {
      let fieldName = document.querySelector('.birthdate').closest('label').textContent;
      emptyFields.push(fieldName);
    }
    if ((today < birthdate) || (birthdate < firstBDay)) {
      let fieldName = document.querySelector('.birthdate').closest('label').textContent;
      wrongDate.push(fieldName.trim());
    }
    // let birthdate = document.querySelector('.birthdate').valueAsDate;
    if (hasSomething(birthdate) == true) {
      let age = Math.floor((today.getTime() - birthdate.getTime()) / (24 * 3600 * 365.25 * 1000));
      sortedStudent.birthdate = ((document.querySelector('.birthdate').value).trim() + ' (' + age + ' лет)');
    }
    // let birthdate = document.querySelector('.birthdate').valueAsDate;
    // if (hasSomething(birthdate) == true) {
    //   let age = Math.floor((today.getTime() - birthdate.getTime()) / (24 * 3600 * 365.25 * 1000));
    //   student.birthdate = ((document.querySelector('.birthdate').value).trim() + ' (' + age + ' лет)');
    // }
    // if (hasSomething(birthdate) !== true) {
    //   let fieldName = document.querySelector('.birthdate').closest('label').textContent;
    //   emptyFields.push(fieldName);
    // }
    // if ((today < birthdate) || (birthdate < firstBDay)) {
    //   let fieldName = document.querySelector('.birthdate').closest('label').textContent;
    //   wrongDate.push(fieldName.trim());
    // }

    student.enterDate = document.querySelector('.enter-date').value;
    let enterDate = student.enterDate;
    if (hasSomething(student.enterDate) !== true) {
      let fieldName = document.querySelector('.enter-date').closest('label').textContent;
      emptyFields.push(fieldName);
    }
    let finishYear = Number(enterDate) + 4;
    let course = today.getFullYear() - enterDate;
    if (course > 4) {
      sortedStudent.enterDate = enterDate + '-' + finishYear + ' (закончил)';
    }
    else if ((course == 4) && (today.getMonth() < 8)) {
      sortedStudent.enterDate = enterDate + '-' + finishYear + ' (4 курс)';
    }
    else if (course == 0) {
      sortedStudent.enterDate = enterDate + '-' + finishYear + ' (1 курс)';
    }
    else {
      sortedStudent.enterDate = enterDate + '-' + finishYear + ' (' + course + ' курс)';
    }

    if ((enterDate < firstEnterDay.getFullYear()) || (enterDate > today.getFullYear())) {
      let fieldName = document.querySelector('.enter-date').closest('label').textContent;
      wrongDate.push(fieldName.trim());
    }

    student.faculty = (document.querySelector('.faculty').value).trim();
    if (hasSomething(student.faculty) !== true) {
      let fieldName = document.querySelector('.faculty').closest('label').textContent;
      emptyFields.push(fieldName);
    }
    sortedStudent.faculty = student.faculty;

    if (emptyFields.length > 0) {
      document.querySelector('.empty-field > span').innerHTML = '';
      let shownEmptyFields = emptyFields.map(item => item.trim()).join(', ');
      document.querySelector('.empty-field').classList.add('shown-mark');
      document.querySelector('.empty-field > span').insertAdjacentHTML('beforeend', shownEmptyFields);
      return
    }

    if (wrongDate.length > 0) {
      document.querySelector('.wrong-date > span').innerHTML = '';
      let shownWrongDate = wrongDate.map(item => item.trim()).join(', ');
      document.querySelector('.wrong-date').classList.add('shown-mark');
      document.querySelector('.wrong-date > span').insertAdjacentHTML('beforeend', shownWrongDate);
      return
    }

    students.push(student);

    // localStorage.setItem("table", JSON.stringify(students));

    sortedStudents.push(sortedStudent);

    studentToTable(sortedStudent);

    document.querySelectorAll('input').forEach(function(el) {
      el.value = '';
    })

  })

  document.querySelector('.table-surname').addEventListener('click', function(event) {
    clearTable();
    if (filtredSortedStudents.length > 0) {
      filtredSortedStudents.sort(byField('surname'));
      filtredSortedStudents.forEach(el => studentToTable(el));
    } else {
      sortedStudents.sort(byField('surname'));
      sortedStudents.forEach(el => studentToTable(el));
    }
  });

  document.querySelector('.table-name').addEventListener('click', function(event) {
    clearTable();
    if (filtredSortedStudents.length > 0) {
      filtredSortedStudents.sort(byField('name'));
      filtredSortedStudents.forEach(el => studentToTable(el));
    } else {
      sortedStudents.sort(byField('name'));
      sortedStudents.forEach(el => studentToTable(el));
    }

  });

  document.querySelector('.table-patronymic').addEventListener('click', function(event) {
    clearTable();
    if (filtredSortedStudents.length > 0) {
      filtredSortedStudents.sort(byField('patronymic'));
      filtredSortedStudents.forEach(el => studentToTable(el));
    } else {
      sortedStudents.sort(byField('patronymic'));
      sortedStudents.forEach(el => studentToTable(el));
    }
  });

  document.querySelector('.table-birthdate').addEventListener('click', function(event) {
    clearTable();
    if (filtredSortedStudents.length > 0) {
      filtredSortedStudents.sort(byField('birthdate'));
      filtredSortedStudents.forEach(el => studentToTable(el));
    } else {
      sortedStudents.sort(byField('birthdate'));
      sortedStudents.forEach(el => studentToTable(el));
    }
  });

  document.querySelector('.table-enter-date').addEventListener('click', function(event) {
    clearTable();
    if (filtredSortedStudents.length > 0) {
      filtredSortedStudents.sort(byField('enterDate'));
      filtredSortedStudents.forEach(el => studentToTable(el));
    } else {
    sortedStudents.sort(byField('enterDate'));
    sortedStudents.forEach(el => studentToTable(el));
    }
  });

  document.querySelector('.table-faculty').addEventListener('click', function(event) {
    clearTable();
    if (filtredSortedStudents.length > 0) {
      filtredSortedStudents.sort(byField('faculty'));
      filtredSortedStudents.forEach(el => studentToTable(el));
    } else {
      sortedStudents.sort(byField('faculty'));
      sortedStudents.forEach(el => studentToTable(el));
    }
  });


  function checkFilds() {
    let nameToFind = document.querySelector('#search-name').value;
    let facultyToFind = document.querySelector('#search-faculty').value;
    let enterYearToFind = document.querySelector('#search-enter-year').value;
    let finishYearToFind = document.querySelector('#search-finish-year').value;

    clearTable();

    filtredSortedStudents = [];

    sortedStudents.forEach((el) => {
      if (((el.name.includes(nameToFind)) || (el.surname.includes(nameToFind)) || (el.patronymic.includes(nameToFind)) || (hasSomething(nameToFind) == false)) && ((el.faculty.includes(facultyToFind)) || (hasSomething(facultyToFind) == false)) && ((((el.enterDate).split('-')[0]) == enterYearToFind) || (hasSomething(enterYearToFind) == false)) && ((Number(((el.enterDate).split('-')[0])) + 4 == finishYearToFind) || (hasSomething(finishYearToFind) == false))) {
        studentToTable(el);
        filtredSortedStudents.push(el);
      }
    });

    if ((nameToFind == 0) && (facultyToFind == 0) && (enterYearToFind == 0) && (finishYearToFind == 0)) {
      clearTable();
      studentsToTable(sortedStudents);
    }
  }

  document.querySelector('#search-name').addEventListener('input', function(event) {
    checkFilds();
  });

  document.querySelector('#search-faculty').addEventListener('input', function(event) {
    checkFilds();
  });

  document.querySelector('#search-enter-year').addEventListener('input', function(event) {
    checkFilds();
  });

  document.querySelector('#search-finish-year').addEventListener('input', function(event) {
    checkFilds();
  });


  function studentToTable (student) {
    let row = document.createElement('tr');
    document.querySelector('.table>tbody').append(row);
    for (key in student) {
      let td = document.createElement('td');
      td.textContent = student[key];
      row.append(td);
    }
  }

  function studentsToTable (students) {
    students.forEach((el) => {
      studentToTable(el);
    })
  }

  function clearTable() {
    document.querySelectorAll('td').forEach((el) => {
      el.remove();
    })
  }
})



