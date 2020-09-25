load('api_gpio.js');
load('api_ili9341_spi.js');
load('api_neopixel.js');

let getFont = ffi('void* get_font(int)');
let fonts = [getFont(0), getFont(1), getFont(2), getFont(3)];


let M5stack = {
  BTN1: 39,
  BTN2: 38,
  BTN3: 37,
  BACKLIGHT: 32,
  PIXEL: 15,
  numPixels: 10,
  screenHeight: 240,
  screenWidth: 320,
  BLACK: ~ILI9341.BLACK,
  BLUE: ~ILI9341.BLUE,
  GREEN: ~ILI9341.GREEN,
  RED: ~ILI9341.RED,
  WHITE: ~ILI9341.WHITE,
  backlightOn: function() {GPIO.write(this.BACKLIGHT, 1);},
  backlightOff: function() {GPIO.write(this.BACKLIGHT, 0);},
  clearLine: function(n) {
    ILI9341.setFgColor565(this.WHITE);
    ILI9341.fillRect(0, ILI9341.line(n), this.screenWidth, ILI9341.getMaxFontHeight());
    ILI9341.setFgColor565(this.BLACK);
  },
  cls: function() {
    ILI9341.setBgColor565(this.WHITE);
    ILI9341.fillScreen();
    ILI9341.setFgColor565(this.BLACK);
  },
  line: ILI9341.line,
  print: ILI9341.print,
  printCentered: function (xc, y, text) {
	  ILI9341.print(xc - ILI9341.getStringWidth(text) / 2, y, text);
  },
  setBgColor: ILI9341.setBgColor565,
  setFgColor: ILI9341.setFgColor565,
  setFont: function(f) { if(f>=0 && f<=3) ILI9341.setFont(fonts[f]);},
  displayInit: function() {
	  // Display orientation settings.
	  // See https://github.com/mongoose-os-libs/ili9341-spi#orientations for details.
	  let M5STACK_LANDSCAPE = 0x0;        // Buttons at the bottom, 320x240
	  let M5STACK_PORTRAIT = 0xa0;        // Buttons on the left, 240x320
	  let M5STACK_LANDSCAPE_FLIP = 0xd0;  // Buttons at the top, 320x240
	  let M5STACK_PORTRAIT_FLIP = 0x60;   // Buttons on the right, 240x320
	  GPIO.set_mode(this.BACKLIGHT, GPIO.MODE_OUTPUT);
	  ILI9341.setOrientation(M5STACK_LANDSCAPE, this.screenWidth, this.screenHeight);
	  this.cls();
	  this.backlightOn();
	  this.setFont(1);
  },
  pixelInit: function() {
    let strip = NeoPixel.create(this.PIXEL, this.numPixels, NeoPixel.GRB);
    strip.clear();
    strip.show();
    return strip;
  }
};