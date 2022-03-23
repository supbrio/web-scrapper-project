import puppeteer from "puppeteer";
const init = async function(url){
    let jobs = [];
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);
    const arr = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]
    const arr2 = [1,2,3];
    const [btn] = await page.$x('/html/body/div[1]/div[2]/div/div[1]/div/div/ul/li[4]/a');
    const src = await btn.getProperty('href');
    const srcTxt = await src.jsonValue();
    arr2.forEach(val2 => {arr.forEach(val =>scrapeMultipleProducts(`https://www.monster.fi/tyopaikat?search=Iot`, val))})
    
    
  const scrapeMultipleProducts = async function (val,val2) {
  if(!val)return; 
  try{
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

      await page.goto(hrefRaw);
      const [jobView] = await page.$x(`/html/body/div[1]/div[1]/div/div/div`);
      const jobDesc = await jobView.getProperty('innerText');
      const jobDescRaw = await jobDesc.jsonValue();
      const fixedJobDescRaw = await jobDescRaw.split('\n').filter(e=> e!== '');

      // await page.goto(url);
      // const [btn] = await page.$x(`/html/body/div[1]/div[2]/div/div[1]/div/div/ul/li[4]/a`);
      // await btn.click();
      // const btnValue = await btn.getProperty('href');
      // const btnRaw = await btnValue.jsonValue();
      jobs.push({Title:fixedText[0], Company:fixedText[1], Location: fixedText[2], Field:fixedText[3], Link:hrefRaw, Jobdescription: fixedJobDescRaw});
    if(jobs.length >= 20) console.log(jobs)

}
catch(err){console.error(err)}
};
}
init();

const changePage = async function(url){
    await page.goto(url);
    
}