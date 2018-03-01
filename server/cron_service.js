function cronSrv(db){

    console.log('starting cron schedule');

    let twilio_controller = require('./twilio_controller');
    var CronJob = require('cron').CronJob;

    function sendNotifications(before) {
        let now = new Date();
        let hour = now.getHours();
        if(before) {
            hour++
        }
        console.log(hour);
        db.reminders.get_reminders(hour).then(reminders => {
            reminders.forEach(reminder => {
                
                let message = `hi ${reminder.user_name} it is time to give ${reminder.med_strength} of ${reminder.med_name} to ${reminder.patient_name}`
                console.log(message);
                twilio_controller.sendText(message, reminder.phone)
            });
        })
    }

    //=====Minus 10 cron function===== seconds, minutes, hours, day of 
    let minusTen = new CronJob('0 08 * * * *', function() {
        console.log('You will see this message minute 50');
        // sendNotifications(true)
        sendNotifications(true)
    }, null, true, 'America/Denver');


    //=====onTime 10 cron function=====
    let onTime = new CronJob('0 09 * * * *', function() {
        console.log('You will see this message minute 0');
        sendNotifications(false)
    }, null, true, 'America/Denver');

    //=====plus 10 cron function=====
    let plusTen = new CronJob('0 10 * * * *', function() {
        console.log('You will see this message minute 10');
        sendNotifications(false)
    }, null, true, 'America/Denver');

}

module.exports = cronSrv;