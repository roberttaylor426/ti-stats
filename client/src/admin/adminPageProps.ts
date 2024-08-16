import { Event } from '../events';

type AdminPageProps = {
    events: Event[];
    publishNewEvents: (events: Event[]) => Promise<boolean>;
    undoLastEvent: () => Promise<boolean>;
    toggleUndoLastEventMode: () => void;
};

export { AdminPageProps };
