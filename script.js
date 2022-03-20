
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
    //   jobs.push({ Title: j obTitle, Description: jobDescription });
    //   console.log(jobs);
    // };
import puppeteer from "puppeteer";
const init = async function(){
  const arr = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]
  let jobs = [];
  const scrapeMultipleProducts = async function (url, val) {
  if(!val)return; 
  try{
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      await page.goto(url);
      const [el] = await page.$x(
        `/html/body/div[1]/div[2]/div/div[1]/div/div/div[2]/div[${val}]`
          );
          const textValue = await el.getProperty('innerText');
          if (!textValue === val)return; 
          const rawText = await textValue.jsonValue();
          const fixedText = await rawText.split('\n');
          
      const [href] = await page.$x(`/html/body/div[1]/div[2]/div/div[1]/div/div/div[2]/div[${val}]/article/div[2]/h2/a`);
      const hrefValue = await href.getProperty('href');
      const hrefRaw = await hrefValue.jsonValue();
      jobs.push({Title:fixedText[0], Company:fixedText[1], Location: fixedText[2], Field:fixedText[3], Link:hrefRaw})
    if(jobs.length >= 20) console.log(jobs)
    
}
catch(err){console.error(err)}
};
arr.forEach(val =>scrapeMultipleProducts(`https://www.monster.fi/tyopaikat?search=It`, val))
}


init();