// import puppeteer from "puppeteer";
// import * as config from './helpers.js';
// const init = async function(){
//   const arr = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]
//   let jobs = [];
//   const scrapeMultipleProducts = async function (url, val) {
//     if(!val)return; 
//     try{
//       // Initialize the browser functionality.
//     const browser = await puppeteer.launch();
//     // Set the initial page
//     const page = await browser.newPage();
//       await config.changePage(page, url);
//       // Get jobs from public view
//       const rawText = await config.getText(page,`/html/body/div[1]/div[2]/div/div[1]/div/div/div[2]/div[${val}]`);
//       // Fix the text format
//       const fixedText = await rawText.split('\n');
//       // Get href of the job
//       const hrefRaw = await config.getHref(page, `/html/body/div[1]/div[2]/div/div[1]/div/div/div[2]/div[${val}]/article/div[2]/h2/a`)
//       // Change view to inside of the particular job
//       await config.changePage(page, hrefRaw);
//       // Get data from inside the job view.
//       const jobDescRaw = await config.getText(page,`/html/body/div[1]/div[1]/div/div/div`)
//       // Gix the text format for the job view.
//       const fixedJobDescRaw = await jobDescRaw.split('\n').filter(e=> e!== '');
//       // Add the product to an array.
//       jobs.push({Title:fixedText[0], Company:fixedText[1], Location: fixedText[2], Field:fixedText[3], Link:hrefRaw, Jobdescription: fixedJobDescRaw});
//     if(jobs.length >= 20) console.log(jobs,jobs.length)

// }
// catch(err){console.error(err)}
// };
// arr.forEach(val =>scrapeMultipleProducts(`https://www.monster.fi/tyopaikat?search=Iot`, val))
// }

// init();






import puppeteer from "puppeteer";
import * as config from './helpers.js';
const init = async function(){
  const arr = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]
  let jobs = [];
  const scrapeMultipleProducts = async function (url,val) {
    // if(!val)return; 
    try{
      if(val === arr[-1])return console.log(jobs);
      // Initialize the browser functionality.
    const browser = await puppeteer.launch();
    // Set the initial page
    const page = await browser.newPage();
    await config.changePage(page, url);
     
      // Get jobs from public view
      const rawText = await config.getText(page,`/html/body/div[1]/div[2]/div/div[1]/div/div/div[2]/div[${val}]`);
      // Fix the text format
      const fixedText = await rawText.split('\n');
      // Get href of the job
      const hrefRaw = await config.getHref(page, `/html/body/div[1]/div[2]/div/div[1]/div/div/div[2]/div[${val}]/article/div[2]/h2/a`)

      // Change view to inside of the particular job
      await config.changePage(page, hrefRaw);
      // Get data from inside the job view.
      const jobDescRaw = await config.getText(page,`/html/body/div[1]/div[1]/div/div/div`)
      // Gix the text format for the job view.
      const fixedJobDescRaw = await jobDescRaw.split('\n').filter(e=> e!== '');
      // Add the product to an array.
      // console.log({Title:fixedText[0], Company:fixedText[1], Location: fixedText[2], Field:fixedText[3], Link:hrefRaw, Jobdescription: fixedJobDescRaw})
      jobs.push({Title:fixedText[0], Company:fixedText[1], Location: fixedText[2], Field:fixedText[3], Link:hrefRaw, Jobdescription: fixedJobDescRaw});
      if(jobs.length >= 20) console.log(jobs,jobs.length)
      
}
catch(err){console.error(err)}
};


const getJobs = function(url,arr){
  arr.forEach(val =>scrapeMultipleProducts(url, val))
}

getJobs(`https://www.monster.fi/tyopaikat?search=Iot`,arr)
getJobs(`https://www.monster.fi/tyopaikat?search=Iot&page=1`,arr)
getJobs(`https://www.monster.fi/tyopaikat?search=Iot&page=2`,arr)
const log = async function(jobs){
  console.log(jobs)
}
// await log(jobs)
}

init()