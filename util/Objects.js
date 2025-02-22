export default function merge (  ) {
    var dst = {}
        ,src
        ,p
        ,args = [].splice.call(arguments, 0)
    ;

    while (args.length > 0) {
        src = args.splice(0, 1)[0];
        if (toString.call(src) == '[object Object]') {
            for (p in src) {
                if (src.hasOwnProperty(p)) {
                    if (toString.call(src[p]) == '[object Object]') {
                        dst[p] = merge(dst[p] || {}, src[p]);
                    } else {
                        dst[p] = src[p];
                    }
                }
            }
        }
    }

   return dst;
}

export function isEmpty( obj ) {
    return ( obj == null || Object.keys( obj ).length == 0 );
}

export function isObject( object ) {
    return typeof object === 'object' && object !== null
}