const EventBus = {
    on(event: string, callback: EventListener) {
        document.addEventListener(event, callback);
    },
    dispatch(event: string, data?: any) { // Corrected the typo here
        const customEvent = new CustomEvent(event, { detail: data });
        document.dispatchEvent(customEvent);
    },
    remove(event: string, callback: EventListener) {
        document.removeEventListener(event, callback);
    },
};

export default EventBus;
