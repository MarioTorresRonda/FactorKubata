import { roles } from '@/data/roles';
import { log, WARNING } from '@/util/logs';
import { getCollection } from '@/util/mongoDB';
import { MatchPlayer } from '@/util/trimmedObjs';
import { NextResponse } from 'next/server';
import he from 'he';
import { getChampions } from '../../LoLData/champions/route';
import { getVersion } from '../../LoLData/version/route';

function especialChamps( champions )  {
    return {
        "Jarvan IV": champions.JarvanIV,
        "Kha'Zix":  champions.Khazix,
        "Xin Zhao": champions.XinZhao,
        "Master Yi": champions.MasterYi,
        "Nunu & Willump": champions.Nunu,
        "Lee Sin": champions.LeeSin,
        "Wukong": champions.MonkeyKing,
        "Rek'Sai": champions.RekSai,
        "Bel'Veth": champions.Belveth,
        "Dr. Mundo": champions.DrMundo,
        "Cho'Gath": champions.Chogath,
        "K'Sante": champions.KSante,
        "Twisted Fate": champions.TwistedFate,
        "LeBlanc": champions.Leblanc,
        "Aurelion Sol": champions.AurelionSol,
        "Vel'Koz": champions.Velkoz,
        "Miss Fortune": champions.MissFortune,
        "Kai'Sa": champions.Kaisa,
        "Kog'Maw": champions.KogMaw
    }
};

async function fetchChampionList( role ) {

    const separator = "|"

    let version = await getVersion();
    const [ champions ] = await getChampions( version );
    const especialChampsObj = especialChamps( champions );

    let data = await fetch(`https://op.gg/en/lol/champions?position=${role}`);
    let page = await data.text();
    page = page.substring( page.indexOf('<table'), page.indexOf("</table>") + "</table>".length )
    page = he.decode( page );

    let regex = /(<tr>)/g;
    page = page.replace( regex, "\n" ); 
    regex = /(<th.*?>)/g;
    page = page.replace( regex, separator );
    regex = /(<td.*?>)/g;
    page = page.replace( regex, separator );
    regex = /(<.*?>)/g;
    page = page.replace( regex, "" );


    //Remove caption
    let pageLines = page.split("\n");
    pageLines = pageLines.slice(1);

    //Constructor
    const constructor = {};
    const tableHead = pageLines.slice(0, 1)[0];
    tableHead.split( separator ).forEach( th => {
        const trimmedTH = th.replaceAll(" ", "");
        if ( trimmedTH ) {
            constructor[trimmedTH] = "";
        }
    });

    const championsJSON = [];
    const tableBody = pageLines.slice(1);
    tableBody.forEach( ( champion, rank ) => {
        const championSplit = champion.split( separator ).slice(1);
        const championJSON = {...constructor};
        Object.keys( championJSON ).forEach( ( key, index ) => {
            if ( key == "Rank" ) {
                championJSON[key] = rank;
            }else{
                if ( key == "Champion") {
                    const formattedChampion = champions[ championSplit[index] ];
                    if ( formattedChampion ) {
                        championJSON.key = formattedChampion.key;

                    }else {
                        const eFC = especialChampsObj[championSplit[index]];
                        if ( eFC ) {
                            championJSON.key = eFC.key;
                        }else{
                            log( WARNING, "Champion", championSplit[index], "not found" )
                        }
                    }
                }
                championJSON[key] = championSplit[index];
            }
        } ) 
        championsJSON.push( championJSON )
    } )

    return championsJSON;
}

export async function GET(request) {
    
    try{

        const searchParams = request.nextUrl.searchParams;
        const role = searchParams.get('role');
        
        const championsCollection = await getCollection("champions");  
        let champions = await championsCollection.findOne( { role : role } );
        
        if ( !champions || !champions.lastUpdate || ( !champions.lastUpdate < ((new Date().getTime() ) - ( 1000 * 60 * 60 * 24 ) ) ) ) {
            champions = { role: role }
            const championsJSON = await fetchChampionList( role );
            champions.list = championsJSON;
            champions.lastUpdate = new Date().getTime();
            await championsCollection.insertOne( champions );
        }
        
        return NextResponse.json( champions, {status: 200});
    }catch(e) {
      return NextResponse.json( e, {status: 400});
    }
}