import { toast, SvelteToast } from "@zerodevx/svelte-toast";
import type {
  SvelteToastCustomComponent,
  SvelteToastOptions,
  SvelteToastCustomComponent as SvelteToastType,
} from "node_modules/@zerodevx/svelte-toast/stores";

export const success = (m: string) =>
  toast.push(m, {
    theme: {
      "--toastBackground": "green",
      "--toastColor": "white",
      "--toastBarBackground": "olive",
    },
  });

export const warning = (m: string) =>
  toast.push(m, {
    theme: {
      "--toastBackground": "red",
      "--toastColor": "white",
      "--toastBarBackground": "black",
    },
  });

export const failure = (m: string) =>
  toast.push(m, {
    theme: {
      "--toastBackground": "red",
      "--toastColor": "white",
      "--toastBarBackground": "black",
    },
  });
