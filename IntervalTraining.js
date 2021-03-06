/* Warmup until lap button is press */
if (SUUNTO_LAP_NUMBER === 1) {
    ZCOUNTER = 11;
    ZREPETITION = REPETITION;
    prefix = "Warmup";
    RESULT = SUUNTO_DURATION;
}

/* Interval program starts here (lap =2) */

if (SUUNTO_LAP_NUMBER === 2) {

    /* Shows #Sets et #Repetition left*/

    if (ZCOUNTER >= 3) {
        ZCOUNTER = ZCOUNTER - 1;
        prefix = "Set";
        RESULT = SET;
    } else if (ZCOUNTER == 2) {
        ZCOUNTER = ZCOUNTER - 1;
        prefix = "Rep";
        RESULT = ZREPETITION;
    } else if (ZCOUNTER == 1) {
        ZCOUNTER = ZCOUNTER - 1;
        prefix = "Rep";
        RESULT = ZREPETITION;
        Suunto.alarmBeep();
    } else if (ZCOUNTER == 0) {

        /* Set timer and format screen */

        if (ZETAT == 1 && ZETATPREVIOUS != 1) {
            ZTIMEUR = RUNTIME;
            ZETATPREVIOUS = ZETAT;
            prefix = "Run";
        } else if (ZETAT == 2 && ZETATPREVIOUS != 2) {
            ZTIMEUR = JOGTIME;
            ZETATPREVIOUS = ZETAT;
            prefix = "Jog";
        } else if (ZETAT == 3 && ZETATPREVIOUS != 3) {
            ZTIMEUR = RESTTIME;
            ZETATPREVIOUS = ZETAT;
            prefix = "Rest";
            Suunto.alarmBeep();
        }

        /* Next thing to do */

        if (ZTIMEUR == 0 && ZETAT == 1) {
            ZETAT = 2;
            ZETATPREVIOUS = 1;
            Suunto.alarmBeep();
        } else if (ZTIMEUR == 0 && ZETAT == 2 && ZREPETITION != 1) {
            ZETAT = 1;
            ZETATPREVIOUS = 2;
            ZREPETITION = ZREPETITION - 1;
            Suunto.alarmBeep();
        } else if (ZTIMEUR == 0 && ZETAT == 2 && ZREPETITION == 1) {
            ZETAT = 3;
            ZETATPREVIOUS = 2;
            Suunto.alarmBeep();
        } else if (ZTIMEUR == 0 && ZETAT == 3 && SET != 1) {
            ZETAT = 1;
            ZETATPREVIOUS = 3;
            SET = SET - 1;
            ZREPETITION = REPETITION;
            ZCOUNTER = 4;
            Suunto.alarmBeep();
        } else if (ZTIMEUR == 0 && ZETAT == 3 && SET == 1) {
            Suunto.alarmBeep();
            ZETAT = 4;
            ZETATPREVIOUS = 3;
            Suunto.alarmBeep();
        }

        /* Time remaining */
        if (ZETAT != 4) {
            RESULT = ZTIMEUR;
            ZTIMEUR = ZTIMEUR - 1;
        }

    }

    /* Interval ended */

    /* Cooldown (if lap = 3 or more or interval program ended) */

    if (SUUNTO_LAP_NUMBER > 2 || ZETAT == 4) {
        prefix = "Cdown";
        ZTIMEUR = ZTIMEUR + 1;
        RESULT = ZTIMEUR;
    }
