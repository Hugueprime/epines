class optionalSummaryCourseController {
  constructor() {
    this.numberCourses = document.querySelectorAll(
      "[data-region='course-content']"
    );
    if (this.numberCourses != 0) {
      this.execute();
    }
  }

  update() {
    const numberOfEpineHide = document.getElementsByClassName(
      "epines-hidden-summary"
    ).length;
    const newNumberCourses = document.querySelectorAll(
      "[data-region='course-content']"
    ).length;

    if (
      newNumberCourses != this.numberCourses ||
      numberOfEpineHide != newNumberCourses
    ) {
      this.execute();
      this.numberCourses = document.querySelectorAll(
        "[data-region='course-content']"
      );
    }
  }

  execute() {
    const courses = document.querySelectorAll("[data-region='course-content']");
    for (let i = 0; i < courses.length; i++) {
      const summary = courses[i].getElementsByClassName("course-summary");
      if (summary.length && !summary[0].classList.contains("epines-hidden-summary"))
        hide_option(summary[0], "Show description (hidden by epines)", "epines-hidden-summary");
    }
  }
}
