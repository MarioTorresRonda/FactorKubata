export function updateBubbleColors(firstColor, secondColor, time) {

    try {
        if ( !document ) {
            return;
        }
    } catch (error) {
        return;
    }
    
    
    const root = document.documentElement;
    if ( !root ) {
        return;
    }
    
    let [ firstHue, firstSaturation, firstLight ] = rgbToHsl( firstColor[0], firstColor[1], firstColor[2] );
    let [ secondHue, secondSaturation, secondLight ] = rgbToHsl( secondColor[0], secondColor[1], secondColor[2] );

    firstHue += time; 
    secondHue += time; 

    firstSaturation = firstSaturation > 80 ? firstSaturation - 20 : firstSaturation;
    secondSaturation = secondSaturation > 80 ? secondSaturation - 20 : secondSaturation;

    const light = window.matchMedia("(prefers-color-scheme: dark)").matches ? 40 : 60;
    

    root.style.setProperty('--myColorStartSimple', `hsl(${firstHue}, ${firstSaturation}% ,${light + 20}%)`);
    root.style.setProperty('--myColorEndSimple', `hsl(${secondHue}, ${secondSaturation}% ,${light + 20}%)`);
    root.style.setProperty('--myColorStartHover', `hsl(${secondHue}, ${firstSaturation + 20}% ,${light}%)`);
    root.style.setProperty('--myColorEndHover', `hsl(${firstHue}, ${secondSaturation + 20}% ,${light}%)`);
}

//hue: 0-360
//saturation: 0 - 100
//light: 0-1
function rgbToHsl(r, g, b) {
    r /= 255, g /= 255, b /= 255;
  
    var max = Math.max(r, g, b), min = Math.min(r, g, b);
    var h, s, l = (max + min) / 2;
  
    if (max == min) {
      h = s = 0; // achromatic
    } else {
      var d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
  
      h /= 6;
    }
  
    return [ h * 360, s * 100, l ];
  }