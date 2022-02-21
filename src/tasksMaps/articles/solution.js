"use strict"

import fetch from 'node-fetch'
const mapa = new Map();

(async () => {
	let result;
	try {
		result = await fetch('https://api.spaceflightnewsapi.net/v3/articles').then(x => x.json());
	} catch (e) {
		console.error(e);
	}

    //console.log(sortByUpdateDateDescending(result));
    fillMap(result);
    //console.log(mapa);

    function addNewNews(obj){
        if (mapa.has(obj)){
            return;
        } else if (checkId(obj)){
            return;
        } else {
            result.push(obj)
            mapa.clear()
            fillMap(result)
        }
    }
    
    function checkId(obj){
        let newarr=[...mapa.keys()]
            for (let index = 0; index < newarr.length; index++) {
            if (newarr[index].id==obj.id){
                newarr[index]=obj;
                return true;
            }else{
                return false;
            }
        }
    }
 /*    const check = {
        id: 13849,
        title: "New center to coordinate work to mitigate effect of satellite constellations on astronomy",
        url: "https://spacenews.com/new-center-to-coordinate-work-to-mitigate-effect-of-satellite-constellations-on-astronomy/",
        imageUrl: "https://spacenews.com/wp-content/uploads/2022/02/pleiades-streaks.jpg",
        newsSite: "SpaceNews",
        summary: "The International Astronomical Union (IAU) is establishing a center to help astronomers deal with the adverse effects of satellite constellations.",
        publishedAt: "2022-02-05T14:29:38.000Z",
        updatedAt: "2022-02-05T14:29:38.307Z",
        featured: false,
        launches: [],
        events: []
    }; */

/*     const check1 = result[0]
    console.log(122222222)
    console.log(result[0])
    console.log(122222222)
     */
/*     const check2 = {
        id: 14019,
        title: "PITON",
        url: 'https://spacenews.com/state-fight-shoring-up-floridas-space-coast/',
        imageUrl: 'https://spacenews.com/wp-content/uploads/2022/02/PR-TerranOrbital-CampusAerial.jpg',
        newsSite: 'SpaceNews',
        summary: 'The Sunshine State’s efforts to lure commercial space ventures began well before the sun set on the Space Shuttle era.',
        publishedAt: '2022-02-20T18:09:37.000Z',
        updatedAt: '2022-02-20T18:09:37.208Z',
        featured: false,
        launches: [],
        events: []
    }; */

/*     addNewNews(check);
    console.log(11111111111111111111111111111111111111111);
    console.log(mapa);
    addNewNews(check1);
    console.log(11111111111111111111111111111111111111111);
    console.log(mapa); */
    //addNewNews(check2);
   // console.log(11111111111111111111111111111111111111111);
   //console.log(mapa);
    //console.log(11111111111111);
	//console.log(result);
})();

function sortByUpdateDateDescending(arr){
    return arr.slice().sort( (a,b) => Date.parse(a.updatedAt) < Date.parse(b.updatedAt)? 1 : -1);
}

function fillMap(arr){
    arr.forEach(element => {
        let summaryObjArray = [];
        arr.forEach(elementInner => {
            if (element.id != elementInner.id && elementInner.newsSite == element.newsSite){
                summaryObjArray.push(elementInner)
            }
        });
        mapa.set(element,summaryObjArray);
        //console.log(summaryObjArray);
    });
}




