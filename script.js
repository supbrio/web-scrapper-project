import puppeteer from "puppeteer";
const objJobs = {
  arr: [],
};

const scrapeProduct = async function (url) {
  let jobs = [];
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);

  const [el] = await page.$x(
    "/html/body/div[1]/div[1]/div/div/div/div[1]/div[3]/h1"
  );
  const src = await el.getProperty("textContent");
  const jobTitle = await src.jsonValue();

  const [el2] = await page.$x('//*[@id="node-984531"]/div/div/div/div/p[5]');
  const src2 = await el2.getProperty("textContent");
  const jobDescription = await src2.jsonValue();
  jobs.push({ Title: jobTitle, Description: jobDescription });
  console.log(jobs);
};

scrapeProduct(`https://www.monster.fi/tyopaikka/junior-account-manager-984531`);
