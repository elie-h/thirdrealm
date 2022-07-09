import { useMatches } from "@remix-run/react";
import { useMemo } from "react";

import type { Wallet } from "~/models/wallet.server";

const DEFAULT_REDIRECT = "/";

/**
 * This should be used any time the redirect path is user-provided
 * (Like the query string on our login/signup pages). This avoids
 * open-redirect vulnerabilities.
 * @param {string} to The redirect destination
 * @param {string} defaultRedirect The redirect to use if the to is unsafe.
 */
export function safeRedirect(
  to: FormDataEntryValue | string | null | undefined,
  defaultRedirect: string = DEFAULT_REDIRECT
) {
  if (!to || typeof to !== "string") {
    return defaultRedirect;
  }

  if (!to.startsWith("/") || to.startsWith("//")) {
    return defaultRedirect;
  }

  return to;
}

/**
 * This base hook is used in other hooks to quickly search for specific data
 * across all loader data using useMatches.
 * @param {string} id The route id
 * @returns {JSON|undefined} The router data or undefined if not found
 */
export function useMatchesData(
  id: string
): Record<string, unknown> | undefined {
  const matchingRoutes = useMatches();
  const route = useMemo(
    () => matchingRoutes.find((route) => route.id === id),
    [matchingRoutes, id]
  );
  return route?.data;
}

function isUser(user: any): user is Wallet {
  return user && typeof user === "object" && typeof user.address === "string";
}

export function useOptionalUser(): Wallet | undefined {
  const data = useMatchesData("root");
  if (!data || !isUser(data.user)) {
    return undefined;
  }
  return data.user;
}

export function useUser(): Wallet {
  const maybeUser = useOptionalUser();
  if (!maybeUser) {
    throw new Error(
      "No user found in root loader, but user is required by useUser. If user is optional, try useOptionalUser instead."
    );
  }
  return maybeUser;
}

export function validateEmail(email: unknown): email is string {
  return typeof email === "string" && email.length > 3 && email.includes("@");
}

export const truncateString = (input: string | undefined, n: number) => {
  if (input == undefined) {
    return "";
  }
  return input.length > n ? `${input.substring(0, n)}...` : input;
};

// Captures 0x + 4 characters, then the last 4 characters.
const truncateRegex = /^(0x[a-zA-Z0-9]{4})[a-zA-Z0-9]+([a-zA-Z0-9]{4})$/;

/**
 * Truncates an ethereum address to the format 0x0000…0000
 * @param address Full address to truncate
 * @returns Truncated address
 */
export const truncateEthAddress = (address: string) => {
  const match = address.match(truncateRegex);
  if (!match) return address;
  return `${match[1]}…${match[2]}`;
};

export const friendlyDate = (date: Date) => {
  const now = new Date();
  const then = new Date(date);
  const diff = Math.abs(then.getTime() - now.getTime());
  const hour = 1000 * 60 * 60;
  const day = 1000 * 60 * 60 * 24;
  const week = day * 7;
  const month = day * 30;
  const year = day * 365;
  if (diff < hour) {
    const minutes = Math.round(diff / 1000 / 60);
    return `${minutes} minutes ago`;
  } else if (diff < day) {
    const hours = Math.round(diff / (1000 * 60 * 60));
    return `${hours} hours ago`;
  } else if (diff < week) {
    const days = Math.round(diff / (1000 * 60 * 60 * 24));
    return `${days} days ago`;
  } else if (diff < month) {
    const weeks = Math.round(diff / (1000 * 60 * 60 * 24 * 7));
    return `${weeks} weeks ago`;
  } else if (diff < year) {
    const months = Math.round(diff / (1000 * 60 * 60 * 24 * 30));
    return `${months} months ago`;
  } else {
    const years = Math.round(diff / (1000 * 60 * 60 * 24 * 365));
    return `${years} years ago`;
  }
};
