import * as script from './script.js';

export const changePage = async function(page,url){
    try{
      await page.goto(url);
    }catch(err){console.error(err)}
  }

  export const getHref = async function(page,element){
    try{
      const [href] = await page.$x(element)
      const hrefValue = await href.getProperty('href');
      const hrefString = await hrefValue.jsonValue();
      return await hrefString;
    }
    catch(err){console.error(err)}
  }
  export const getText = async function(page,element){
    try{
      const [el] = await page.$x(element)
      const textValue = await el.getProperty('innerText');
      const textString = await textValue.jsonValue();
      return await textString;
    }
    catch(err){console.error(err)}
  }
