interface User { 
    id:string,
    name:string,
    email:string,
    image:string
}

export const useCurrentUser = async(instruction:"set"|"get"|"del",payload:null|User) => {
    if(instruction == "set") {
        localStorage.setItem("user",JSON.stringify(payload));
    }
    if(instruction == "get") {
        let u = localStorage.getItem("user");
        if(u) {
            let obj = JSON.parse(u);
            return obj;
        }
      
    }
    if(instruction == "del") {
        if(localStorage.getItem("user")) {
            localStorage.removeItem("user");
        }
    }
}