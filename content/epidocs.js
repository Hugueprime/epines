function isEpidocsUrl() {
    return url.includes("https://past-exams.epidocs.eu");
}

const CORRECTION_TAG = "@correction_epidocs";

function mainEpidocs() {

    if (url.includes(".pdf"))
    {
        addAnswerSheet();
    }

}

function addAnswerSheet() {
    
    const url_correction = window.location.href.replace("?", "").replace(".pdf", "-correction.csv");

    const div = document.createElement("div");
    const courses = document.createElement("ul");
    const title = document.createElement("h4");
    title.textContent = "Answers";
    title.classList.add("epines-title");
    div.appendChild(title);
    div.appendChild(courses);
    courses.classList.add("epines-hide")
    courses.id = "epines-courses-mcq";

    div.id = ("epines-mcq-answers");

    title.addEventListener("click", () => { courses.classList.toggle("epines-hide") });

    fetch(url_correction).then(r => r.text()).then(result => {
        const lines = result.split("\n");
        
        // append title
        lines[0].split(',').forEach((elt, index) => {
            if (index == 0) return;
            const span = document.createElement("span");
            const course = document.createElement("li");
            course.textContent = elt;
            course.classList.add("epines-course-mcq");
            span.appendChild(course);
            span.classList.add("epines-course");
            const answers = document.createElement("ol");
            answers.classList.add("epines-hide");
            answers.classList.add("epines-list-result-mcq");
            course.addEventListener("click", () => { answers.classList.toggle("epines-hide") });
            
            span.appendChild(answers);
            courses.appendChild(span);
        });

        // append answers
        for (let i = 1; i < lines.length; i++) {
            if (lines[i] == "") continue;
            lines[i] = lines[i].trim();

            lines[i].split(',').forEach((elt, index) => {
                if (index == 0) return;
                const answer = document.createElement("li");
                const span = document.createElement("span");
                span.textContent = elt;
                span.classList.add("epines-spoiler");
                answer.classList.add("epines-answer-mcq");
                answer.appendChild(span);
                courses.getElementsByClassName("epines-course")[(index-1)].children[1].appendChild(answer);
            });          
        }

        // add a checkbox to active and disactive the spoiler mode
        const checkboxSpoiler = document.createElement("input");
        const label = document.createElement("label");
        checkboxSpoiler.type = "checkbox";
        checkboxSpoiler.checked = true;
        checkboxSpoiler.id = "spoilerMode";
        label.textContent = "spoiler";
        label.style.padding = "0 5px";
        label.setAttribute("for", "spoilerMode");
        div.appendChild(checkboxSpoiler);
        div.appendChild(label);
        checkboxSpoiler.addEventListener("change", (e) => {
            const elts = document.getElementsByClassName("epines-answer-mcq");
            if (e.target.checked) {
                for (let i = 0; i < elts.length; i++) {
                    elts[i].firstChild.classList.add("epines-spoiler");
                }
            } else {
                for (let i = 0; i < elts.length; i++) {
                    elts[i].firstChild.classList.remove("epines-spoiler");
                }
            }
        });

        document.body.children[0].appendChild(div);
    });
}