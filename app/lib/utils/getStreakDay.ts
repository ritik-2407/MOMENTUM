export function getStreakDay(){

    const now = new Date();

    const year = now.getFullYear();
    const month = now.getMonth();
    const date = now.getDate();

    const threeAM = new Date(year , month , date , 3,0,0);

    if(now< threeAM){
        const prev = new Date(year , month , date-1);
        prev.setHours(3,0,0,0);
        return prev;
    }

   const today = new Date(year , month , date );

    today.setHours(3,0,0,0);
    return today;
}