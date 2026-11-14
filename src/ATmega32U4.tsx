/**
 * ATmega32U4-AU, TQFP-44 physical pin mapping.
 *
 * Pin numbers are taken from Microchip/Atmel ATmega16U4/32U4 datasheet
 * 7766F, Figure 1-1; cross-checked against Arduino's ATmega32U4 pin map.
 *
 * Unique labels on repeated power pins ensure no electrical pad is
 * accidentally conflated with another pad by a name-based selector.
 */
export const ATMEGA32U4_PIN_LABELS = {
  pin1: "PE6",
  pin2: "UVCC",
  pin3: "USB_D_MINUS",
  pin4: "USB_D_PLUS",
  pin5: "UGND",
  pin6: "UCAP",
  pin7: "VBUS",
  pin8: "PB0",
  pin9: "PB1",
  pin10: "PB2",
  pin11: "PB3",
  pin12: "PB7",
  pin13: "RESET",
  pin14: "VCC14",
  pin15: "GND15",
  pin16: "XTAL2",
  pin17: "XTAL1",
  pin18: "PD0",
  pin19: "PD1",
  pin20: "PD2",
  pin21: "PD3",
  pin22: "PD5",
  pin23: "GND23",
  pin24: "AVCC24",
  pin25: "PD4",
  pin26: "PD6",
  pin27: "PD7",
  pin28: "PB4",
  pin29: "PB5",
  pin30: "PB6",
  pin31: "PC6",
  pin32: "PC7",
  pin33: "PE2_HWB",
  pin34: "VCC34",
  pin35: "GND35",
  pin36: "PF7",
  pin37: "PF6",
  pin38: "PF5",
  pin39: "PF4",
  pin40: "PF1",
  pin41: "PF0",
  pin42: "AREF",
  pin43: "GND43",
  pin44: "AVCC44",
} as const

export const ATMEGA32U4_FOOTPRINT = "tqfp44_w10_h10_p0.8mm"

/**
 * This is a logical/physical ATmega32U4 device component only.
 * Use ReferenceBoard for explicit clock, USB, power and reset nets.
 * Not a board certified for manufacture.
 */
export function ATmega32U4({
  name = "U1",
  pcbX = 0,
  pcbY = 0,
}: {
  name?: string
  pcbX?: number
  pcbY?: number
}) {
  return (
    <chip
      name={name}
      manufacturerPartNumber="ATMEGA32U4-AU"
      footprint={ATMEGA32U4_FOOTPRINT}
      pinLabels={ATMEGA32U4_PIN_LABELS}
      pcbX={pcbX}
      pcbY={pcbY}
    />
  )
}
