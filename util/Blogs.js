export function getNextId( temporalNavBar ) {

    const array = temporalNavBar.current;

    let nextId = 0;
    for (let index = 0; index < array.length; index++) {
        const element = array[index];
        if ( element.id > nextId ) {
            nextId = element.id
        }
    }
    return nextId + 1;
}

export function findNavBarById( temporalNavBar, id ) {

    const array = temporalNavBar.current;

    for (let index = 0; index < array.length; index++) {
        const element = array[index];
        if ( element.id == id ) {
            return true;
        }
    }

    return false;     
}

export const levels = {
	0: "pl-0",
	1: "pl-2",
	2: "pl-4",
	3: "pl-6",
	4: "pl-8",
	5: "pl-10",
};

export function capLevel( level ) {	

	//if number is larger than 5, we cap to 5
	if ( !isNaN(Number(level)) && level > 5 ) {
		level = 5;
	}
	//if is not a number on the list (below 0 or NaN), then is 0
	if ( !levels[level] ) {
		level = 0;
	}

	return level;
}