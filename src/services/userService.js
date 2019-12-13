import http from "./httpService";

export function getUsers() {
  return http.get("https://rickandmortyapi.com/api/character/");
}
