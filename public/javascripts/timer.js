var timerDock = new TimerStack();

function Timer() {

    this.id = timerIdGenerator();

    this.name = "";

    // The funcion which will invoke when timeout.
    this.invokeFunction;
    // How many millsec setting for timeout;
    this.millsec;

    this.timerObj;

    this.params = {};

    this.options = {
        cycle: true,
        runBeforeTimeout: false
    }

    /**
     * Set the invoke function without other options.
     * @param func
     * @param params
     * @param millsec
     * @param isCycle
     * @param isRunBeforeTimeout
     */
    this.setFunction = function(func, params, millsec) {
        this.invokeFunction = func;
        if (millsec) {
            this.millsec = millsec;
        } else {
            this.millsec = 1000;
        }

        if (params) {
            this.params = params;
        }

    }

    /**
     * Set the invoke function and other options.
     * @param func
     * @param params
     * @param millsec
     * @param isCycle
     * @param isRunBeforeTimeout
     */
    this.setFunction = function(func, params, millsec, options) {
        this.invokeFunction = func;
        if (millsec) {
            this.millsec = millsec;
        } else {
            this.millsec = 1000;
        }

        if (options) {
            this.options = options;
            if(this.options.cycle){
                this.options.cycle = true;
            }

//            if(this.options.runBeforeTimeout){
//                this.options.runBeforeTimeout = false;
//            }
        } else {

        }

        if (params) {
            this.params = params;
        }

    }

    /**
     * Run invokeFunction after timout reached.
     */
    this.invokeAfterTimeout = function() {
        try {
            this.invokeFunction(this);
            clearTimeout(this.timerObj);
            if (this.options.cycle) {
                this.start();
            }
        } catch(error) {
        }
    }

    /**
     * Run invokeFunction at first and waiting timout.
     */
    this.invokeBeforeTimeout = function() {
        try {
            this.invokeFunction(this);
            clearTimeout(this.timerObj);
            if (this.options.cycle) {
                this.timerObj = setTimeout("timerDock['" + this.id + "'].invokeBeforeTimeout()", this.millsec);
            }
        } catch(error) {
        }
    }

    this.stop = function() {
        clearTimeout(this.timerObj);
    }

    this.start = function() {

        try {
            if (this.options.runBeforeTimeout) {
                this.invokeBeforeTimeout();
            } else {
                this.timerObj = setTimeout("timerDock['" + this.id + "'].invokeAfterTimeout()", this.millsec);
            }
        } catch(e) {
        }
    }

    timerDock[this.id] = this;
}

function TimerStack() {
    this.timerMap = {   };

    this.getTimerObject = function(id){
        try{
            var timerObj = this.timerMap[id];
            if(timerObj){
                return timerObj;
            }
        }catch(error){}
    }
}

function timerIdGenerator() {
    var S4 = function() {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
}

