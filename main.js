const Gremlin = require('gremlin');
const Vertex = require("./Vertex.js");
const fs = require("fs");
const axios = require('axios');
const Currency = require('./currency');
const Country = require('./country')
const cheerio = require('cheerio');
const moment = require('moment');
const https = require('https');
var zipadmin = require("adm-zip");
const { parse } = require("csv-parse");
const ini = require('ini');
//DEEPAK - CHANGE PATH BELOW
const AppDir = 'C:\\Users\\manish.poojary\\Downloads\\code (1)';
const config = ini.parse(fs.readFileSync(`${AppDir}\\config.ini`, 'utf-8'));
const authenticator = new Gremlin.driver.auth.PlainTextSaslAuthenticator(config.TinkerpopDB.user, config.TinkerpopDB.password);
const client = new Gremlin.driver.Client(
    `${config.TinkerpopDB.protocol}://${config.TinkerpopDB.server}:${config.TinkerpopDB.port}/${config.TinkerpopDB.db}`,
    {
        authenticator,
        traversalsource: "g",
        rejectUnauthorized: true,
        mimeType: `${config.TinkerpopDB.mimeType}`
    }
);

function loadCurrencies () {
    axios.get(config.Data.securl2).then(response => {parseCurrencyData(response.data)}).catch(error=>{console.log(error);process.exit(1)});
}
/*Scrape the SEC site for form data*/
function parseCurrencyData(data) {
    const $ = cheerio.load(data);
    found = true;
    var d = undefined;
    const scrapedData = [];
    let i =1;
    //console.log($(".wikitable > tbody > tr:nth-child(2) > td:nth-child(1)").text())
    $("table:nth-of-type(4) > tbody > tr").each((index,element)=>{
        
        if (index === 0 || index == 36 || index == 37) return true;
        //console.log(i++,$($(element).find("td")[0]).text());
        const tds = $(element).find("td");
        const slno = $(tds[0]).text();
        const currency = $(tds[1]).text();
        const code = $(tds[2]).text();
        const symbol = $(tds[3]).text();
        const tableRow = { slno, currency, code, symbol };
        scrapedData.push(tableRow);

        
    });
    //console.log(scrapedData);
    for (var index = 0; index < scrapedData.length; index++) {
        //console.log(scrapedData[index].code)
        currency = new Currency(scrapedData[index].code)
        currency.setValue('currency',scrapedData[index].currency);
        currency.setValue('symbol',scrapedData[index].symbol);
        currency.save(client);
     }
    
}

function loadCountries () {
    console.log('country')
    //name	alpha-2	alpha-3	country-code	iso_3166-2	region	sub-region	intermediate-region	region-code	sub-region-code	intermediate-region-code
    fs.createReadStream("countrycodes.csv")
      .pipe(parse({ delimiter: ",", from_line: 2 }))
      .on("data", function (row) {
        var country = new Country(row[2]);
        country.setValue('name',row[0]);
        country.setValue('alpha2',row[1]);
        country.setValue('countrycode',row[3]);
        country.setValue('iso3166',row[4]);
        country.setValue('region',row[5]);
        country.setValue('subregion',row[6]);
        country.setValue('intermediateregion',row[7]);
        country.setValue('regioncode',row[8]);
        country.setValue('subregioncode',row[9]);
        country.setValue('intermediateregioncode',row[10]);
        country.save(client);
      });
}

const countVer = async () => {
    try {
        const countVer = await client.submit(`g.V().count()`);
        console.log(countVer);
    } catch (e) {
        console.error(e)
    }
}


function loadXBRLData(url) {
    axios.get(url, {
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; Win64; x64)'
        }
    }).then(response => { parseXBRLData(response.data) }).catch(error => { console.log(error); process.exit(-1) });
}


function parseXBRLData(data) {
    var $ = cheerio.load(data);
    /*
    Find the following
    */
    var docFiscalPeriodFocus = $('dei\\:CurrentFiscalYearEndDate').text().trim();
    var docType = $('dei\\:DocumentType').text().trim();
    var yrEndDate = $('dei\\:CurrentFiscalYearEndDate').text().trim();
    var regName = $('dei\\:EntityRegistrantName').text().trim();
    var tradingSymbol = $('dei\\:TradingSymbol').text().trim();
    var footnotes = $('link\\:footnoteLink').text().trim();
    var CIK;
    $("xbrli\\:identifier").each((i, el) => {
        CIK = $(el).text().trim();
    });
    console.log("CIK = " + CIK);
    console.log("Year End Date = " + yrEndDate);
    console.log("Document Type = " + docType);
    console.log("Fiscal Period Focus = " + docFiscalPeriodFocus);
    console.log("Company Name = " + regName);
    console.log("Trading Symbol = " + tradingSymbol);
    console.log("Footnotes = " + footnotes);
}

function _get_current_quarter() {
    let format = '[QTR]Q';
    return moment().format(format);
}

const timer = ms => new Promise(res => setTimeout(res, ms));

