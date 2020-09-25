# M5stack wrapper for Mongoose OS

This library is a wrapper to the already available support for the ILI9341 display and Neopixel RGB LED bar.

It is intended to be used by developers not familiar nor interested in those devices who want to use the M5stack as a prototype for a proof-of-concept or a quick demo; instead of playing around with full support for available bells and whistles, we here provide a quick wrapper to just get things done in what is typically needed: init the display, light a bunch of LEDs, read some buttons.


As the I2C bus is also started, it is available and ready to be used.

The UART in GROVE C is available as UART2 at pins 16 and 17



## Usage:

```
load('api_m5stack.js');

M5stack.displayInit();
M5stack.printCentered(M5stack.screenWidth / 2, M5stack.line(0), 'some centered text');

M5stack.setFont(1);
M5stack.setFgColor(M5stack.RED);
M5stack.print(5, M5stack.line(2), 'Some text at line 2, starting at column 5');

let strip = M5stack.pixelInit();
         // pixel, R,  G,  B);
strip.setPixel(0, 50,  0,  0); // top right
strip.setPixel(2,  0, 50,  0);
strip.setPixel(4,  0,  0, 50);
strip.setPixel(M5stack.numPixels-1, 25, 25, 25); // top left
strip.show();
//strip.clear();
//strip.free();

GPIO.set_button_handler(M5stack.BTN1, GPIO.PULL_UP, GPIO.INT_EDGE_NEG, 20, function() { }, null);
// M5stack.BTN2
// M5stack.BTN3
```
