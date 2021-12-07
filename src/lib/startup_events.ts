class StartupEvents
{
    eventTotal = 5;
    eventCount = 0;
    callback?: () => void;
    fired = false;

    registerEvent()
    {        
        this.eventCount++;
        if (this.eventCount===this.eventTotal)
        {
            this.fireCallback();
        }
    }

    registerCallback(callback: () => void)
    {
        if (!this.callback)
        {
            this.callback = callback;
            if (this.fired) this.callback();
        }
    }

    fireCallback()
    {
        if (this.callback)
        {
            this.callback();
        }
        else
        {
            this.fired = true;
        }
    }
}

export const startupEvents = new StartupEvents();