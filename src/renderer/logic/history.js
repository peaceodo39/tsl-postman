
class History {
    get(){
       let hist = window.localStorage.getItem('history');
       if(hist){
            console.log(1);
       }
    }
}
export default History;