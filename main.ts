datalogger.onLogFull(function () {
    music.playMelody("C5 A B G A F G E ", 200)
    basic.showString("FEHLER: Log-Datei voll!")
})
input.onLogoEvent(TouchButtonEvent.LongPressed, function () {
    basic.clearScreen()
    start = 0
    ende = 0
    // Bahn wieder absenken.
    pins.servoWritePin(AnalogPin.P15, 180)
    // Kugelschleuse schliessen.
    servos.P2.setAngle(180)
    music.playMelody("E G E A G - - - ", 300)
})
let zeit = 0
let ende = 0
let start = 0
start = 0
ende = 0
// Kugelschleuse schliessen.
servos.P2.setAngle(180)
pins.servoWritePin(AnalogPin.P15, 180)
datalogger.setColumnTitles("Dauer")
while (!(input.logoIsPressed())) {
    basic.pause(1)
}
// Wert 0 bedeutet, die Kugelschleuse ist offen.
servos.P2.setAngle(0)
basic.forever(function () {
    while (input.pinIsPressed(TouchPin.P0)) {
        start = input.runningTime()
        music.playTone(262, music.beat(BeatFraction.Whole))
    }
    while (input.pinIsPressed(TouchPin.P1)) {
        ende = input.runningTime()
        music.playTone(698, music.beat(BeatFraction.Whole))
        basic.pause(100)
        zeit = (ende - start) / 1000
        datalogger.log(datalogger.createCV("Dauer", zeit))
        datalogger.mirrorToSerial(true)
        basic.showNumber(zeit)
        basic.pause(200)
        // Servo hebt Kreisscheibe an, um Neigung der Bahn umzukehren.
        pins.servoWritePin(AnalogPin.P15, 0)
        // Pausieren, bis oberer Pin geschlossen wird.
        while (!(input.pinIsPressed(TouchPin.P0))) {
            basic.pause(1)
        }
        basic.pause(500)
        // Kugelschleuse schliessen.
        servos.P2.setAngle(180)
        basic.pause(500)
        // Bahn wieder absenken.
        pins.servoWritePin(AnalogPin.P15, 180)
        basic.pause(2000)
        // Kugelschleuse öffnen, um Zyklus neu zu starten.
        servos.P2.setAngle(0)
        start = 0
        ende = 0
    }
})
