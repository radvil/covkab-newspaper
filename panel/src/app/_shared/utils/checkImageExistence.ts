  export const imageExists = function(imageUrl: string): boolean {

    const http = new XMLHttpRequest();

    http.open('HEAD', imageUrl, false);
    http.send();

    return http.status != 404;

}