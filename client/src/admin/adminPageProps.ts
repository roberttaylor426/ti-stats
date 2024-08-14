import { Event } from '../events';

type AdminPageProps = {
    events: Event[];
    publishNewEvents: (events: Event[]) => Promise<boolean>;
};

export { AdminPageProps };
