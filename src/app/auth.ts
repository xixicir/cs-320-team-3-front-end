"use client";

const ENDPOINT = "http://127.0.0.1:8080";

export function isLoggedIn() {
  const isTokenInLocalStorage = localStorage.getItem("token") !== null;
  return isTokenInLocalStorage;
}

export function storeAuthToken(token: string) {
  localStorage.setItem("token", token);
}

export function deleteAuthToken() {
  localStorage.removeItem("token");
}

export function getAuthHeader() {
  if (!isLoggedIn()) {
    throw new Error("Not logged in")
  }
  return {
    "Authorization": "Bearer " + localStorage.getItem("token"),
  }
}

export async function getUserData() {
  if (!isLoggedIn()) {
    return null;
  }

  const userInfo = await fetch(ENDPOINT + "/time/get", {
    method: "GET",
    headers: {
      "Authorization": "Bearer " + localStorage.getItem("token"),
    },
  });
  const userInfoAsJson = await userInfo.json();
  return userInfoAsJson;
}
