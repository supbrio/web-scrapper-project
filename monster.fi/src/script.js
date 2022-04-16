import puppeteer from "puppeteer";
import * as config from "./config.js";
import fs from "file-system";

const scrapeAllJobData = async function (url, val) {
  const fileName = url.includes("page")
    ? url.split("&").slice(-1).join("").replace("=", "")
    : "page0";

  const jobField = url.includes("page")
    ? url.split("&").slice(0, 1).join("").split("=").slice(-1)
    : url.split("=").slice(-1);

  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);
    // Getting links
    const links = await page.evaluate(() => {
      let innerJobs = Array.from(document.querySelectorAll("h2.node__title"));
      const jobLinks = innerJobs.map((element) => {
        return element.querySelector("a.recruiter-job-link").href;
      });
      return jobLinks;
    });

    // Geting access to insides of the links.
    const allJobData = await Promise.all(links.map((e) => getAllJobData(e)));

    // Creates a text file from all the jobs with their description.
    fs.writeFile(
      `./monster.fi/jobData/${jobField}/${fileName}.txt`,
      allJobData.join("\n")
    );
    console.log(`${fileName} ready in monster.fi/jobData/${jobField}`);
  } catch (err) {
    console.error(err);
  }
};

const getAllJobData = async function (link) {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(link);
    page.setDefaultTimeout(config.TIMEOUT_SECS * 100);

    const jobData = await page.evaluate(() => {
      let jobInfo = document.querySelector("div.panel__main").innerText;
      let jobTitle = document.querySelector("div.pane-node-title").innerText;
      const allJobInfo = `${jobTitle} \n\n ${jobInfo}`;
      return allJobInfo;
    });

    return jobData;
  } catch (err) {
    console.error(err);
  }
};

// For first page(page0) use just "search=Iot".
// For second page and onwards add "&page=x" to the url string

// scrapeAllJobData(`https://www.monster.fi/tyopaikat?search=Iot`);
scrapeAllJobData(
  `https://www.monster.fi/tyopaikat?search=Markkinointiassistentti`
);

// Running the script from command line with command "node monster.fi/src/script.js"
// Once you see string "pagex ready in monster.fi/jobData/x" in terminal; the script has fetched all the job data from that page
