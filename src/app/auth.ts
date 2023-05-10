"use client";

const ENDPOINT = "http://127.0.0.1:8080";

export function isLoggedIn() {
  return typeof window !== "undefined" && localStorage.getItem("token") !== null
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

export async function getAccountData(email_address: string) {
  const accountInfo = await fetch(ENDPOINT + "/account/view", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeader()
    },
    body: JSON.stringify({ email_address })
  })
}

export async function getUserData() {
  if (!isLoggedIn()) {
    return null;
  }
  const userAccountInfo = await fetch(ENDPOINT + "/account/get", {
    method: "GET",
    headers: getAuthHeader()
  })
  const userAccountInfoAsJson = await userAccountInfo.json();

  const userTimeInfo = await fetch(ENDPOINT + "/time/get", {
    method: "GET",
    headers: getAuthHeader()
  });
  const userTimeInfoAsJson = await userTimeInfo.json();
  return { time: userTimeInfoAsJson, account: userAccountInfoAsJson };
}


export async function getManagerData() {
  if (!isLoggedIn()) {
    return null;
  }

  const managerAccountInfo = await fetch(ENDPOINT + "/manager/get", {
    method: "GET",
    headers: getAuthHeader()
  })
  const managerAccountInfoAsJson = await managerAccountInfo.json();
  return { account: managerAccountInfoAsJson };
}