
const fs = require("fs");
const inquirer = require("inquirer");
const { title } = require("process");
const { table } = require("console");



// array of questions for user
const questions = [
    {
        type: "input",
        name: "repositoryName",
        message: "Enter the name/title of application! (Required)",
        validate: (repoNameInput) => {
            if (repoNameInput) {
                return true;
            } else {
                console.log("Enter the name of app!");
                return false;
            }
        },
    },
    {
        type: "input",
        name: "githubUser",
        message: "Enter your Github username! (Required)",
        validate: (githubUserInput) => {
            if (githubUserInput) {
                return true;
            } else {
                console.log("Enter your Github username!");
                return false;
            }
        },
    },
    {
        type: "input",
        name: "description",
        message: "Enter a description for your app! (Required)",
        validate: (descInput) => {
            if (descInput) {
                return true;
            } else {
                console.log("Enter a description!");
                return false;
            }
        },
    },
    {
        type: "input",
        name: "video", // Link to stored answer
        message: "location of screenshot or video ?",
    },
    {
        type: "input",
        name: "installation",
        message:
            "Enter some instructions for users to install your app! (Required)",
        validate: (instalInput) => {
            if (instalInput) {
                return true;
            } else {
                console.log("Enter instructions");
                return false;
            }
        },
    },
    {
        type: "input",
        name: "usage",
        message: "Enter some instructions for users to use your app! (Required)",
        validate: (usageInput) => {
            if (usageInput) {
                return true;
            } else {
                console.log("Enter instructions");
                return false;
            }
        },
    },
    {
        type: "list",
        name: "license",
        message: "What is the licensing for your app?(Required)",
        choices: ["NONE", "GPL V3", "EPL 1.0", "MIT", "MPL 2.0"],
        validate: (licenseInput) => {
            if (licenseInput) {
                return true;
            } else {
                console.log("Enter none for no license!");
                return false;
            }
        },
    },
    {
        type: "confirm",
        name: "confirmIssues",
        message: "Would you like people to report issues?",
        default: false,
    },
    {
        type: "input",
        name: "issues",
        message: "Provide a way for users to contact you!",
        when: ({ confirmIssues }) => confirmIssues,
    },
    {
        type: "input",
        name: "contributors",
        message: 'List other contributors, if no others type "none"?(Required)',
        validate: (contributorsInput) => {
            if (contributorsInput) {
                return true;
            } else {
                console.log("Enter none for no contributors!");
                return false;
            }
        },
    },
    {
        type: "input",
        name: "tests",
        message: "List the tests that have been preformed on this app!(Required)",
        validate: (testsInput) => {
            if (testsInput) {
                return true;
            } else {
                console.log("List Tests Completed!");
                return false;
            }
        },
    },
    {
        type: "input",
        name: "contact",
        message:
            "Enter an email address for users to contact you and ask questions!(Required)",
        validate: (contactInput) => {
            if (contactInput) {
                return true;
            } else {
                console.log("Contact info added!");
                return false;
            }
        },
    },
];