async function _download_edgar_filings() {
    urlList = []
    sinceYear = parseInt(config.Data.StartProcesingFromYear)
    var currentQtr = _get_current_quarter();
    qtrs = ['QTR1', 'QTR2', 'QTR3', 'QTR4']
    while (sinceYear <= moment().year()) {
        for (index in qtrs) {
            qtr = qtrs[index]
            _download_File(sinceYear, qtr)
            //avoid more than 10 requests per second to the SEC website
            await timer(120).then(_ => console.log(`Done fetching ${sinceYear}/${qtr}`));
            if (sinceYear == moment().year() && qtr == currentQtr)
                return;
        }
        sinceYear++;
    }
    return;
}

function _download_and_add_SEC_disclosures() {
    axios.get(config.Data.DisclosuresURL).then(response => { parseDisclosuresData(response.data) }).catch(error => { console.log(error); process.exit(-1) });
}

/*Scrape the SEC site for form data*/
function parseDisclosuresData(data) {
    //data is passed to this method from @function: _download_and_add_SEC_disclosures afte  it scrapes it from SEC website
    const $ = cheerio.load(data);
    found = true;
    var d = undefined;
    $("#DataTables_Table_0,tbody tr td").each((i, el) => {
        var arr = $(el).text().trim().replace('\n', '').split(":");
        var key = arr[0].trim();
        var value = arr[1].trim();
        //console.log("%s=%s",key,value);
        if (key == "Number" && value == "") {
            found = false;
        }
        else if (key == "Number" && value != "") {
            found = true;
            if (d) {
                result = d.save();
            }
            d = new Vertex(client, 'Disclosure', value);
        }
        if (found) {
            d.addAttribute(key, value);
        }
    });
}


function _store_filing_data() {
    sinceYear = parseInt(config.Data.StartProcesingFromYear)
    var currentQtr = _get_current_quarter();
    ctr = 0
    qtrs = ['QTR1', 'QTR2', 'QTR3', 'QTR4']
    while (sinceYear <= moment().year()) {
        for (index in qtrs) {
            qtr = qtrs[index]
            indexFileName = `${config.Data.dest}\\${sinceYear}\\${qtr}\\${config.Data.indexFileName}`
            try {
                // read contents of the file
                const data = fs.readFileSync(indexFileName, 'UTF-8')
                // split the contents by new line
                const lines = data.split('\r\n')
                // print all lines
                lines.forEach(line => {
                    if (line.indexOf(config.Data.FilingURLPatttern) > -1) {
                        //Wohoo - found the filing
                        filingItem = line.split(config.Data.sep)
                        var query = `g.V().has(T.id,"${filingItem[1]}").fold().coalesce(unfold(),addV("Company").property(id,"${filingItem[1]}")`;
                        query += ").next()";
                        client.submit(query).then(
                            function (result) {
                                console.log(result);
                            },
                            function (err) {
                                console.log(err.message);
                            }
                        );
                        //c = new Vertex(client, "Company",filingItem[1]);
                        //c.save();
                        //var company = new Vertex(client, "Company",filingItem[1])
                        //var identifier = new Vertex(client,"Identifier",filingItem[0])
                        //var filing = new Vertex(client,"Filing",filingItem[4])
                        //var disclosure = new Vertex(client,"Disclosure",filingItem[3])
                        //company.save();
                        ctr++;
                        if (ctr > 10) return;
                        //console.log(result)
                        //identifier.save()
                        //filing.save()
                        //disclosure.save()
                    }
                })
            } catch (err) {
                console.error(err)
            }
            if (sinceYear == moment().year() && qtr == currentQtr)
                return;
        }
    }
}

function _download_File(year, qtr) {

    dirs = [`${config.Data.dest}`, `${config.Data.dest}\\${year}`, `${config.Data.dest}\\${year}\\${qtr}`]
    for (index in dirs) {
        dir = dirs[index]
        dirExists = fs.existsSync(`${dir}`);
        if (!dirExists) {
            // synchronously create a directory
            fs.mkdirSync(`${dir}`)
        }
    }

    const Path = `${config.Data.dest}\\${year}\\${qtr}\\${config.Data.zipFileName}`
    let urlPath = `${config.Data.urlpath}/${config.Data.indexType}/${year}/${qtr}/${config.Data.zipFileName}`

    const options = {
        hostname: `${config.Data.url}`,
        port: 443,
        path: `${urlPath}`,
        method: 'GET',
        headers: {
            'Accept-Encoding': 'gzip, deflate',
            'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; Win64; x64)'
        }
    }

    const fileStream = fs.createWriteStream(Path);

    const req = https.request(options, (res) => {
        if (res.statusCode == 200) {
            res.pipe(fileStream);
        }
        else {
            console.log('statusCode:', res.statusCode);
            console.log('headers:', res.statusMessage);
        }
        fileStream.on('finish', function () {
            fileStream.close();
            zip = new zipadmin(Path);
            zip.extractAllTo(`${config.Data.dest}\\${year}\\${qtr}\\`, true);
        });
    });

    req.on('error', (e) => {
        console.error(e);
    });
    req.end();
}


//console.log("initializing data in graph DB")
client.open()
//.then(loadCountries)
//.then(loadCurrencies)
countVer();
//loadCurrencies();
//_download_and_add_SEC_disclosures()
//_download_edgar_filings ()
//_store_filing_data()
 client.close();


//loadXBRLData('https://www.sec.gov/Archives/edgar/data/1018724/000144530513002495/amzn-20130930.xml');
