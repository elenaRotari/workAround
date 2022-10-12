import {
  getRoles,
  getCompanies,
  getDataByRole,
  getDataByCompany,
  salaryData,
} from "./salary.js";
let result = "";
const sectionRole = document.createElement("section");
const sectionCompany = document.createElement("section");
const h31 = document.createElement("h3");
h31.innerText = "Select role";
sectionRole.prepend(h31);
const showRes = () => {
  getRoles().forEach((el) => {
    const label = document.createElement("label");
    label.innerText = el;
    label.style = "color:white";
    const radioBtn = document.createElement("input");
    radioBtn.type = "radio";
    radioBtn.name = "roles";
    label.prepend(radioBtn);
    sectionRole.append(label);
    radioBtn.addEventListener("change", (event) => {
      const role = event.target.closest("label").innerText;
      result = getDataByRole(role);
      console.log(result);
    });
  });

  const h3 = document.createElement("h3");
  h3.innerText = "Select a company";
  sectionCompany.prepend(h3);
  getCompanies().forEach((el) => {
    const label = document.createElement("label");
    label.innerText = el;
    label.style = "color:white";
    const radioBtn = document.createElement("input");
    radioBtn.type = "radio";
    radioBtn.name = "companie";
    label.prepend(radioBtn);
    sectionCompany.append(label);

    // Button event Listner
    radioBtn.addEventListener("change", (event) => {
      const company = event.target.closest("label").innerText;
      // show sallary role with company
      console.log(getDataByCompany(company));
      document.querySelector("#salarySelected").innerText = `The salary of ${
        result[0].role
      } and ${company} is $${getDataByCompany(company)[0].salary.toFixed(2)}`;

      // reduce function by role to get avverage salary
      const byRole = getDataByRole(getDataByCompany(company, result)[0].role);
      const byRoleSalary =
        byRole.reduce((acc, el) => (acc += el.salary), 0) / byRole.length;
      document.querySelector(
        "#salaryAverageByRole"
      ).innerText = ` The average salary at ${
        result[0].role
      } positions is $${byRoleSalary.toFixed(2)}`;

      const byCompany = getDataByCompany(getDataByCompany(company)[0].company);

      // reduce function for average salaray by company
      const byCompanySalary =
        byCompany.reduce((acc, el) => (acc += el.salary), 0) / byCompany.length;
      document.querySelector(
        "#salaryAverageByCompany"
      ).innerText = ` The average salary at ${
        getDataByCompany(company, result)[0].company
      } is $${byCompanySalary.toFixed(2)}`;

      // reduce to get avverage salary for all industry
      const avverageAll =
        salaryData.reduce((acc, el) => {
          return (acc += el.salary);
        }, 0) / salaryData.length;
      document.querySelector(
        "#salaryAverageIndustry"
      ).innerText = `The average in the Tech industry is $${avverageAll.toFixed(
        2
      )}`;
    });
  });
};
showRes();
document.querySelector("main").prepend(sectionRole, sectionCompany);
