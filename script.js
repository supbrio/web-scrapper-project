import puppeteer from "puppeteer";
const objJobs = {
  arr: [],
};

// const scrapeProduct = async function (url) {
//   let jobs = [];
//   const browser = await puppeteer.launch();
//   const page = await browser.newPage();
//   await page.goto(url);

//   const [el] = await page.$x(
//     "/html/body/div[1]/div[1]/div/div/div/div[1]/div[3]/h1"
//   );
//   const src = await el.getProperty("textContent");
//   const jobTitle = await src.jsonValue();

//   const [el2] = await page.$x('//*[@id="node-984531"]/div/div/div/div/p[5]');
//   const src2 = await el2.getProperty("textContent");
//   const jobDescription = await src2.jsonValue();
//   jobs.push({ Title: jobTitle, Description: jobDescription });
//   console.log(jobs);
// };
const arr = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]
const scrapeMultipleProducts = async function (url, val) {
  let jobs = [];
  let elements = []; 
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);
  const [el] = await page.$x(
    `/html/body/div[1]/div[2]/div/div[1]/div/div/div[2]/div[${val}]`
      );
  const textValue = await el.getProperty('innerText');
  if (!textValue === val)return; 
  const rawText = await textValue.jsonValue();
  console.log(rawText)
  // console.log(titleRaw)
  // console.log(page.querySelector('div'))
};

arr.forEach(e => scrapeMultipleProducts(`https://www.monster.fi/tyopaikat?search=It`, e))
// scrapeProduct(`https://www.monster.fi/tyopaikka/junior-account-manager-984531`);

// scrapeMultipleProduct(`https://www.monster.fi/tyopaikat?search=It`)