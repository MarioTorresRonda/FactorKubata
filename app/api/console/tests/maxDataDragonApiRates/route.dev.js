import { getCollection } from '@/util/mongoDB';
import { NextResponse } from 'next/server';

let responses;

export async function GET(request) {
    
    responses = [];
    let startTime = new Date();
    
    const task0 = individualTest(0);
    const task1 = individualTest(1);
    const task2 = individualTest(2);
    const task3 = individualTest(3);
    const task4 = individualTest(4);
    const task5 = individualTest(5);
    const task6 = individualTest(6);
    const task7 = individualTest(7);
    const task8 = individualTest(8);
    const task9 = individualTest(9);

    let results = { 
        result0 : await task0,
        result1 : await task1,
        result2 : await task2,
        result3 : await task3,
        result4 : await task4,
        result5 : await task5,
        result6 : await task6,
        result7 : await task7,
        result8 : await task8,
        result9 : await task9,
    }

    let endTime = new Date();
    return NextResponse.json( { responses, startTime, endTime }, {status: 200});
}

export async function individualTest( id ) {

    let counter = 0;
    while( counter < 1000 ) {
        try{
            let data = await fetch(`https://ddragon.leagueoflegends.com/api/versions.json`, {cache: "no-store"} );
            let version = await data.json();
            if ( counter % 10 == 0 ) {
                responses.push( { id, counter, version: version[0] } );
            }
            if ( counter % 100 == 0 ) {
                console.log( id, counter );
            }
            counter++;
        }catch( e ) {
            let endTime = new Date();
            return NextResponse.json( { id, counter, length: responses.length, startTime, endTime }, {status: 200});
        }
    }

}