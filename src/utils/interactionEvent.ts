import { useEffect } from 'react';

export const INTER_EVENT_TYPE = 'interaction';
export function dispatchInteractionEvent(interaction: { type: string; payload: any; }) {
  dispatchEvent(
    new CustomEvent(
      INTER_EVENT_TYPE,
      {
        detail: interaction,
      },
    ),
  );
}

export function useInteractionListener(listener: EventListener) {
  useEffect(() => {
    window.addEventListener(INTER_EVENT_TYPE, listener);
    return () => {
      window.removeEventListener(INTER_EVENT_TYPE, listener);
    }
  },[listener]);
}