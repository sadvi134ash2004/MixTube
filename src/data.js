export const API_KEY = 'AIzaSyA6WCpO65XR9pObUYrOxNqGyMlRT_t2L24';
export const value_converter=(value)=>{
    if(value>=1000000)
    {
        return Math.floor(value/1000000)+"M";
    }else if(value>=1000){
        return Math.floor(value/1000)+"K";
    }else{
        return value;
    }
}