// Functions
function init() {
    const toc =
        "  \n ## Table of Contents:  \n[1. Description](#Description)  \n[2. Installation](#Installation)  \n[3. App Usage](#App-Usage)  \n[4. License Details](#License-Details)  \n[5. List of Contributors](#List-of-Contributors)  \n[6. Tests](#Tests)  \n[7. Questions](#Questions)  \n";
    inquirer.prompt(questions).then((res) => {
        title();
        function title() {
            fs.writeFile(
                "./Product/README.md",
                `# ${res.repositoryName}  \r\n`,
                (err) => {
                    if (err) {
                        console.log(err);
                        return;
                    }
                    console.log("Repository Name added!");
                    licenseBadge();
                }
            );
        }
        function licenseBadge() {
            if (res.license === "NONE") {
                fs.appendFileSync(
                    "./Product/README.md",
                    `[![License: NONE](https://img.shields.io/badge/License-none-red.svg)](https://choosealicense.com/licenses/)`,
                    (err) => {
                        if (err) {
                            console.log(err);
                            return;
                        }
                        console.log("License is GPL V3!");
                        table();
                    }
                );
            } else if (res.license === "GPL V3") {
                fs.appendFileSync(
                    "./Product/README.md",
                    `[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://choosealicense.com/licenses/gpl-3.0/)`,
                    (err) => {
                        if (err) {
                            console.log(err);
                            return;
                        }
                        console.log("License is GPL V3!");
                        table();
                    }
                );
            } else if (res.license === "EPL 1.0") {
                fs.appendFileSync(
                    "./Product/README.md",
                    `[![License](https://img.shields.io/badge/License-EPL%201.0-red.svg)](https://opensource.org/licenses/EPL-1.0)`,
                    (err) => {
                        if (err) {
                            console.log(err);
                            return;
                        }
                        console.log("License is EPL 1.0!");
                        table();
                    }
                );
            } else if (res.license === "MIT") {
                fs.appendFileSync(
                    "./Product/README.md",
                    `[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)`,
                    (err) => {
                        if (err) {
                            console.log(err);
                            return;
                        }
                        console.log("License is MIT!");
                        table();
                    }
                );
            } else if (res.license === "MPL 2.0") {
                fs.appendFileSync(
                    "./Product/README.md",
                    `[![License: MPL 2.0](https://img.shields.io/badge/License-MPL%202.0-brightgreen.svg)](https://opensource.org/licenses/MPL-2.0)`,
                    (err) => {
                        if (err) {
                            console.log(err);
                            return;
                        }
                        console.log("License is MPL 2.0!");
                        table();
                    }
                );
            }
            table();
        }
        function table() {
            fs.appendFile("./Product/README.md", `${toc}`, (err) => {
                if (err) {
                    console.log(err);
                    return;
                }
                console.log("Table of Contents added!");
                description();
            });
        }
        function video() {
            fs.appendFile(
                "./Product/README.md",
                `## video:\n${res.video}\n`,
                (err) => {
                    if (err) {
                        console.log(err);
                        return;
                    }
                    console.log("Image/Video added!");
                    instal();
                }
            );
        }
        function description() {
            fs.appendFile(
                "./Product/README.md",
                `## Description:\n${res.description}\n`,
                (err) => {
                    if (err) {
                        console.log(err);
                        return;
                    }
                    console.log("Description added!");
                    instal();
                }
            );
        }
        function instal() {
            fs.appendFile(
                "./Product/README.md",
                `## Installation:\n${res.installation}\n`,
                (err) => {
                    if (err) {
                        console.log(err);
                        return;
                    }
                    console.log("Install instructions added!");
                    usageFunc();
                }
            );
        }
        function usageFunc() {
            fs.appendFile(
                "./Product/README.md",
                `## App Usage:\n${res.usage}\n`,
                (err) => {
                    if (err) {
                        console.log(err);
                        return;
                    }
                    console.log("User instructions added!");
                    licensing();
                }
            );
        }

        function licensing() {
            fs.appendFile(
                "./Product/README.md",
                `## License Details:  \n Open source licenses grant permission for anybody to use, modify, and share licensed software for any purpose, subject to conditions preserving the provenance and openness of the software. The following licenses are sorted by the number of conditions, from most (GNU AGPLv3) to none (Unlicense). Notice that the popular licenses featured on the home page (GNU GPLv3 and MIT) fall within this spectrum. `,
                (err) => {
                    if (err) {
                        console.log(err);
                        return;
                    }
                    console.log("License added!");
                    loc();
                }
            );
        }
        function loc() {
            fs.appendFile(
                "./Product/README.md",
                `  \n## List of Contributors:\n${res.contributors}\n`,
                (err) => {
                    if (err) {
                        console.log(err);
                        return;
                    }
                    console.log("Contributor list added!");
                    testing();
                }
            );
        }
        function testing() {
            fs.appendFile("./Product/README.md", `## Tests:\n${res.tests}\n`, (err) => {
                if (err) {
                    console.log(err);
                    return;
                }
                console.log("Tests Listed!");
                questioning();
            });
        }
        function questioning() {
            fs.appendFile(
                "./Product/README.md",
                `## Questions:\n Here is a link to my github:  \nhttps://github.com/${res.githubUser}  \n Email me at:  \n${res.contact}  \nfor additional questions\n`,
                (err) => {
                    if (err) {
                        console.log(err);
                        return;
                    }
                    console.log("Contact info added!");
                }
            );
        }
    });
}


// function call to initialize program
init();