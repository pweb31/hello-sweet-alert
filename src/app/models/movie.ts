export interface Movie {
    title:string;
    //results?:object[];
    results?:Movie[];
    original_title:string;
    poster_path:string;
    overview:string;
    release_date:string;
}
