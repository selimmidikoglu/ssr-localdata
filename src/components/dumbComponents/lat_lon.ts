

export const toRad = (brng:number):number => {
    return brng * Math.PI / 180;
 }
 
export const toDeg= (x:number):number => {
    return x * 180 / Math.PI;
 }
 
export const findLatLot = (lat1:number,lng1:number,brng:number, dist:number) => {
    dist = dist / 6371;  
    brng = toRad(brng);  
 
    var lat1 = toRad(lat1), lon1 = toRad(lng1);
 
    var lat2 = Math.asin(Math.sin(lat1) * Math.cos(dist) + 
                         Math.cos(lat1) * Math.sin(dist) * Math.cos(brng));
 
    var lon2 = lon1 + Math.atan2(Math.sin(brng) * Math.sin(dist) *
                                 Math.cos(lat1), 
                                 Math.cos(dist) - Math.sin(lat1) *
                                 Math.sin(lat2));
 
    if (isNaN(lat2) || isNaN(lon2)) return null;
    
 
    return {lat:lat2,lon:lon2};
 }